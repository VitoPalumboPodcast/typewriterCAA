/* ============================================================
   COSTANTI, UTILITIES, E DATI
   ============================================================ */

// Prefisso assoluto per le immagini, come richiesto
const BASE_URL = "https://www.vitopalumbo.it/INCLUSIONE/";

// Esegue il join assoluto se serve
const toAbsolute = (p) => {
  if (!p) return "";
  if (/^https?:\/\//i.test(p)) return p;
  return BASE_URL + p.replace(/^\/+/, "");
};

// Catalogo pulsanti caricati da JSON
let CATALOG = [];

// Colori cornice per chip/token per coerenza visiva
const BORDER_BY_CAT = { S: "#e74c3c", V: "#2980b9", O: "#27ae60", X: "#8e44ad" };

// Stato applicativo
const state = {
  tokens: [],                 // lista token {cat, label, speak, image}
  autoSpeak: true,            // lettura automatica di ogni token
  filter: "ALL",              // filtro categoria corrente
  voices: [],                 // voci TTS disponibili
  preferredVoice: null,       // voce preferita (it-IT se possibile)
  paused: false
};

/* ============================================================
   COSTRUZIONE UI: GRIGLIA, TOKEN, CHIP
   ============================================================ */
const gridEl     = document.getElementById("grid");
const sentenceEl = document.getElementById("sentence");
const outputEl   = document.getElementById("output");

function buildGrid(){
  gridEl.innerHTML = "";
  const items = CATALOG.filter(it => state.filter==="ALL" ? true : it.cat===state.filter);
  for (const it of items){
    const b = document.createElement("button");
    b.className = `tile ${it.cat}`;
    b.type = "button";
    b.setAttribute("role","gridcell");
    b.setAttribute("aria-label", it.label);
    b.title = it.label;
    b.tabIndex = 0;

    // immagine (se esiste)
    if (it.image){
      const img = document.createElement("img");
      img.alt = it.label;
      img.loading = "lazy";
      img.decoding = "async";
      img.src = toAbsolute(it.image);
      img.onerror = () => { img.style.visibility="hidden"; }; // se 404, nascondi
      b.appendChild(img);
    }

    const lab = document.createElement("div");
    lab.className = "tlabel";
    lab.textContent = it.label;
    b.appendChild(lab);

    b.addEventListener("click", () => addToken(it));
    b.addEventListener("keydown", (e)=>{ if(e.key==="Enter" || e.key===" "){ e.preventDefault(); b.click(); } });

    gridEl.appendChild(b);
  }
}

function renderSentence(){
  sentenceEl.innerHTML = "";
  state.tokens.forEach((t, idx) => {
    const s = document.createElement("span");
    s.className = "token";
    s.dataset.cat = t.cat;
    s.style.borderColor = BORDER_BY_CAT[t.cat] || "#999";
    s.textContent = t.label;
    s.tabIndex = 0;
    s.title = "Token " + (idx+1);
    s.addEventListener("click", ()=> speak(t.speak || t.label));
    sentenceEl.appendChild(s);
  });
}

function renderOutput(){
  outputEl.innerHTML = "";
  state.tokens.forEach(t => {
    const box = document.createElement("div");
    box.className = "chip";
    box.style.borderColor = (BORDER_BY_CAT[t.cat] || "#bbb");

    if (t.image){
      const img = document.createElement("img");
      img.alt = t.label;
      img.src = toAbsolute(t.image);
      img.onerror = () => { img.remove(); }; // se fallisce, mostra solo etichetta
      box.appendChild(img);
    }

    const lab = document.createElement("div");
    lab.className = "label";
    lab.textContent = t.label;
    box.appendChild(lab);

    outputEl.appendChild(box);
  });
}

function addToken(item){
  state.tokens.push(item);
  renderSentence();
  renderOutput();
  if (state.autoSpeak) speak(item.speak || item.label);
}

function undoLast(){
  if (!state.tokens.length) return;
  state.tokens.pop();
  renderSentence(); renderOutput();
}

function clearAll(){
  state.tokens = [];
  renderSentence(); renderOutput();
}

async function loadCatalog(){
  try{
    const resp = await fetch("catalog.json");
    CATALOG = await resp.json();
    buildGrid();
  }catch(err){
    const msg = document.createElement("p");
    msg.className = "note";
    msg.textContent = "Catalogo non disponibile";
    document.querySelector(".container").prepend(msg);
  }
}

/* ============================================================
   TTS ROBUSTO (PAUSA/RIPRESA/STOP + VOCI it-IT)
   ============================================================ */
const supportsTTS = "speechSynthesis" in window;
const synth = supportsTTS ? window.speechSynthesis : null;

function refreshVoices(){
  if (!synth) return;
  state.voices = synth.getVoices() || [];
  // Priorità: voce it-IT femminile → qualsiasi it-IT → default
  state.preferredVoice =
    state.voices.find(v => (v.lang || "").toLowerCase()==="it-it" && /female|femmina|donna/i.test(v.name)) ||
    state.voices.find(v => (v.lang || "").toLowerCase()==="it-it") ||
    null;
}
if (synth){
  refreshVoices();
  synth.addEventListener("voiceschanged", refreshVoices);
}

let currentUtterance = null;

function speak(text){
  if (!synth || !text || !text.trim()) return;
  stopSpeak(); // interrompe eventuale coda in corso e riparte
  currentUtterance = new SpeechSynthesisUtterance(text);
  if (state.preferredVoice) currentUtterance.voice = state.preferredVoice;
  currentUtterance.lang = (state.preferredVoice?.lang) || "it-IT";
  currentUtterance.rate = 0.9;
  currentUtterance.pitch = 0.9;
  synth.speak(currentUtterance);
  state.paused = false;
}
function pauseSpeak(){ if (synth && synth.speaking && !synth.paused){ synth.pause(); state.paused = true; } }
function resumeSpeak(){ if (synth && synth.paused){ synth.resume(); state.paused = false; } }
function stopSpeak(){ if (synth && (synth.speaking || synth.paused)){ synth.cancel(); } state.paused=false; }

function speakAll(){
  if (!synth) return;
  const text = state.tokens.map(t => t.speak || t.label).join(" ");
  speak(text);
}

/* ============================================================
   CONTROLLI TOOLBAR
   ============================================================ */
// Lettura
const btnRead = document.getElementById("btn-read");
const btnPause = document.getElementById("btn-pause");
const btnResume = document.getElementById("btn-resume");
const btnStop = document.getElementById("btn-stop");
btnRead.addEventListener("click", speakAll);
btnPause.addEventListener("click", pauseSpeak);
btnResume.addEventListener("click", resumeSpeak);
btnStop.addEventListener("click", stopSpeak);

// Auto lettura on/off
const autoOn  = document.getElementById("autoOn");
const autoOff = document.getElementById("autoOff");
function setAuto(val){
  state.autoSpeak = !!val;
  autoOn.setAttribute("aria-pressed", state.autoSpeak ? "true" : "false");
  autoOff.setAttribute("aria-pressed", state.autoSpeak ? "false" : "true");
  localStorage.setItem("autoSpeak", state.autoSpeak ? "1" : "0");
}
autoOn.addEventListener("click", ()=> setAuto(true));
autoOff.addEventListener("click",()=> setAuto(false));

// Undo / Clear / Leggi token selezionato
const btnUndo = document.getElementById("btn-undo");
const btnClear = document.getElementById("btn-clear");
const btnReadToken = document.getElementById("btn-read-token");
btnUndo.addEventListener("click", undoLast);
btnClear.addEventListener("click", clearAll);
btnReadToken.addEventListener("click", ()=>{
  const focused = document.activeElement;
  if (focused && focused.classList.contains("token")){
    speak(focused.textContent.trim());
  }
});

// Slider dimensioni e spaziatura
const size = document.getElementById("size");
const gap  = document.getElementById("gap");
function applySizes(){
  document.documentElement.style.setProperty("--tile-size", size.value+"rem");
  document.documentElement.style.setProperty("--gap-size", gap.value+"rem");
  localStorage.setItem("tileSize", size.value);
  localStorage.setItem("gapSize", gap.value);
}
size.addEventListener("input", applySizes);
gap.addEventListener("input", applySizes);

// Alto contrasto
const btnContrast = document.getElementById("btn-contrast");
function toggleContrast(){
  document.body.classList.toggle("high-contrast");
  localStorage.setItem("contrast", document.body.classList.contains("high-contrast") ? "1":"0");
}
btnContrast.addEventListener("click", toggleContrast);

// Filtro categorie (segment control)
const filters = document.getElementById("filters");
filters.addEventListener("click", (e)=>{
  const btn = e.target.closest("button[data-filter]");
  if (!btn) return;
  state.filter = btn.dataset.filter;
  for (const b of filters.querySelectorAll("button[data-filter]")){
    b.setAttribute("aria-pressed", b===btn ? "true" : "false");
  }
  buildGrid();
});

/* ============================================================
   TASTI RAPIDI
   ============================================================ */
document.addEventListener("keydown", (e)=>{
  if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;

  if (e.key === "Enter"){
    e.preventDefault(); speakAll();
  } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==="z"){
    e.preventDefault(); undoLast();
  } else if (e.key.toLowerCase()==="c"){
    toggleContrast();
  } else if (e.key.toLowerCase()==="p"){
    pauseSpeak();
  } else if (e.key.toLowerCase()==="r"){
    resumeSpeak();
  } else if (e.key.toLowerCase()==="s"){
    stopSpeak();
  }
});

/* ============================================================
   PERSISTENZA PREFERENZE
   ============================================================ */
(function restorePrefs(){
  const as = localStorage.getItem("autoSpeak");
  const ts = localStorage.getItem("tileSize");
  const gs = localStorage.getItem("gapSize");
  const hc = localStorage.getItem("contrast");

  if (as !== null) setAuto(as==="1");
  if (ts){ size.value = ts; }
  if (gs){ gap.value  = gs; }
  applySizes();
  if (hc==="1") document.body.classList.add("high-contrast");
})();

/* ============================================================
   FALLBACK TTS
   ============================================================ */
if (!synth){
  document.querySelectorAll('#btn-read,#btn-pause,#btn-resume,#btn-stop,#btn-read-token').forEach(b => {
    b.disabled = true;
    b.title = 'Sintesi vocale non supportata';
  });
  autoOn.disabled = autoOff.disabled = true;
  state.autoSpeak = false;
  const warn = document.createElement('p');
  warn.className = 'note';
  warn.textContent = 'Sintesi vocale non disponibile nel tuo browser.';
  document.querySelector('.container').prepend(warn);
}

/* ============================================================
   AVVIO
   ============================================================ */
renderSentence();
renderOutput();
loadCatalog();

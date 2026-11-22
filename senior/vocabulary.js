const CATALOG = [
  {
    "cat": "QUICK",
    "id": "si",
    "label": "Sì",
    "icon": "✅"
  },
  {
    "cat": "QUICK",
    "id": "no",
    "label": "No",
    "icon": "❌"
  },
  {
    "cat": "QUICK",
    "id": "aiuto",
    "label": "Aiutami, per favore",
    "icon": "🛎️"
  },
  {
    "cat": "QUICK",
    "id": "toilette",
    "label": "Devo andare in bagno",
    "icon": "🚽"
  },
  {
    "cat": "QUICK",
    "id": "male",
    "label": "Mi fa male",
    "icon": "🩹"
  },
  {
    "cat": "QUICK",
    "id": "acqua",
    "label": "Vorrei dell’acqua",
    "icon": "🥛"
  },
  {
    "cat": "BAGNO",
    "id": "accompagna",
    "label": "Accompagnami in bagno",
    "icon": "🚽"
  },
  {
    "cat": "BAGNO",
    "id": "lavare",
    "label": "Vorrei lavarmi",
    "icon": "🚿"
  },
  {
    "cat": "BAGNO",
    "id": "mani",
    "label": "Vorrei lavarmi le mani",
    "icon": "🧼"
  },
  {
    "cat": "BAGNO",
    "id": "denti",
    "label": "Vorrei lavarmi i denti",
    "icon": "🪥"
  },
  {
    "cat": "BAGNO",
    "id": "asciugamano",
    "label": "Mi serve un asciugamano",
    "icon": "🧺"
  },
  {
    "cat": "BAGNO",
    "id": "cambiare",
    "label": "Ho bisogno di cambiarmi",
    "icon": "👕"
  },
  {
    "cat": "PASTI",
    "id": "fame",
    "label": "Ho fame",
    "icon": "🍽️"
  },
  {
    "cat": "PASTI",
    "id": "sete",
    "label": "Ho sete",
    "icon": "🥛"
  },
  {
    "cat": "PASTI",
    "id": "pane",
    "label": "Vorrei del pane",
    "icon": "🍞"
  },
  {
    "cat": "PASTI",
    "id": "zuppa",
    "label": "Vorrei della zuppa",
    "icon": "🥣"
  },
  {
    "cat": "PASTI",
    "id": "frutta",
    "label": "Vorrei della frutta",
    "icon": "🍐"
  },
  {
    "cat": "PASTI",
    "id": "te",
    "label": "Vorrei del tè",
    "icon": "☕"
  },
  {
    "cat": "PASTI",
    "id": "poco",
    "label": "Ne vorrei ancora",
    "icon": "➕"
  },
  {
    "cat": "PASTI",
    "id": "sazio",
    "label": "Non ne voglio più",
    "icon": "✋"
  },
  {
    "cat": "VESTITI",
    "id": "maglia",
    "label": "Mi serve una maglia",
    "icon": "👕"
  },
  {
    "cat": "VESTITI",
    "id": "pantaloni",
    "label": "Mi servono i pantaloni",
    "icon": "👖"
  },
  {
    "cat": "VESTITI",
    "id": "calze",
    "label": "Mi servono le calze",
    "icon": "🧦"
  },
  {
    "cat": "VESTITI",
    "id": "scarpe",
    "label": "Mi servono le scarpe",
    "icon": "👞"
  },
  {
    "cat": "VESTITI",
    "id": "giacca",
    "label": "Mi serve la giacca",
    "icon": "🧥"
  },
  {
    "cat": "VESTITI",
    "id": "vestire",
    "label": "Aiutami a vestirmi",
    "icon": "👔"
  },
  {
    "cat": "DOLORE",
    "id": "testa",
    "label": "Mi fa male la testa",
    "icon": "🤕"
  },
  {
    "cat": "DOLORE",
    "id": "gola",
    "label": "Mi fa male la gola",
    "icon": "🗣️"
  },
  {
    "cat": "DOLORE",
    "id": "pancia",
    "label": "Mi fa male la pancia",
    "icon": "🩹"
  },
  {
    "cat": "DOLORE",
    "id": "schiena",
    "label": "Mi fa male la schiena",
    "icon": "🩹"
  },
  {
    "cat": "DOLORE",
    "id": "gambe",
    "label": "Mi fanno male le gambe",
    "icon": "🦵"
  },
  {
    "cat": "DOLORE",
    "id": "nausea",
    "label": "Mi viene da vomitare",
    "icon": "🤢"
  },
  {
    "cat": "DOLORE",
    "id": "capogiro",
    "label": "Mi gira la testa",
    "icon": "💫"
  },
  {
    "cat": "DOLORE",
    "id": "dottore",
    "label": "Vorrei parlare con il medico",
    "icon": "🩺"
  },
  {
    "cat": "RIPOSO",
    "id": "sedere",
    "label": "Vorrei sedermi",
    "icon": "🪑"
  },
  {
    "cat": "RIPOSO",
    "id": "alzare",
    "label": "Aiutami ad alzarmi",
    "icon": "🧍"
  },
  {
    "cat": "RIPOSO",
    "id": "camminare",
    "label": "Vorrei camminare",
    "icon": "🚶"
  },
  {
    "cat": "RIPOSO",
    "id": "letto",
    "label": "Vorrei sdraiarmi",
    "icon": "🛏️"
  },
  {
    "cat": "RIPOSO",
    "id": "stanco",
    "label": "Ho bisogno di riposare",
    "icon": "💤"
  },
  {
    "cat": "RIPOSO",
    "id": "freddo",
    "label": "Ho freddo",
    "icon": "🧣"
  },
  {
    "cat": "RIPOSO",
    "id": "caldo",
    "label": "Ho caldo",
    "icon": "☀️"
  },
  {
    "cat": "RIPOSO",
    "id": "coperta",
    "label": "Mi serve una coperta",
    "icon": "🛏️"
  },
  {
    "cat": "PERSONE",
    "id": "famiglia",
    "label": "Chiama la mia famiglia",
    "icon": "👥"
  },
  {
    "cat": "PERSONE",
    "id": "telefono",
    "label": "Mi serve il telefono",
    "icon": "📞"
  },
  {
    "cat": "PERSONE",
    "id": "vicino",
    "label": "Resta qui con me",
    "icon": "🤝"
  },
  {
    "cat": "PERSONE",
    "id": "solo",
    "label": "Vorrei stare per conto mio",
    "icon": "🚪"
  },
  {
    "cat": "PERSONE",
    "id": "casa",
    "label": "Vorrei andare a casa",
    "icon": "🏠"
  },
  {
    "cat": "SCELTE",
    "id": "basta",
    "label": "Basta, per favore",
    "icon": "✋"
  },
  {
    "cat": "SCELTE",
    "id": "aspetta",
    "label": "Aspetta un momento",
    "icon": "⏳"
  },
  {
    "cat": "SCELTE",
    "id": "ripeti",
    "label": "Puoi ripetere?",
    "icon": "🔁"
  },
  {
    "cat": "SCELTE",
    "id": "capito",
    "label": "Non ho capito",
    "icon": "💬"
  },
  {
    "cat": "SCELTE",
    "id": "occhiali",
    "label": "Mi servono gli occhiali",
    "icon": "👓"
  },
  {
    "cat": "SCELTE",
    "id": "paura",
    "label": "Ho paura",
    "icon": "💬"
  },
  {
    "cat": "SCELTE",
    "id": "grazie",
    "label": "Grazie",
    "icon": "🤝"
  }
];

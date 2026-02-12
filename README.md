# Portfolio Urban 🏙️

Portfolio professionale di **Alessio Dallorto** dedicato a pianificazione urbanistica, trasporti sostenibili e analisi dati.

## 🚀 Caratteristiche

- **Aggiornamento Automatico**: Il sito si aggiorna automaticamente quando aggiungi nuovi file nelle cartelle `Tavole` o `Documenti`
- **Design Moderno**: Tema eco-urbano con colori sostenibili e animazioni fluide
- **Responsive**: Ottimizzato per desktop, tablet e mobile
- **SEO Ottimizzato**: Meta tags corretti per una migliore visibilità sui motori di ricerca
- **GitHub Pages Ready**: Pronto per essere pubblicato su GitHub Pages

## 📁 Struttura del Progetto

```
Portfolio_Urban/
├── index.html              # Pagina principale
├── index.css               # Stili personalizzati
├── script.js               # Logica per caricamento dinamico
├── generate_manifest.py    # Script Python per generare manifest.json
├── assets/                 # Immagini e risorse
│   └── hero.png           # Immagine hero
├── data/                   # Dati generati automaticamente
│   └── manifest.json      # Lista di tutti i file disponibili
├── Tavole/                # 🖼️ Inserisci qui le tue tavole (PDF, JPG, PNG)
└── Documenti/             # 📄 Inserisci qui i tuoi documenti (PDF)
```

## 🎯 Come Aggiungere Nuovi Contenuti

### Aggiungere una nuova tavola urbanistica

1. Trascina il tuo file (JPG, PNG, PDF) nella cartella `Tavole/`
2. Esegui lo script di aggiornamento:
   ```bash
   python3 generate_manifest.py
   ```
3. Ricarica il sito nel browser - la nuova tavola apparirà automaticamente! ✨

### Aggiungere un nuovo documento

1. Trascina il tuo file PDF nella cartella `Documenti/`
2. Esegui lo script di aggiornamento:
   ```bash
   python3 generate_manifest.py
   ```
3. Ricarica il sito nel browser - il nuovo documento apparirà automaticamente! ✨

## 🌐 Visualizzazione Locale

Per visualizzare il sito in locale, hai diverse opzioni:

### Opzione 1: Server Python (Raccomandato)
```bash
python3 -m http.server 8000
```
Poi apri il browser su `http://localhost:8000`

### Opzione 2: Live Server (VS Code)
Se usi Visual Studio Code, installa l'estensione "Live Server" e clicca su "Go Live"

## 🚀 Pubblicazione su GitHub Pages

### 1. Crea un nuovo repository su GitHub

```bash
git init
git add .
git commit -m "Initial commit: Portfolio Urban"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/Portfolio_Urban.git
git push -u origin main
```

### 2. Attiva GitHub Pages

1. Vai su **Settings** del tuo repository
2. Nella sezione **Pages** (menu laterale)
3. Sotto **Source**, seleziona **main** branch
4. Clicca **Save**

### 3. (Opzionale) Aggiorna automaticamente il manifest

Crea il file `.github/workflows/update_manifest.yml` per eseguire automaticamente lo script Python ad ogni push.

Il tuo sito sarà disponibile su: `https://TUO-USERNAME.github.io/Portfolio_Urban/`

## 🛠️ Tecnologie Utilizzate

- **HTML5** - Struttura semantica
- **CSS3** - Styling moderno con variabili CSS e animazioni
- **JavaScript (ES6+)** - Caricamento dinamico dei contenuti
- **Python 3** - Generazione automatica del manifest

## 🎨 Palette Colori (Tema Sostenibilità)

- **Forest Green** (#2D5A27) - Elementi principali
- **Mint Green** (#A8D5BA) - Accenti
- **Eco White** (#F4F7F6) - Sfondo
- **Dark Slate** (#1C2833) - Testo

## 📝 Note

- Il sito è **statico** e non richiede backend
- Il file `app.py` (Streamlit) è deprecato - usa solo l'HTML statico
- Ricorda di eseguire `generate_manifest.py` ogni volta che aggiungi nuovi file

## 👤 Autore

**Alessio Dallorto**  
Studente presso il Politecnico di Milano  
Focus: Urbanistica, Trasporti Sostenibili, Data Analysis

---

© 2026 Alessio Dall'Orto | Milano, Italia

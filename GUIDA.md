# 📖 GUIDA PORTFOLIO — Come Aggiornare e Pubblicare

---

## 🔄 AGGIORNARE IL SITO (ogni volta che aggiungi un file)

Apri il Terminale e copia questi comandi:

```bash
cd ~/Desktop/Portfolio_Urban
python3 generate_manifest.py
git add .
git commit -m "nuovo contenuto"
git push
```

**Cosa fanno:**
1. `cd` → entra nella cartella del progetto
2. `python3 generate_manifest.py` → scansiona Tavole/ e Documenti/ e aggiorna il manifest
3. `git add .` → prepara tutti i file per il caricamento
4. `git commit -m "..."` → salva le modifiche con un messaggio
5. `git push` → carica tutto su GitHub (e il sito si aggiorna da solo!)

**Tempo: ~30 secondi** (tranne se hai file molto grandi)

---

## 🚀 PUBBLICARE SU GITHUB (da fare UNA SOLA VOLTA)

### Passo 1 — Crea un account GitHub
1. Vai su **https://github.com/signup**
2. Crea un account (o accedi se già lo hai)

### Passo 2 — Crea un nuovo repository
1. Vai su **https://github.com/new**
2. Nome: **Portfolio** (o quello che preferisci)
3. Lascia "Public" selezionato ✅
4. NON selezionare "Add README" o altri file
5. Clicca "Create repository"

### Passo 3 — Collega il progetto a GitHub
Apri il Terminale e copia TUTTI questi comandi (uno alla volta):

```bash
cd ~/Desktop/Portfolio_Urban
git init
git add .
git commit -m "Portfolio completo"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/Portfolio.git
git push -u origin main
```

⚠️ **IMPORTANTE:** Sostituisci `TUO-USERNAME` con il tuo nome utente GitHub!

Se ti chiede username e password, inserisci:
- **Username:** il tuo username GitHub
- **Password:** un "Personal Access Token" (vedi sotto)

### Passo 4 — Crea un Token (se serve la password)
1. Vai su: **https://github.com/settings/tokens/new**
2. Note: "Portfolio"
3. Seleziona: ✅ `repo` (tutti)
4. Clicca "Generate token"
5. **COPIA il token** — questo è la tua "password"

### Passo 5 — Attiva GitHub Pages
1. Vai nel tuo repository su GitHub
2. Clicca **Settings** (⚙️ in alto)
3. Nel menu a sinistra clicca **Pages**
4. Sotto "Source" seleziona: **GitHub Actions**
5. Aspetta 2-3 minuti

### Passo 6 — Il tuo link pubblico! 🎉
Il sito sarà disponibile su:

```
https://TUO-USERNAME.github.io/Portfolio/
```

**Questo è il link da mettere nel CV!**

---

## 🗂️ STRUTTURA CARTELLE

```
Portfolio_Urban/
├── Documenti/          ← Metti qui i PDF dei saggi/tesi
│   ├── Final Report form_EN.pdf
│   └── Tesi_S285387_Alessio_Dallorto.pdf
├── Tavole/             ← Metti qui le tavole (PDF o immagini)
│   ├── 3_ASSETTO NORMATIVCO.pdf
│   └── ELABORATI CARTOGRAFICI ALLEGATI.pdf
├── index.html          ← La pagina web
├── index.css           ← Lo stile grafico
├── script.js           ← La logica del sito
└── generate_manifest.py ← Lo script che scansiona le cartelle
```

---

## ❓ FAQ

**D: Devo eseguire generate_manifest.py anche su GitHub?**
R: No! Il workflow GitHub Actions lo fa automaticamente ad ogni push.

**D: Posso aggiungere immagini nelle Tavole?**
R: Sì! Formati supportati: .pdf, .jpg, .jpeg, .png, .webp, .svg

**D: Perché un file ha il tasto "Scarica" invece di "Anteprima"?**
R: I file > 100 MB sono troppo grandi per l'anteprima nel browser.

**D: Come vedo il sito sul mio computer?**
R: Apri Terminale → `cd ~/Desktop/Portfolio_Urban && python3 -m http.server 8000`
   Poi apri Safari → `http://localhost:8000`

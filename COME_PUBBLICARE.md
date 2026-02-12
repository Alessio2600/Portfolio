# 🔑 Come Creare un Token GitHub con i Permessi Corretti

## Problema
Il tuo token attuale non ha il permesso `workflow`, quindi non può caricare il file `.github/workflows/deploy.yml`.

## Soluzione — Crea un Nuovo Token

### Passo 1: Vai alla pagina dei token
Apri questo link: **https://github.com/settings/tokens/new**

### Passo 2: Compila il form
1. **Note**: scrivi `Portfolio Workflow`
2. **Expiration**: scegli `90 days` (o quello che preferisci)
3. **Seleziona questi permessi** (✅):
   - ✅ **repo** (tutti i sotto-permessi)
   - ✅ **workflow**

### Passo 3: Genera il token
1. Clicca **"Generate token"** in fondo alla pagina
2. **COPIA IL TOKEN** — lo vedrai solo una volta!
   - Sarà tipo: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Passo 4: Usa il nuovo token
Ora torna al Terminale e fai il push:

```bash
cd ~/Desktop/Portfolio_Urban
git push
```

Quando ti chiede la password, **incolla il nuovo token** (non la vecchia password).

---

## Passo 5: Attiva GitHub Pages

Dopo il push riuscito:

1. Vai su: **https://github.com/Alessio2600/Portfolio**
2. Clicca **Settings** (⚙️)
3. Nel menu a sinistra clicca **Pages**
4. Sotto "Source" seleziona: **GitHub Actions**
5. Aspetta 2-3 minuti

### 🎉 Il tuo link pubblico sarà:
```
https://alessio2600.github.io/Portfolio/
```

**Questo è il link da condividere e mettere nel CV!**

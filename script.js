/**
 * Portfolio - Dynamic Content Loader v2.0
 * ========================================
 * Carica automaticamente tutti i file da manifest.json
 * e crea una card con anteprima per ciascuno.
 * 
 * Workflow:
 *   1. Aggiungi file in Tavole/ o Documenti/
 *   2. Esegui: python3 generate_manifest.py
 *   3. Il sito crea automaticamente le card!
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    loadManifest();
});

/* ===========================
   SCROLL ANIMATIONS
   =========================== */

function initScrollAnimations() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    sections.forEach(s => observer.observe(s));
}

/* ===========================
   MANIFEST LOADING
   =========================== */

async function loadManifest() {
    try {
        const response = await fetch('data/manifest.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const manifest = await response.json();
        renderDocumenti(manifest.documenti);
        renderTavole(manifest.tavole);
    } catch (error) {
        console.error('Errore caricamento manifest:', error);
        showError('pdf-grid');
        showError('img-grid');
    }
}

/* ===========================
   RENDER DOCUMENTI (Saggi)
   =========================== */

function renderDocumenti(data) {
    const container = document.getElementById('pdf-grid');

    if (!data || data.count === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>📂 Nessun documento disponibile</h3>
                <p>Aggiungi file PDF nella cartella <code>Documenti/</code></p>
            </div>`;
        return;
    }

    container.innerHTML = '';
    data.items.forEach(doc => {
        container.appendChild(createCard(doc, 'documento'));
    });
}

/* ===========================
   RENDER TAVOLE
   =========================== */

function renderTavole(data) {
    const container = document.getElementById('img-grid');

    if (!data || data.count === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>🖼️ Nessuna tavola disponibile</h3>
                <p>Aggiungi file nella cartella <code>Tavole/</code></p>
            </div>`;
        return;
    }

    container.innerHTML = '';
    data.items.forEach(item => {
        container.appendChild(createCard(item, 'tavola'));
    });
}

/* ===========================
   CARD CREATION
   =========================== */

/**
 * Crea una card per qualsiasi file (PDF o immagine)
 * Ogni file aggiunto nelle cartelle diventa una card cliccabile
 */
function createCard(item, type) {
    const card = document.createElement('div');
    card.className = 'card';

    const displayName = item.display_name || item.name.replace(/\.[^.]+$/, '');
    const sizeLabel = item.size_label || `${item.size_mb} MB`;
    const isImage = item.is_image || false;
    const isPDF = item.is_pdf !== undefined ? item.is_pdf : (item.extension === '.pdf');
    const isTooLarge = item.too_large || item.size_mb > 100;

    // Determinare il tipo di label
    const typeLabel = type === 'documento' ? 'Documento' : 'Tavola';
    const formatLabel = isImage ? 'Immagine' : 'PDF';

    if (isImage) {
        // === IMMAGINE: mostra direttamente ===
        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${item.path}" alt="${displayName}" loading="lazy" 
                     onerror="this.src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'">
            </div>
            <div class="card-body">
                <h3>${displayName}</h3>
                <p class="card-meta">${formatLabel} - ${sizeLabel}</p>
                <a href="${item.path}" class="btn" target="_blank" rel="noopener noreferrer">
                    🔍 Visualizza
                </a>
            </div>`;
    } else if (isPDF) {
        // === PDF: anteprima con modal ===
        // Escape single quotes nel path per l'onclick
        const safePath = item.path.replace(/'/g, "\\'");
        const safeName = displayName.replace(/'/g, "\\'");

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" 
                     alt="${displayName}">
                <div class="card-badge">${isTooLarge ? '⚠️ File grande' : '📄 PDF'}</div>
            </div>
            <div class="card-body">
                <h3>${displayName}</h3>
                <p class="card-meta">${typeLabel} PDF - ${sizeLabel}</p>
                ${isTooLarge
                ? `<a href="${item.path}" class="btn btn-download" download>
                           ⬇️ Scarica (${sizeLabel})
                       </a>`
                : `<button class="btn pdf-btn" onclick="openPDFPreview('${safePath}', '${safeName}')">
                           👁️ Anteprima Rapida
                       </button>`
            }
            </div>`;
    }

    return card;
}

/* ===========================
   PDF MODAL PREVIEW
   =========================== */

function openPDFPreview(pdfPath, title) {
    const modal = document.getElementById('pdf-modal');
    const embed = document.getElementById('pdf-modal-embed');
    const titleElement = document.getElementById('pdf-modal-title');

    titleElement.textContent = title;
    embed.src = pdfPath + '#toolbar=1&navpanes=0&scrollbar=1';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePDFModal() {
    const modal = document.getElementById('pdf-modal');
    const embed = document.getElementById('pdf-modal-embed');

    modal.classList.remove('active');
    embed.src = '';
    document.body.style.overflow = 'auto';
}

// Chiudi modal cliccando fuori
document.addEventListener('click', (e) => {
    if (e.target === document.getElementById('pdf-modal')) {
        closePDFModal();
    }
});

// Chiudi modal con ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePDFModal();
});

/* ===========================
   ERROR HANDLING
   =========================== */

function showError(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="empty-state">
                <h3>⚠️ Errore nel caricamento</h3>
                <p>Esegui <code>python3 generate_manifest.py</code> per generare il manifest.</p>
            </div>`;
    }
}

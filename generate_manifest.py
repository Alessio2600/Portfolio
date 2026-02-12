#!/usr/bin/env python3
"""
Portfolio - Manifest Generator (v2.0)
=====================================
Scansiona automaticamente le cartelle Tavole/ e Documenti/ e crea 
data/manifest.json con tutti i file trovati.

COME USARE:
  1. Aggiungi file nelle cartelle Tavole/ o Documenti/
  2. Esegui: python3 generate_manifest.py
  3. Fatto! Il sito mostra automaticamente i nuovi file.

FORMATI SUPPORTATI:
  - Documenti: .pdf
  - Tavole: .pdf, .jpg, .jpeg, .png, .webp, .tiff, .svg
"""

import os
import json
from datetime import datetime


SUPPORTED_TAVOLE_EXT = {'.pdf', '.jpg', '.jpeg', '.png', '.webp', '.tiff', '.svg'}
SUPPORTED_DOCUMENTI_EXT = {'.pdf'}

# File da ignorare
IGNORED_FILES = {'.DS_Store', 'Thumbs.db', '.gitkeep', 'desktop.ini'}


def format_size(size_bytes):
    """Formatta la dimensione del file in modo leggibile"""
    if size_bytes < 1024:
        return f"{size_bytes} B"
    elif size_bytes < 1024 * 1024:
        return round(size_bytes / 1024, 1)  # KB
    else:
        return round(size_bytes / (1024 * 1024), 2)  # MB


def scan_directory(directory_path, extensions):
    """Scansiona una directory e ritorna la lista dei file compatibili"""
    items = []
    
    if not os.path.exists(directory_path):
        print(f"  📁 Cartella '{directory_path}' non trovata, la creo...")
        os.makedirs(directory_path, exist_ok=True)
        return items
    
    for filename in sorted(os.listdir(directory_path)):
        # Ignora file nascosti e di sistema
        if filename.startswith('.') or filename in IGNORED_FILES:
            continue
            
        file_path = os.path.join(directory_path, filename)
        
        if not os.path.isfile(file_path):
            continue
        
        _, ext = os.path.splitext(filename)
        
        if ext.lower() not in extensions:
            print(f"  ⏭️  Ignorato: {filename} (formato {ext} non supportato)")
            continue
        
        file_size = os.path.getsize(file_path)
        size_mb = round(file_size / (1024 * 1024), 2)
        
        # Nome pulito per il display (senza estensione)
        display_name = os.path.splitext(filename)[0]
        
        items.append({
            "name": filename,
            "display_name": display_name,
            "path": f"{directory_path}/{filename}",
            "size_mb": size_mb,
            "size_label": f"{size_mb} MB" if size_mb >= 1 else f"{round(file_size / 1024, 1)} KB",
            "extension": ext.lower(),
            "is_image": ext.lower() in {'.jpg', '.jpeg', '.png', '.webp', '.svg'},
            "is_pdf": ext.lower() == '.pdf',
            "too_large": size_mb > 100  # Flag per file > 100 MB
        })
        
        status = "⚠️  GRANDE" if size_mb > 100 else "✅"
        print(f"  {status} {filename} ({size_mb} MB)")
    
    return items


def generate_manifest():
    """Genera il file manifest.json"""
    print("=" * 50)
    print("🚀 Portfolio - Generazione Manifest")
    print("=" * 50)
    
    # Scansiona Tavole
    print(f"\n📂 Scansione Tavole/...")
    tavole = scan_directory("Tavole", SUPPORTED_TAVOLE_EXT)
    
    # Scansiona Documenti
    print(f"\n📄 Scansione Documenti/...")
    documenti = scan_directory("Documenti", SUPPORTED_DOCUMENTI_EXT)
    
    # Crea manifest
    manifest = {
        "generated_at": datetime.now().isoformat(),
        "version": "2.0.0",
        "tavole": {
            "count": len(tavole),
            "items": tavole
        },
        "documenti": {
            "count": len(documenti),
            "items": documenti
        }
    }
    
    # Crea directory data/ se non esiste
    os.makedirs("data", exist_ok=True)
    
    # Scrivi manifest
    manifest_path = "data/manifest.json"
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    
    # Report finale
    print(f"\n{'=' * 50}")
    print(f"✅ MANIFEST GENERATO CON SUCCESSO!")
    print(f"{'=' * 50}")
    print(f"   📂 Tavole:     {len(tavole)} file")
    print(f"   📄 Documenti:  {len(documenti)} file")
    print(f"   💾 Salvato in: {manifest_path}")
    
    # Avviso per file grandi
    large_files = [i for i in tavole + documenti if i.get('too_large')]
    if large_files:
        print(f"\n   ⚠️  ATTENZIONE: {len(large_files)} file > 100 MB:")
        for f_item in large_files:
            print(f"      - {f_item['name']} ({f_item['size_mb']} MB)")
        print(f"      Consiglio: comprimi questi file per migliore performance!")
    
    print(f"\n   👉 Ora fai: git add . && git commit -m 'aggiornamento' && git push")
    print()
    
    return manifest


if __name__ == "__main__":
    generate_manifest()

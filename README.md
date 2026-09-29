# 🌟 Luxury - Sito Web Statico Minimalista

Un sito web elegante e moderno costruito con **HTML puro** e **CSS**, senza framework. Design minimalista con tema bianco/nero/oro.

## 📁 Struttura del Progetto

```
luxury/
├── index.html              # Home page con griglia di immagini
├── gallery.html            # Galleria filtabile per categoria
├── contatti.html           # Pagina contatti con form
├── css/
│   └── style.css          # Foglio di stile principale
├── js/
│   └── main.js            # Script JavaScript per interattività
├── .nojekyll              # File per GitHub Pages
└── README.md              # Questo file
```

## 🎨 Design Features

### Tema Minimalista
- **Colori Primari**: Nero (#1a1a1a) e Oro (#d4af37)
- **Font**: Segoe UI, sans-serif (elegante e moderno)
- **Layout**: Grid responsive e fluido

### Pagine

#### 1. **Home (index.html)**
- Hero section con messaggio di benvenuto
- Griglia di immagini in evidenza (4 elementi)
- Sezione "Chi Siamo" con 3 feature cards
- CTA per la galleria completa

#### 2. **Gallery (gallery.html)**
- Griglia di 12 elementi filtrabili
- 5 categorie: Tutto, Fashion, Design, Lifestyle, Premium
- Filtri interattivi con JavaScript
- Effetto hover elegante

#### 3. **Contatti (contatti.html)**
- Informazioni di contatto (indirizzo, telefono, email, orari)
- Form di contatto funzionante (validazione client-side)
- Link ai social media
- Placeholder per mappa

## ✨ Funzionalità

### JavaScript
- ✅ **Filtri Galleria**: Filtra per categoria in tempo reale
- ✅ **Form Validazione**: Valida il modulo contatti
- ✅ **Smooth Scroll**: Scorrimento fluido ai link interni
- ✅ **Animazioni Scroll**: Fade-in al caricamento
- ✅ **Link Attivi**: Evidenzia la pagina corrente nel menu

### CSS
- ✅ **Responsive Design**: Perfetto su mobile, tablet, desktop
- ✅ **Effetti Hover**: Animazioni eleganti
- ✅ **Transizioni Fluide**: Tutti gli elementi hanno transizioni
- ✅ **Dark Mode**: Sezioni scure alternate
- ✅ **Accessibilità**: Colori contrastati e font leggibile

## 🚀 Come Usare

### Localmente
1. Clona il repository:
```bash
git clone https://github.com/bakd99202-max/luxury.git
cd luxury
```

2. Apri nel browser:
```bash
# Su macOS
open index.html

# Su Windows
start index.html

# O semplicemente trascina il file nel browser
```

### GitHub Pages
Il sito è automaticamente ospitato su:
```
https://bakd99202-max.github.io/luxury/
```

### Configurazione Pages
1. Vai a **Settings** > **Pages**
2. Seleziona **Deploy from a branch**
3. Branch: `main` | Cartella: `/ (root)`
4. Il sito sarà online in pochi secondi!

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+ (3-4 colonne)
- **Tablet**: 768px - 1024px (2 colonne)
- **Mobile**: < 768px (1 colonna)

## 🎯 Personalizzazione

### Cambiare i Colori
Modifica `:root` in `css/style.css`:
```css
:root {
    --primary-dark: #1a1a1a;        /* Nero */
    --accent-gold: #d4af37;          /* Oro */
    --primary-light: #ffffff;        /* Bianco */
}
```

### Aggiungere Immagini Reali
Sostituisci i placeholder:
```html
<!-- Da: -->
<div class="image-placeholder">
    <div class="placeholder-text">Immagine</div>
</div>

<!-- A: -->
<img src="percorso/immagine.jpg" alt="Descrizione">
```

### Aggiungere Categorie Galleria
1. Aggiungi un bottone filtro in `gallery.html`:
```html
<button class="filter-btn" data-filter="nuova-categoria">Nuova</button>
```

2. Aggiungi elementi con la categoria:
```html
<div class="gallery-item-large" data-category="nuova-categoria">
    ...
</div>
```

### Configurare Email Contatti
In `contatti.html`, modifica i link:
```html
<!-- Email -->
<a href="mailto:tuaemail@dominio.it">tuaemail@dominio.it</a>

<!-- Telefono -->
<a href="tel:+39123456789">+39 123 456 789</a>
```

## 📧 Form Contatti

Attualmente il form **valida i dati client-side** e mostra un messaggio. Per funzionalità completa:

### Opzione 1: Formspree (Facile)
1. Vai su [formspree.io](https://formspree.io)
2. Crea un account e un nuovo form
3. Copia l'endpoint e aggiorna l'`action` del form:
```html
<form class="contact-form" action="https://formspree.io/f/TUO_ID" method="POST">
```

### Opzione 2: Backend Node.js (Avanzato)
Crea un server per processare i dati del form.

## 🌐 SEO & Meta Tags

Personalizza i meta tag in ogni HTML:
```html
<title>Luxury - Descrizione</title>
<meta name="description" content="La tua descrizione qui">
<meta name="keywords" content="luxury, eleganza, design">
```

## 📊 Performance

- ✅ **HTML Puro**: Caricamento ultra-veloce
- ✅ **CSS Minimalista**: Nessun framework pesante
- ✅ **JavaScript Leggero**: ~5KB
- ✅ **Zero Dipendenze**: Niente librerie esterne

## 🔒 Sicurezza

- ✅ File `.nojekyll` per evitare processi Jekyll
- ✅ Validazione form client-side
- ✅ Nessun dato sensibile nel codice

## 🚀 Deploy Alternativi

### Netlify
1. Connetti il repo GitHub
2. Build command: (lasciare vuoto)
3. Publish directory: `/` (root)
4. Deploy!

### Vercel
1. Importa il progetto
2. Framework: Other (static)
3. Deploy!

### Hosting Tradizionale
Carica i file via FTP/SFTP al tuo hosting.

## 📝 Licenza

Questo progetto è libero da usare e modificare per qualsiasi scopo.

## 📞 Contatti

Personalizza i contatti in `contatti.html` con i tuoi dati reali!

---

**Fatto con ❤️ usando HTML, CSS e JavaScript puro**

✨ **Luxury - Minimalista, Elegante, Veloce** ✨
// ============================================
// FILTRO GALLERIA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-large');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Aggiorna il bottone attivo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filtra gli elementi della galleria
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
});

// ============================================
// FORM CONTATTI
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const formMessage = document.getElementById('formMessage');

        // Validazione di base
        if (!name || !email || !subject || !message) {
            formMessage.textContent = 'Per favore, compila tutti i campi.';
            formMessage.className = 'form-message error';
            return;
        }

        // Validazione email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Per favore, inserisci un indirizzo email valido.';
            formMessage.className = 'form-message error';
            return;
        }

        // Simulazione invio (in produzione, faresti una richiesta al server)
        formMessage.textContent = `Grazie ${name}! Il tuo messaggio è stato ricevuto. Ti contatteremo a breve a ${email}`;
        formMessage.className = 'form-message success';

        // Reset del form
        this.reset();

        // Rimuove il messaggio dopo 5 secondi
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ANIMAZIONE AL SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Applica osservatore agli elementi della galleria
document.querySelectorAll('.gallery-item, .gallery-item-large, .feature').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
});

// ============================================
// HIGHLIGHT LINK ATTIVO
// ============================================

function updateActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if ((currentPage === '' && href === 'index.html') || 
            (currentPage === href)) {
            link.classList.add('active');
        }
    });
}

// Esegui al caricamento
updateActiveLink();

// Console log per debug
console.log('✨ Luxury - Sito caricato con successo!');
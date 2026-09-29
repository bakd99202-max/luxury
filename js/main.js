// ============================================
// CONFIGURAZIONE SUPABASE
// ============================================

const supabaseConfig = window.LUXURY_SUPABASE || {
    url: 'https://YOUR_PROJECT_REF.supabase.co',
    anonKey: 'YOUR_ANON_KEY'
};

const isSupabaseConfigured = supabaseConfig.url &&
    supabaseConfig.url !== 'https://YOUR_PROJECT_REF.supabase.co' &&
    supabaseConfig.anonKey &&
    supabaseConfig.anonKey !== 'YOUR_ANON_KEY';

let supabase = null;

if (window.supabase && isSupabaseConfigured) {
    supabase = window.supabase.createClient(supabaseConfig.url, supabaseConfig.anonKey);
}

// ============================================
// DATI DI ESEMPIO / FALLBACK
// ============================================

const fallbackProducts = [
    {
        title: 'Collezione Fashion 2026',
        category: 'fashion',
        description: 'Eleganza contemporanea',
        image_url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: 'Design Premium',
        category: 'design',
        description: 'Interni raffinati',
        image_url: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: 'Lifestyle Exclusive',
        category: 'lifestyle',
        description: 'Vita da lusso',
        image_url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: 'Premium Collection',
        category: 'premium',
        description: 'Esclusiva limitata',
        image_url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80'
    }
];

// ============================================
// UTILITIES
// ============================================

function formatCategory(category) {
    const labels = {
        fashion: 'Fashion',
        design: 'Design',
        lifestyle: 'Lifestyle',
        premium: 'Premium'
    };
    return labels[category] || category;
}

function buildProductCard(product, isFeatured = false) {
    const item = document.createElement('article');
    item.className = isFeatured ? 'gallery-item' : 'gallery-item-large';
    item.setAttribute('data-category', product.category || 'fashion');

    const img = document.createElement('img');
    img.src = product.image_url || 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80';
    img.alt = product.title || 'Luxury product';
    img.loading = 'lazy';

    const content = document.createElement('div');
    content.className = isFeatured ? '' : 'item-info';

    const title = document.createElement(isFeatured ? 'h3' : 'h3');
    title.textContent = product.title || 'Luxury collection';

    if (!isFeatured) {
        const tag = document.createElement('p');
        tag.className = 'category-tag';
        tag.textContent = formatCategory(product.category);
        content.appendChild(title);
        content.appendChild(tag);
    } else {
        content.appendChild(title);
    }

    item.appendChild(img);
    item.appendChild(content);
    return item;
}

async function fetchProducts() {
    if (!supabase) {
        return fallbackProducts;
    }

    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.warn('Supabase query error:', error.message);
            return fallbackProducts;
        }

        return data && data.length ? data : fallbackProducts;
    } catch (error) {
        console.warn('Supabase unavailable:', error.message);
        return fallbackProducts;
    }
}

async function renderFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    const products = await fetchProducts();
    container.innerHTML = '';

    products.slice(0, 4).forEach(product => {
        const card = buildProductCard(product, true);
        container.appendChild(card);
    });
}

async function renderGalleryProducts() {
    const container = document.getElementById('galleryProducts');
    if (!container) return;

    const products = await fetchProducts();
    container.innerHTML = '';

    products.forEach(product => {
        const card = buildProductCard(product, false);
        card.setAttribute('data-category', product.category || 'fashion');
        container.appendChild(card);
    });

    initGalleryFilters();
}

function initGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-large');

    if (!filterButtons.length || !galleryItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    itemCategory === filterValue ? item.classList.remove('hidden') : item.classList.add('hidden');
                }
            });
        });
    });
}

// ============================================
// LOGIN ADMIN
// ============================================

async function handleLogin(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.getElementById('loginStatus');

    if (!supabase || !isSupabaseConfigured) {
        status.textContent = 'Configura prima Supabase nel file index.html / admin.html.';
        status.className = 'status-message error';
        status.style.display = 'block';
        return;
    }

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            throw error;
        }

        status.textContent = 'Accesso effettuato!';
        status.className = 'status-message success';
        status.style.display = 'block';
        form.reset();
    } catch (error) {
        status.textContent = error.message || 'Errore durante l\'accesso.';
        status.className = 'status-message error';
        status.style.display = 'block';
    }
}

// ============================================
// INSERIMENTO PRODOTTO
// ============================================

async function handleProductSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const status = document.getElementById('statusMessage');

    if (!supabase || !isSupabaseConfigured) {
        status.textContent = 'Configura Supabase prima di salvare i prodotti.';
        status.className = 'status-message error';
        status.style.display = 'block';
        return;
    }

    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('category').value;
    const image = document.getElementById('image').value.trim();
    const description = document.getElementById('description').value.trim();

    if (!title || !category || !image) {
        status.textContent = 'Completa titolo, categoria e URL immagine.';
        status.className = 'status-message error';
        status.style.display = 'block';
        return;
    }

    try {
        const { data: userData, error: userError } = await supabase.auth.getUser();

        if (userError || !userData?.user) {
            throw new Error('Devi aver effettuato l\'accesso admin prima di inserire un prodotto.');
        }

        const { data, error } = await supabase
            .from('products')
            .insert([{
                title,
                category,
                description,
                image_url: image,
                created_at: new Date().toISOString()
            }])
            .select();

        if (error) throw error;

        status.textContent = 'Prodotto salvato correttamente.';
        status.className = 'status-message success';
        status.style.display = 'block';
        form.reset();

        renderFeaturedProducts();
        renderGalleryProducts();
    } catch (error) {
        status.textContent = error.message || 'Errore durante il salvataggio.';
        status.className = 'status-message error';
        status.style.display = 'block';
    }
}

// ============================================
// INIZIALIZZAZIONE
// ============================================

document.addEventListener('DOMContentLoaded', function () {
    renderFeaturedProducts();
    renderGalleryProducts();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', handleProductSubmit);
    }

    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length) {
        initGalleryFilters();
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    function updateActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if ((currentPage === '' && href === 'index.html') || currentPage === href) {
                link.classList.add('active');
            }
        });
    }

    updateActiveLink();
});

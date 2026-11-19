 /* ==========================================================================
   LENOVO THEME INTERACTIVE SCRIPT (script.js)
   Features:
   - Product catalog database & dynamic rendering
   - Tab filtering (ThinkPad, Legion, Yoga, IdeaPad)
   - Live search overlay & product filter
   - Interactive Quick View Specs Modal
   - Smart AI Laptop Finder Quiz
   - Toast notification system & Cart counter
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Product Database
    const products = [
        {
            id: 1,
            series: 'thinkpad',
            badge: 'Flagship AI PC',
            title: 'ThinkPad X1 Carbon Gen 13',
            tagline: 'Standar emas komputasi bisnis eksekutif & developer',
            specs: ['Intel® Core™ Ultra 9 288V', '32GB LPDDR5X', '1TB PCIe Gen4 SSD', '14" 2.8K OLED 120Hz', 'ThinkShield Security'],
            price: 'Rp 34.999.000',
            weight: '0.98 kg',
            battery: 'Hingga 19 Jam',
            ports: '2x TB4, 2x USB-A, HDMI 2.1, Audio Jack',
            colorTag: 'flag-thinkpad',
            categoryName: 'Business & Enterprise',
            icon: 'fa-briefcase',
            image: 'images/thinkpad-x1-carbon-gen13.png'
        },
        {
            id: 2,
            series: 'legion',
            badge: 'Top Performance',
            title: 'Legion Pro 7i Gen 9 AI',
            tagline: 'Monster gaming tanpa kompromi dengan Coldfront Hyper',
            specs: ['Intel® Core™ i9-14900HX', 'RTX™ 4090 16GB (175W)', '32GB DDR5 5600MHz', '16" WQXGA 240Hz 500 nits', 'Lenovo LA-2 AI Chip'],
            price: 'Rp 48.999.000',
            weight: '2.62 kg',
            battery: '99.9Whr Super Rapid Charge',
            ports: 'TB4, USB-C 3.2 Gen 2, 4x USB-A, HDMI 2.1, RJ45',
            colorTag: 'flag-legion',
            categoryName: 'Esport & Hardcore Gaming',
            icon: 'fa-gamepad',
            image: 'images/legion-pro-7i.png'
        },
        {
            id: 3,
            series: 'yoga',
            badge: 'Dual Screen Tech',
            title: 'Yoga Book 9i Dual OLED',
            tagline: 'Laptop dua layar lipat revolusioner untuk multitasker modern',
            specs: ['Intel® Core™ Ultra 7 155H', '16GB LPDDR5X', '1TB NVMe SSD', '2x 13.3" 2.8K PureSight OLED', 'Bowers & Wilkins Soundbar'],
            price: 'Rp 31.499.000',
            weight: '1.34 kg',
            battery: '80Whr Dual-Screen Optimized',
            ports: '3x Thunderbolt 4 Type-C (PD 3.0, DP 1.4)',
            colorTag: 'flag-yoga',
            categoryName: 'Creative & Convertible',
            icon: 'fa-wand-magic-sparkles',
            image: 'images/yoga-book-9i.png'
        },
        {
            id: 4,
            series: 'thinkpad',
            badge: 'Enterprise Workhorse',
            title: 'ThinkPad T14s Gen 5',
            tagline: 'Ketahanan militer MIL-STD-810H dengan performa efisien',
            specs: ['Snapdragon® X Elite / AMD AI', '16GB / 32GB RAM', '512GB SSD PCIe 4.0', '14" WUXGA Low Power 400 nits', '5G Sub-6 Optional'],
            price: 'Rp 22.899.000',
            weight: '1.24 kg',
            battery: 'Hingga 24 Jam Baterai',
            ports: '2x USB-C USB4, 2x USB-A 3.2, HDMI 2.1, Audio',
            colorTag: 'flag-thinkpad',
            categoryName: 'Business Mobility',
            icon: 'fa-shield-halved',
            image: 'images/thinkpad-t14s-gen5.png'
        },
        {
            id: 5,
            series: 'legion',
            badge: 'Slim & Powerful',
            title: 'Legion Slim 5 16" Gen 9',
            tagline: 'Keseimbangan sempurna antara portabilitas dan grafis RTX',
            specs: ['AMD Ryzen™ 7 8845HS AI', 'RTX™ 4060 8GB GDDR6', '16GB DDR5 Dual Channel', '16" WQXGA 165Hz 100% sRGB', 'Legion TrueStrike Keyboard'],
            price: 'Rp 21.999.000',
            weight: '2.30 kg',
            battery: '80Whr Rapid Charge Pro',
            ports: '2x USB-C, 2x USB-A, HDMI 2.1, Card Reader',
            colorTag: 'flag-legion',
            categoryName: 'Gaming & High Computing',
            icon: 'fa-fire',
            image: 'images/legion-slim-5.png'
        },
        {
            id: 6,
            series: 'ideapad',
            badge: 'Smart Value',
            title: 'IdeaPad Pro 5i Gen 9',
            tagline: 'Kreativitas serba bisa dengan layar 120Hz dan grafis mumpuni',
            specs: ['Intel® Core™ Ultra 5 125H', 'RTX™ 3050 6GB GDDR6', '16GB LPDDR5X', '14" 2.8K OLED 120Hz', 'Lenovo Smart Power'],
            price: 'Rp 16.499.000',
            weight: '1.46 kg',
            battery: '84Whr Long-lasting battery',
            ports: 'Thunderbolt 4, USB-C, 2x USB-A, SD Card',
            colorTag: 'flag-ideapad',
            categoryName: 'Everyday Versatility',
            icon: 'fa-laptop',
            image: 'images/ideapad-pro-5i.png'
        }
    ];

    // Ilustrasi produk (SVG inline, bisa diganti path foto asli lewat field `image`)
    function productImage(c1, c2, dual) {
        const screen = dual
            ? `<rect x="70" y="30" width="260" height="92" rx="8" fill="#0d0f14" stroke="#4b5160" stroke-width="3"/><rect x="78" y="37" width="244" height="78" rx="4" fill="url(#g)"/>
               <rect x="70" y="126" width="260" height="92" rx="8" fill="#0d0f14" stroke="#4b5160" stroke-width="3"/><rect x="78" y="133" width="244" height="78" rx="4" fill="url(#g)" opacity=".8"/>`
            : `<rect x="70" y="40" width="260" height="164" rx="12" fill="#0d0f14" stroke="#4b5160" stroke-width="3"/><rect x="80" y="50" width="240" height="144" rx="6" fill="url(#g)"/>
               <circle cx="270" cy="95" r="38" fill="#fff" opacity=".12"/><rect x="100" y="150" width="90" height="8" rx="4" fill="#fff" opacity=".85"/><rect x="100" y="166" width="60" height="6" rx="3" fill="#fff" opacity=".5"/>
               <path d="M40 214h320l-18 28a10 10 0 0 1-8 4H66a10 10 0 0 1-8-4z" fill="url(#b)" stroke="#4b5160" stroke-width="2"/><rect x="170" y="218" width="60" height="6" rx="3" fill="#0d0f14" opacity=".6"/>`;
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3f4b"/><stop offset="1" stop-color="#1b1e26"/></linearGradient></defs><ellipse cx="200" cy="268" rx="150" ry="14" fill="${c1}" opacity=".25"/>${screen}</svg>`;
        return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
    }

    // Recommendation Profiles Data
    const finderRecommendations = {
        coder: {
            title: 'ThinkPad X1 Carbon Gen 13 Aura Edition',
            badge: 'Rekomendasi Software Dev & Professional',
            desc: 'Keyboard legendaris dengan key travel presisi, sertifikasi Linux & Windows Pro teruji, dan ketahanan bodi carbon fiber yang tangguh.',
            specs: ['Intel® Core™ Ultra 9 AI', '32GB RAM LPDDR5X', '1TB NVMe PCIe 4.0', '14" 2.8K OLED 120Hz', 'TrackPoint Navigation'],
            image: 'images/thinkpad-x1-carbon-gen13.png',
            price: 'Rp 34.999.000',
            id: 1
        },
        gamer: {
            title: 'Legion Pro 7i Gen 9 AI (RTX 4090)',
            badge: 'Rekomendasi Esport Champion',
            desc: 'Kombinasi prosesor kelas atas dan sistem pendingin Legion Coldfront Hyper Chamber untuk framerate tertinggi di game AAA kompetitif.',
            specs: ['Intel® Core™ i9-14900HX', 'NVIDIA GeForce RTX 4090', '32GB DDR5 5600MHz', '16" 240Hz 500 nits PureSight', 'Lenovo LA-2 AI Chip'],
            image: 'images/legion-pro-7i.png',
            price: 'Rp 48.999.000',
            id: 2
        },
        creator: {
            title: 'Yoga Book 9i Dual OLED',
            badge: 'Rekomendasi Konten Kreator & Designer',
            desc: 'Revolusi dua layar penuh 2.8K OLED dengan akurasi 100% DCI-P3 dan Lenovo Digital Pen 3 untuk alur kerja multitasking tanpa batas.',
            specs: ['Dual 13.3" 2.8K OLED', 'Intel® Core™ Ultra 7 AI', 'Bowers & Wilkins Rotating Soundbar', 'Folio Stand & BT Keyboard', '16GB RAM + 1TB SSD'],
            image: 'images/yoga-book-9i.png',
            price: 'Rp 31.499.000',
            id: 3
        },
        student: {
            title: 'IdeaPad Pro 5i Gen 9 AI',
            badge: 'Rekomendasi Mahasiswa & Produktivitas Harian',
            desc: 'Bobot sangat ringan dengan visual OLED kelas atas, performa AI efisien untuk tugas kuliah, editing video, dan gaming kasual.',
            specs: ['Intel® Core™ Ultra 5 AI', 'Layar 14" 2.8K 120Hz OLED', '16GB RAM LPDDR5X', 'Baterai 84Whr Tahan Seharian', 'Bobot hanya 1.46kg'],
            image: 'images/ideapad-pro-5i.png',
            price: 'Rp 16.499.000',
            id: 6
        }
    };

    // Render Product Cards
    const productGrid = document.getElementById('product-grid');

    function renderProducts(items) {
        if (!productGrid) return;
        productGrid.innerHTML = '';

        if (items.length === 0) {
            productGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <i class="fa-solid fa-laptop-code" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 16px;"></i>
                    <h3 style="color: #fff; margin-bottom: 8px;">Tidak Ada Produk yang Cocok</h3>
                    <p style="color: var(--text-secondary);">Silakan coba kata kunci lain atau pilih kategori yang berbeda.</p>
                </div>
            `;
            return;
        }

        items.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-badge-flag ${product.colorTag}">${product.badge}</div>
                <div class="product-visual">
                    <div class="laptop-illustration">
                        <i class="fa-solid ${product.icon} laptop-screen-glow"></i>
                    </div>
                    ${product.image ? `<img class="product-photo" src="${product.image}" alt="${product.title}" loading="lazy">` : ''}
                </div>
                <div class="product-details">
                    <span class="product-category-tag">${product.categoryName}</span>
                    <h3 class="product-title">${product.title}</h3>
                    <p class="product-summary">${product.tagline}</p>
                    
                    <div class="product-spec-pills">
                        ${product.specs.slice(0, 3).map(s => `<span class="spec-pill"><i class="fa-solid fa-check"></i> ${s}</span>`).join('')}
                    </div>

                    <div class="product-card-footer">
                        <div class="product-price-box">
                            <span class="product-price-label">Mulai Dari</span>
                            <span class="product-price">${product.price}</span>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-sm btn-outline quick-view-btn" data-id="${product.id}" title="Lihat detail">
                                Detail
                            </button>
                            <button class="btn btn-sm btn-primary add-cart-btn" data-id="${product.id}" title="Tambah ke keranjang">
                                <i class="fa-solid fa-cart-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });

        attachCardEvents();
    }

    // Initial render
    renderProducts(products);

    // Filter Tabs Functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.getAttribute('data-category');
            if (category === 'all') {
                renderProducts(products);
            } else {
                const filtered = products.filter(p => p.series === category);
                renderProducts(filtered);
            }
        });
    });

    // Dropdown Nav filter links
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const series = item.getAttribute('data-filter');
            if (series) {
                // activate matching tab
                const targetTab = document.querySelector(`.filter-tab[data-category="${series}"]`);
                if (targetTab) {
                    filterTabs.forEach(t => t.classList.remove('active'));
                    targetTab.classList.add('active');
                    const filtered = products.filter(p => p.series === series);
                    renderProducts(filtered);
                }
            }
        });
    });

    // Search Trigger & Overlay
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchOverlay && closeSearch) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.toggle('active');
            if (searchOverlay.classList.contains('active')) {
                searchInput.focus();
            }
        });

        closeSearch.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            renderProducts(products);
        });

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const filtered = products.filter(p => 
                p.title.toLowerCase().includes(query) ||
                p.tagline.toLowerCase().includes(query) ||
                p.specs.some(s => s.toLowerCase().includes(query)) ||
                p.series.toLowerCase().includes(query)
            );
            renderProducts(filtered);
        });
    }

    // Smart Laptop Recommender (Quiz)
    const choiceCards = document.querySelectorAll('.choice-card');
    const recResultContainer = document.getElementById('recommendation-result');

    function updateRecommendation(profileKey) {
        const item = finderRecommendations[profileKey] || finderRecommendations.coder;
        recResultContainer.innerHTML = `
            <div class="rec-image-col">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
            </div>
            <div class="rec-info-col">
                <span class="badge-pill" style="margin-bottom: 8px; display: inline-block;">${item.badge}</span>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
                <div class="rec-specs">
                    ${item.specs.map(s => `<span class="spec-pill"><i class="fa-solid fa-microchip"></i> ${s}</span>`).join('')}
                </div>
            </div>
            <div class="rec-action-col">
                <span class="product-price-label">Harga Resmi</span>
                <span class="rec-price">${(products.find(p => p.id === item.id) || item).price}</span>
                <button class="btn btn-primary btn-sm quick-view-btn" data-id="${item.id}" style="width: 100%;">
                    Lihat Spesifikasi Lengkap
                </button>
            </div>
        `;

        // Attach event listener for the dynamically rendered modal trigger
        const modalBtn = recResultContainer.querySelector('.quick-view-btn');
        if (modalBtn) {
            modalBtn.addEventListener('click', () => openModal(item.id));
        }
    }

    choiceCards.forEach(card => {
        card.addEventListener('click', () => {
            choiceCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            const profile = card.getAttribute('data-profile');
            updateRecommendation(profile);
        });
    });

    // Render initial recommendation (Coder by default)
    updateRecommendation('coder');

    // Quick View Modal System
    const modalBackdrop = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');

    function openModal(productId) {
        const product = products.find(p => p.id === parseInt(productId)) || products[0];
        if (!modalBackdrop || !modalContent) return;

        modalContent.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <div class="lenovo-mini-tag">LENOVO ORIGINAL</div>
                <span class="product-badge-flag ${product.colorTag}" style="position: static;">${product.series.toUpperCase()}</span>
            </div>
            <h2 style="font-size: 1.6rem; color: #fff; margin-bottom: 8px; font-family: var(--font-heading);">${product.title}</h2>
            <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 24px;">${product.tagline}</p>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; background: var(--bg-subtle); padding: 18px; border-radius: 8px; margin-bottom: 24px;">
                <div>
                    <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Bobot & Portabilitas</span>
                    <strong style="font-size: 0.9rem; color: #fff;">${product.weight}</strong>
                </div>
                <div>
                    <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Daya Tahan Baterai</span>
                    <strong style="font-size: 0.9rem; color: #fff;">${product.battery}</strong>
                </div>
                <div style="grid-column: 1/-1;">
                    <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Konektivitas & Port</span>
                    <strong style="font-size: 0.85rem; color: #fff;">${product.ports}</strong>
                </div>
            </div>

            <h4 style="font-size: 0.9rem; color: #fff; margin-bottom: 10px; text-transform: uppercase;">Konfigurasi Unggulan:</h4>
            <ul style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 28px;">
                ${product.specs.map(spec => `
                    <li style="display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: var(--text-secondary);">
                        <i class="fa-solid fa-circle-check" style="color: var(--lenovo-red);"></i> ${spec}
                    </li>
                `).join('')}
            </ul>

            <div style="display: flex; align-items: center; justify-content: space-between; gap: 20px; border-top: 1px solid var(--border-color); padding-top: 20px;">
                <div>
                    <span style="font-size: 0.75rem; color: var(--text-muted); display: block;">Harga Termasuk PPN 11%</span>
                    <span style="font-family: var(--font-heading); font-size: 1.4rem; font-weight: 700; color: #fff;">${product.price}</span>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-primary add-cart-btn" data-id="${product.id}">
                        <i class="fa-solid fa-cart-shopping"></i> Tambah Keranjang
                    </button>
                </div>
            </div>
        `;

        modalBackdrop.classList.add('active');

        // attach add-cart handler inside modal
        const innerCartBtn = modalContent.querySelector('.add-cart-btn');
        if (innerCartBtn) {
            innerCartBtn.onclick = () => {
                addToCart(getItemFromButton(innerCartBtn));
                modalBackdrop.classList.remove('active');
            };
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modalBackdrop.classList.remove('active');
        });
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', (e) => {
            if (e.target === modalBackdrop) {
                modalBackdrop.classList.remove('active');
            }
        });
    }

    // Attach card click handlers for buttons
    // ---------- Keranjang Belanja (tersimpan di localStorage, dipakai semua halaman) ----------
    const CART_KEY = 'lenovo-cart-v1';
    const cartCountEl = document.querySelector('.cart-count');
    let cart = loadCart();

    function loadCart() {
        try {
            const data = JSON.parse(localStorage.getItem(CART_KEY));
            return Array.isArray(data) ? data : [];
        } catch (e) { return []; }
    }
    function saveCart() {
        try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) { /* abaikan */ }
    }
    function parseRupiah(text) {
        return parseInt(String(text || '').replace(/[^0-9]/g, ''), 10) || 0;
    }
    function formatRupiah(n) {
        return 'Rp ' + n.toLocaleString('id-ID');
    }
    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    }
    function cartTotalQty() { return cart.reduce((sum, i) => sum + i.qty, 0); }
    function cartTotalPrice() { return cart.reduce((sum, i) => sum + i.price * i.qty, 0); }

    // Ambil data produk dari tombol "tambah ke keranjang" (laptop atau aksesoris)
    function getItemFromButton(btn) {
        const idAttr = btn.getAttribute('data-id');
        if (idAttr) {
            const p = products.find(x => x.id === parseInt(idAttr));
            if (p) return { id: 'p-' + p.id, name: p.title, price: parseRupiah(p.price), icon: p.icon };
        }
        const name = btn.getAttribute('data-name') || 'Produk Lenovo';
        const card = btn.closest('.eco-card');
        const priceEl = card ? card.querySelector('.eco-price') : null;
        const price = btn.getAttribute('data-price') ? parseRupiah(btn.getAttribute('data-price')) : parseRupiah(priceEl && priceEl.textContent);
        return { id: 'a-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), name, price, icon: 'fa-plug' };
    }

    function attachCardEvents() {
        // Quick view buttons
        document.querySelectorAll('.quick-view-btn').forEach(btn => {
            btn.onclick = () => {
                const id = btn.getAttribute('data-id');
                openModal(id);
            };
        });

        // Add to cart buttons
        document.querySelectorAll('.add-cart-btn').forEach(btn => {
            btn.onclick = () => {
                addToCart(getItemFromButton(btn));
            };
        });
    }

    // Pasang handler untuk tombol yang sudah ada di HTML (mis. halaman Aksesoris)
    attachCardEvents();

    // Cart and Toast Functionality
    function addToCart(item) {
        const existing = cart.find(i => i.id === item.id);
        if (existing) { existing.qty++; } else { cart.push({ ...item, qty: 1 }); }
        saveCart();
        renderCart();
        bumpBadge();
        showToast(`Berhasil menambahkan <strong>${escapeHtml(item.name)}</strong> ke keranjang belanja.`);
    }

    function changeQty(id, delta) {
        const item = cart.find(i => i.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
        saveCart();
        renderCart();
    }

    function removeItem(id) {
        cart = cart.filter(i => i.id !== id);
        saveCart();
        renderCart();
    }

    function bumpBadge() {
        if (!cartCountEl) return;
        cartCountEl.classList.remove('bump');
        void cartCountEl.offsetWidth;
        cartCountEl.classList.add('bump');
    }

    // Drawer keranjang (dibuat lewat JS agar otomatis ada di semua halaman)
    const cartDrawer = document.createElement('div');
    cartDrawer.className = 'cart-drawer-backdrop';
    cartDrawer.id = 'cart-drawer';
    cartDrawer.innerHTML = `
        <aside class="cart-drawer" role="dialog" aria-label="Keranjang belanja">
            <div class="cart-drawer-header">
                <h3><i class="fa-solid fa-bag-shopping"></i> Keranjang Belanja</h3>
                <button class="cart-drawer-close" id="cart-drawer-close" aria-label="Tutup keranjang"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="cart-drawer-body" id="cart-items"></div>
            <div class="cart-drawer-footer" id="cart-footer"></div>
        </aside>`;
    document.body.appendChild(cartDrawer);

    const cartItemsEl = cartDrawer.querySelector('#cart-items');
    const cartFooterEl = cartDrawer.querySelector('#cart-footer');

    function openCart() { cartDrawer.classList.add('active'); }
    function closeCart() { cartDrawer.classList.remove('active'); }

    function renderCart() {
        if (cartCountEl) cartCountEl.textContent = cartTotalQty();

        if (cart.length === 0) {
            cartItemsEl.innerHTML = `
                <div class="cart-empty">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p>Keranjang Anda masih kosong.</p>
                    <span>Tambahkan laptop atau aksesoris favorit Anda.</span>
                </div>`;
            cartFooterEl.innerHTML = '';
            return;
        }

        cartItemsEl.innerHTML = cart.map(i => `
            <div class="cart-item" data-id="${i.id}">
                <div class="cart-item-icon"><i class="fa-solid ${i.icon || 'fa-box'}"></i></div>
                <div class="cart-item-info">
                    <strong>${escapeHtml(i.name)}</strong>
                    <span>${formatRupiah(i.price)}</span>
                    <div class="cart-qty">
                        <button data-action="dec" aria-label="Kurangi jumlah"><i class="fa-solid fa-minus"></i></button>
                        <b>${i.qty}</b>
                        <button data-action="inc" aria-label="Tambah jumlah"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <div class="cart-item-side">
                    <span class="cart-item-subtotal">${formatRupiah(i.price * i.qty)}</span>
                    <button class="cart-item-remove" data-action="remove" aria-label="Hapus ${escapeHtml(i.name)}"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </div>`).join('');

        cartFooterEl.innerHTML = `
            <div class="cart-total"><span>Total (${cartTotalQty()} produk)</span><strong>${formatRupiah(cartTotalPrice())}</strong></div>
            <button class="btn btn-primary" style="width:100%" id="cart-checkout">Lanjut ke Pembayaran</button>
            <button class="cart-clear" id="cart-clear">Kosongkan keranjang</button>`;
    }

    cartItemsEl.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const id = btn.closest('.cart-item').getAttribute('data-id');
        const action = btn.getAttribute('data-action');
        if (action === 'inc') changeQty(id, 1);
        else if (action === 'dec') changeQty(id, -1);
        else if (action === 'remove') removeItem(id);
    });

    cartFooterEl.addEventListener('click', (e) => {
        if (e.target.closest('#cart-clear')) {
            cart = [];
            saveCart();
            renderCart();
        } else if (e.target.closest('#cart-checkout')) {
            showToast('Demo: proses pembayaran belum tersedia pada website showcase ini.');
        }
    });

    cartDrawer.addEventListener('click', (e) => {
        if (e.target === cartDrawer || e.target.closest('#cart-drawer-close')) closeCart();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeCart(); });

    // Sinkronkan jika keranjang diubah dari tab/halaman lain
    window.addEventListener('storage', (e) => {
        if (e.key === CART_KEY) { cart = loadCart(); renderCart(); }
    });

    renderCart();

    function showToast(message) {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `
            <i class="fa-solid fa-circle-check" style="color: var(--lenovo-red); font-size: 1.1rem;"></i>
            <div>${message}</div>
        `;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            toast.style.transition = 'all 0.3s ease-out';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }

    // Warranty Check Button Demo
    const warrantyBtn = document.getElementById('warranty-btn');
    if (warrantyBtn) {
        warrantyBtn.addEventListener('click', () => {
            const serial = prompt("Masukkan Serial Number perangkat Lenovo Anda (contoh: PF3XYZ12):", "PF3XYZ12");
            if (serial) {
                showToast(`Pengecekan Garansi untuk S/N [${serial}]: <strong>Garansi Aktif hingga 2028 (Lenovo Premier Support)</strong>.`);
            }
        });
    }

    // Klik ikon keranjang -> buka daftar isi keranjang
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCart);
    }

    // Mobile Navbar Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close mobile nav when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

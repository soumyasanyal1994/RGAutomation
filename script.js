// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Smooth Scrolling + Nav highlight / hide other links
const navLinks = document.querySelectorAll('.nav-link');
let activeSectionHref = null;

function setActiveNavLink(activeLink, hideOthers) {
    navLinks.forEach(link => {
        if (link === activeLink) {
            link.classList.add('active');
            link.style.display = 'inline-block';
        } else {
            link.classList.remove('active');
            link.style.display = hideOthers ? 'none' : 'inline-block';
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (navMenu) navMenu.classList.remove('active');
            const headerLink = document.querySelector(`.nav-link[href="${href}"]`);
            if (headerLink) {
                activeSectionHref = href;
                setActiveNavLink(headerLink, true);
            }
        }
    });
});

window.addEventListener('scroll', () => {
    if (!activeSectionHref) return;
    const section = document.querySelector(activeSectionHref);
    const navbar = document.querySelector('.navbar');
    if (!section || !navbar) return;
    const rect = section.getBoundingClientRect();
    const anchorY = navbar.offsetHeight + 20;
    const inView = rect.top <= anchorY && rect.bottom >= anchorY;
    if (!inView) {
        activeSectionHref = null;
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.style.display = 'inline-block';
        });
    }
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'var(--white)';
        navbar.style.backdropFilter = 'none';
    }
});

// Dynamic Content Loading
let siteData = {};

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        siteData = data;
        loadProducts();
        loadPartners();
    })
    .catch(error => {
        console.error('Error loading data:', error);
        // Fallback data if JSON fails to load
        siteData = {
            partners: [
                { name: 'Siemens', logo: 'assets/partners/Siemens.png' },
                { name: 'Fuji', logo: 'assets/partners/Fuji.png' },
                { name: 'ABB', logo: 'assets/partners/ABB.png' },
                { name: 'Nidec - Control Techniques', logo: 'assets/partners/Nidec.jpg' },
                { name: 'DELTA', logo: 'assets/partners/DELTA.png' },
                { name: 'INVT', logo: 'assets/partners/INVT.jfif' },
                { name: 'CG', logo: 'assets/partners/CG.png' },
                { name: 'Danfoss', logo: 'assets/partners/Danfoss.png' },
                { name: 'Yaskawa', logo: 'assets/partners/Yaskawa.jfif' },
                { name: 'Rockwell', logo: 'assets/partners/Rockwell.png' },
                { name: 'Schneider', logo: 'assets/partners/Schneider.png' },
                { name: 'RITTAL', logo: 'assets/partners/RITTAL.png' },
                { name: 'GIC', logo: 'assets/partners/GIC.jfif' },
                { name: 'Wago', logo: 'assets/partners/Wago.png' },
                { name: 'Wecon', logo: 'assets/partners/Wecon.png' }
            ],
            products: {
                'ABB': [
                    'assets/products/ABB/ABB_VFD_6.jfif',
                    'assets/products/ABB/ABB_VFD_1.jfif',
                    'assets/products/ABB/ABB_SMPS_8.jfif'
                ],
                'DELTA': [
                    'assets/products/DELTA/Delta_VFD_4.jfif',
                    'assets/products/DELTA/Delta_PLC_1.jfif',
                    'assets/products/DELTA/Delta_HMI_8.jfif'
                ],
                'CG': [
                    'assets/products/CG/CG_Emotron_VFD_3.jfif',
                    'assets/products/CG/CG_Emotron_VFD_2.jfif'
                ]
            }
        };
        loadProducts();
        loadPartners();
    });

function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    const filterButtons = document.querySelector('.filter-buttons');
    
    if (!productsGrid || !siteData.products) return;

    // Create filter buttons
    const categories = Object.keys(siteData.products);
    if (categories.length > 0 && filterButtons) {
        filterButtons.innerHTML = '';
        categories.forEach(category => {
            const isDefault = category.toLowerCase() === 'siemens';
            filterButtons.innerHTML += `<button class="filter-btn${isDefault ? ' active' : ''}" data-filter="${category}">${category}</button>`;
        });

        // Add event listeners to new buttons
        const buttons = filterButtons.querySelectorAll('.filter-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                displayProducts(btn.getAttribute('data-filter'));
            });
        });
    }

    const defaultCategory = categories.find(c => c.toLowerCase() === 'siemens') || categories[0];
    displayProducts(defaultCategory);
}

function displayProducts(filter) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid || !siteData.products) return;

    productsGrid.innerHTML = '';
    let productsToShow = [];

    if (filter === 'all') {
        Object.entries(siteData.products).forEach(([category, images]) => {
            images.forEach((image, imgIndex) => {
                productsToShow.push({
                    name: `${category} Product`,
                    image: image,
                    description: `High-quality ${category} product`
                });
            });
        });
    } else {
        const categoryImages = siteData.products[filter] || [];
        categoryImages.forEach((image, imgIndex) => {
            if (filter === 'RITTAL') {
                productsToShow.push({
                    name: 'RITTAL Panel and Product',
                    image: image,
                    description: 'Panel and Solution'
                });
            } else if (filter === 'Electrical Panel') {
                productsToShow.push({
                    name: 'Electrical Panel and Product',
                    image: image,
                    description: 'Automation Panel Solution'
                });
            } else {
                productsToShow.push({
                    name: `${filter} Product`,
                    image: image,
                    description: `Automation Solutions`
                });
            }
        });
    }

    productsToShow.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-aos', 'fade-up');
        productCard.setAttribute('data-aos-delay', (index % 5 * 100).toString()); // Optimize delay
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.src='assets/img/logo.jpg'">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
}

function loadPartners() {
    const partnersGrid = document.getElementById('partners-grid');
    if (!partnersGrid || !siteData.partners) return;

    partnersGrid.innerHTML = '';
    siteData.partners.forEach((partner, index) => {
        const partnerCard = document.createElement('div');
        partnerCard.className = 'partner-logo';
        partnerCard.setAttribute('data-aos', 'fade-up');
        partnerCard.setAttribute('data-aos-delay', (index % 6 * 100).toString());
        
        partnerCard.innerHTML = `
            <img src="${partner.logo}" alt="${partner.name}" onerror="this.src='assets/img/logo.jpg'">
        `;
        
        partnersGrid.appendChild(partnerCard);
    });
}

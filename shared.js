// ============================================================
// DETOXY HIJAMA — SHARED UI COMPONENTS
// ============================================================

function getNavHTML(activePage = '') {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'products.html', label: 'Products' },
    { href: 'blogs.html', label: 'Blog' },
    { href: 'about.html', label: 'About' },
  ];
  const links = pages.map(p => {
    const isActive = activePage === p.label;
    const base = location.pathname.includes('/products/') || location.pathname.includes('/blogs/') ? '../' : '';
    return `<a href="${base}${p.href}" class="nav-link${isActive ? ' nav-link--active' : ''}">${p.label}</a>`;
  }).join('');
  const base = location.pathname.includes('/products/') || location.pathname.includes('/blogs/') ? '../' : '';
  return `
  <header class="site-header" id="siteHeader">
    <div class="header-inner">
      <a href="${base}index.html" class="brand">
        <img src="${base}assets/logo.png" alt="Detoxy Hijama" class="brand-logo" onerror="this.style.display='none'">
        <span class="brand-name">Detoxy Hijama</span>
      </a>
      <nav class="site-nav" id="siteNav">
        ${links}
      </nav>
      <div class="header-actions">
        <a href="${base}cart.html" class="cart-btn" aria-label="Cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
          <span class="cart-count" style="display:none">0</span>
        </a>
        <button class="hamburger" id="menuToggle" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;
}

function getFooterHTML() {
  const base = location.pathname.includes('/products/') || location.pathname.includes('/blogs/') ? '../' : '';
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="${base}assets/logo.png" alt="Detoxy Hijama" style="height:40px;object-fit:contain" onerror="this.style.display='none'">
          <span style="font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:700;color:#fff">Detoxy Hijama</span>
        </div>
        <p style="font-size:.85rem;color:rgba(255,255,255,.5);margin-top:12px;line-height:1.7;max-width:280px">India's direct hijama manufacturer — factory-fresh quality at zero markup. Trusted by 5,000+ practitioners.</p>
        <div class="footer-trust">
          <span class="trust-pill">🏭 Direct Manufacturer</span>
          <span class="trust-pill">🚚 Pan India Delivery</span>
        </div>
      </div>
      <div class="footer-links">
        <h4>Shop</h4>
        <a href="${base}products.html">All Products</a>
        <a href="${base}products.html?cat=cups">Hijama Cups</a>
        <a href="${base}products.html?cat=kits">Kits & Sets</a>
        <a href="${base}products.html?cat=facial">Facial Care</a>
        <a href="${base}products.html?cat=consumables">Consumables</a>
      </div>
      <div class="footer-links">
        <h4>Info</h4>
        <a href="${base}about.html">About Us</a>
        <a href="${base}blogs.html">Blog</a>
        <a href="${base}shipping.html">Shipping Policy</a>
        <a href="${base}returns.html">Returns</a>
        <a href="${base}privacy.html">Privacy Policy</a>
      </div>
      <div class="footer-contact">
        <h4>Contact</h4>
        <a href="mailto:detoxyhijama@gmail.com">detoxyhijama@gmail.com</a>
        <a href="tel:+919566596077">+91 95665 96077</a>
        <p style="font-size:.82rem;color:rgba(255,255,255,.4);margin-top:10px;line-height:1.6">Pollachi, Coimbatore<br>Tamil Nadu 642005</p>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2025 Detoxy Hijama Cups. All rights reserved.</span>
      <span>Made with ♥ in Coimbatore</span>
    </div>
  </footer>`;
}

function initNav() {
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('siteNav');
  const header = document.getElementById('siteHeader');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });
  }
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
  });
}

function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) s += '<span class="star full">★</span>';
    else if (i === full && half) s += '<span class="star half">★</span>';
    else s += '<span class="star empty">★</span>';
  }
  return s;
}

function formatPrice(n) { return '₹' + n.toLocaleString('en-IN'); }

function getProductImageSrc(product) {
  return product.images && product.images[0] ? product.images[0] : `https://placehold.co/400x400/1a3d35/2dd4bf?text=${encodeURIComponent(product.shortName)}`;
}

function renderProductCard(product) {
  const base = location.pathname.includes('/products/') ? '../' : '';
  const discount = Math.round((1 - product.price / product.mrp) * 100);
  return `
  <article class="product-card" data-id="${product.id}" data-cat="${product.category}">
    <a href="${base}products/${product.id}.html" class="card-image-wrap">
      <img src="${base}${getProductImageSrc(product)}" alt="${product.name}" class="card-img" loading="lazy"
           onerror="this.src='https://placehold.co/400x400/1a3d35/2dd4bf?text=${encodeURIComponent(product.shortName)}'">
      ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
      ${discount > 0 ? `<span class="card-discount">-${discount}%</span>` : ''}
    </a>
    <div class="card-body">
      <div class="card-category">${CATEGORIES.find(c=>c.id===product.category)?.label || ''}</div>
      <h3 class="card-title"><a href="${base}products/${product.id}.html">${product.name}</a></h3>
      <div class="card-rating">
        ${renderStars(product.rating)}
        <span class="rating-count">(${product.reviews})</span>
      </div>
      <div class="card-price">
        <span class="price-current">${formatPrice(product.price)}</span>
        <span class="price-unit"> ${product.unit}</span>
        <span class="price-mrp">${formatPrice(product.mrp)}</span>
      </div>
      <button class="btn-add-cart" onclick="Cart.add('${product.id}'); event.preventDefault();">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        Add to Cart
      </button>
    </div>
  </article>`;
}

document.addEventListener('DOMContentLoaded', initNav);

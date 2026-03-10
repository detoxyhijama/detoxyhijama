// ============================================================
// DETOXY HIJAMA — SHARED UI COMPONENTS (Original Theme)
// ============================================================

function getBase() {
  return location.pathname.includes('/products/') || location.pathname.includes('/admin/') ? '../' : '';
}

function getNavHTML(activePage = '') {
  const base = getBase();
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'products.html', label: 'Products' },
    { href: 'blogs.html', label: 'Blog' },
    { href: 'about.html', label: 'About' },
  ];
  const links = pages.map(p =>
    `<li><a href="${base}${p.href}" class="nav-link${activePage === p.label ? ' nav-link--active' : ''}">${p.label}</a></li>`
  ).join('');

  return `
  <header class="site-header" id="siteHeader">
    <a href="${base}index.html" class="brand">
      <img src="${base}assets/logo.png" alt="Detoxy Hijama" class="brand-logo"
           onerror="this.style.display='none'">
      <div class="brand-name-wrap">
        <span class="brand-main">Detoxy Hijama</span>
        <span class="brand-sub">Direct Manufacturer</span>
      </div>
    </a>
    <nav class="site-nav">
      <ul style="display:flex;list-style:none;gap:4px;align-items:center">${links}</ul>
    </nav>
    <div class="header-actions">
      <a href="${base}cart.html" class="cart-btn" aria-label="Cart">
        🛒
        <span class="cart-count" style="display:none">0</span>
      </a>
      <button class="hamburger" id="menuToggle" aria-label="Menu">☰</button>
    </div>
  </header>
  <!-- MOBILE NAV -->
  <div class="mob-nav" id="mobNav">
    <div class="mob-top">
      <span style="font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:700;color:#fff">Detoxy Hijama</span>
      <button class="mob-close" id="mobClose">✕</button>
    </div>
    ${pages.map(p => `<a href="${base}${p.href}" class="mob-link">${p.label}</a>`).join('')}
    <a href="${base}cart.html" class="mob-link">🛒 Cart</a>
  </div>`;
}

function getFooterHTML() {
  const base = getBase();
  return `
  <footer class="site-footer">
    <div class="footer-inner">
      <div>
        <div class="footer-logo">
          <img src="${base}assets/logo.png" alt="Detoxy Hijama" style="width:40px;height:40px;border-radius:50%;object-fit:cover" onerror="this.style.display='none'">
          <span class="footer-brand-name">Detoxy Hijama</span>
        </div>
        <p class="footer-desc">India's direct hijama manufacturer — factory-fresh quality at zero markup. Supplying 5,000+ practitioners, clinics & hospitals across India from our large factory in Coimbatore.</p>
        <div class="footer-trust">
          <span class="footer-trust-pill">🏭 Direct Manufacturer</span>
          <span class="footer-trust-pill">🚚 Pan India</span>
        </div>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <ul>
          <li><a href="${base}products.html">All Products</a></li>
          <li><a href="${base}products.html?cat=cups">Hijama Cups</a></li>
          <li><a href="${base}products.html?cat=kits">Kits & Sets</a></li>
          <li><a href="${base}products.html?cat=facial">Facial Care</a></li>
          <li><a href="${base}products.html?cat=consumables">Consumables</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Info</h4>
        <ul>
          <li><a href="${base}about.html">About Us</a></li>
          <li><a href="${base}blogs.html">Blog</a></li>
          <li><a href="${base}shipping.html">Shipping</a></li>
          <li><a href="${base}returns.html">Returns</a></li>
          <li><a href="${base}privacy.html">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contact</h4>
        <ul>
          <li><a href="mailto:detoxyhijama@gmail.com">detoxyhijama@gmail.com</a></li>
          <li><a href="tel:+919566596077">+91 95665 96077</a></li>
          <li style="margin-top:8px"><span style="font-size:.78rem;color:rgba(255,255,255,.3);line-height:1.6">Pollachi, Coimbatore<br>Tamil Nadu 642005</span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Detoxy Hijama Cups. All rights reserved.</p>
      <p>Made with ♥ in Coimbatore</p>
    </div>
  </footer>`;
}

function initNav() {
  const toggle = document.getElementById('menuToggle');
  const mobNav = document.getElementById('mobNav');
  const mobClose = document.getElementById('mobClose');
  const header = document.getElementById('siteHeader');
  if (toggle && mobNav) {
    toggle.addEventListener('click', () => mobNav.classList.add('open'));
    mobClose?.addEventListener('click', () => mobNav.classList.remove('open'));
  }
  window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 30);
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

function getProductImageSrc(product, base) {
  if (!base) base = getBase();
  return `${base}assets/images/products/${product.id}/main.jpg`;
}

function renderProductCard(product) {
  const base = location.pathname.includes('/products/') ? '../' : '';
  const discount = Math.round((1 - product.price / product.mrp) * 100);
  const catLabel = CATEGORIES.find(c => c.id === product.category)?.label || '';
  const imgSrc = `${base}assets/images/products/${product.id}/main.jpg`;
  const fallback = `https://placehold.co/400x400/174840/3ecab5?text=${encodeURIComponent(product.shortName)}`;

  return `
  <article class="product-card" data-id="${product.id}" data-cat="${product.category}">
    <a href="${base}products/${product.id}.html" class="card-image-wrap" style="background:linear-gradient(135deg,var(--mid),var(--dark))">
      <img src="${imgSrc}" alt="${product.name}" class="card-img" loading="lazy"
           onerror="this.src='${fallback}'">
      ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
      ${discount > 0 ? `<span class="card-discount">-${discount}%</span>` : ''}
    </a>
    <div class="card-body">
      <div class="card-category">${catLabel}</div>
      <h3 class="card-title"><a href="${base}products/${product.id}.html">${product.name}</a></h3>
      <div class="card-rating">
        ${renderStars(product.rating)}
        <span class="rating-count">(${product.reviews})</span>
      </div>
      <div class="card-price">
        <span class="price-current">${formatPrice(product.price)}</span>
        <span class="price-unit">${product.unit}</span>
        <span class="price-mrp">${formatPrice(product.mrp)}</span>
      </div>
      <button class="btn-add-cart" onclick="Cart.add('${product.id}'); event.preventDefault(); event.stopPropagation();">
        🛒 Add to Cart
      </button>
    </div>
  </article>`;
}

document.addEventListener('DOMContentLoaded', () => {
  Cart.updateBadge();
  initNav();
});

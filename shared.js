/* ============================================================
   DETOXY HIJAMA — SHARED.JS
   Header, Footer, Cart, Google Sheets Sync
   ============================================================ */

/* ─── PATH HELPER ─── */
function _base() {
  // Detect if we're in a subdirectory
  const p = window.location.pathname;
  if (p.includes('/products/') || p.includes('/admin/') || p.includes('/blogs/') || p.includes('/quote/') || p.includes('/confirmation/')) return '../';
  return '';
}

/* ─── HEADER HTML ─── */
function getNavHTML(activePage) {
  const b = _base();
  const cfg = window.DETOXY_CONFIG || {};
  const links = [
    { label: 'Home', href: b + 'index.html' },
    { label: 'Products', href: b + 'products.html' },
    { label: 'Quote', href: b + 'quote.html' },
    { label: 'Blogs', href: b + 'blogs/index.html' },
    { label: 'Contact', href: b + 'contact.html' }
  ];
  const navLinks = links.map(l =>
    `<a href="${l.href}" class="nav-link${activePage === l.label ? ' nav-link--active' : ''}">${l.label}</a>`
  ).join('');
  return `
<header class="site-header" id="siteHeader">
  <a href="${b}index.html" class="brand">
    <div style="position:relative;width:40px;height:40px;flex-shrink:0">
      <img class="brand-logo" src="${b}assets/logo.png" alt="Detoxy Hijama" onerror="this.style.display='none'">
      <svg class="brand-logo" width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;z-index:-1">
        <defs><radialGradient id="blg" cx="50%" cy="40%" r="60%"><stop offset="0%" stop-color="#2aab97"/><stop offset="100%" stop-color="#1a3d35"/></radialGradient></defs>
        <circle cx="60" cy="60" r="60" fill="url(#blg)"/>
        <path d="M60 18c0 0-26 16.5-26 38.5C34 70.7 45.6 82 60 82s26-11.3 26-25.5C86 34.5 60 18 60 18z" fill="white" opacity=".92"/>
        <circle cx="60" cy="68" r="9" fill="#2aab97"/>
      </svg>
    </div>
    <div class="brand-name-wrap">
      <span class="brand-main">Detoxy Hijama</span>
      <span class="brand-sub">Manufacturer</span>
    </div>
  </a>
  <nav class="site-nav">${navLinks}</nav>
  <div class="header-actions">
    <a href="${b}cart.html" class="cart-btn" title="Cart" id="cartBtnHeader">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      <span class="cart-count" id="cartCountBadge">0</span>
    </a>
    <a href="${b}login.html" class="login-btn" title="My Account" id="loginBtnHeader">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <span>Login</span>
    </a>
    <button class="hamburger" onclick="toggleMobNav()" aria-label="Menu">☰</button>
  </div>
</header>
<nav class="mob-nav" id="mobNav">
  <div class="mob-top">
    <span style="color:#fff;font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:700">Detoxy Hijama</span>
    <button class="mob-close" onclick="toggleMobNav()">✕</button>
  </div>
  ${links.map(l => `<a href="${l.href}" class="mob-link">${l.label}</a>`).join('')}
  <a href="${b}cart.html" class="mob-link">🛒 Cart</a>
  <a href="${b}login.html" class="mob-link">👤 My Account</a>
  <div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,.08)">
    <a href="https://wa.me/919566596077" style="display:flex;align-items:center;justify-content:center;gap:10px;padding:13px 18px;background:#25d366;border-radius:12px;color:#fff;font-weight:700;font-size:.88rem;text-decoration:none" target="_blank">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      WhatsApp Us
    </a>
  </div>
</nav>
<style>
.brand-logo{width:40px;height:40px;border-radius:50%;object-fit:cover;display:block}
.login-btn{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:10px;background:var(--tp);color:var(--td);font-size:.8rem;font-weight:600;transition:all .2s;border:1.5px solid var(--border)}
.login-btn:hover{background:var(--t);color:#fff;border-color:var(--t)}
</style>`;
}

/* ─── FOOTER HTML ─── */
function getFooterHTML() {
  const b = _base();
  const s = (window.DETOXY_CONFIG || {}).social || {};
  return `
<footer class="site-footer">
  <div class="footer-inner">
    <div>
      <div class="footer-logo">
        <svg width="32" height="32" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="18" fill="#2aab97"/><path d="M18 8c0 0-7 4.5-7 10.5 0 3.87 3.13 7 7 7s7-3.13 7-7C25 12.5 18 8 18 8z" fill="white" opacity="0.9"/><circle cx="18" cy="20" r="3" fill="#2aab97"/></svg>
        <span class="footer-brand-name">Detoxy Hijama</span>
      </div>
      <p class="footer-desc">India's trusted manufacturer of premium Hijama equipment. Direct factory prices. Pan India delivery from Coimbatore.</p>
      <div class="footer-trust" style="margin-bottom:16px">
        <span class="footer-trust-pill">🏭 Manufacturer</span>
        <span class="footer-trust-pill">🚚 Pan India</span>
        <span class="footer-trust-pill">✅ Clinic Grade</span>
      </div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${s.instagram ? `<a href="${s.instagram}" target="_blank" class="footer-social-icon" title="Instagram" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>` : ''}
        ${s.facebook ? `<a href="${s.facebook}" target="_blank" class="footer-social-icon" title="Facebook" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>` : ''}
        ${s.youtube ? `<a href="${s.youtube}" target="_blank" class="footer-social-icon" title="YouTube" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg></a>` : ''}
        ${s.telegram ? `<a href="${s.telegram}" target="_blank" class="footer-social-icon" title="Telegram" aria-label="Telegram"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg></a>` : ''}
        ${s.linkedin ? `<a href="${s.linkedin}" target="_blank" class="footer-social-icon" title="LinkedIn" aria-label="LinkedIn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>` : ''}
        ${s.whatsapp ? `<a href="${s.whatsapp}" target="_blank" class="footer-social-icon" title="WhatsApp" aria-label="WhatsApp"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></a>` : ''}
        ${s.email ? `<a href="${s.email}" class="footer-social-icon" title="Email" aria-label="Email"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg></a>` : ''}
      </div>
    </div>
    <div class="footer-col">
      <h4>Products</h4>
      <ul>
        <li><a href="${b}products.html?cat=cups">Hijama Cups</a></li>
        <li><a href="${b}products.html?cat=kits">Cupping Kits</a></li>
        <li><a href="${b}products.html?cat=consumables">Consumables</a></li>
        <li><a href="${b}products.html">All Products</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="${b}quote.html">Bulk Quote</a></li>
        <li><a href="${b}blogs/index.html">Blog</a></li>
        <li><a href="${b}contact.html">Contact</a></li>
        <li><a href="${b}cart.html">Cart</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <ul>
        <li><a href="tel:+919566596077">+91 95665 96077</a></li>
        <li><a href="mailto:detoxyhijama@gmail.com">detoxyhijama@gmail.com</a></li>
        <li><a href="https://wa.me/919566596077" target="_blank">WhatsApp Chat</a></li>
        <li><a href="${b}contact.html">Find Us</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© ${new Date().getFullYear()} Detoxy Hijama. All rights reserved. Made in India 🇮🇳</p>
    <p>GST Registered | MSME Certified | Pan India Delivery</p>
  </div>
</footer>
<style>
.footer-social-icon{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:10px;background:rgba(42,171,151,.12);color:var(--tl);transition:all .2s}
.footer-social-icon:hover{background:var(--t);color:#fff;transform:translateY(-2px)}
</style>`;
}

/* ─── CART MODULE ─── */
window.Cart = {
  _key: 'detoxy_cart',
  get() {
    try { return JSON.parse(localStorage.getItem(this._key)) || []; }
    catch(e) { return []; }
  },
  save(items) {
    localStorage.setItem(this._key, JSON.stringify(items));
    this._updateBadge();
    window.dispatchEvent(new Event('cartUpdated'));
  },
  add(productId, qty) {
    const items = this.get();
    const i = items.findIndex(x => x.id === productId);
    if (i > -1) items[i].qty += qty;
    else items.push({ id: productId, qty });
    this.save(items);
    this._showToast('Added to cart ✓');
  },
  remove(productId) {
    this.save(this.get().filter(x => x.id !== productId));
  },
  updateQty(productId, qty) {
    const items = this.get();
    const i = items.findIndex(x => x.id === productId);
    if (i > -1) { items[i].qty = Math.max(1, qty); this.save(items); }
  },
  clear() { this.save([]); },
  count() { return this.get().reduce((s, x) => s + x.qty, 0); },
  total() {
    const prods = (window.DETOXY_CONFIG || {}).products || [];
    return this.get().reduce((s, item) => {
      const p = prods.find(x => x.id === item.id);
      return s + (p ? p.price * item.qty : 0);
    }, 0);
  },
  _updateBadge() {
    const count = this.count();
    document.querySelectorAll('.cart-count, #cartCountBadge').forEach(el => {
      el.textContent = count;
      el.style.display = count > 0 ? 'flex' : 'none';
    });
  },
  _showToast(msg) {
    let t = document.getElementById('_cart_toast');
    if (!t) {
      t = document.createElement('div');
      t.id = '_cart_toast';
      t.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#2aab97;color:#fff;padding:12px 24px;border-radius:50px;font-size:.87rem;font-weight:600;z-index:9999;box-shadow:0 8px 32px rgba(42,171,151,.35);transition:opacity .3s;pointer-events:none';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => t.style.opacity = '0', 2000);
  },
  init() {
    this._updateBadge();
    // whatsapp float
    if (!document.getElementById('_wa_float')) {
      const wa = document.createElement('a');
      wa.id = '_wa_float';
      wa.href = 'https://wa.me/919566596077';
      wa.target = '_blank';
      wa.title = 'WhatsApp';
      wa.style.cssText = 'position:fixed;bottom:24px;right:24px;width:54px;height:54px;border-radius:50%;background:#25d366;color:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(37,211,102,.45);z-index:888;transition:transform .2s';
      wa.onmouseover = () => wa.style.transform = 'scale(1.1)';
      wa.onmouseleave = () => wa.style.transform = 'scale(1)';
      wa.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
      document.body.appendChild(wa);
    }
  }
};

/* ─── GOOGLE SHEETS SYNC ─── */
window.OrderSync = {
  _queueKey: 'detoxy_sync_queue',

  async submit(orderData) {
    const cfg = window.DETOXY_CONFIG || {};
    const url = localStorage.getItem('detoxy_sheets_url') || cfg.googleSheetsURL;
    if (!orderData.id) orderData.id = 'ORD-' + Date.now();
    if (!orderData.savedAt) orderData.savedAt = new Date().toISOString();
    if (!orderData.timestamp) orderData.timestamp = orderData.savedAt;
    this._saveLocal(orderData);
    if (!url || url.includes('YOUR_SCRIPT_ID') || !url.trim()) {
      console.warn('[OrderSync] Google Sheets URL not configured. Saved locally.');
      return { success: true, local: true };
    }
    const ok = await this._send(url, orderData);
    if (!ok) this._queue(orderData);
    return { success: true };
  },

  async _send(url, data) {
    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp:  data.timestamp || data.savedAt || new Date().toISOString(),
          id:         data.id,
          name:       data.name || data.company || '',
          phone:      data.phone || '',
          email:      data.email || '',
          address:    data.address || '',
          city:       data.city || '',
          state:      data.state || '',
          pincode:    data.pincode || '',
          items:      data.items || '',
          subtotal:   data.subtotal || data.total || 0,
          payment:    data.payment || '',
          notes:      data.notes || '',
          status:     data.status || 'New',
          type:       data.type || 'ORDER'
        })
      });
      return true;
    } catch(e) {
      console.error('[OrderSync] Sync failed:', e.message);
      return false;
    }
  },

  _queue(order) {
    const q = JSON.parse(localStorage.getItem(this._queueKey) || '[]');
    if (!q.find(o => o.id === order.id)) q.push(order);
    localStorage.setItem(this._queueKey, JSON.stringify(q));
  },

  async retryQueue() {
    const cfg = window.DETOXY_CONFIG || {};
    const url = localStorage.getItem('detoxy_sheets_url') || cfg.googleSheetsURL;
    if (!url || url.includes('YOUR_SCRIPT_ID')) return;
    const q = JSON.parse(localStorage.getItem(this._queueKey) || '[]');
    if (!q.length) return;
    const failed = [];
    for (const o of q) { if (!(await this._send(url, o))) failed.push(o); }
    localStorage.setItem(this._queueKey, JSON.stringify(failed));
    if (failed.length < q.length) console.log('[OrderSync] Retried', q.length - failed.length, 'queued orders');
  },

  _saveLocal(order) {
    const orders = JSON.parse(localStorage.getItem('detoxy_orders') || '[]');
    const idx = orders.findIndex(o => o.id === order.id);
    if (idx > -1) orders[idx] = order; else orders.push(order);
    localStorage.setItem('detoxy_orders', JSON.stringify(orders));
  },

  getLocalOrders() {
    return JSON.parse(localStorage.getItem('detoxy_orders') || '[]');
  }
};

/* ─── SCROLL HEADER SHADOW ─── */
document.addEventListener('DOMContentLoaded', () => {
  Cart.init();
  const h = document.getElementById('siteHeader');
  if (h) window.addEventListener('scroll', () => h.classList.toggle('scrolled', window.scrollY > 10));
  // Auto-retry any orders that failed to sync on last visit
  setTimeout(() => OrderSync.retryQueue(), 3000);
});

/* ─── MOBILE NAV ─── */
function toggleMobNav() {
  const n = document.getElementById('mobNav');
  if (n) n.classList.toggle('open');
}

/* ─── PRODUCT CARD HTML ─── */
function getProductCardHTML(p, basePath) {
  const b = basePath || '';
  const img = (p.images && p.images[0]) || 'https://placehold.co/400x400/1a3d35/2dd4bf?text=' + encodeURIComponent(p.name);
  const imgFixed = img.startsWith('../') ? b + img.replace('../', '') : img;
  return `
<div class="product-card">
  <div class="card-image-wrap" style="background:linear-gradient(135deg,#f0faf8,#e8f8f5)">
    ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
    ${p.discount ? `<span class="card-discount">-${p.discount}</span>` : ''}
    <img class="card-img" src="${imgFixed}" alt="${p.name}"
      onerror="this.src='https://placehold.co/400x400/1a3d35/2dd4bf?text=${encodeURIComponent(p.name)}'">
  </div>
  <div class="card-body">
    <div class="card-category">${p.categoryLabel}</div>
    <div class="card-title"><a href="${b}products/${p.id}.html">${p.name}</a></div>
    <div class="card-rating">
      ${[1,2,3,4,5].map(i => `<span class="star ${i <= Math.floor(p.rating) ? 'full' : (i - p.rating < 1 ? 'half' : 'empty')}">★</span>`).join('')}
      <span class="rating-count">(${p.reviews})</span>
    </div>
    <div class="card-price">
      <span class="price-current">₹${p.price}</span>
      <span class="price-unit">${p.unit}</span>
      <span class="price-mrp">₹${p.mrp}</span>
    </div>
    <div style="display:flex;gap:8px">
      <button class="btn-add-cart" style="flex:1" onclick="Cart.add('${p.id}',1)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
        Add
      </button>
      <a href="${b}products/${p.id}.html" class="btn-buy-now" style="flex:1;display:flex;align-items:center;justify-content:center;gap:5px;padding:10px;border-radius:10px;background:var(--dark);color:#fff;font-size:.76rem;font-weight:600;text-decoration:none;transition:all .2s" onmouseover="this.style.background='var(--mid)'" onmouseout="this.style.background='var(--dark)'">
        Buy Now
      </a>
    </div>
  </div>
</div>`;
}

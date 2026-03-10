/* ============================================================
   DETOXY HIJAMA — SHARED.JS
   Header, Footer, Cart, Google Sheets Sync
   ============================================================ */

/* ─── PATH HELPER ─── */
function _base() {
  // Detect if we're in a subdirectory
  const p = window.location.pathname;
  if (p.includes('/products/') || p.includes('/admin/') || p.includes('/blogs/') || p.includes('/quote/') || p.includes('/confirmation/') || p.includes('/shipper/')) return '../';
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
        <img src="${b}assets/logo.png" style="width:36px;height:36px;border-radius:8px;object-fit:cover;box-shadow:0 2px 8px rgba(42,171,151,.3)" alt="Detoxy Hijama" onerror="this.src='data:image/png;base64,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'">
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

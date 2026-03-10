// Detoxy Hijama — Shared utilities v2
// OrderSync, Cart, Navigation, Footer, Search, Cart Drawer

/* ─── OrderSync ─────────────────────────────────────────────────────────── */
const OrderSync = (() => {
  const STORAGE_KEY = "detoxy_orders";
  function getLocalOrders() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch(e) { return []; }
  }
  function saveLocalOrders(orders) { localStorage.setItem(STORAGE_KEY, JSON.stringify(orders)); }
  function submit(order) {
    const orders = getLocalOrders();
    const idx = orders.findIndex(o => o.id === order.id);
    if (idx >= 0) orders[idx] = order; else orders.push(order);
    saveLocalOrders(orders);
    const url = (window.DETOXY_CONFIG || {}).sheetsUrl || localStorage.getItem("detoxy_sheets_url");
    if (url) {
      const nameParts = (order.name || "").trim().split(" ");
      const payload = {
        action:"placeOrder", orderNumber:order.id||"", status:order.status||"New",
        createdAt:order.savedAt ? new Date(order.savedAt).toISOString() : new Date().toISOString(),
        firstName:nameParts[0]||"", lastName:nameParts.slice(1).join(" ")||"",
        email:order.email||"", phone:order.phone||"",
        address1:order.address||"", address2:order.address2||"",
        city:order.city||"", state:order.state||"", pincode:order.pincode||"",
        itemsSummary:order.items||"", items:order.items||"",
        subtotal:order.subtotal||order.total||0, shippingCost:order.shipping||0,
        codFee:order.codFee||0, total:order.total||order.subtotal||0,
        payment:order.payment||"", notes:order.notes||"", type:order.type||""
      };
      fetch(url, { method:"POST", mode:"no-cors", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) }).catch(()=>{});
    }
    return order;
  }
  function generateId() {
    return "DH-" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2,5).toUpperCase();
  }
  function countByStatus(status) { return getLocalOrders().filter(o=>(o.status||"New")===status).length; }
  function totalRevenue() { return getLocalOrders().filter(o=>o.status!=="Cancelled").reduce((s,o)=>s+parseFloat(o.subtotal||o.total||0),0); }
  return { getLocalOrders, saveLocalOrders, submit, generateId, countByStatus, totalRevenue };
})();

/* ─── Cart ──────────────────────────────────────────────────────────────── */
const Cart = (() => {
  const KEY = 'detoxy_cart';
  function get() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch(e) { return []; }
  }
  function save(items) { localStorage.setItem(KEY, JSON.stringify(items)); _dispatch(); }
  function add(productId, qty) {
    qty = parseInt(qty) || 1;
    const items = get();
    const idx = items.findIndex(i => i.id === productId);
    if (idx >= 0) { items[idx].qty = Math.max(1, items[idx].qty + qty); }
    else {
      let name = productId.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
      let price = 0, img = '';
      const prods = (window.DETOXY_CONFIG||{}).products||window.PRODUCTS||[];
      const p = prods.find(p => p.id === productId);
      if (p) { name = p.name; price = p.price; img = p.images ? p.images[0] : ''; }
      items.push({ id:productId, name, price, img, qty });
    }
    save(items);
    _showToast('✓ Added to cart');
    _refreshDrawer();
  }
  function remove(productId) { save(get().filter(i=>i.id!==productId)); _refreshDrawer(); }
  function updateQty(productId, qty) {
    const items = get();
    const idx = items.findIndex(i=>i.id===productId);
    if (idx >= 0) { items[idx].qty = Math.max(1, qty); save(items); _refreshDrawer(); }
  }
  function clear() { localStorage.removeItem(KEY); _dispatch(); _refreshDrawer(); }
  function count() { return get().reduce((s,i)=>s+(i.qty||1),0); }
  function total() { return get().reduce((s,i)=>s+(i.price||0)*(i.qty||1),0); }

  function _dispatch() {
    window.dispatchEvent(new CustomEvent('cartUpdated', {detail:{count:count()}}));
    document.querySelectorAll('.cart-count,.cart-badge').forEach(el => {
      const n = count();
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    });
  }
  function _showToast(msg) {
    let toast = document.getElementById('dh-cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'dh-cart-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(toast._t);
    toast._t = setTimeout(()=>{ toast.style.opacity='0'; toast.style.transform='translateY(12px)'; }, 2400);
  }
  function _refreshDrawer() {
    const drawer = document.getElementById('cart-drawer-body');
    if (drawer) renderCartDrawer();
  }
  document.addEventListener('DOMContentLoaded', ()=>_dispatch());
  return { get, save, add, remove, updateQty, clear, count, total };
})();

/* ─── Star helper ─────────────────────────────────────────────────────── */
function renderStars(rating) {
  let s = '';
  for (let i=1; i<=5; i++) {
    if (rating >= i) s += '★';
    else if (rating >= i-0.5) s += '½';
    else s += '☆';
  }
  return s;
}

/* ─── Fix image paths ─────────────────────────────────────────────────── */
function fixImg(path, prefix) {
  if (!path) return '';
  prefix = prefix || '';
  if (path.startsWith('../')) return path.replace('../', prefix ? '' : '');
  return path;
}

/* ─── Cart Drawer ─────────────────────────────────────────────────────── */
function injectCartDrawer() {
  if (document.getElementById('cart-drawer')) return;
  const overlay = document.createElement('div');
  overlay.id = 'cart-drawer-overlay';
  overlay.className = 'cart-drawer-overlay';
  overlay.onclick = closeCartDrawer;
  document.body.appendChild(overlay);

  const drawer = document.createElement('div');
  drawer.id = 'cart-drawer';
  drawer.className = 'cart-drawer';
  drawer.innerHTML = `
    <div class="drawer-header">
      <div class="drawer-title">🛒 Your Cart</div>
      <button class="drawer-close" onclick="closeCartDrawer()">✕</button>
    </div>
    <div class="drawer-body" id="cart-drawer-body"></div>
    <div class="drawer-footer" id="cart-drawer-footer"></div>
  `;
  document.body.appendChild(drawer);
  renderCartDrawer();
}

function renderCartDrawer() {
  const body = document.getElementById('cart-drawer-body');
  const footer = document.getElementById('cart-drawer-footer');
  if (!body) return;
  const items = Cart.get();
  const prods = (window.DETOXY_CONFIG||{}).products||window.PRODUCTS||[];
  if (!items.length) {
    body.innerHTML = `<div class="drawer-empty"><div class="empty-icon">🛒</div><p>Your cart is empty</p><a href="${_prefix}products.html" class="btn btn-primary btn-sm">Browse Products</a></div>`;
    footer.innerHTML = '';
    return;
  }
  let subtotal = 0;
  const htmlItems = items.map(item => {
    const p = prods.find(x=>x.id===item.id);
    const price = p ? p.price : (item.price||0);
    const img = p && p.images ? p.images[0] : item.img || '';
    const name = p ? p.name : item.name;
    subtotal += price * (item.qty||1);
    return `
      <div class="drawer-item">
        <img class="drawer-item-img" src="${fixImg(img)}" alt="${name}"
          onerror="this.src='https://placehold.co/64x64/f0f4f3/2aab97?text=P'">
        <div style="flex:1">
          <div class="drawer-item-name">${name}</div>
          <div class="drawer-item-price">₹${price.toLocaleString()}</div>
          <div class="drawer-qty-row">
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}', ${(item.qty||1)-1}); if(${(item.qty||1)}-1<1) Cart.remove('${item.id}')">−</button>
            <span class="qty-num">${item.qty||1}</span>
            <button class="qty-btn" onclick="Cart.updateQty('${item.id}', ${(item.qty||1)+1})">+</button>
          </div>
        </div>
        <button class="drawer-remove" onclick="Cart.remove('${item.id}')" title="Remove">✕</button>
      </div>`;
  }).join('');
  body.innerHTML = htmlItems;
  const cfg = window.DETOXY_CONFIG||{};
  const freeAt = cfg.freeShippingAt||999;
  const ship = subtotal >= freeAt ? 0 : (cfg.defaultShipping||60);
  const total = subtotal + ship;
  footer.innerHTML = `
    <div class="drawer-subtotal"><span>Subtotal</span><span>₹${subtotal.toLocaleString()}</span></div>
    <div class="drawer-shipping-note">${ship===0 ? '✓ Free shipping applied' : `Add ₹${freeAt-subtotal} more for free shipping`}</div>
    <div class="drawer-actions">
      <a href="${_prefix}cart.html" class="btn btn-outline btn-full">View Cart</a>
      <a href="${_prefix}checkout.html" class="btn btn-primary btn-full">Checkout →</a>
    </div>`;
}

let _prefix = '';
function openCartDrawer() {
  renderCartDrawer();
  document.getElementById('cart-drawer').classList.add('open');
  document.getElementById('cart-drawer-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeCartDrawer() {
  document.getElementById('cart-drawer').classList.remove('open');
  document.getElementById('cart-drawer-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* ─── Search ──────────────────────────────────────────────────────────── */
function injectSearch() {
  if (document.getElementById('search-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'search-overlay';
  overlay.className = 'search-overlay';
  overlay.onclick = (e) => { if(e.target===overlay) closeSearch(); };
  overlay.innerHTML = `
    <div class="search-box">
      <div class="search-input-wrap">
        <span style="color:var(--muted);font-size:1rem">🔍</span>
        <input type="text" id="search-input" placeholder="Search hijama products…" autocomplete="off">
        <button style="background:none;border:none;cursor:pointer;color:var(--muted);font-size:1rem" onclick="closeSearch()">✕</button>
      </div>
      <div class="search-results" id="search-results"></div>
    </div>`;
  document.body.appendChild(overlay);
  document.getElementById('search-input').addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    const prods = (window.DETOXY_CONFIG||{}).products||window.PRODUCTS||[];
    const el = document.getElementById('search-results');
    if (!q) { el.innerHTML = ''; return; }
    const matches = prods.filter(p => p.name.toLowerCase().includes(q) || (p.desc||'').toLowerCase().includes(q)).slice(0,6);
    if (!matches.length) { el.innerHTML = '<p style="text-align:center;color:var(--muted);padding:20px;font-size:.87rem">No products found</p>'; return; }
    el.innerHTML = matches.map(p => `
      <a class="search-result-item" href="${_prefix}products/${p.id}.html">
        <img class="search-result-img" src="${fixImg(p.images&&p.images[0])}" alt="${p.name}"
          onerror="this.src='https://placehold.co/44x44/f0f4f3/2aab97?text=P'">
        <div>
          <div class="search-result-name">${p.name}</div>
          <div class="search-result-price">₹${p.price.toLocaleString()} <span style="color:var(--muted);font-size:.75rem;text-decoration:line-through;margin-left:4px">₹${p.mrp}</span></div>
        </div>
      </a>`).join('');
  });
}
function openSearch() {
  document.getElementById('search-overlay').classList.add('open');
  setTimeout(()=>document.getElementById('search-input').focus(),50);
}
function closeSearch() {
  document.getElementById('search-overlay').classList.remove('open');
}
document.addEventListener('keydown', e => { if(e.key==='Escape') { closeSearch(); closeCartDrawer(); } });

/* ─── Nav HTML ────────────────────────────────────────────────────────── */
function getNavHTML(activeLabel, prefix) {
  _prefix = prefix || '';
  const p = _prefix;
  const navItems = [
    { label:'Home',     href: p + 'index.html' },
    { label:'Products', href: p + 'products.html' },
    { label:'Blogs',    href: p + 'blogs.html' },
    { label:'About',    href: p + 'about.html' },
    { label:'Contact',  href: p + 'contact.html' },
  ];
  const linksHTML = navItems.map(i => `<a href="${i.href}" class="nav-link${i.label===activeLabel?' active':''}">${i.label}</a>`).join('');
  return `
<nav class="nav" id="main-nav">
  <div class="nav-inner">
    <a href="${p}index.html" class="nav-logo">
      <img src="${p}assets/logo.png" alt="Detoxy Hijama" onerror="this.style.display='none'">
      <div>
        <div class="nav-logo-text">Detoxy Hijama</div>
        <div class="nav-logo-sub">Manufacturer Direct</div>
      </div>
    </a>
    <div class="nav-links">${linksHTML}</div>
    <div class="nav-actions">
      <button class="nav-search-btn" onclick="openSearch()" aria-label="Search">🔍</button>
      <button class="nav-cart-btn" onclick="openCartDrawer()">
        🛒 Cart
        <span class="cart-badge cart-count">0</span>
      </button>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" onclick="toggleMobileNav()">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
<div class="nav-mobile" id="nav-mobile">
  ${navItems.map(i=>`<a href="${i.href}" class="nav-link${i.label===activeLabel?' active':''}">${i.label}</a>`).join('')}
  <a href="${p}products.html" class="btn btn-primary btn-sm" style="margin-top:8px">Shop Now →</a>
</div>`;
}

function toggleMobileNav() {
  const mob = document.getElementById('nav-mobile');
  mob.classList.toggle('open');
}

/* ─── Footer HTML ─────────────────────────────────────────────────────── */
function getFooterHTML(prefix) {
  const p = prefix !== undefined ? prefix : _prefix;
  const cfg = window.DETOXY_CONFIG || {};
  const phone = cfg.phone || '+91 95665 96077';
  const email = cfg.email || 'detoxyhijama@gmail.com';
  const address = cfg.address || 'DETOXY HIJAMA, Madurai, Tamil Nadu, India';
  const wa = (cfg.social||{}).whatsapp || '919566596077';
  return `
<footer class="site-footer">
  <div class="footer-top">
    <div>
      <div class="footer-brand-logo">
        <img src="${p}assets/logo.png" alt="Detoxy Hijama" onerror="this.style.display='none'">
        <div class="footer-brand-name">Detoxy Hijama</div>
      </div>
      <p class="footer-desc">India's trusted manufacturer of clinical-grade hijama cups and cupping therapy equipment. Direct from factory — no middlemen.</p>
      <div class="footer-social">
        <a href="https://wa.me/${wa}" target="_blank" rel="noopener" title="WhatsApp">💬</a>
        <a href="mailto:${email}" title="Email">📧</a>
        <a href="${p}about.html" title="About Us">🏭</a>
      </div>
    </div>
    <div>
      <div class="footer-col-title">Quick Links</div>
      <div class="footer-links">
        <a href="${p}index.html">Home</a>
        <a href="${p}products.html">All Products</a>
        <a href="${p}products.html?cat=cups">Hijama Cups</a>
        <a href="${p}products.html?cat=kits">Cupping Kits</a>
        <a href="${p}products.html?cat=consumables">Consumables</a>
        <a href="${p}quote.html">Bulk / Export Quote</a>
      </div>
    </div>
    <div>
      <div class="footer-col-title">Information</div>
      <div class="footer-links">
        <a href="${p}about.html">About Us</a>
        <a href="${p}blogs.html">Blog</a>
        <a href="${p}contact.html">Contact Us</a>
        <a href="${p}cart.html">My Cart</a>
        <a href="${p}checkout.html">Checkout</a>
      </div>
    </div>
    <div>
      <div class="footer-col-title">Contact</div>
      <div class="footer-contact-item"><span class="footer-contact-icon">📞</span><span>${phone}</span></div>
      <div class="footer-contact-item"><span class="footer-contact-icon">📧</span><span>${email}</span></div>
      <div class="footer-contact-item"><span class="footer-contact-icon">📍</span><span>${address}</span></div>
      <a href="https://wa.me/${wa}?text=Hi+Detoxy+Hijama,+I+need+help+with+a+product" target="_blank" class="wa-btn" style="margin-top:12px">💬 Chat on WhatsApp</a>
    </div>
  </div>
  <div style="max-width:1220px;margin:0 auto;padding:0 24px 24px">
    <div style="background:rgba(42,171,151,.12);border:1px solid rgba(42,171,151,.2);border-radius:12px;padding:20px 24px;display:flex;gap:20px;flex-wrap:wrap;align-items:center;justify-content:center">
      <span style="color:rgba(255,255,255,.8);font-size:.83rem">🔒 Secure Checkout</span>
      <span style="color:rgba(255,255,255,.8);font-size:.83rem">🚚 Pan India Delivery</span>
      <span style="color:rgba(255,255,255,.8);font-size:.83rem">📦 Same Day Dispatch</span>
      <span style="color:rgba(255,255,255,.8);font-size:.83rem">↩️ 7-Day Returns</span>
      <span style="color:rgba(255,255,255,.8);font-size:.83rem">💳 UPI / COD / Card</span>
      <span style="color:rgba(255,255,255,.8);font-size:.83rem">🏭 Direct Manufacturer</span>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} Detoxy Hijama. All rights reserved.</span>
    <span>Made in <span style="color:var(--tl)">Madurai, Tamil Nadu 🇮🇳</span></span>
  </div>
</footer>`;
}

/* ─── Scroll nav shadow + reveal ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Sticky nav scroll class
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', ()=>{
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }
  // Intersection observer for .reveal elements
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  // Inject search + drawer
  injectSearch();
  injectCartDrawer();
});

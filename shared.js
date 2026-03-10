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
    _showToast('Added to cart');
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
const _SVG = {
  cart:   `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
  close:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  search: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  check:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  truck:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
};

function injectCartDrawer() {
  if (document.getElementById('cart-drawer')) return;
  const overlay = document.createElement('div');
  overlay.id = 'cart-drawer-overlay';
  overlay.className = 'cart-overlay';
  overlay.onclick = closeCartDrawer;
  document.body.appendChild(overlay);

  const drawer = document.createElement('div');
  drawer.id = 'cart-drawer';
  drawer.className = 'cart-drawer';
  drawer.innerHTML = `
    <div class="drawer-head">
      <div class="drawer-head-title">${_SVG.cart} Your Cart</div>
      <button class="drawer-close" onclick="closeCartDrawer()" aria-label="Close">${_SVG.close}</button>
    </div>
    <div class="drawer-body" id="cart-drawer-body"></div>
    <div class="drawer-foot" id="cart-drawer-footer"></div>
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
    body.innerHTML = `<div class="drawer-empty-state">${_SVG.cart}<p>Your cart is empty</p><a href="${_prefix}products.html" class="btn btn-primary btn-sm">Browse Products</a></div>`;
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
        <button class="drawer-remove" onclick="Cart.remove('${item.id}')" title="Remove" aria-label="Remove">${_SVG.close}</button>
      </div>`;
  }).join('');
  body.innerHTML = htmlItems;
  const cfg = window.DETOXY_CONFIG||{};
  const freeAt = cfg.freeShippingAt||999;
  const ship = subtotal >= freeAt ? 0 : (cfg.defaultShipping||60);
  const total = subtotal + ship;
  footer.innerHTML = `
    <div class="drawer-subtotal-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString()}</span></div>
    <div class="drawer-ship-note">${ship===0 ? `${_SVG.check} Free shipping applied` : `${_SVG.truck} Add ₹${freeAt-subtotal} more for free shipping`}</div>
    <div class="drawer-btns">
      <a href="${_prefix}cart.html" class="btn btn-outline btn-full">View Cart</a>
      <a href="${_prefix}checkout.html" class="btn btn-primary btn-full">Checkout</a>
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
      <div class="search-row">
        ${_SVG.search}
        <input type="text" id="search-input" placeholder="Search hijama products…" autocomplete="off">
        <button class="drawer-close" onclick="closeSearch()" aria-label="Close">${_SVG.close}</button>
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
      <a class="search-item" href="${_prefix}products/${p.id}.html">
        <img class="search-item-img" src="${fixImg(p.images&&p.images[0])}" alt="${p.name}"
          onerror="this.src='https://placehold.co/44x44/e8f5f2/2aab97?text=P'">
        <div>
          <div class="search-item-name">${p.name}</div>
          <div class="search-item-price">₹${p.price.toLocaleString()}${p.mrp?` <span style="color:var(--ink-dim);font-size:.75rem;text-decoration:line-through;margin-left:4px">₹${p.mrp}</span>`:''}</div>
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
  /* SVG icons — inline, no emoji, no external dep */
  const iconSearch = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
  const iconCart   = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`;
  return `
<nav class="nav" id="main-nav">
  <div class="nav-inner">
    <a href="${p}index.html" class="nav-logo">
      <img src="${p}assets/logo.png" alt="Detoxy Hijama" class="nav-logo-img" onerror="this.src='${p}assets/logo.svg';this.onerror=null;">
      <div>
        <div class="nav-logo-name">Detoxy Hijama</div>
        <div class="nav-logo-sub">Manufacturer Direct</div>
      </div>
    </a>
    <div class="nav-links">${linksHTML}</div>
    <div class="nav-actions">
      <button class="nav-icon-btn" onclick="openSearch()" aria-label="Search">${iconSearch}</button>
      <button class="nav-cart-btn" onclick="openCartDrawer()" aria-label="Cart">
        ${iconCart}
        <span>Cart</span>
        <span class="cart-badge cart-count"></span>
      </button>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" onclick="toggleMobileNav()">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>
<div class="nav-mobile" id="nav-mobile">
  ${navItems.map(i=>`<a href="${i.href}" class="nav-link${i.label===activeLabel?' active':''}">${i.label}</a>`).join('')}
  <a href="${p}products.html" class="btn btn-primary btn-sm nav-mobile-cta">Shop Products</a>
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
  const phone   = cfg.phone   || '+91 95665 96077';
  const email   = cfg.email   || 'detoxyhijama@gmail.com';
  const address = cfg.address || 'DETOXY HIJAMA, Madurai, Tamil Nadu, India';
  const wa      = (cfg.social||{}).whatsapp || '919566596077';

  /* Official SVG icons for each platform */
  const icons = {
    whatsapp: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`,
    instagram:`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
    telegram: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>`,
    youtube:  `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    facebook: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
    phone:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l1.84-1.84a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    mail:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    pin:      `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    arrow:    `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    shield:   `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    truck:    `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`,
    box:      `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
    refresh:  `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
  };

  const socials = (cfg.social || {});
  const socialLinks = [
    { key:'whatsapp', href:`https://wa.me/${wa}`, title:'WhatsApp', icon: icons.whatsapp },
    { key:'instagram', href: socials.instagram || '#', title:'Instagram', icon: icons.instagram },
    { key:'telegram',  href: socials.telegram  || '#', title:'Telegram',  icon: icons.telegram  },
    { key:'youtube',   href: socials.youtube   || '#', title:'YouTube',   icon: icons.youtube   },
  ].filter(s => s.href !== '#' || s.key === 'whatsapp');

  const socialHTML = socialLinks.map(s =>
    `<a href="${s.href}" target="_blank" rel="noopener" class="footer-social-link" title="${s.title}" aria-label="${s.title}">${s.icon}</a>`
  ).join('');

  return `
<footer class="site-footer">
  <div class="footer-top">
    <div>
      <div class="footer-logo-row">
        <img src="${p}assets/logo.png" alt="Detoxy Hijama" class="footer-logo-img" onerror="this.src='${p}assets/logo.svg';this.onerror=null;">
        <span class="footer-brand">Detoxy Hijama</span>
      </div>
      <p class="footer-desc">India's trusted manufacturer of clinical-grade hijama cups and cupping therapy equipment. Factory-direct pricing, pan-India delivery.</p>
      <div class="footer-social">${socialHTML}</div>
    </div>
    <div>
      <div class="footer-col-title">Products</div>
      <div class="footer-links">
        <a href="${p}products.html">${icons.arrow} All Products</a>
        <a href="${p}products.html?cat=cups">${icons.arrow} Hijama Cups</a>
        <a href="${p}products.html?cat=kits">${icons.arrow} Cupping Kits</a>
        <a href="${p}products.html?cat=consumables">${icons.arrow} Consumables</a>
        <a href="${p}quote.html">${icons.arrow} Bulk / Export Quote</a>
      </div>
    </div>
    <div>
      <div class="footer-col-title">Company</div>
      <div class="footer-links">
        <a href="${p}index.html">${icons.arrow} Home</a>
        <a href="${p}about.html">${icons.arrow} About Us</a>
        <a href="${p}blogs.html">${icons.arrow} Blog</a>
        <a href="${p}contact.html">${icons.arrow} Contact</a>
        <a href="${p}cart.html">${icons.arrow} My Cart</a>
      </div>
    </div>
    <div>
      <div class="footer-col-title">Contact Us</div>
      <div class="footer-contact-item"><span class="footer-contact-icon">${icons.phone}</span><span>${phone}</span></div>
      <div class="footer-contact-item"><span class="footer-contact-icon">${icons.mail}</span><span>${email}</span></div>
      <div class="footer-contact-item"><span class="footer-contact-icon">${icons.pin}</span><span>${address}</span></div>
      <a href="https://wa.me/${wa}?text=Hi+Detoxy+Hijama,+I+need+help" target="_blank" rel="noopener" class="wa-btn btn-full" style="margin-top:14px">
        ${icons.whatsapp} Chat on WhatsApp
      </a>
    </div>
  </div>
  <div class="footer-trust">
    <span class="footer-trust-pill">${icons.shield} Secure Checkout</span>
    <span class="footer-trust-pill">${icons.truck} Pan India Delivery</span>
    <span class="footer-trust-pill">${icons.box} Same-Day Dispatch</span>
    <span class="footer-trust-pill">${icons.refresh} 7-Day Returns</span>
  </div>
  <hr class="footer-divider">
  <div class="footer-bottom">
    <span>© ${new Date().getFullYear()} Detoxy Hijama. All rights reserved.</span>
    <span>Manufacturer · Madurai, Tamil Nadu, India</span>
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

// Detoxy Hijama — Shared utilities & OrderSync
// All admin pages depend on this file.

const OrderSync = (() => {

  const STORAGE_KEY = "detoxy_orders";

  /** Return all orders from localStorage (array). */
  function getLocalOrders() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      console.error("OrderSync: failed to parse orders", e);
      return [];
    }
  }

  /** Save a full orders array to localStorage. */
  function saveLocalOrders(orders) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  /**
   * Add or update a single order in localStorage, then optionally
   * push it to Google Sheets if a URL is configured.
   */
  function submit(order) {
    const orders = getLocalOrders();
    const idx = orders.findIndex(o => o.id === order.id);
    if (idx >= 0) {
      orders[idx] = order;
    } else {
      orders.push(order);
    }
    saveLocalOrders(orders);

    // Async push to Google Sheets (silent fail if not configured)
    const url = (window.DETOXY_CONFIG || {}).sheetsUrl
              || localStorage.getItem("detoxy_sheets_url");
    if (url) {
      // Map local order field names to what apps-script.gs expects,
      // and wrap with action:'placeOrder' so the script routes correctly.
      // BUG FIX: Previously sent raw order object without an `action` field,
      // causing apps-script to return "Unknown action: undefined".
      // BUG FIX: Field names now match the apps-script column mapping.
      const nameParts = (order.name || "").trim().split(" ");
      const payload = {
        action:       "placeOrder",
        orderNumber:  order.id        || "",
        status:       order.status    || "New",
        createdAt:    order.savedAt   ? new Date(order.savedAt).toISOString() : new Date().toISOString(),
        firstName:    nameParts[0]    || "",
        lastName:     nameParts.slice(1).join(" ") || "",
        email:        order.email     || "",
        phone:        order.phone     || "",
        address1:     order.address   || "",
        address2:     order.address2  || "",
        city:         order.city      || "",
        state:        order.state     || "",
        pincode:      order.pincode   || "",
        itemsSummary: order.items     || "",
        items:        order.items     || "",
        subtotal:     order.subtotal  || order.total || 0,
        shippingCost: order.shipping  || 0,
        codFee:       order.codFee    || 0,
        total:        order.total     || order.subtotal || 0,
        payment:      order.payment   || "",
        notes:        order.notes     || "",
        type:         order.type      || ""
      };
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).catch(() => { /* silent */ });
    }

    return order;
  }

  /** Generate a unique order ID. */
  function generateId() {
    const now = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
    return "DH-" + now + rand;
  }

  /** Count orders by status. */
  function countByStatus(status) {
    return getLocalOrders().filter(o => (o.status || "New") === status).length;
  }

  /** Calculate total revenue (all non-cancelled orders). */
  function totalRevenue() {
    return getLocalOrders()
      .filter(o => o.status !== "Cancelled")
      .reduce((sum, o) => sum + parseFloat(o.subtotal || o.total || 0), 0);
  }

  return { getLocalOrders, saveLocalOrders, submit, generateId, countByStatus, totalRevenue };
})();


// ─── Cart ─────────────────────────────────────────────────────────────────────
// Used by cart.html, checkout.html, and all product pages.
const Cart = (() => {
  const KEY = 'detoxy_cart';

  function get() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
    catch(e) { return []; }
  }

  function save(items) {
    localStorage.setItem(KEY, JSON.stringify(items));
    _dispatch();
  }

  /**
   * Add a product to cart by id and quantity.
   * productId must match an id in the products catalogue.
   */
  function add(productId, qty) {
    qty = parseInt(qty) || 1;
    const items = get();
    const idx   = items.findIndex(i => i.id === productId);
    if (idx >= 0) {
      items[idx].qty = Math.max(1, items[idx].qty + qty);
    } else {
      // Look up product details from global PRODUCTS array if available
      let name  = productId.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
      let price = 0;
      let img   = '';
      // Check window.PRODUCTS first, then fall back to DETOXY_CONFIG.products
      const _catalog = window.PRODUCTS || (window.DETOXY_CONFIG && window.DETOXY_CONFIG.products) || [];
      if (_catalog.length) {
        const p = _catalog.find(p => p.id === productId);
        if (p) { name = p.name; price = p.price; img = p.images ? p.images[0] : ''; }
      }
      items.push({ id: productId, name, price, img, qty });
    }
    save(items);
    _showToast('Added to cart ✓');
  }

  function remove(productId) {
    save(get().filter(i => i.id !== productId));
  }

  function updateQty(productId, qty) {
    const items = get();
    const idx   = items.findIndex(i => i.id === productId);
    if (idx >= 0) { items[idx].qty = Math.max(1, qty); save(items); }
  }

  function clear() { localStorage.removeItem(KEY); _dispatch(); }

  function count()  { return get().reduce((s,i) => s + (i.qty||1), 0); }
  function total()  { return get().reduce((s,i) => s + (i.price||0)*(i.qty||1), 0); }

  function _dispatch() {
    window.dispatchEvent(new CustomEvent('cartUpdated', { detail: { count: count() } }));
    // Update any cart-count badges on the page
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
      toast.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#0d1f1b;color:#5eead4;padding:12px 20px;border-radius:10px;font-size:.85rem;font-weight:600;z-index:9999;opacity:0;transform:translateY(10px);transition:all .3s;pointer-events:none;font-family:Outfit,sans-serif';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateY(10px)'; }, 2200);
  }

  // Initialise badge count on page load
  document.addEventListener('DOMContentLoaded', () => _dispatch());

  return { get, save, add, remove, updateQty, clear, count, total };
})();


// ─── Navigation & Footer Components ──────────────────────────────────────────
// Returns the nav HTML using style.css class names.
// activeLabel: highlight current page link. prefix: '../' for subdir pages.
function getNavHTML(activeLabel, prefix) {
  prefix = prefix || '';
  var navItems = [
    { label:'Home',     href: prefix + 'index.html' },
    { label:'Products', href: prefix + 'products.html' },
    { label:'Blogs',    href: prefix + 'blogs.html' },
    { label:'Quote',    href: prefix + 'quote.html' },
    { label:'Contact',  href: prefix + 'contact.html' },
  ];
  var links = navItems.map(function(item){
    var cls = 'nav-link' + (item.label === activeLabel ? ' nav-link--active' : '');
    return '<a href="'+item.href+'" class="'+cls+'">'+item.label+'</a>';
  }).join('');
  var cartCount = (window.Cart ? window.Cart.count() : 0);
  var cartDisplay = cartCount > 0 ? 'flex' : 'none';
  return '<header class="site-header" id="mainNav">' +
    '<a href="'+prefix+'index.html" class="brand" style="text-decoration:none">' +
      '<div style="width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,var(--t),#1a8577);display:flex;align-items:center;justify-content:center;font-family:\'Cormorant Garamond\',serif;font-size:1.1rem;font-weight:700;color:#fff;flex-shrink:0">D</div>' +
      '<div class="brand-name-wrap">' +
        '<span class="brand-main">Detoxy Hijama</span>' +
        '<span class="brand-sub">Cups · Coimbatore</span>' +
      '</div>' +
    '</a>' +
    '<nav class="site-nav">'+links+'</nav>' +
    '<div class="header-actions">' +
      '<a href="'+prefix+'cart.html" class="cart-btn" aria-label="Cart">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' +
        '<span class="cart-count" style="display:'+cartDisplay+'">'+cartCount+'</span>' +
      '</a>' +
    '</div>' +
    '<button class="hamburger" onclick="document.getElementById(\'mob-nav-overlay\').classList.toggle(\'open\')" aria-label="Menu">☰</button>' +
    '<div id="mob-nav-overlay" class="mob-nav">' +
      '<div class="mob-top">' +
        '<span style="font-family:\'Cormorant Garamond\',serif;font-size:1.1rem;font-weight:700;color:#fff">Detoxy Hijama</span>' +
        '<button class="mob-close" onclick="document.getElementById(\'mob-nav-overlay\').classList.remove(\'open\')" aria-label="Close">✕</button>' +
      '</div>' +
      navItems.map(function(item){
        return '<a class="mob-link" href="'+item.href+'">'+item.label+'</a>';
      }).join('') +
      '<a href="'+prefix+'cart.html" class="mob-link" style="color:var(--tl)">🛒 Cart ('+cartCount+')</a>' +
    '</div>' +
  '</header>';
}

// Returns the footer HTML using style.css class names.
function getFooterHTML(prefix) {
  prefix = prefix || '';
  var year = new Date().getFullYear();
  return '<footer style="background:var(--dark);color:#fff;padding:60px 5% 28px;margin-top:auto">' +
    '<div class="footer-inner">' +
      '<div>' +
        '<div class="footer-brand-name">Detoxy Hijama</div>' +
        '<p class="footer-desc">India's trusted hijama equipment manufacturer. Factory-direct prices, premium quality, pan-India delivery from Coimbatore, Tamil Nadu.</p>' +
        '<div style="font-size:.77rem;color:rgba(255,255,255,.4);line-height:2;margin-top:12px">' +
          '📍 Pollachi, TN 642005<br>' +
          '📞 <a href="tel:+919566596077" style="color:rgba(255,255,255,.5)">+91 95665 96077</a><br>' +
          '✉ <a href="mailto:detoxyhijama@gmail.com" style="color:rgba(255,255,255,.5)">detoxyhijama@gmail.com</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-col"><h4>Quick Links</h4><ul>' +
        '<li><a href="'+prefix+'index.html">Home</a></li>' +
        '<li><a href="'+prefix+'products.html">All Products</a></li>' +
        '<li><a href="'+prefix+'blogs.html">Blog</a></li>' +
        '<li><a href="'+prefix+'about.html">About Us</a></li>' +
        '<li><a href="'+prefix+'contact.html">Contact</a></li>' +
      '</ul></div>' +
      '<div class="footer-col"><h4>Products</h4><ul>' +
        '<li><a href="'+prefix+'products/electric-smart-cup.html">Electric Smart Cup</a></li>' +
        '<li><a href="'+prefix+'products/premium-cups.html">Premium Cups</a></li>' +
        '<li><a href="'+prefix+'products/silicone-facial-4.html">Silicone Facial Set</a></li>' +
        '<li><a href="'+prefix+'products/magnetic-vacuum-kit.html">Vacuum Kit</a></li>' +
        '<li><a href="'+prefix+'products/lancet-pen.html">Lancet Pen</a></li>' +
      '</ul></div>' +
      '<div class="footer-col"><h4>Get In Touch</h4><ul>' +
        '<li><a href="https://wa.me/919566596077" target="_blank" rel="noopener">💬 WhatsApp Us</a></li>' +
        '<li><a href="mailto:detoxyhijama@gmail.com">📧 Email Us</a></li>' +
        '<li><a href="'+prefix+'quote.html">📋 Bulk Quote</a></li>' +
        '<li><a href="'+prefix+'cart.html">🛒 Cart</a></li>' +
      '</ul></div>' +
    '</div>' +
    '<div class="footer-bottom">' +
      '<p>© '+year+' Detoxy Hijama. All rights reserved.</p>' +
      '<p>Made in India 🇮🇳 | Hijama Equipment Manufacturer, Coimbatore</p>' +
    '</div>' +
  '</footer>';
}


// ─── Product Card HTML ────────────────────────────────────────────────────────
// Renders a product card for grids on index.html and products.html.
// prefix: '' for root pages, '../' for subdir pages.
function getProductCardHTML(p, prefix) {
  prefix = prefix || '';
  var img = (p.images && p.images[0])
    ? p.images[0]
    : 'https://placehold.co/320x220/1a3d35/2dd4bf?text=' + encodeURIComponent(p.name);
  var discount = p.mrp > p.price
    ? '<span class="prod-discount">-' + Math.round((1 - p.price/p.mrp)*100) + '%</span>'
    : '';
  var badge = p.badge
    ? '<span class="prod-badge">' + p.badge + '</span>'
    : '';
  var stars = p.rating
    ? '<span style="color:#f59e0b;font-size:.78rem">★ ' + p.rating + '</span>'
    : '';
  return '<div class="prod-card reveal-scale">' +
    '<a href="' + prefix + 'products/' + p.id + '.html" style="display:block;text-decoration:none">' +
      '<div class="prod-img-wrap">' +
        '<img src="' + img + '" alt="' + p.name + '" class="prod-img lazy" loading="lazy" onerror="this.src=\'https://placehold.co/320x220/1a3d35/2dd4bf?text=Detoxy\'">' +
        badge + discount +
      '</div>' +
      '<div class="prod-body">' +
        '<div class="prod-name">' + p.name + '</div>' +
        (p.desc ? '<div class="prod-desc">' + p.desc + '</div>' : '') +
        '<div class="prod-price-row">' +
          '<span class="prod-price">₹' + p.price + ' <small style="font-size:.7em;font-weight:400;color:var(--muted)">' + (p.unit||'') + '</small></span>' +
          (p.mrp > p.price ? '<span class="prod-mrp">₹' + p.mrp + '</span>' : '') +
          stars +
        '</div>' +
      '</div>' +
    '</a>' +
    '<div class="prod-actions">' +
      '<button class="btn btn-primary" style="flex:1;font-size:.82rem;padding:9px 14px" onclick="Cart.add(\'' + p.id + '\',1)">' +
        'Add to Cart' +
      '</button>' +
      '<a href="' + prefix + 'products/' + p.id + '.html" class="btn btn-outline" style="font-size:.82rem;padding:9px 14px">View →</a>' +
    '</div>' +
  '</div>';
}

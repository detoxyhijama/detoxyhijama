// ============================================================
// DETOXY HIJAMA — SITE CONFIGURATION
// Replace APPS_SCRIPT_URL after deploying Google Apps Script
// ============================================================

const DETOXY_CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzFt2178utJfKENXEurMTrzVQ7CuhMd_LNmdeB7xPc/exec',
  WHATSAPP_NUMBER: '919566596077',
  WHATSAPP_BULK:   '919566596077',
  EMAIL: 'detoxyhijama@gmail.com',
  PHONE: '+91-9566596077',
  LINKEDIN_URL: 'https://www.linkedin.com/company/detoxy-hijama',
  ADDRESS: 'Pollachi, Coimbatore, Tamil Nadu 642005',
  SITE_URL: 'https://detoxyhijama.github.io',
  BRAND: 'Detoxy Hijama Cups',
};

// Cart Utility
const Cart = {
  get() { try { return JSON.parse(localStorage.getItem('dh_cart') || '[]'); } catch(e){return[];} },
  save(items) { localStorage.setItem('dh_cart', JSON.stringify(items)); Cart.updateBadge(); },
  add(product) {
    const items = Cart.get();
    const idx = items.findIndex(i => i.id === product.id);
    if (idx > -1) { items[idx].qty += (product.qty || 1); }
    else { items.push({...product, qty: product.qty || 1}); }
    Cart.save(items);
    Cart.showToast(`${product.name} added to cart!`);
  },
  remove(id) { Cart.save(Cart.get().filter(i => i.id !== id)); },
  clear() { Cart.save([]); },
  count() { return Cart.get().reduce((s,i) => s + i.qty, 0); },
  total() { return Cart.get().reduce((s,i) => s + i.price * i.qty, 0); },
  updateBadge() {
    document.querySelectorAll('.cart-badge').forEach(b => {
      const c = Cart.count();
      b.textContent = c;
      b.style.display = c > 0 ? 'flex' : 'none';
    });
  },
  showToast(msg) {
    let t = document.getElementById('cartToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'cartToast';
      t.style.cssText = 'position:fixed;bottom:90px;right:24px;background:#0b1f1c;color:#fff;padding:12px 20px;border-radius:12px;font-size:.83rem;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.3);opacity:0;transition:opacity .3s;font-family:Outfit,sans-serif;border-left:3px solid #2aab97;max-width:280px';
      document.body.appendChild(t);
    }
    t.textContent = '🛒 ' + msg;
    t.style.opacity = '1';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => { t.style.opacity = '0'; }, 3000);
  }
};

// API Utility
const API = {
  async call(action, data = {}) {
    try {
      const url = DETOXY_CONFIG.APPS_SCRIPT_URL;
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, ...data })
      });
      return await resp.json();
    } catch(e) {
      console.error('API Error:', e);
      return { success: false, error: e.message };
    }
  },
  async placeOrder(orderData) { return API.call('placeOrder', orderData); },
  async getOrders(filters) { return API.call('getOrders', filters); },
  async updateOrder(id, updates) { return API.call('updateOrder', { id, updates }); },
  async getProducts() { return API.call('getProducts'); },
  async updateProduct(id, data) { return API.call('updateProduct', { id, data }); },
  async getCustomers() { return API.call('getCustomers'); },
  async getShipments() { return API.call('getShipments'); },
  async updateShipment(id, data) { return API.call('updateShipment', { id, data }); },
  async login(email, password, role) { return API.call('login', { email, password, role }); }
};

// WhatsApp helpers
function waOrder(productName, qty, price) {
  const msg = encodeURIComponent(`Hi, I want to order from Detoxy Hijama:\n\nProduct: ${productName}\nQty: ${qty || 1}\nPrice: ₹${price}\n\nPlease confirm availability and delivery details.`);
  return `https://wa.me/${DETOXY_CONFIG.WHATSAPP_NUMBER}?text=${msg}`;
}
function waBulk(productName) {
  const msg = encodeURIComponent(`Hi, I need BULK pricing for:\n${productName}\n\nPlease send me wholesale rates and minimum order details.`);
  return `https://wa.me/${DETOXY_CONFIG.WHATSAPP_BULK}?text=${msg}`;
}

// Init on load
document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());

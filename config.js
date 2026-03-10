// ============================================================
// DETOXY HIJAMA — ECOMMERCE CONFIG
// ============================================================

const SITE = {
  NAME: 'Detoxy Hijama',
  TAGLINE: 'India\'s Direct Hijama Manufacturer',
  EMAIL: 'detoxyhijama@gmail.com',
  PHONE: '+91-9566596077',
  ADDRESS: 'Pollachi, Coimbatore, Tamil Nadu 642005',
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzFt2178utJfKENXEurMTrzVQ7CuhMd_LNmdeB7xPc/exec',
  FREE_SHIPPING_ABOVE: 999,
  SHIPPING_CHARGE: 80,
};

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'cups', label: 'Hijama Cups' },
  { id: 'kits', label: 'Kits & Sets' },
  { id: 'tools', label: 'Tools' },
  { id: 'consumables', label: 'Consumables' },
  { id: 'facial', label: 'Facial Care' },
];

const PRODUCTS = [
  {
    id: 'standard-cups',
    name: 'Standard Hijama Cup (Indian Made)',
    shortName: 'Standard Cup',
    price: 9,
    mrp: 15,
    bulkPrice: 8,
    bulkMinQty: 5000,
    unit: 'per cup',
    category: 'cups',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 312,
    inStock: true,
    description: 'India\'s most trusted BPA-free medical-grade PVC hijama cup. Available in 6 sizes (1–6). Made at our Pollachi, Coimbatore facility with zero middlemen.',
    features: ['BPA-Free Medical PVC', '6 Sizes Available (1–6)', 'Autoclave-Safe', 'Reusable & Durable', 'Direct Manufacturer Price'],
    specs: { Material: 'Medical-Grade PVC', Sizes: '1, 2, 3, 4, 5, 6', Color: 'Transparent', Origin: 'Made in India', 'Min Order': '1 cup' },
    images: ['assets/images/products/standard-cups/main.jpg'],
  },
  {
    id: 'premium-cups',
    name: 'Premium Transparent Hijama Cup',
    shortName: 'Premium Cup',
    price: 12,
    mrp: 20,
    bulkPrice: 10,
    bulkMinQty: 500,
    unit: 'per cup',
    category: 'cups',
    badge: 'Premium',
    rating: 4.9,
    reviews: 198,
    inStock: true,
    description: 'Ultra-clear clinic-grade premium cups trusted by top practitioners. 6 sizes. Perfect for professionals who demand the best visibility during treatment.',
    features: ['Ultra-Clear Visibility', 'Clinic Grade Quality', '6 Sizes Available', 'High-Grip Valve', 'Professional Standard'],
    specs: { Material: 'Premium Medical PVC', Sizes: '1, 2, 3, 4, 5, 6', Color: 'Ultra Transparent', Origin: 'Made in India', 'Min Order': '1 cup' },
    images: ['assets/images/products/premium-cups/main.jpg'],
  },
  {
    id: 'curve-cups',
    name: 'Curve Cup Size 3 & 4',
    shortName: 'Curve Cup',
    price: 12,
    mrp: 18,
    bulkPrice: 10,
    bulkMinQty: 200,
    unit: 'per cup',
    category: 'cups',
    badge: 'Specialized',
    rating: 4.7,
    reviews: 143,
    inStock: true,
    description: 'Specially curved base design for shoulders, knees and joints. Medical PVC construction for perfect contour fit on uneven body surfaces.',
    features: ['Curved Base Design', 'Perfect for Joints', 'Medical PVC', 'Shoulder & Knee Friendly', 'Sizes 3 & 4'],
    specs: { Material: 'Medical PVC', Sizes: '3, 4', Design: 'Curved Base', Origin: 'Made in India', 'Min Order': '1 cup' },
    images: ['assets/images/products/curve-cups/main.jpg'],
  },
  {
    id: 'electric-smart-cup',
    name: 'Electric Smart Vacuum Cup',
    shortName: 'Electric Smart Cup',
    price: 750,
    mrp: 1200,
    bulkPrice: 700,
    bulkMinQty: 10,
    unit: 'per unit',
    category: 'kits',
    badge: 'Smart Device',
    rating: 4.6,
    reviews: 87,
    inStock: true,
    description: '12-level suction smart cup with 40°C hot compress therapy and USB-C charging. The future of hijama — intelligent, precise, and completely hands-free.',
    features: ['12 Suction Levels', '40°C Hot Compress', 'USB-C Rechargeable', 'Digital Display', 'Automatic Pressure Control'],
    specs: { Suction: '12 Levels', 'Heat Therapy': '40°C', Charging: 'USB-C', Display: 'Digital LED', Origin: 'Made in India' },
    images: ['assets/images/products/electric-smart-cup/main.jpg'],
  },
  {
    id: 'fire-cupping-glass',
    name: 'Fire Cupping Glass Set of 16',
    shortName: 'Fire Glass Set',
    price: 900,
    mrp: 1400,
    bulkPrice: 800,
    bulkMinQty: 10,
    unit: 'per set',
    category: 'kits',
    badge: 'Traditional',
    rating: 4.8,
    reviews: 156,
    inStock: true,
    description: 'Authentic borosilicate glass fire cupping set — 16 cups in 5 sizes with carry bag. Traditional therapy preserved with modern safety standards.',
    features: ['16 Cups Included', '5 Different Sizes', 'Borosilicate Glass', 'Premium Carry Bag', 'Heat Resistant'],
    specs: { Material: 'Borosilicate Glass', Pieces: '16 cups + carry bag', Sizes: '5 sizes', Origin: 'Made in India', Use: 'Fire/Heat Cupping' },
    images: ['assets/images/products/fire-cupping-glass/main.jpg'],
  },
  {
    id: 'magnetic-vacuum-kit',
    name: '24-Set Magnetic Vacuum Cupping Kit',
    shortName: 'Magnetic Vacuum Kit',
    price: 700,
    mrp: 1100,
    bulkPrice: 600,
    bulkMinQty: 10,
    unit: 'per kit',
    category: 'kits',
    badge: 'Professional',
    rating: 4.7,
    reviews: 204,
    inStock: true,
    description: 'Complete 24-cup magnetic vacuum kit with pump gun, magnetic acupuncture needle and pallet. Professional-grade dry cupping for clinics and practitioners.',
    features: ['24 Cups Included', 'Suction Pump Gun', 'Magnetic Needle', 'Carrying Case', 'Professional Grade'],
    specs: { Cups: '24 pieces', 'Extras': 'Pump, Magnetic needle, Pallet', Material: 'Medical ABS', Origin: 'Made in India', Use: 'Dry Cupping' },
    images: ['assets/images/products/magnetic-vacuum-kit/main.jpg'],
  },
  {
    id: 'suction-gun',
    name: 'Hijama Suction Gun',
    shortName: 'Suction Gun',
    price: 160,
    mrp: 250,
    bulkPrice: 140,
    bulkMinQty: 20,
    unit: 'per unit',
    category: 'tools',
    badge: null,
    rating: 4.5,
    reviews: 89,
    inStock: true,
    description: 'Ergonomic pistol-grip suction gun for precise vacuum control. Compatible with sizes 1–6. Professional manual suction for dry cupping therapy.',
    features: ['Ergonomic Pistol Grip', 'Compatible Sizes 1–6', 'Precise Pressure Control', 'Durable ABS Body', 'Easy Release Valve'],
    specs: { Compatible: 'Cups Size 1–6', Grip: 'Ergonomic Pistol', Material: 'Medical ABS', Origin: 'Made in India', Use: 'Manual Suction' },
    images: ['assets/images/products/suction-gun/main.jpg'],
  },
  {
    id: 'lancet-pen',
    name: '3-Lancet Pen Massager',
    shortName: 'Lancet Pen',
    price: 550,
    mrp: 850,
    bulkPrice: 500,
    bulkMinQty: 5,
    unit: 'per unit',
    category: 'tools',
    badge: 'Wet Cupping',
    rating: 4.7,
    reviews: 112,
    inStock: true,
    description: 'Triple-lancet pen with adjustable depth and sterile cartridges. Designed specifically for wet cupping (hijama) incision with maximum precision and hygiene.',
    features: ['3-Lancet Design', 'Adjustable Depth', 'Sterile Cartridges', 'One-Click Action', 'Hygienic Single-Use Tips'],
    specs: { Lancets: '3 per cartridge', Depth: 'Adjustable', Sterility: 'Single-use sterile', Origin: 'Made in India', Use: 'Wet Cupping' },
    images: ['assets/images/products/lancet-pen/main.jpg'],
  },
  {
    id: 'surgical-blade',
    name: 'Surgical Blade No.11 — Pack of 100',
    shortName: 'Surgical Blade',
    price: 250,
    mrp: 400,
    bulkPrice: 220,
    bulkMinQty: 10,
    unit: 'pack of 100',
    category: 'consumables',
    badge: 'CE Marked',
    rating: 4.9,
    reviews: 267,
    inStock: true,
    description: 'CE-marked No.11 surgical blades — sterile, individually wrapped, 100 per pack. Precision point for controlled hijama incisions.',
    features: ['CE Marked', 'Individually Sterile Wrapped', 'No.11 Precision Point', '100 per Pack', 'Stainless Steel'],
    specs: { Size: 'No. 11', Sterility: 'Individually wrapped', Certification: 'CE Marked', Count: '100 blades/pack', Material: 'Stainless Steel' },
    images: ['assets/images/products/surgical-blade/main.jpg'],
  },
  {
    id: 'latex-gloves',
    name: 'Premium Latex Gloves — Pack of 100',
    shortName: 'Latex Gloves',
    price: 320,
    mrp: 500,
    bulkPrice: 280,
    bulkMinQty: 10,
    unit: 'box of 100',
    category: 'consumables',
    badge: 'Medical Grade',
    rating: 4.6,
    reviews: 178,
    inStock: true,
    description: 'Medical-grade powder-free latex gloves in S/M/L sizes. Essential protective equipment for every hijama session. 100 gloves per box.',
    features: ['Powder-Free', 'Medical Grade', 'Sizes: S / M / L', '100 per Box', 'Tear Resistant'],
    specs: { Material: 'Natural Latex', Sizes: 'S, M, L', Count: '100/box', Type: 'Powder-free examination', Origin: 'Made in India' },
    images: ['assets/images/products/latex-gloves/main.jpg'],
  },
  {
    id: 'surgical-cotton',
    name: 'Surgical Cotton — 400g Roll',
    shortName: 'Surgical Cotton',
    price: 160,
    mrp: 240,
    bulkPrice: 140,
    bulkMinQty: 20,
    unit: 'per 400g roll',
    category: 'consumables',
    badge: null,
    rating: 4.5,
    reviews: 94,
    inStock: true,
    description: 'Sterile, highly absorbent surgical cotton — 400g roll for hijama aftercare and wound management. Essential for every clinic and practitioner.',
    features: ['Sterile Processed', '400g Roll', 'High Absorbency', 'Lint-Free', 'Aftercare Essential'],
    specs: { Weight: '400g', Type: 'Sterile absorbent cotton', Use: 'Wound care & aftercare', Origin: 'Made in India', Form: 'Roll' },
    images: ['assets/images/products/surgical-cotton/main.jpg'],
  },
  {
    id: 'bamboo-cupping-set',
    name: 'Bamboo Cupping Set',
    shortName: 'Bamboo Set',
    price: 500,
    mrp: 750,
    bulkPrice: 450,
    bulkMinQty: 5,
    unit: 'per set',
    category: 'kits',
    badge: 'Eco Friendly',
    rating: 4.6,
    reviews: 63,
    inStock: true,
    description: 'Natural bamboo cupping set — antibacterial, eco-friendly, and biodegradable. Traditional therapy rooted in nature with modern hygiene standards.',
    features: ['100% Natural Bamboo', 'Antibacterial Properties', 'Eco-Friendly', 'Biodegradable', 'Traditional Design'],
    specs: { Material: 'Natural Bamboo', Certification: 'Antibacterial', Type: 'Traditional', Origin: 'Made in India', Eco: 'Biodegradable' },
    images: ['assets/images/products/bamboo-cupping-set/main.jpg'],
  },
  {
    id: 'silicone-facial-4',
    name: 'Silicone Facial Cup — Set of 4',
    shortName: 'Facial Cup (4 pcs)',
    price: 250,
    mrp: 380,
    bulkPrice: 220,
    bulkMinQty: 20,
    unit: 'set of 4',
    category: 'facial',
    badge: 'Beauty',
    rating: 4.8,
    reviews: 241,
    inStock: true,
    description: 'Medical-grade silicone facial cups for lymphatic drainage and anti-aging therapy. Gentle suction for face, neck and décolleté. Set of 4 sizes.',
    features: ['Medical Grade Silicone', '4 Sizes in Set', 'Lymphatic Drainage', 'Anti-Aging Therapy', 'Gentle on Skin'],
    specs: { Material: 'Medical Silicone', Pieces: '4 cups', Use: 'Face & Neck', Therapy: 'Lymphatic/Anti-aging', Origin: 'Made in India' },
    images: ['assets/images/products/silicone-facial-4/main.jpg'],
  },
  {
    id: 'silicone-facial-7',
    name: 'Silicone Facial Cup — Set of 7',
    shortName: 'Facial Cup (7 pcs)',
    price: 600,
    mrp: 950,
    bulkPrice: 550,
    bulkMinQty: 10,
    unit: 'set of 7',
    category: 'facial',
    badge: 'Pro Beauty',
    rating: 4.9,
    reviews: 135,
    inStock: true,
    description: 'Professional 7-piece beauty-grade silicone facial set covering all facial zones — face, neck, eyes, and lips. Complete professional facial cupping kit.',
    features: ['7 Professional Sizes', 'All Facial Zones', 'Beauty Grade Silicone', 'Face + Neck + Eyes', 'Professional Kit'],
    specs: { Material: 'Beauty Grade Silicone', Pieces: '7 cups', Use: 'Full Face, Neck & Eyes', Origin: 'Made in India', Level: 'Professional' },
    images: ['assets/images/products/silicone-facial-7/main.jpg'],
  },
  {
    id: 'silicone-moving-cups',
    name: 'Silicone Moving Cup — Set of 4',
    shortName: 'Moving Cup Set',
    price: 700,
    mrp: 1050,
    bulkPrice: 650,
    bulkMinQty: 10,
    unit: 'set of 4',
    category: 'cups',
    badge: 'Dynamic',
    rating: 4.7,
    reviews: 108,
    inStock: true,
    description: 'Dynamic sliding therapy cups — 4 sizes for deep tissue massage and gliding cupping. The motion creates powerful lymphatic and muscle relief.',
    features: ['4 Sizes Included', 'Sliding/Gliding Therapy', 'Deep Tissue Action', 'Medical Silicone', 'Massage + Cupping'],
    specs: { Material: 'Medical Silicone', Pieces: '4 cups', Therapy: 'Sliding/Gliding', Origin: 'Made in India', Use: 'Dynamic Cupping' },
    images: ['assets/images/products/silicone-moving-cups/main.jpg'],
  },
];

// ============================================================
// CART ENGINE
// ============================================================
const Cart = {
  KEY: 'dh_cart_v2',
  get() { try { return JSON.parse(localStorage.getItem(this.KEY) || '[]'); } catch(e){ return []; } },
  save(items) { localStorage.setItem(this.KEY, JSON.stringify(items)); this.updateBadge(); },
  add(productId, qty = 1, variant = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const items = this.get();
    const key = variant ? `${productId}_${variant}` : productId;
    const idx = items.findIndex(i => i.key === key);
    if (idx > -1) { items[idx].qty += qty; }
    else { items.push({ key, id: productId, name: product.name, price: product.price, image: product.images[0], unit: product.unit, qty, variant }); }
    this.save(items);
    this.toast(`${product.shortName} added to cart!`);
  },
  remove(key) { this.save(this.get().filter(i => i.key !== key)); },
  update(key, qty) {
    const items = this.get();
    const idx = items.findIndex(i => i.key === key);
    if (idx > -1) { if (qty < 1) { items.splice(idx, 1); } else { items[idx].qty = qty; } }
    this.save(items);
  },
  clear() { this.save([]); },
  count() { return this.get().reduce((s,i) => s + i.qty, 0); },
  subtotal() { return this.get().reduce((s,i) => s + i.price * i.qty, 0); },
  shipping() { return this.subtotal() >= SITE.FREE_SHIPPING_ABOVE ? 0 : SITE.SHIPPING_CHARGE; },
  total() { return this.subtotal() + this.shipping(); },
  updateBadge() {
    document.querySelectorAll('.cart-count').forEach(b => {
      const cnt = this.count();
      b.textContent = cnt;
      b.style.display = cnt > 0 ? 'flex' : 'none';
    });
  },
  toast(msg) {
    let t = document.getElementById('dh-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'dh-toast';
      t.style.cssText = 'position:fixed;bottom:24px;right:24px;background:#0b1f1c;color:#fff;padding:13px 20px;border-radius:12px;font-size:.84rem;z-index:99999;box-shadow:0 8px 32px rgba(0,0,0,.35);opacity:0;transform:translateY(8px);transition:all .3s;font-family:Outfit,sans-serif;border-left:3px solid #2aab97;max-width:300px;pointer-events:none;';
      document.body.appendChild(t);
    }
    t.innerHTML = `<span style="margin-right:8px">✓</span>${msg}`;
    t.style.opacity = '1';
    t.style.transform = 'translateY(0)';
    clearTimeout(t._t);
    t._t = setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(8px)'; }, 2800);
  }
};

// ============================================================
// ORDER ENGINE
// ============================================================
const Orders = {
  async place(orderData) {
    try {
      const resp = await fetch(SITE.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'placeOrder', ...orderData })
      });
      return await resp.json();
    } catch(e) {
      console.error(e);
      return { success: false, error: e.message };
    }
  },
  async getAll(filters = {}) {
    try {
      const resp = await fetch(SITE.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getOrders', ...filters })
      });
      return await resp.json();
    } catch(e) { return { success: false }; }
  },
  async update(id, updates) {
    try {
      const resp = await fetch(SITE.APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'updateOrder', id, updates })
      });
      return await resp.json();
    } catch(e) { return { success: false }; }
  }
};

// Init cart badge on load
document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());

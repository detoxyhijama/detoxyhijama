/* ═══════════════════════════════════════════
   DETOXY HIJAMA — Shared Components & Utils
════════════════════════════════════════════ */

// ── Config ──────────────────────────────────
const SITE = {
  name: 'Detoxy Hijama',
  tagline: 'Hijama Cupping Specialists',
  baseUrl: 'https://detoxyhijama.github.io',
  whatsapp: '919566596077',
  phone: '+91 95665 96077',
  email: 'detoxyhijama@gmail.com',
  address: 'Pollachi, Coimbatore, Tamil Nadu, India',
  freeShippingAt: 999,
  defaultShipping: 60,
  sheetsUrl: localStorage.getItem('detoxy_sheets_url') || '',
  social: {
    whatsapp:  'https://wa.me/919566596077',
    instagram: 'https://instagram.com/detoxyhijama_',
    facebook:  'https://facebook.com/detoxyhijama',
    telegram:  'https://t.me/detoxyhijama',
    gmail:     'mailto:detoxyhijama@gmail.com',
    youtube:   'https://youtube.com/@detoxyhijama'
  }
};

// ── Products Data ─────────────────────────────
const PRODUCTS = [
  {
    id: 'premium-cups',
    name: 'Detoxy Hijama Premium Silicone Cups',
    slug: 'premium-cups',
    category: 'cups',
    categoryLabel: 'Cupping Sets',
    price: 649,
    mrp: 999,
    rating: 4.8,
    reviews: 214,
    stock: 50,
    badge: 'Best Seller',
    badgeType: 'teal',
    shortDesc: 'Medical-grade silicone cupping set for professional hijama therapy.',
    description: 'Detoxy Hijama Premium Silicone Cups are crafted from 100% medical-grade silicone, ensuring safe and effective cupping therapy. The flexible material allows for precise pressure control, making them ideal for both wet and dry cupping. Each set includes 12 cups in various sizes to cover different body areas.',
    features: ['12 cups in 4 sizes', 'Medical-grade silicone', 'BPA-free material', 'Easy suction control', 'Sterilizable & reusable'],
    specs: { Material: 'Medical-grade silicone', Sizes: '4 sizes (S/M/L/XL)', Quantity: '12 cups per set', Usage: 'Wet & Dry cupping', Sterilization: 'Autoclave safe' },
    images: ['assets/images/products/premium-cups/main.jpg','assets/images/products/premium-cups/image2.jpg','assets/images/products/premium-cups/image3.jpg','assets/images/products/premium-cups/image4.jpg','assets/images/products/premium-cups/image5.jpg','assets/images/products/premium-cups/image6.jpg']
  },
  {
    id: 'electric-smart-cup',
    name: 'Detoxy Hijama Electric Smart Cupping Device',
    slug: 'electric-smart-cup',
    category: 'electric',
    categoryLabel: 'Electric Devices',
    price: 1899,
    mrp: 2999,
    rating: 4.7,
    reviews: 89,
    stock: 20,
    badge: 'New Arrival',
    badgeType: 'dark',
    shortDesc: 'Smart electric cupping device with adjustable suction levels and heat therapy.',
    description: 'Detoxy Hijama Electric Smart Cupping Device combines traditional hijama therapy with modern technology. Features adjustable suction strength (1-9 levels), built-in heat therapy, and rechargeable battery. Perfect for clinics and home use with zero manual effort required.',
    features: ['9 suction levels', 'Built-in heat therapy', 'Rechargeable USB-C', 'Auto-pressure control', 'LCD display'],
    specs: { Power: 'USB-C rechargeable', Battery: '2000mAh', Suction: '9 adjustable levels', Heat: '40°C – 50°C', Display: 'LCD panel' },
    images: ['assets/images/products/electric-smart-cup/main.jpg','assets/images/products/electric-smart-cup/image2.jpg','assets/images/products/electric-smart-cup/image3.jpg','assets/images/products/electric-smart-cup/image4.jpg','assets/images/products/electric-smart-cup/image5.jpg']
  },
  {
    id: 'fire-cupping-glass',
    name: 'Detoxy Hijama Fire Cupping Glass Set',
    slug: 'fire-cupping-glass',
    category: 'cups',
    categoryLabel: 'Cupping Sets',
    price: 549,
    mrp: 799,
    rating: 4.6,
    reviews: 156,
    stock: 35,
    badge: 'Trending',
    badgeType: 'cream',
    shortDesc: 'Authentic borosilicate glass fire cupping set used in traditional Sunnah hijama.',
    description: 'Detoxy Hijama Fire Cupping Glass Set is crafted from premium borosilicate glass, designed for the classic Sunnah hijama method. High heat resistance ensures safe fire cupping. Smooth rounded edges prevent skin irritation. Set of 16 cups in three sizes for full-body coverage.',
    features: ['16 borosilicate glass cups', 'Heat resistant up to 500°C', 'Smooth rounded rims', '3 sizes included', 'Professional clinic grade'],
    specs: { Material: 'Borosilicate glass', Sizes: 'Small / Medium / Large', Quantity: '16 cups per set', Heat: 'Up to 500°C', Thickness: '3mm wall' },
    images: ['assets/images/products/fire-cupping-glass/main.jpg','assets/images/products/fire-cupping-glass/image2.jpg','assets/images/products/fire-cupping-glass/image3.jpg']
  },
  {
    id: 'magnetic-vacuum-kit',
    name: 'Detoxy Hijama 24-Set Magnetic Vacuum Cupping Kit',
    slug: 'magnetic-vacuum-kit',
    category: 'kits',
    categoryLabel: 'Starter Kits',
    price: 1149,
    mrp: 1699,
    rating: 4.9,
    reviews: 73,
    stock: 18,
    badge: 'Top Rated',
    badgeType: 'teal',
    shortDesc: 'Complete 24-piece magnetic vacuum cupping kit with pump gun and cups in 4 sizes.',
    description: 'Detoxy Hijama 24-Set Magnetic Vacuum Cupping Kit is a comprehensive set designed for professional hijama practitioners. Includes a precision vacuum pump gun with magnetic lock system, 24 high-quality cups in 4 sizes, and extension hose. The magnetic connector ensures airtight sealing every time.',
    features: ['24 cups (4 sizes)', 'Magnetic vacuum pump', 'Airtight seal technology', 'Extension hose included', 'Carry case included'],
    specs: { Cups: '24 pcs in 4 sizes', Pump: 'Magnetic lock system', Material: 'ABS + silicone', Includes: 'Pump, cups, case, hose', Usage: 'Professional & home' },
    images: ['assets/images/products/magnetic-vacuum-kit/main.jpg','assets/images/products/magnetic-vacuum-kit/image2.jpg']
  },
  {
    id: 'curve-cups',
    name: 'Detoxy Hijama Curve Cup Set (Size 3 & 4)',
    slug: 'curve-cups',
    category: 'cups',
    categoryLabel: 'Cupping Sets',
    price: 749,
    mrp: 1099,
    rating: 4.5,
    reviews: 62,
    stock: 28,
    badge: null,
    shortDesc: 'Ergonomically curved cups designed for joints, shoulders and curved body areas.',
    description: 'Detoxy Hijama Curve Cups feature a unique ergonomic design that adapts to curved body surfaces like shoulders, knees, and joints. Made from flexible medical-grade silicone, these cups deliver optimal suction even on uneven surfaces, ideal for targeted therapy in hard-to-reach areas.',
    features: ['Ergonomic curved design', 'Flexible silicone', 'Fits curved body parts', 'Deep tissue therapy', 'Sizes No. 3 & 4'],
    specs: { Design: 'Ergonomic curve', Material: 'Medical silicone', Sizes: 'No. 3 & 4', Ideal: 'Joints & shoulders', Set: '2 cups' },
    images: ['assets/images/products/curve-cups/main.jpg','assets/images/products/curve-cups/image2.jpg']
  },
  {
    id: 'lancet-pen',
    name: 'Detoxy Hijama Auto Lancet Pen Massager',
    slug: 'lancet-pen',
    category: 'consumables',
    categoryLabel: 'Consumables',
    price: 299,
    mrp: 499,
    rating: 4.7,
    reviews: 198,
    stock: 100,
    badge: null,
    shortDesc: 'Spring-loaded auto lancet pen with 5 depth settings for precise wet hijama incisions.',
    description: 'Detoxy Hijama Auto Lancet Pen Massager provides precise, controlled incisions for wet hijama (Al-Hijamah Al-Ratibar). Features 5 adjustable depth settings to suit different skin types. Each click delivers a consistent, safe incision depth, reducing patient discomfort and ensuring hygiene.',
    features: ['5 depth settings (0.8–1.8mm)', 'Auto spring mechanism', 'Single-use lancet compatibility', 'Ergonomic grip', 'Sterile & disposable lancets'],
    specs: { Depths: '0.8mm – 1.8mm (5 levels)', Mechanism: 'Auto spring-loaded', Compatible: 'Standard lancets', Material: 'Medical ABS plastic', Includes: 'Pen + 10 lancet heads' },
    images: ['assets/images/products/lancet-pen/main.jpg']
  },
  {
    id: 'latex-gloves',
    name: 'Detoxy Hijama Premium Latex Gloves (Pack of 100)',
    slug: 'latex-gloves',
    category: 'consumables',
    categoryLabel: 'Consumables',
    price: 199,
    mrp: 349,
    rating: 4.4,
    reviews: 341,
    stock: 200,
    badge: null,
    shortDesc: 'Powdered latex examination gloves, box of 100. Standard protective wear for hijama sessions.',
    description: 'Detoxy Hijama Premium Latex Gloves are medical-grade examination gloves designed for hijama practitioners. Powder-coated for easy donning, textured fingertips for better grip, and pre-tested for pinhole integrity. Sold in boxes of 100 — enough for a full month of regular sessions.',
    features: ['Box of 100 gloves', 'Medical-grade latex', 'Textured fingertips', 'Powder coated', 'Pinhole tested'],
    specs: { Quantity: '100 pcs per box', Material: 'Natural rubber latex', Size: 'M / L (select)', Standard: 'ISO 374-1', Finish: 'Powdered' },
    images: ['assets/images/products/latex-gloves/main.jpg']
  },
  {
    id: 'bamboo-cupping-set',
    name: 'Detoxy Hijama Bamboo Cupping Set',
    slug: 'bamboo-cupping-set',
    category: 'cups',
    categoryLabel: 'Cupping Sets',
    price: 479,
    mrp: 699,
    rating: 4.3,
    reviews: 44,
    stock: 15,
    badge: null,
    shortDesc: 'Authentic handcrafted bamboo cups for traditional herbal steam cupping therapy.',
    description: 'Detoxy Hijama Bamboo Cupping Set is crafted from sustainably sourced bamboo, ideal for herbal steam cupping. The natural material allows herbal infusions to permeate during therapy, enhancing the healing benefits. Each set includes 8 handcrafted bamboo cups with varying diameters.',
    features: ['Sustainably sourced bamboo', 'Herbal steam compatible', 'Set of 8 cups', 'Natural anti-microbial', 'Handcrafted quality'],
    specs: { Material: 'Natural bamboo', Quantity: '8 cups', Sizes: '3 diameters', Usage: 'Herbal steam cupping', Finish: 'Natural lacquer' },
    images: ['assets/images/products/bamboo-cupping-set/main.jpg']
  },
  {
    id: 'silicone-facial-4',
    name: 'Detoxy Hijama Silicone Facial Cup Set of 4',
    slug: 'silicone-facial-4',
    category: 'facial',
    categoryLabel: 'Facial Cups',
    price: 349,
    mrp: 549,
    rating: 4.6,
    reviews: 127,
    stock: 45,
    badge: null,
    shortDesc: 'Mini silicone facial cupping set (4 pcs) for lymphatic drainage and glowing skin.',
    description: 'Detoxy Hijama Silicone Facial Cup Set of 4 is designed for gentle facial lymphatic drainage and skin rejuvenation. Made from ultra-soft, hypoallergenic silicone, these mini cups create gentle suction to boost circulation, reduce puffiness, and promote collagen production.',
    features: ['4 mini cups', 'Ultra-soft silicone', 'Hypoallergenic', 'Boosts collagen', 'Reduces puffiness'],
    specs: { Quantity: '4 cups', Material: 'Soft silicone', Sizes: '2 sizes (round + oval)', Use: 'Face & neck', Safe: 'Hypoallergenic' },
    images: ['assets/images/products/silicone-facial-4/main.jpg']
  },
  {
    id: 'hijama-suction-gun',
    name: 'Detoxy Hijama Suction Gun',
    slug: 'hijama-suction-gun',
    category: 'kits',
    categoryLabel: 'Starter Kits',
    price: 549,
    mrp: 799,
    rating: 4.5,
    reviews: 38,
    stock: 30,
    badge: null,
    shortDesc: 'Professional hijama suction gun for precise vacuum control during cupping therapy.',
    description: 'Detoxy Hijama Suction Gun is a professional-grade vacuum pump designed specifically for hijama therapy. The ergonomic pistol grip allows single-handed operation, and the precision valve lets practitioners control suction strength with accuracy. Compatible with standard screw-top hijama cups.',
    features: ['Ergonomic pistol grip', 'Precision vacuum valve', 'Single-hand operation', 'Compatible with standard cups', 'Durable ABS construction'],
    specs: { Type: 'Manual vacuum gun', Compatibility: 'Standard screw-top cups', Material: 'Medical ABS', Operation: 'Single-handed', Valve: 'Precision release' },
    images: ['assets/images/products/hijama-suction-gun/main.jpg']
  },
  {
    id: 'indian-standard-cup',
    name: 'Detoxy Hijama Indian Made Standard Hijama Cup',
    slug: 'indian-standard-cup',
    category: 'cups',
    categoryLabel: 'Cupping Sets',
    price: 199,
    mrp: 349,
    rating: 4.2,
    reviews: 89,
    stock: 150,
    badge: null,
    shortDesc: 'Affordable Indian-made standard silicone hijama cups for everyday clinic use.',
    description: 'Detoxy Hijama Indian Made Standard Hijama Cup is our entry-level silicone cup manufactured in India for everyday clinic use. Soft, flexible, and easy to apply, these cups are ideal for practitioners looking for reliable quality at an accessible price point. Suitable for both wet and dry cupping.',
    features: ['Made in India', 'Soft silicone material', 'Easy suction application', 'Wet & dry cupping', 'Affordable clinic stock'],
    specs: { Origin: 'Made in India', Material: 'Silicone', Usage: 'Wet & Dry cupping', Sterilization: 'Boil safe', Grade: 'Standard clinical' },
    images: ['assets/images/products/indian-standard-cup/main.jpg']
  },
  {
    id: 'silicone-facial-7',
    name: 'Detoxy Hijama Silicone Facial Cup Set of 7',
    slug: 'silicone-facial-7',
    category: 'facial',
    categoryLabel: 'Facial Cups',
    price: 549,
    mrp: 849,
    rating: 4.7,
    reviews: 61,
    stock: 35,
    badge: 'Popular',
    badgeType: 'teal',
    shortDesc: 'Complete 7-piece silicone facial cupping set for full face and neck therapy.',
    description: 'Detoxy Hijama Silicone Facial Cup Set of 7 is the complete facial cupping kit covering all facial zones including forehead, cheeks, chin, and neck. Seven different cup sizes allow targeted treatment for every area. Hypoallergenic silicone is safe for all skin types including sensitive skin.',
    features: ['7 cups — 7 sizes', 'Full face & neck coverage', 'Hypoallergenic silicone', 'Anti-aging & lymphatic drainage', 'Includes storage pouch'],
    specs: { Quantity: '7 cups', Material: 'Soft silicone', Coverage: 'Full face + neck', Skin: 'All skin types', Includes: 'Storage pouch' },
    images: ['assets/images/products/silicone-facial-7/main.jpg']
  },
  {
    id: 'silicone-moving-cup',
    name: 'Detoxy Hijama Silicone Moving Cup Set (4 pcs)',
    slug: 'silicone-moving-cup',
    category: 'cups',
    categoryLabel: 'Cupping Sets',
    price: 399,
    mrp: 599,
    rating: 4.5,
    reviews: 52,
    stock: 40,
    badge: null,
    shortDesc: 'Silicone moving (sliding) cups for gliding massage cupping therapy.',
    description: 'Detoxy Hijama Silicone Moving Cup Set enables the traditional sliding cupping technique used alongside massage therapy. The ultra-flexible silicone creates consistent suction while gliding across oiled skin, stimulating circulation, releasing fascial tension, and providing deep tissue massage benefits.',
    features: ['4 flexible silicone cups', 'Gliding massage technique', 'Deep tissue stimulation', 'Use with massage oil', 'Reusable & sterilizable'],
    specs: { Quantity: '4 cups', Material: 'Flexible silicone', Technique: 'Moving / sliding', Use: 'With massage oil', Sizes: 'Mixed set' },
    images: ['assets/images/products/silicone-moving-cup/main.jpg']
  },
  {
    id: 'surgical-blade',
    name: 'Detoxy Hijama Surgical Blade No. 11 (Pack of 100)',
    slug: 'surgical-blade',
    category: 'consumables',
    categoryLabel: 'Consumables',
    price: 249,
    mrp: 399,
    rating: 4.6,
    reviews: 173,
    stock: 300,
    badge: null,
    shortDesc: 'Sterile surgical blade No. 11, pack of 100 — precision incision for wet hijama.',
    description: 'Detoxy Hijama Surgical Blade No. 11 are individually packaged sterile surgical blades used for precise incision in wet hijama (Al-Hijamah Al-Ratibar). The No. 11 pointed blade is the standard choice among hijama practitioners for controlled, clean incisions. Single-use only for maximum hygiene.',
    features: ['100 individually wrapped blades', 'No. 11 pointed blade', 'Sterile & single-use', 'Carbon steel construction', 'Industry standard for hijama'],
    specs: { Quantity: '100 blades per pack', Type: 'No. 11 (pointed)', Material: 'Carbon steel', Sterility: 'Gamma-irradiated', Usage: 'Single use only' },
    images: ['assets/images/products/surgical-blade/main.jpg']
  },
  {
    id: 'surgical-cotton',
    name: 'Detoxy Hijama Surgical Cotton (400g)',
    slug: 'surgical-cotton',
    category: 'consumables',
    categoryLabel: 'Consumables',
    price: 149,
    mrp: 249,
    rating: 4.3,
    reviews: 95,
    stock: 200,
    badge: null,
    shortDesc: 'Absorbent surgical cotton roll 400g for cleaning and post-hijama care.',
    description: 'Detoxy Hijama Surgical Cotton is 100% pure, highly absorbent cotton used for pre and post-hijama skin preparation and wound care. The 400g roll provides excellent value for busy clinics. Soft on skin, lint-free, and suitable for applying antiseptic solutions or absorbing blood post-cupping.',
    features: ['400g roll', '100% pure cotton', 'High absorbency', 'Lint-free quality', 'Antiseptic compatible'],
    specs: { Weight: '400g', Material: '100% cotton', Grade: 'Surgical / medical', Use: 'Pre & post hijama care', Pack: 'Single roll' },
    images: ['assets/images/products/surgical-cotton/main.jpg']
  }
];;

// ── Cart Utils ────────────────────────────────
const Cart = {
  get() {
    try { return JSON.parse(localStorage.getItem('dh_cart') || '[]'); } catch { return []; }
  },
  save(items) {
    localStorage.setItem('dh_cart', JSON.stringify(items));
    Cart.updateUI();
  },
  add(productId, qty = 1) {
    const items = Cart.get();
    const idx = items.findIndex(i => i.id === productId);
    if (idx > -1) {
      items[idx].qty = Math.min(items[idx].qty + qty, 20);
    } else {
      const p = PRODUCTS.find(p => p.id === productId);
      if (p) items.push({ id: productId, qty });
    }
    Cart.save(items);
    showToast('Added to cart', 'success');
  },
  remove(productId) {
    Cart.save(Cart.get().filter(i => i.id !== productId));
  },
  updateQty(productId, qty) {
    const items = Cart.get();
    const idx = items.findIndex(i => i.id === productId);
    if (idx > -1) {
      if (qty < 1) { items.splice(idx, 1); }
      else { items[idx].qty = Math.min(qty, 20); }
    }
    Cart.save(items);
  },
  count() { return Cart.get().reduce((s, i) => s + i.qty, 0); },
  total() {
    return Cart.get().reduce((s, i) => {
      const p = PRODUCTS.find(p => p.id === i.id);
      return s + (p ? p.price * i.qty : 0);
    }, 0);
  },
  clear() { Cart.save([]); },
  updateUI() {
    const count = Cart.count();
    document.querySelectorAll('.nav-cart-count').forEach(el => {
      el.textContent = count;
      el.classList.toggle('show', count > 0);
    });
    // update fixed mobile cart button
    const fixedBtn = document.querySelector('.fixed-cart-btn');
    if (fixedBtn) {
      fixedBtn.classList.toggle('show', count > 0);
      const span = fixedBtn.querySelector('.fixed-cart-total');
      if (span) span.textContent = '₹' + Cart.total().toLocaleString('en-IN');
    }
  }
};

// ── Toast ──────────────────────────────────────
function showToast(msg, type = 'default', duration = 3000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const icons = {
    success: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>',
    error: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>',
    default: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
  };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `${icons[type] || icons.default}<span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut .25s ease forwards';
    setTimeout(() => toast.remove(), 250);
  }, duration);
}

// ── Star Rating HTML ───────────────────────────
function renderStars(rating, showNum = true) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) stars += '<span class="star">&#9733;</span>';
    else if (i === full && half) stars += '<span class="star" style="opacity:.5">&#9733;</span>';
    else stars += '<span class="star empty">&#9733;</span>';
  }
  return `<span class="stars">${stars}</span>${showNum ? `<span style="font-size:.78rem;font-weight:700;color:var(--dark);margin-left:4px">${rating}</span>` : ''}`;
}

// ── Format Currency ────────────────────────────
function fmtINR(n) { return '₹' + Number(n).toLocaleString('en-IN'); }

// ── Discount % ────────────────────────────────
function discountPct(price, mrp) { return mrp > price ? Math.round((mrp - price) / mrp * 100) : 0; }

// ── Product Card HTML ──────────────────────────
// FIX 2: All href/src paths now use root-relative URLs (leading /).
//   Bare paths like "products/x.html" or "assets/images/..." break when the card
//   is rendered from a subdirectory (products/, admin/). Root-relative paths
//   always resolve from the site root regardless of current page depth.
// FIX 3: <button> was nested inside <a>. This is invalid HTML per spec —
//   interactive elements cannot be nested. It also caused a UX bug: clicking
//   the wishlist heart also navigated to the product page.
//   Fix: <a> wraps only the image; wishlist button is a sibling positioned absolutely.
function renderProductCard(p) {
  const discount = discountPct(p.price, p.mrp);
  const badgeHtml = p.badge ? `<div class="product-card-badge"><span class="badge badge-${p.badgeType || 'teal'}">${p.badge}</span></div>` : '';
  return `
<article class="product-card" itemscope itemtype="https://schema.org/Product">
  <div class="product-card-img">
    <a href="/products/${p.slug}.html" aria-label="${p.name}" style="display:block;width:100%;height:100%">
      <img src="/${p.images[0]}" alt="${p.name}" loading="lazy" itemprop="image"
        onerror="this.src='/assets/images/placeholder.svg'">
    </a>
    ${badgeHtml}
    <button class="product-card-wishlist" aria-label="Add to wishlist" onclick="event.stopPropagation()">
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
    </button>
  </div>
  <div class="product-card-body">
    <div class="product-card-category" itemprop="category">${p.categoryLabel}</div>
    <h3 class="product-card-name" itemprop="name"><a href="/products/${p.slug}.html">${p.name}</a></h3>
    <div class="product-card-rating">
      ${renderStars(p.rating, false)}
      <span class="product-card-rating-score">${p.rating}</span>
      <span class="product-card-rating-count">(${p.reviews})</span>
    </div>
    <div class="product-card-price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
      <span class="price" itemprop="price" content="${p.price}">${fmtINR(p.price)}</span>
      ${p.mrp > p.price ? `<span class="mrp">${fmtINR(p.mrp)}</span><span class="off">${discount}% off</span>` : ''}
    </div>
  </div>
  <div class="product-card-actions">
    <a href="/checkout.html?buy=${p.id}" class="btn btn-primary btn-sm">Buy Now</a>
    <button class="btn btn-outline btn-sm" onclick="Cart.add('${p.id}')">Add to Cart</button>
  </div>
</article>`;
}

// ── Header ─────────────────────────────────────
// FIX 2: All href paths are now root-relative (/index.html, /products.html etc.)
// Bare paths like "index.html" resolve relative to the CURRENT page directory.
// From /products/premium-cups.html, "index.html" resolves to /products/index.html
// which does not exist. Root-relative paths always resolve from the site root.
function renderHeader(activePage = '') {
  const navLinks = [
    { href: '/index.html', label: 'Home' },
    { href: '/products.html', label: 'All Products' },
    { href: '/track-order.html', label: 'Track Your Order' },
    { href: '/blogs.html', label: 'Blogs' },
    { href: '/quote.html', label: 'Bulk Quote' }
  ];
  const linksHtml = navLinks.map(l =>
    `<li><a href="${l.href}" class="${activePage === l.label ? 'active' : ''}">${l.label}</a></li>`
  ).join('');

  return `
<header class="nav" role="banner">
  <div class="nav-inner">
    <a href="/index.html" class="nav-logo" aria-label="Detoxy Hijama Home">
      <img src="/assets/images/logo.png" alt="Detoxy Hijama" class="nav-logo-img" width="44" height="44" loading="eager"/>
      <div>
        <div class="nav-logo-name">Detoxy Hijama</div>
      </div>
    </a>

    <nav class="nav-search" role="search" aria-label="Search products">
      <input type="search" id="navSearch" placeholder="Search hijama cups, kits..." autocomplete="off"
        aria-label="Search products" aria-expanded="false" aria-autocomplete="list"/>
      <button class="nav-search-btn" aria-label="Search">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      </button>
      <div id="searchResults" class="nav-search-results" role="listbox" aria-label="Search suggestions"></div>
    </nav>

    <ul class="nav-links" role="list">${linksHtml}</ul>

    <div class="nav-actions">
      <a href="/cart.html" class="nav-action-btn" aria-label="Shopping cart">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        <span class="nav-cart-count" aria-live="polite"></span>
      </a>
      <a href="/login.html" class="nav-action-btn" aria-label="My account">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
      </a>
      <a href="https://wa.me/${SITE.whatsapp}?text=Hi%20Detoxy%20Hijama!%20I%20need%20help." target="_blank" class="nav-whatsapp" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        <span>WhatsApp</span>
      </a>
      <button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</header>

<nav class="nav-mobile" id="navMobile" role="navigation" aria-label="Mobile navigation">
  <button class="nav-mobile-close" id="navClose" aria-label="Close menu">
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
  </button>
  <a href="/index.html">Home</a>
  <a href="/products.html">All Products</a>
  <a href="/track-order.html">Track Your Order</a>
  <a href="/blogs.html">Blogs</a>
  <a href="/products.html?cat=cups">Cupping Sets</a>
  <a href="/cart.html">My Cart</a>
  <a href="/login.html">Account</a>
  <a href="https://wa.me/${SITE.whatsapp}" target="_blank">WhatsApp Us</a>
</nav>`;
}

// ── Footer ─────────────────────────────────────
function renderFooter() {
  return `
<footer class="footer" role="contentinfo">
  <div class="footer-grid">
    <div>
      <div class="footer-brand-logo">
        <img src="/assets/images/logo.png" alt="Detoxy Hijama" class="footer-logo-img" width="44" height="44" loading="lazy"/>
        <span class="footer-brand-name">Detoxy Hijama</span>
      </div>
      <p class="footer-desc">India's trusted manufacturer of clinical-grade hijama equipment. Factory direct pricing. Pan-India delivery from Pollachi, Coimbatore, Tamil Nadu.</p>
      <div class="footer-social">
        <a href="https://wa.me/919566596077" class="footer-social-btn wa" target="_blank" rel="noopener" aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
        <a href="https://instagram.com/detoxyhijama_" class="footer-social-btn ig" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="https://facebook.com/detoxyhijama" class="footer-social-btn fb" target="_blank" rel="noopener" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="https://t.me/detoxyhijama" class="footer-social-btn tg" target="_blank" rel="noopener" aria-label="Telegram">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
        </a>
        <a href="mailto:detoxyhijama@gmail.com" class="footer-social-btn gm" aria-label="Gmail">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 39.5H12V23.55L1.5 16V37C1.5 38.38 2.62 39.5 4.5 39.5Z" fill="#4285F4"/><path d="M36 39.5H43.5C45.38 39.5 46.5 38.38 46.5 36.5V16L36 23.55V39.5Z" fill="#34A853"/><path d="M36 11.5V23.55L46.5 16V13C46.5 10.84 44.04 9.62 42.3 10.9L36 11.5Z" fill="#FBBC04"/><path d="M12 23.55V11.5L24 20.5L36 11.5V23.55L24 32.55L12 23.55Z" fill="#EA4335"/><path d="M1.5 13V16L12 23.55V11.5L5.7 10.9C3.96 9.62 1.5 10.84 1.5 13Z" fill="#C5221F"/></svg>
        </a>
        <a href="https://youtube.com/@detoxyhijama" class="footer-social-btn yt" target="_blank" rel="noopener" aria-label="YouTube">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        </a>
      </div>
      <div class="footer-contact-row">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        <a href="tel:+919566596077">${SITE.phone}</a>
      </div>
      <div class="footer-contact-row">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>Shop</h4>
      <ul>
        <li><a href="/products.html">All Products</a></li>
        <li><a href="/products.html?cat=cups">Cupping Sets</a></li>
        <li><a href="/track-order.html">Track Your Order</a></li>
        <li><a href="/blogs.html">Hijama Blog</a></li>
        <li><a href="/products.html?cat=consumables">Consumables</a></li>
        <li><a href="/products.html?cat=facial">Facial Cups</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <ul>
        <li><a href="/about.html">About Us</a></li>
        <li><a href="/quote.html">Bulk Quote</a></li>
        <li><a href="/contact.html">Contact</a></li>
        <li><a href="/blogs.html">Hijama Blog</a></li>
        <li><a href="/admin/index.html">Admin</a></li>
      </ul>
    </div>
  </div>
  <!-- FIX 10: Removed duplicate inline border-top/margin-top. These properties
       are now exclusively in the .footer-bottom CSS class. Inline styles would
       override the class with identical values — dead duplication resolved. -->
  <div class="footer-bottom">
    <p>&copy; ${new Date().getFullYear()} Detoxy Hijama. All rights reserved. Pollachi, Coimbatore, Tamil Nadu.</p>
    <div class="footer-payment">
      <span class="payment-badge">UPI</span>
      <span class="payment-badge">COD</span>
      <span class="payment-badge">NEFT</span>
      <span class="payment-badge">Razorpay</span>
    </div>
  </div>
</footer>`;
}

// ── Search functionality ───────────────────────
function initSearch() {
  const input = document.getElementById('navSearch');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) { results.classList.remove('show'); return; }
      const matches = PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q) ||
        p.shortDesc.toLowerCase().includes(q)
      ).slice(0, 6);
      if (matches.length === 0) { results.classList.remove('show'); return; }
      results.innerHTML = matches.map(p => `
        <a href="/products/${p.slug}.html" class="search-result-item" role="option">
          <img src="/${p.images[0]}" alt="${p.name}" class="search-result-img"
            onerror="this.src='/assets/images/placeholder.svg'">
          <div>
            <div class="search-result-name">${p.name}</div>
            <div class="search-result-price">${fmtINR(p.price)}</div>
          </div>
        </a>`).join('');
      results.classList.add('show');
      input.setAttribute('aria-expanded', 'true');
    }, 200);
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('show');
      input.setAttribute('aria-expanded', 'false');
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { results.classList.remove('show'); input.blur(); }
    if (e.key === 'Enter') {
      window.location.href = `/products.html?q=${encodeURIComponent(input.value.trim())}`;
    }
  });
}

// ── Mobile Nav ─────────────────────────────────
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');
  const close = document.getElementById('navClose');
  if (!toggle || !mobile) return;
  toggle.addEventListener('click', () => {
    mobile.classList.toggle('open');
    toggle.setAttribute('aria-expanded', mobile.classList.contains('open'));
    document.body.style.overflow = mobile.classList.contains('open') ? 'hidden' : '';
  });
  if (close) close.addEventListener('click', () => {
    mobile.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
}

// ── Init ───────────────────────────────────────
// NOTE: Header/footer mounting is handled by each page's own DOMContentLoaded
// so the correct active nav label is passed per page. Cart, search, and mobile
// nav are initialised there too. No global auto-mount here to avoid double-render.

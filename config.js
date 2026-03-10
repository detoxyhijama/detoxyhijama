// Detoxy Hijama — Site Configuration
// Edit these values to customise the store.
window.DETOXY_CONFIG = {
  adminPassword: "detoxy2024admin",
  whatsappNumber: "919566596077",
  freeShippingAt: 999,
  defaultShipping: 60,
  codEnabled: true,
  codMax: 5000,
  // Google Sheets Web-App URL (set via admin/sheets-setup.html)
  sheetsUrl: localStorage.getItem("detoxy_sheets_url") || "",
  // Full product catalogue — used by cart, checkout, products, quote, admin, shipper
  products: [
  {
    "id": "electric-smart-cup",
    "name": "Electric Smart Cup",
    "price": 750,
    "mrp": 999,
    "unit": "/ piece",
    "cat": "cups",
    "categoryLabel": "Hijama Cups",
    "bulkQty": 10,
    "bulkPrice": 650,
    "rating": 4.9,
    "badge": "Bestseller",
    "desc": "USB rechargeable, 5 suction levels, LCD display. No manual pumping.",
    "images": [
      "assets/images/products/electric-smart-cup/main.jpg"
    ]
  },
  {
    "id": "fire-cupping-glass",
    "name": "Fire Cupping Glass Set",
    "price": 900,
    "mrp": 1299,
    "unit": "/ set",
    "cat": "cups",
    "categoryLabel": "Hijama Cups",
    "bulkQty": 5,
    "bulkPrice": 780,
    "rating": 4.8,
    "badge": "Traditional",
    "desc": "Borosilicate glass, 4 sizes, 16 pcs. Traditional fire therapy.",
    "images": [
      "assets/images/products/fire-cupping-glass/main.jpg"
    ]
  },
  {
    "id": "premium-cups",
    "name": "Premium Hijama Cups",
    "price": 12,
    "mrp": 18,
    "unit": "/ cup",
    "cat": "cups",
    "categoryLabel": "Hijama Cups",
    "bulkQty": 100,
    "bulkPrice": 9,
    "rating": 4.9,
    "badge": "Top Rated",
    "desc": "Ultra-clear clinic-grade, 6 sizes. Direct factory price.",
    "images": [
      "assets/images/products/premium-cups/main.jpg"
    ]
  },
  {
    "id": "silicone-facial-4",
    "name": "Silicone Facial Cup Set (4-pc)",
    "price": 250,
    "mrp": 399,
    "unit": "/ set",
    "cat": "cups",
    "categoryLabel": "Hijama Cups",
    "bulkQty": 20,
    "bulkPrice": 200,
    "rating": 4.7,
    "badge": "Face Therapy",
    "desc": "Soft silicone, 4 sizes for face, jaw, forehead & neck.",
    "images": [
      "assets/images/products/silicone-facial-4/main.jpg"
    ]
  },
  {
    "id": "silicone-facial-7",
    "name": "Silicone Facial Cup Set (7-pc)",
    "price": 600,
    "mrp": 899,
    "unit": "/ set",
    "cat": "cups",
    "categoryLabel": "Hijama Cups",
    "bulkQty": 10,
    "bulkPrice": 500,
    "rating": 4.8,
    "badge": "Complete",
    "desc": "7-piece complete facial cupping set. Professional grade.",
    "images": []
  },
  {
    "id": "silicone-moving-cups",
    "name": "Silicone Moving Cups",
    "price": 700,
    "mrp": 999,
    "unit": "/ pair",
    "cat": "cups",
    "categoryLabel": "Hijama Cups",
    "bulkQty": 10,
    "bulkPrice": 600,
    "rating": 4.6,
    "badge": "Massage",
    "desc": "Sliding cups for massage cupping on back and shoulders.",
    "images": []
  },
  {
    "id": "standard-cups",
    "name": "Standard Hijama Cups",
    "price": 9,
    "mrp": 15,
    "unit": "/ cup",
    "cat": "kits",
    "categoryLabel": "Cupping Kits",
    "bulkQty": 100,
    "bulkPrice": 7,
    "rating": 4.7,
    "badge": "Value",
    "desc": "Durable transparent plastic cups. Perfect for clinics & starters.",
    "images": []
  },
  {
    "id": "bamboo-cupping-set",
    "name": "Bamboo Cupping Set",
    "price": 500,
    "mrp": 749,
    "unit": "/ set",
    "cat": "kits",
    "categoryLabel": "Cupping Kits",
    "bulkQty": 10,
    "bulkPrice": 420,
    "rating": 4.5,
    "badge": "Eco",
    "desc": "Eco-friendly traditional bamboo cups. Sustainable & effective.",
    "images": [
      "assets/images/products/bamboo-cupping-set/main.jpg"
    ]
  },
  {
    "id": "curve-cups",
    "name": "Curve Hijama Cups",
    "price": 12,
    "mrp": 18,
    "unit": "/ cup",
    "cat": "cups",
    "categoryLabel": "Hijama Cups",
    "bulkQty": 100,
    "bulkPrice": 9,
    "rating": 4.7,
    "badge": "Ergonomic",
    "desc": "Curved for contoured areas like neck, shoulders & spine.",
    "images": [
      "assets/images/products/curve-cups/main.jpg"
    ]
  },
  {
    "id": "magnetic-vacuum-kit",
    "name": "Magnetic Vacuum Hijama Kit",
    "price": 700,
    "mrp": 999,
    "unit": "/ kit",
    "cat": "kits",
    "categoryLabel": "Cupping Kits",
    "bulkQty": 5,
    "bulkPrice": 600,
    "rating": 4.8,
    "badge": "Complete Kit",
    "desc": "24-cup set with pistol suction gun. Dry & wet cupping ready.",
    "images": [
      "assets/images/products/magnetic-vacuum-kit/main.jpg"
    ]
  },
  {
    "id": "lancet-pen",
    "name": "Hijama Lancet Pen",
    "price": 550,
    "mrp": 799,
    "unit": "/ piece",
    "cat": "consumables",
    "categoryLabel": "Consumables",
    "bulkQty": 5,
    "bulkPrice": 480,
    "rating": 4.9,
    "badge": "Precision",
    "desc": "3-tip auto-lancet, adjustable depth. Sterile replaceable cartridges.",
    "images": [
      "assets/images/products/lancet-pen/main.jpg"
    ]
  },
  {
    "id": "latex-gloves",
    "name": "Latex Gloves for Hijama",
    "price": 320,
    "mrp": 449,
    "unit": "/ box",
    "cat": "consumables",
    "categoryLabel": "Consumables",
    "bulkQty": 10,
    "bulkPrice": 270,
    "rating": 4.6,
    "badge": "100 pcs",
    "desc": "Medical-grade powder-free latex, 100 per box.",
    "images": [
      "assets/images/products/latex-gloves/main.jpg"
    ]
  },
  {
    "id": "suction-gun",
    "name": "Hijama Suction Gun",
    "price": 160,
    "mrp": 249,
    "unit": "/ piece",
    "cat": "kits",
    "categoryLabel": "Cupping Kits",
    "bulkQty": 20,
    "bulkPrice": 130,
    "rating": 4.7,
    "badge": "Ergonomic",
    "desc": "Ergonomic pistol pump compatible with all standard cups.",
    "images": []
  },
  {
    "id": "surgical-blade",
    "name": "Hijama Surgical Blade",
    "price": 250,
    "mrp": 399,
    "unit": "/ pack",
    "cat": "consumables",
    "categoryLabel": "Consumables",
    "bulkQty": 10,
    "bulkPrice": 200,
    "rating": 4.8,
    "badge": "Sterile",
    "desc": "Single-use sterile blades, 10 per pack. Precision wet cupping.",
    "images": []
  },
  {
    "id": "surgical-cotton",
    "name": "Surgical Cotton for Hijama",
    "price": 160,
    "mrp": 249,
    "unit": "/ roll",
    "cat": "consumables",
    "categoryLabel": "Consumables",
    "bulkQty": 20,
    "bulkPrice": 130,
    "rating": 4.6,
    "badge": "Absorbent",
    "desc": "High-absorbency sterile cotton roll. Essential consumable.",
    "images": []
  }
]
};

// Expose PRODUCTS globally for all pages
window.PRODUCTS = window.DETOXY_CONFIG.products;

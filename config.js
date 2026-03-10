// Detoxy Hijama — Site Configuration
// Edit this file to configure your store settings, Google Sheets integration, etc.

window.DETOXY_CONFIG = {

  // ── Admin ────────────────────────────────────────────────────
  // Default admin password (change this after first login via localStorage)
  adminPassword: "detoxy2025",

  // ── Google Sheets Integration ────────────────────────────────
  // Paste your deployed Apps Script URL here after deploying apps-script.gs
  // Example: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"
  sheetsUrl: "",

  // ── Contact & Business Info ──────────────────────────────────
  phone:   "+91 95665 96077",
  email:   "detoxyhijama@gmail.com",
  address: "DETOXY HIJAMA, Madurai, Tamil Nadu, India",
  gst:     "",

  // ── Social Media ─────────────────────────────────────────────
  social: {
    instagram: "",
    facebook:  "",
    youtube:   "",
    telegram:  "",
    linkedin:  "",
    whatsapp:  "+919566596077"
  },

  // ── Products ─────────────────────────────────────────────────
  // Product catalogue — edit prices, names, badges as needed.
  products: [
  {
    "id": "premium-cups",
    "name": "Premium Hijama Cups",
    "desc": "Professional-grade silicone hijama cups with superior suction, BPA-free material.",
    "price": 349,
    "mrp": 499,
    "cat": "cups",
    "badge": "Bestseller",
    "rating": 4.8,
    "unit": "/ set",
    "images": [
      "assets/images/products/premium-cups/main.jpg",
      "assets/images/products/premium-cups/image2.jpg",
      "assets/images/products/premium-cups/image3.jpg"
    ]
  },
  {
    "id": "electric-smart-cup",
    "name": "Electric Smart Cup",
    "desc": "Rechargeable electric cupping device with adjustable suction levels.",
    "price": 1299,
    "mrp": 1799,
    "cat": "kits",
    "badge": "New",
    "rating": 4.7,
    "unit": "/ piece",
    "images": [
      "assets/images/products/electric-smart-cup/main.jpg",
      "assets/images/products/electric-smart-cup/image2.jpg"
    ]
  },
  {
    "id": "magnetic-vacuum-kit",
    "name": "Magnetic Vacuum Cupping Kit",
    "desc": "Complete vacuum pump cupping set with magnetic pressure release.",
    "price": 799,
    "mrp": 1099,
    "cat": "kits",
    "badge": "Popular",
    "rating": 4.6,
    "unit": "/ kit",
    "images": [
      "assets/images/products/magnetic-vacuum-kit/main.jpg",
      "assets/images/products/magnetic-vacuum-kit/image2.jpg"
    ]
  },
  {
    "id": "standard-cups",
    "name": "Standard Hijama Cups",
    "desc": "Classic polycarbonate hijama cups \u2014 clinic staple at factory price.",
    "price": 199,
    "mrp": 299,
    "cat": "cups",
    "rating": 4.5,
    "unit": "/ set",
    "images": [
      "assets/images/products/standard-cups/main.jpg"
    ]
  },
  {
    "id": "curve-cups",
    "name": "Curve Hijama Cups",
    "desc": "Ergonomically curved cups designed for shoulders, back and knees.",
    "price": 299,
    "mrp": 449,
    "cat": "cups",
    "rating": 4.6,
    "unit": "/ set",
    "images": [
      "assets/images/products/curve-cups/main.jpg",
      "assets/images/products/curve-cups/image2.jpg"
    ]
  },
  {
    "id": "silicone-facial-4",
    "name": "Silicone Facial Cups (4-piece)",
    "desc": "Soft silicone facial cupping set for lymphatic drainage and skin therapy.",
    "price": 249,
    "mrp": 349,
    "cat": "cups",
    "badge": "Trending",
    "rating": 4.7,
    "unit": "/ set",
    "images": [
      "assets/images/products/silicone-facial-4/main.jpg"
    ]
  },
  {
    "id": "silicone-facial-7",
    "name": "Silicone Facial Cups (7-piece)",
    "desc": "Full 7-piece silicone facial cupping kit for professional beauty clinics.",
    "price": 399,
    "mrp": 549,
    "cat": "cups",
    "rating": 4.6,
    "unit": "/ set",
    "images": [
      "assets/images/products/silicone-facial-7/main.jpg"
    ]
  },
  {
    "id": "silicone-moving-cups",
    "name": "Silicone Moving Cups",
    "desc": "Flexible silicone cups for dynamic gliding cupping massage therapy.",
    "price": 279,
    "mrp": 399,
    "cat": "cups",
    "rating": 4.5,
    "unit": "/ set",
    "images": [
      "assets/images/products/silicone-moving-cups/main.jpg"
    ]
  },
  {
    "id": "fire-cupping-glass",
    "name": "Fire Cupping Glass Set",
    "desc": "Traditional borosilicate glass cups for authentic fire cupping therapy.",
    "price": 649,
    "mrp": 899,
    "cat": "kits",
    "rating": 4.7,
    "unit": "/ set",
    "images": [
      "assets/images/products/fire-cupping-glass/main.jpg",
      "assets/images/products/fire-cupping-glass/image2.jpg"
    ]
  },
  {
    "id": "bamboo-cupping-set",
    "name": "Bamboo Cupping Set",
    "desc": "Natural bamboo cups \u2014 eco-friendly traditional cupping therapy kit.",
    "price": 549,
    "mrp": 749,
    "cat": "kits",
    "rating": 4.4,
    "unit": "/ set",
    "images": [
      "assets/images/products/bamboo-cupping-set/main.jpg"
    ]
  },
  {
    "id": "lancet-pen",
    "name": "Lancet Pen",
    "desc": "Precision adjustable-depth lancet pen for wet hijama incisions.",
    "price": 349,
    "mrp": 499,
    "cat": "consumables",
    "rating": 4.8,
    "unit": "/ piece",
    "images": [
      "assets/images/products/lancet-pen/main.jpg"
    ]
  },
  {
    "id": "surgical-blade",
    "name": "Surgical Blades (Pack)",
    "desc": "Sterile single-use stainless steel surgical blades for hijama incisions.",
    "price": 149,
    "mrp": 199,
    "cat": "consumables",
    "rating": 4.7,
    "unit": "/ pack",
    "images": [
      "assets/images/products/surgical-blade/main.jpg"
    ]
  },
  {
    "id": "latex-gloves",
    "name": "Latex Gloves (Box)",
    "desc": "Powder-free latex examination gloves for hygienic hijama practice.",
    "price": 249,
    "mrp": 329,
    "cat": "consumables",
    "rating": 4.6,
    "unit": "/ box (100)",
    "images": [
      "assets/images/products/latex-gloves/main.jpg"
    ]
  },
  {
    "id": "surgical-cotton",
    "name": "Surgical Cotton Rolls",
    "desc": "High-absorbency medical-grade cotton for wound care and hijama cleanup.",
    "price": 99,
    "mrp": 149,
    "cat": "consumables",
    "rating": 4.5,
    "unit": "/ roll",
    "images": [
      "assets/images/products/surgical-cotton/main.jpg"
    ]
  },
  {
    "id": "suction-gun",
    "name": "Vacuum Suction Gun",
    "desc": "Professional trigger-action suction gun for precise vacuum cupping.",
    "price": 449,
    "mrp": 599,
    "cat": "kits",
    "rating": 4.6,
    "unit": "/ piece",
    "images": [
      "assets/images/products/suction-gun/main.jpg"
    ]
  }
]

};

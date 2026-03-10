/* ============================================================
   DETOXY HIJAMA — SITE CONFIG
   Edit this file to update products, prices, and settings
   ============================================================ */

window.DETOXY_CONFIG = {
  siteName: "Detoxy Hijama",
  tagline: "India's Trusted Hijama Equipment Manufacturer",
  phone: "+91 95665 96077",
  whatsapp: "https://wa.me/919566596077",
  email: "detoxyhijama@gmail.com",
  address: "DETOXY HIJAMA, Madurai, Tamil Nadu, India",
  gst: "33XXXXX0000X1ZX",

  // ── Google Sheets Apps Script URL (update with your deployed Web App URL) ──
  // How to set up:
  // 1. Open Google Sheets → Extensions → Apps Script
  // 2. Paste the Apps Script code from admin/setup-guide.html
  // 3. Deploy as Web App (Anyone can access)
  // 4. Paste the Web App URL below
  googleSheetsURL: "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec",

  // ⚠️ SECURITY WARNING: Change this password and consider moving it to localStorage via admin settings.
  // This value is publicly visible in the browser. Use admin/settings.html to override via localStorage.
  adminPassword: "detoxy2024admin",

  social: {
    instagram: "https://instagram.com/detoxyhijama_",
    facebook: "https://facebook.com/detoxyhijama",
    telegram: "https://t.me/detoxyhijama",
    youtube: "https://youtube.com/@detoxyhijama",
    linkedin: "https://www.linkedin.com/company/detoxy-hijama",
    whatsapp: "https://wa.me/919566596077",
    email: "mailto:detoxyhijama@gmail.com"
  },

  products: [
    {
      id: "premium-cups",
      name: "Detoxy Hijama Premium Transparent Cup",
      category: "cups",
      categoryLabel: "Hijama Cups",
      price: 12,
      mrp: 20,
      unit: "per cup",
      bulkPrice: 10,
      bulkQty: 500,
      badge: "Premium",
      discount: "40%",
      rating: 4.9,
      reviews: 198,
      description: "Ultra-clear clinic-grade premium cups trusted by top practitioners. 6 sizes available.",
      images: [
        "../assets/images/products/premium-cups/main.jpg",
        "../assets/images/products/premium-cups/image2.jpg",
        "../assets/images/products/premium-cups/image3.jpg",
        "../assets/images/products/premium-cups/image4.jpg",
        "../assets/images/products/premium-cups/image5.jpg",
        "../assets/images/products/premium-cups/image6.jpg"
      ],
      features: ["Ultra-Clear Visibility","Clinic Grade Quality","6 Sizes Available","High-Grip Valve","Professional Standard"],
      specs: { Material:"Premium Medical PVC", Sizes:"1,2,3,4,5,6", Color:"Ultra Transparent", Origin:"Made in India", "Min Order":"1 cup" }
    },
    {
      id: "standard-cups",
      name: "Detoxy Hijama Standard Cup (Indian Made)",
      category: "cups",
      categoryLabel: "Hijama Cups",
      price: 9,
      mrp: 15,
      unit: "per cup",
      bulkPrice: 7,
      bulkQty: 500,
      badge: "Bestseller",
      discount: "40%",
      rating: 4.8,
      reviews: 342,
      description: "Indian-made standard hijama cups. Great value for regular clinical use.",
      images: ["../assets/images/products/standard-cups/main.jpg"],
      features: ["Indian Made","BPA Free","Durable PVC","Multiple Sizes","Value Pack"],
      specs: { Material:"Medical PVC", Origin:"Made in India", Sizes:"1,2,3,4,5,6", "Min Order":"1 cup" }
    },
    {
      id: "curve-cups",
      name: "Detoxy Hijama Curve Cup Size 3 & 4",
      category: "cups",
      categoryLabel: "Hijama Cups",
      price: 12,
      mrp: 18,
      unit: "per cup",
      bulkPrice: 10,
      bulkQty: 300,
      badge: "New",
      discount: "33%",
      rating: 4.7,
      reviews: 89,
      description: "Ergonomically curved cups for contoured body areas — shoulders, knees, ankles.",
      images: ["../assets/images/products/curve-cups/main.jpg"],
      features: ["Ergonomic Curve Design","Fits Contoured Areas","Strong Suction","Clear PVC","Size 3 & 4"],
      specs: { Material:"Medical PVC", Sizes:"3, 4", Style:"Curved", Origin:"Made in India" }
    },
    {
      id: "silicone-moving-cups",
      name: "Detoxy Hijama Silicone Moving Cup Set of 4",
      category: "cups",
      categoryLabel: "Silicone Cups",
      price: 700,
      mrp: 1050,
      unit: "per set",
      bulkPrice: 600,
      bulkQty: 10,
      badge: "Top Rated",
      discount: "33%",
      rating: 4.9,
      reviews: 156,
      description: "Premium silicone moving cups for gliding massage therapy and lymphatic drainage.",
      images: ["../assets/images/products/silicone-moving-cups/main.jpg"],
      features: ["Soft Silicone","Gliding Massage","4 Sizes in Set","Easy Squeeze","No Pump Needed"],
      specs: { Material:"Medical Silicone", Count:"Set of 4", Use:"Moving / Gliding", BPA:"Free" }
    },
    {
      id: "silicone-facial-7",
      name: "Detoxy Hijama Silicone Facial Cup Set of 7",
      category: "cups",
      categoryLabel: "Facial Cups",
      price: 600,
      mrp: 900,
      unit: "per set",
      bulkPrice: 500,
      bulkQty: 10,
      badge: "Popular",
      discount: "33%",
      rating: 4.8,
      reviews: 112,
      description: "Complete 7-piece silicone facial cupping kit for face lifting and anti-aging therapy.",
      images: ["../assets/images/products/silicone-facial-7/main.jpg"],
      features: ["7 Piece Set","Facial Lifting","Anti-Aging","Ultra Soft Silicone","For All Skin Types"],
      specs: { Material:"Food-Grade Silicone", Count:"Set of 7", Use:"Facial / Beauty", BPA:"Free" }
    },
    {
      id: "silicone-facial-4",
      name: "Detoxy Hijama Silicone Facial Cup Set of 4",
      category: "cups",
      categoryLabel: "Facial Cups",
      price: 250,
      mrp: 375,
      unit: "per set",
      bulkPrice: 200,
      bulkQty: 20,
      badge: null,
      discount: "33%",
      rating: 4.6,
      reviews: 78,
      description: "4-piece facial silicone cup kit, ideal for beginners and home practitioners.",
      images: ["../assets/images/products/silicone-facial-4/main.jpg"],
      features: ["4 Piece Set","Beginner Friendly","Facial Use","Soft Silicone","Home Kit"],
      specs: { Material:"Food-Grade Silicone", Count:"Set of 4", Use:"Facial / Beauty" }
    },
    {
      id: "magnetic-vacuum-kit",
      name: "Detoxy Hijama 24-Set Magnetic Vacuum Cupping Kit",
      category: "kits",
      categoryLabel: "Cupping Kits",
      price: 700,
      mrp: 1100,
      unit: "per kit",
      bulkPrice: 600,
      bulkQty: 5,
      badge: "Bundle",
      discount: "36%",
      rating: 4.9,
      reviews: 203,
      description: "Complete 24-piece magnetic vacuum cupping kit with pistol gun for professional use.",
      images: ["../assets/images/products/magnetic-vacuum-kit/main.jpg"],
      features: ["24 Cups Included","Magnetic Valve","Pistol Gun Pump","Professional Grade","Full Size Range"],
      specs: { Includes:"24 cups + pump gun", Material:"Acrylic + Magnetic Valve", Use:"Dry Cupping", Origin:"China" }
    },
    {
      id: "electric-smart-cup",
      name: "Detoxy Hijama Electric Smart Vacuum Cup",
      category: "kits",
      categoryLabel: "Electric Cups",
      price: 750,
      mrp: 1200,
      unit: "per piece",
      bulkPrice: 650,
      bulkQty: 5,
      badge: "Smart",
      discount: "37%",
      rating: 4.8,
      reviews: 134,
      description: "USB rechargeable electric smart vacuum cup with adjustable suction levels.",
      images: [
        "../assets/images/products/electric-smart-cup/main.jpg",
        "../assets/images/products/electric-smart-cup/image2.jpg",
        "../assets/images/products/electric-smart-cup/image3.jpg",
        "../assets/images/products/electric-smart-cup/image4.jpg",
        "../assets/images/products/electric-smart-cup/image5.jpg"
      ],
      features: ["Electric Suction","USB Rechargeable","5 Suction Levels","Auto Mode","LCD Display"],
      specs: { Power:"USB Rechargeable", Levels:"5 Adjustable", Material:"Medical ABS + Silicone", Battery:"1200mAh" }
    },
    {
      id: "fire-cupping-glass",
      name: "Detoxy Hijama Fire Cupping Glass Set of 16",
      category: "kits",
      categoryLabel: "Fire Cupping",
      price: 900,
      mrp: 1400,
      unit: "per set",
      bulkPrice: 780,
      bulkQty: 5,
      badge: "Traditional",
      discount: "35%",
      rating: 4.9,
      reviews: 176,
      description: "Traditional glass fire cupping set with 16 borosilicate glass cups in 4 sizes.",
      images: [
        "../assets/images/products/fire-cupping-glass/main.jpg",
        "../assets/images/products/fire-cupping-glass/image2.jpg",
        "../assets/images/products/fire-cupping-glass/image3.jpg"
      ],
      features: ["16 Glass Cups","Borosilicate Glass","4 Sizes","Traditional Method","Heat Resistant"],
      specs: { Material:"Borosilicate Glass", Count:"16 cups (4 sizes)", Use:"Fire / Heat Cupping", Origin:"China" }
    },
    {
      id: "bamboo-cupping-set",
      name: "Detoxy Hijama Bamboo Cupping Set",
      category: "kits",
      categoryLabel: "Bamboo Sets",
      price: 500,
      mrp: 750,
      unit: "per set",
      bulkPrice: 420,
      bulkQty: 10,
      badge: "Eco",
      discount: "33%",
      rating: 4.7,
      reviews: 67,
      description: "Eco-friendly bamboo cupping set — traditional Unani treatment tool.",
      images: ["../assets/images/products/bamboo-cupping-set/main.jpg"],
      features: ["Natural Bamboo","Eco Friendly","Traditional Unani","Multiple Sizes","Sustainable"],
      specs: { Material:"Natural Bamboo", Use:"Traditional Cupping", Count:"Assorted", Origin:"India" }
    },
    {
      id: "lancet-pen",
      name: "Detoxy Hijama 3-Lancet Pen Massager",
      category: "consumables",
      categoryLabel: "Lancets & Blades",
      price: 550,
      mrp: 800,
      unit: "per pen",
      bulkPrice: 450,
      bulkQty: 10,
      badge: "Professional",
      discount: "31%",
      rating: 4.8,
      reviews: 145,
      description: "Professional 3-lancet hijama pen for precise puncture and bleeding.",
      images: ["../assets/images/products/lancet-pen/main.jpg"],
      features: ["3-Lancet Tip","Precise Puncture","Adjustable Depth","Reusable Pen","Sterile Tips"],
      specs: { Tips:"3 lancet points", Material:"Medical Grade ABS", Depth:"Adjustable", Use:"Hijama / Bloodletting" }
    },
    {
      id: "suction-gun",
      name: "Detoxy Hijama Suction Gun",
      category: "kits",
      categoryLabel: "Suction Pumps",
      price: 160,
      mrp: 250,
      unit: "per piece",
      bulkPrice: 130,
      bulkQty: 20,
      badge: null,
      discount: "36%",
      rating: 4.6,
      reviews: 98,
      description: "Ergonomic pistol-grip suction gun for vacuum cupping kits.",
      images: ["../assets/images/products/suction-gun/main.jpg"],
      features: ["Pistol Grip","Easy One-Hand Use","Compatible All Cups","Strong Vacuum","Durable"],
      specs: { Material:"Medical ABS Plastic", Use:"Manual Suction", Compatibility:"Standard valve cups" }
    },
    {
      id: "surgical-blade",
      name: "Detoxy Hijama Surgical Blade No.11 (Pack of 100)",
      category: "consumables",
      categoryLabel: "Lancets & Blades",
      price: 250,
      mrp: 400,
      unit: "per pack",
      bulkPrice: 200,
      bulkQty: 10,
      badge: "Sterile",
      discount: "37%",
      rating: 4.9,
      reviews: 287,
      description: "Individually sterile-wrapped surgical blades No.11 for precise hijama incision.",
      images: ["../assets/images/products/surgical-blade/main.jpg"],
      features: ["Individually Wrapped","100% Sterile","Stainless Steel","Carbon Steel Blade","Pack of 100"],
      specs: { Type:"No.11", Count:"Pack of 100", Material:"Stainless Steel", Sterile:"Yes — individually wrapped" }
    },
    {
      id: "latex-gloves",
      name: "Detoxy Hijama Premium Latex Gloves (Pack of 100)",
      category: "consumables",
      categoryLabel: "Consumables",
      price: 320,
      mrp: 480,
      unit: "per pack",
      bulkPrice: 260,
      bulkQty: 10,
      badge: "Medical",
      discount: "33%",
      rating: 4.8,
      reviews: 213,
      description: "Medical-grade powder-free latex examination gloves for clean hijama practice.",
      images: ["../assets/images/products/latex-gloves/main.jpg"],
      features: ["Powder Free","Medical Grade","Strong & Flexible","Pack of 100","S/M/L Available"],
      specs: { Material:"Natural Latex", Count:"Pack of 100", Type:"Powder Free", Sizes:"S, M, L" }
    },
    {
      id: "surgical-cotton",
      name: "Detoxy Hijama Surgical Cotton 400g Roll",
      category: "consumables",
      categoryLabel: "Consumables",
      price: 160,
      mrp: 240,
      unit: "per roll",
      bulkPrice: 130,
      bulkQty: 20,
      badge: null,
      discount: "33%",
      rating: 4.7,
      reviews: 165,
      description: "Pure absorbent surgical cotton for wound cleaning and hijama aftercare.",
      images: ["../assets/images/products/surgical-cotton/main.jpg"],
      features: ["100% Pure Cotton","High Absorbency","400g Roll","Medical Grade","Soft & Gentle"],
      specs: { Weight:"400g", Material:"Pure Cotton", Grade:"Medical / Surgical", Bleached:"Yes" }
    }
  ]
};

// ── Admin product overrides: if admin has edited products, use those instead ──
(function() {
  try {
    const custom = localStorage.getItem('detoxy_custom_products');
    if (custom) {
      const parsed = JSON.parse(custom);
      if (Array.isArray(parsed) && parsed.length) {
        window.DETOXY_CONFIG.products = parsed;
      }
    }
  } catch(e) { /* ignore localStorage errors (e.g. private browsing) */ }
})();

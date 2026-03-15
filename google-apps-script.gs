/**
 * DETOXY HIJAMA — Complete Google Apps Script Backend v2.0
 * =========================================================
 * STEP 1: Open Google Sheet → Extensions → Apps Script
 * STEP 2: Delete all existing code, paste this entire file
 * STEP 3: Run  SETUP_EVERYTHING  once to create all sheets + seed products
 * STEP 4: Deploy → New Deployment → Web App → Execute as Me → Anyone → Deploy
 * STEP 5: Copy Web App URL → paste in Admin Panel → Settings
 *
 * SHEETS:
 *   Orders   — order_id | name | phone | email | address | city | state | pincode
 *              | items | subtotal | shipping | total | payment | notes | status | date
 *              | courier_name | tracking_number | tracking_url | invoice_number
 *   Products — id | title | description | price | mrp | category | categoryLabel
 *              | image | images | rating | reviews | stock | badge | badgeType
 *              | shortDesc | features | specs | hidden
 *   Quotes   — quote_id | name | phone | email | address | org | city
 *              | products | message | status | notes | quoted_amount | validity_date | date
 *   Users    — id | name | email | password_hash | phone | date
 */

// ═══════════════════════════════════════════════════════════════════════════════
// ▶ FIRST-TIME SETUP — Run this ONCE after pasting this file
// ═══════════════════════════════════════════════════════════════════════════════
function SETUP_EVERYTHING() {
  _setupOrdersSheet();
  _setupQuotesSheet();
  _setupUsersSheet();
  _setupProductsSheet();
  _seedAllProducts();
  _setupBlogsSheet();
  _seedAllBlogs();

  SpreadsheetApp.getUi().alert(
    '✅ Detoxy Hijama Setup Complete!\n\n' +
    '• Orders sheet    → headers ready\n' +
    '• Products sheet  → 15 products loaded\n' +
    '• Quotes sheet    → headers ready\n' +
    '• Users sheet     → headers ready\n' +
    '• Blogs sheet     → 20 built-in blogs loaded\n\n' +
    'Next step: Deploy as Web App → paste URL in Admin → Settings.'
  );
}


// ── Sheet column definitions ───────────────────────────────────────────────────
var O_HDRS = ['order_id','name','phone','email','address','city','state','pincode',
              'items','items_detail','subtotal','shipping','total','payment','notes','status','date',
              'courier_name','tracking_number','tracking_url','invoice_number',
              'shipping_quote','shipping_status','shipping_notes'];

var P_COLS = ['id','title','description','price','mrp','category','categoryLabel',
              'image','image1','image2','image3','image4','image5','image6',
              'images','youtube','rating','reviews','stock','badge','badgeType',
              'shortDesc','features','specs','hidden','variants','variantLabel','variantStock'];

var Q_HDRS = ['quote_id','name','phone','email','address','org','city',
              'products','message','status','notes','quoted_amount','validity_date','date'];

var U_HDRS = ['id','name','email','password_hash','phone','address','city','state','pincode','date'];

var B_HDRS = ['blog_id','title','category','emoji','author','read_time','excerpt',
              'content','tags','status','date','updated_date','url'];

// ═══════════════════════════════════════════════════════════════════════════════
// SHEET SETUP FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════
function _setupOrdersSheet() {
  var s = _getSheet('Orders');
  if (s.getLastRow() === 0) {
    s.appendRow(O_HDRS);
    _styleHeader(s, O_HDRS.length, '#1a3d35');
    s.setFrozenRows(1);
    s.autoResizeColumns(1, O_HDRS.length);
  }
}

function _setupQuotesSheet() {
  var s = _getSheet('Quotes');
  if (s.getLastRow() === 0) {
    s.appendRow(Q_HDRS);
    _styleHeader(s, Q_HDRS.length, '#1a3d35');
    s.setFrozenRows(1);
    s.autoResizeColumns(1, Q_HDRS.length);
  }
}

function _setupUsersSheet() {
  var s = _getSheet('Users');
  if (s.getLastRow() === 0) {
    s.appendRow(U_HDRS);
    _styleHeader(s, U_HDRS.length, '#1a3d35');
    s.setFrozenRows(1);
    s.autoResizeColumns(1, U_HDRS.length);
  }
}

function _setupBlogsSheet() {
  var s = _getSheet('Blogs');
  if (s.getLastRow() === 0) {
    s.appendRow(B_HDRS);
    _styleHeader(s, B_HDRS.length, '#2c3e50');
    s.setFrozenRows(1);
    s.autoResizeColumns(1, B_HDRS.length);
  }
}

function _setupProductsSheet() {
  // Header-only setup — products are seeded separately by _seedAllProducts()
  // This function intentionally does nothing now to avoid double-write with _seedAllProducts
}

function _styleHeader(sheet, numCols, bg) {
  var r = sheet.getRange(1, 1, 1, numCols);
  r.setBackground(bg);
  r.setFontColor('#ffffff');
  r.setFontWeight('bold');
  r.setFontSize(10);
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCT SEED DATA — All 15 Products
// ═══════════════════════════════════════════════════════════════════════════════
var ALL_PRODUCTS = [
  {
    id:'premium-cups', title:'Detoxy Hijama Premium China Made Cups',
    description:'Detoxy Hijama Premium China Made Cups are crafted from 100% medical-grade silicone, ensuring safe and effective cupping therapy. The flexible material allows for precise pressure control, making them ideal for both wet and dry cupping. Each set includes 12 cups in various sizes to cover different body areas.',
    price:649, mrp:999, category:'cups', categoryLabel:'Cupping Sets',
    image:'assets/images/products/premium-cups/main.jpg',
    images:'["assets/images/products/premium-cups/main.jpg","assets/images/products/premium-cups/image2.jpg","assets/images/products/premium-cups/image3.jpg","assets/images/products/premium-cups/image4.jpg","assets/images/products/premium-cups/image5.jpg","assets/images/products/premium-cups/image6.jpg"]',
    rating:4.8, reviews:214, stock:50, badge:'Best Seller', badgeType:'teal',
    shortDesc:'Medical-grade silicone cupping set for professional hijama therapy.',
    features:'["12 cups in 4 sizes","Medical-grade silicone","BPA-free material","Easy suction control","Sterilizable & reusable"]',
    specs:'{"Material":"Medical-grade silicone","Sizes":"4 sizes (S/M/L/XL)","Quantity":"12 cups per set","Usage":"Wet & Dry cupping","Sterilization":"Autoclave safe"}',
    hidden:'false'
  },
  {
    id:'electric-smart-cup', title:'Detoxy Hijama Electric Smart Cupping Device',
    description:'Detoxy Hijama Electric Smart Cupping Device combines traditional hijama therapy with modern technology. Features adjustable suction strength (1-9 levels), built-in heat therapy, and rechargeable battery. Perfect for clinics and home use with zero manual effort required.',
    price:1899, mrp:2999, category:'electric', categoryLabel:'Electric Devices',
    image:'assets/images/products/electric-smart-cup/main.jpg',
    images:'["assets/images/products/electric-smart-cup/main.jpg","assets/images/products/electric-smart-cup/image2.jpg","assets/images/products/electric-smart-cup/image3.jpg","assets/images/products/electric-smart-cup/image4.jpg","assets/images/products/electric-smart-cup/image5.jpg"]',
    rating:4.7, reviews:89, stock:20, badge:'New Arrival', badgeType:'dark',
    shortDesc:'Smart electric cupping device with adjustable suction levels and heat therapy.',
    features:'["9 suction levels","Built-in heat therapy","Rechargeable USB-C","Auto-pressure control","LCD display"]',
    specs:'{"Power":"USB-C rechargeable","Battery":"2000mAh","Suction":"9 adjustable levels","Heat":"40°C – 50°C","Display":"LCD panel"}',
    hidden:'false'
  },
  {
    id:'fire-cupping-glass', title:'Detoxy Hijama Fire Cupping Glass Set',
    description:'Detoxy Hijama Fire Cupping Glass Set is crafted from premium borosilicate glass, designed for the classic Sunnah hijama method. High heat resistance ensures safe fire cupping. Smooth rounded edges prevent skin irritation. Set of 16 cups in three sizes for full-body coverage.',
    price:549, mrp:799, category:'cups', categoryLabel:'Cupping Sets',
    image:'assets/images/products/fire-cupping-glass/main.jpg',
    images:'["assets/images/products/fire-cupping-glass/main.jpg","assets/images/products/fire-cupping-glass/image2.jpg","assets/images/products/fire-cupping-glass/image3.jpg"]',
    rating:4.6, reviews:156, stock:35, badge:'Trending', badgeType:'cream',
    shortDesc:'Authentic borosilicate glass fire cupping set used in traditional Sunnah hijama.',
    features:'["16 borosilicate glass cups","Heat resistant up to 500°C","Smooth rounded rims","3 sizes included","Professional clinic grade"]',
    specs:'{"Material":"Borosilicate glass","Sizes":"Small / Medium / Large","Quantity":"16 cups per set","Heat":"Up to 500°C","Thickness":"3mm wall"}',
    hidden:'false'
  },
  {
    id:'magnetic-vacuum-kit', title:'Detoxy Hijama 24-Set Magnetic Vacuum Cupping Kit',
    description:'Detoxy Hijama 24-Set Magnetic Vacuum Cupping Kit is a comprehensive set designed for professional hijama practitioners. Includes a precision vacuum pump gun with magnetic lock system, 24 high-quality cups in 4 sizes, and extension hose. The magnetic connector ensures airtight sealing every time.',
    price:1149, mrp:1699, category:'kits', categoryLabel:'Starter Kits',
    image:'assets/images/products/magnetic-vacuum-kit/main.jpg',
    images:'["assets/images/products/magnetic-vacuum-kit/main.jpg","assets/images/products/magnetic-vacuum-kit/image2.jpg"]',
    rating:4.9, reviews:73, stock:18, badge:'Top Rated', badgeType:'teal',
    shortDesc:'Complete 24-piece magnetic vacuum cupping kit with pump gun and cups in 4 sizes.',
    features:'["24 cups (4 sizes)","Magnetic vacuum pump","Airtight seal technology","Extension hose included","Carry case included"]',
    specs:'{"Cups":"24 pcs in 4 sizes","Pump":"Magnetic lock system","Material":"ABS + silicone","Includes":"Pump, cups, case, hose","Usage":"Professional & home"}',
    hidden:'false'
  },
  {
    id:'curve-cups', title:'Detoxy Hijama Curve Cup Set (Size 3 & 4)',
    description:'Detoxy Hijama Curve Cups feature a unique ergonomic design that adapts to curved body surfaces like shoulders, knees, and joints. Made from flexible medical-grade silicone, these cups deliver optimal suction even on uneven surfaces, ideal for targeted therapy in hard-to-reach areas.',
    price:749, mrp:1099, category:'cups', categoryLabel:'Cupping Sets',
    image:'assets/images/products/curve-cups/main.jpg',
    images:'["assets/images/products/curve-cups/main.jpg","assets/images/products/curve-cups/image2.jpg"]',
    rating:4.5, reviews:62, stock:28, badge:'', badgeType:'',
    shortDesc:'Ergonomically curved cups designed for joints, shoulders and curved body areas.',
    features:'["Ergonomic curved design","Flexible silicone","Fits curved body parts","Deep tissue therapy","Sizes No. 3 & 4"]',
    specs:'{"Design":"Ergonomic curve","Material":"Medical silicone","Sizes":"No. 3 & 4","Ideal":"Joints & shoulders","Set":"2 cups"}',
    hidden:'false'
  },
  {
    id:'lancet-pen', title:'Detoxy Hijama Auto Lancet Pen Massager',
    description:'Detoxy Hijama Auto Lancet Pen Massager provides precise, controlled incisions for wet hijama. Features 5 adjustable depth settings to suit different skin types. Each click delivers a consistent, safe incision depth, reducing patient discomfort and ensuring hygiene.',
    price:299, mrp:499, category:'consumables', categoryLabel:'Consumables',
    image:'assets/images/products/lancet-pen/main.jpg',
    images:'["assets/images/products/lancet-pen/main.jpg"]',
    rating:4.7, reviews:198, stock:100, badge:'', badgeType:'',
    shortDesc:'Spring-loaded auto lancet pen with 5 depth settings for precise wet hijama incisions.',
    features:'["5 depth settings (0.8–1.8mm)","Auto spring mechanism","Single-use lancet compatibility","Ergonomic grip","Sterile & disposable lancets"]',
    specs:'{"Depths":"0.8mm – 1.8mm (5 levels)","Mechanism":"Auto spring-loaded","Compatible":"Standard lancets","Material":"Medical ABS plastic","Includes":"Pen + 10 lancet heads"}',
    hidden:'false'
  },
  {
    id:'latex-gloves', title:'Detoxy Hijama Premium Latex Gloves (Pack of 100)',
    description:'Detoxy Hijama Premium Latex Gloves are medical-grade examination gloves designed for hijama practitioners. Powder-coated for easy donning, textured fingertips for better grip, and pre-tested for pinhole integrity. Box of 100 — enough for a full month of regular sessions.',
    price:199, mrp:349, category:'consumables', categoryLabel:'Consumables',
    image:'assets/images/products/latex-gloves/main.jpg',
    images:'["assets/images/products/latex-gloves/main.jpg"]',
    rating:4.4, reviews:341, stock:200, badge:'', badgeType:'',
    shortDesc:'Powdered latex examination gloves, box of 100. Standard protective wear for hijama sessions.',
    features:'["Box of 100 gloves","Medical-grade latex","Textured fingertips","Powder coated","Pinhole tested"]',
    specs:'{"Quantity":"100 pcs per box","Material":"Natural rubber latex","Size":"M / L (select)","Standard":"ISO 374-1","Finish":"Powdered"}',
    hidden:'false'
  },
  {
    id:'bamboo-cupping-set', title:'Detoxy Hijama Bamboo Cupping Set',
    description:'Detoxy Hijama Bamboo Cupping Set is crafted from sustainably sourced bamboo, ideal for herbal steam cupping. The natural material allows herbal infusions to permeate during therapy, enhancing the healing benefits. Each set includes 8 handcrafted bamboo cups with varying diameters.',
    price:479, mrp:699, category:'cups', categoryLabel:'Cupping Sets',
    image:'assets/images/products/bamboo-cupping-set/main.jpg',
    images:'["assets/images/products/bamboo-cupping-set/main.jpg"]',
    rating:4.3, reviews:44, stock:15, badge:'', badgeType:'',
    shortDesc:'Authentic handcrafted bamboo cups for traditional herbal steam cupping therapy.',
    features:'["Sustainably sourced bamboo","Herbal steam compatible","Set of 8 cups","Natural anti-microbial","Handcrafted quality"]',
    specs:'{"Material":"Natural bamboo","Quantity":"8 cups","Sizes":"3 diameters","Usage":"Herbal steam cupping","Finish":"Natural lacquer"}',
    hidden:'false'
  },
  {
    id:'silicone-facial-4', title:'Detoxy Hijama Silicone Facial Cup Set of 4',
    description:'Detoxy Hijama Silicone Facial Cup Set of 4 is designed for gentle facial lymphatic drainage and skin rejuvenation. Made from ultra-soft, hypoallergenic silicone, these mini cups create gentle suction to boost circulation, reduce puffiness, and promote collagen production.',
    price:349, mrp:549, category:'facial', categoryLabel:'Facial Cups',
    image:'assets/images/products/silicone-facial-4/main.jpg',
    images:'["assets/images/products/silicone-facial-4/main.jpg"]',
    rating:4.6, reviews:127, stock:45, badge:'', badgeType:'',
    shortDesc:'Mini silicone facial cupping set (4 pcs) for lymphatic drainage and glowing skin.',
    features:'["4 mini cups","Ultra-soft silicone","Hypoallergenic","Boosts collagen","Reduces puffiness"]',
    specs:'{"Quantity":"4 cups","Material":"Soft silicone","Sizes":"2 sizes (round + oval)","Use":"Face & neck","Safe":"Hypoallergenic"}',
    hidden:'false'
  },
  {
    id:'hijama-suction-gun', title:'Detoxy Hijama Suction Gun',
    description:'Detoxy Hijama Suction Gun is a professional-grade vacuum pump designed specifically for hijama therapy. The ergonomic pistol grip allows single-handed operation, and the precision valve lets practitioners control suction strength with accuracy. Compatible with standard screw-top hijama cups.',
    price:549, mrp:799, category:'kits', categoryLabel:'Starter Kits',
    image:'assets/images/products/hijama-suction-gun/main.jpg',
    images:'["assets/images/products/hijama-suction-gun/main.jpg"]',
    rating:4.5, reviews:38, stock:30, badge:'', badgeType:'',
    shortDesc:'Professional hijama suction gun for precise vacuum control during cupping therapy.',
    features:'["Ergonomic pistol grip","Precision vacuum valve","Single-hand operation","Compatible with standard cups","Durable ABS construction"]',
    specs:'{"Type":"Manual vacuum gun","Compatibility":"Standard screw-top cups","Material":"Medical ABS","Operation":"Single-handed","Valve":"Precision release"}',
    hidden:'false'
  },
  {
    id:'indian-standard-cup', title:'Detoxy Hijama Indian Standard Hijama Cups',
    description:'Detoxy Hijama Indian Standard Hijama Cups is our entry-level silicone cup manufactured in India for everyday clinic use. Soft, flexible, and easy to apply — ideal for practitioners looking for reliable quality at an accessible price point. Suitable for both wet and dry cupping.',
    price:199, mrp:349, category:'cups', categoryLabel:'Cupping Sets',
    image:'assets/images/products/indian-standard-cup/main.jpg',
    images:'["assets/images/products/indian-standard-cup/main.jpg"]',
    rating:4.2, reviews:89, stock:150, badge:'', badgeType:'',
    shortDesc:'Affordable Indian-made standard silicone hijama cups for everyday clinic use.',
    features:'["Made in India","Soft silicone material","Easy suction application","Wet & dry cupping","Affordable clinic stock"]',
    specs:'{"Origin":"Made in India","Material":"Silicone","Usage":"Wet & Dry cupping","Sterilization":"Boil safe","Grade":"Standard clinical"}',
    hidden:'false'
  },
  {
    id:'silicone-facial-7', title:'Detoxy Hijama Silicone Facial Cup Set of 7',
    description:'Detoxy Hijama Silicone Facial Cup Set of 7 is the complete facial cupping kit covering all facial zones including forehead, cheeks, chin, and neck. Seven different cup sizes allow targeted treatment for every area. Hypoallergenic silicone is safe for all skin types including sensitive skin.',
    price:549, mrp:849, category:'facial', categoryLabel:'Facial Cups',
    image:'assets/images/products/silicone-facial-7/main.jpg',
    images:'["assets/images/products/silicone-facial-7/main.jpg"]',
    rating:4.7, reviews:61, stock:35, badge:'Popular', badgeType:'teal',
    shortDesc:'Complete 7-piece silicone facial cupping set for full face and neck therapy.',
    features:'["7 cups — 7 sizes","Full face & neck coverage","Hypoallergenic silicone","Anti-aging & lymphatic drainage","Includes storage pouch"]',
    specs:'{"Quantity":"7 cups","Material":"Soft silicone","Coverage":"Full face + neck","Skin":"All skin types","Includes":"Storage pouch"}',
    hidden:'false'
  },
  {
    id:'silicone-moving-cup', title:'Detoxy Hijama Silicone Moving Cup Set (4 pcs)',
    description:'Detoxy Hijama Silicone Moving Cup Set enables the traditional sliding cupping technique used alongside massage therapy. The ultra-flexible silicone creates consistent suction while gliding across oiled skin, stimulating circulation, releasing fascial tension, and providing deep tissue massage benefits.',
    price:399, mrp:599, category:'cups', categoryLabel:'Cupping Sets',
    image:'assets/images/products/silicone-moving-cup/main.jpg',
    images:'["assets/images/products/silicone-moving-cup/main.jpg"]',
    rating:4.5, reviews:52, stock:40, badge:'', badgeType:'',
    shortDesc:'Silicone moving (sliding) cups for gliding massage cupping therapy.',
    features:'["4 flexible silicone cups","Gliding massage technique","Deep tissue stimulation","Use with massage oil","Reusable & sterilizable"]',
    specs:'{"Quantity":"4 cups","Material":"Flexible silicone","Technique":"Moving / sliding","Use":"With massage oil","Sizes":"Mixed set"}',
    hidden:'false'
  },
  {
    id:'surgical-blade', title:'Detoxy Hijama Surgical Blade No. 11 (Pack of 100)',
    description:'Detoxy Hijama Surgical Blade No. 11 are individually packaged sterile surgical blades used for precise incision in wet hijama. The No. 11 pointed blade is the standard choice among hijama practitioners for controlled, clean incisions. Single-use only for maximum hygiene.',
    price:249, mrp:399, category:'consumables', categoryLabel:'Consumables',
    image:'assets/images/products/surgical-blade/main.jpg',
    images:'["assets/images/products/surgical-blade/main.jpg"]',
    rating:4.6, reviews:173, stock:300, badge:'', badgeType:'',
    shortDesc:'Sterile surgical blade No. 11, pack of 100 — precision incision for wet hijama.',
    features:'["100 individually wrapped blades","No. 11 pointed blade","Sterile & single-use","Carbon steel construction","Industry standard for hijama"]',
    specs:'{"Quantity":"100 blades per pack","Type":"No. 11 (pointed)","Material":"Carbon steel","Sterility":"Gamma-irradiated","Usage":"Single use only"}',
    hidden:'false'
  },
  {
    id:'surgical-cotton', title:'Detoxy Hijama Surgical Cotton (400g)',
    description:'Detoxy Hijama Surgical Cotton is 100% pure, highly absorbent cotton used for pre and post-hijama skin preparation and wound care. The 400g roll provides excellent value for busy clinics. Soft on skin, lint-free, and suitable for applying antiseptic solutions or absorbing blood post-cupping.',
    price:149, mrp:249, category:'consumables', categoryLabel:'Consumables',
    image:'assets/images/products/surgical-cotton/main.jpg',
    images:'["assets/images/products/surgical-cotton/main.jpg"]',
    rating:4.3, reviews:95, stock:200, badge:'', badgeType:'',
    shortDesc:'Absorbent surgical cotton roll 400g for cleaning and post-hijama care.',
    features:'["400g roll","100% pure cotton","High absorbency","Lint-free quality","Antiseptic compatible"]',
    specs:'{"Weight":"400g","Material":"100% cotton","Grade":"Surgical / medical","Use":"Pre & post hijama care","Pack":"Single roll"}',
    hidden:'false'
  }
];

function _seedAllProducts() {
  var s = _getSheet('Products');

  // Write header row if sheet is completely empty
  if (s.getLastRow() === 0) {
    s.appendRow(P_COLS);
    _styleHeader(s, P_COLS.length, '#0d6b5e');
    s.setFrozenRows(1);
  }

  // ── DUPLICATE GUARD ──────────────────────────────────────────────────────────
  // Read all existing product IDs so we never insert the same product twice.
  // This means SETUP_EVERYTHING is safe to re-run — it will skip products that
  // already exist and only insert genuinely new ones.
  var existing = s.getDataRange().getValues();
  var headers  = existing[0];
  var idCol    = headers.indexOf('id');
  var existingIds = {};
  for (var i = 1; i < existing.length; i++) {
    var rowId = String(existing[i][idCol] || '').trim();
    if (rowId) existingIds[rowId] = true;
  }

  // Filter to only products not already in the sheet
  var newProducts = ALL_PRODUCTS.filter(function(p) {
    return !existingIds[String(p.id)];
  });

  if (newProducts.length === 0) {
    Logger.log('_seedAllProducts: all ' + ALL_PRODUCTS.length + ' products already exist — nothing to add.');
    return;
  }

  var rows = newProducts.map(function(p) {
    return P_COLS.map(function(col) {
      var v = p[col];
      return (v === undefined || v === null) ? '' : v;
    });
  });

  s.getRange(s.getLastRow() + 1, 1, rows.length, P_COLS.length).setValues(rows);
  s.autoResizeColumns(1, P_COLS.length);
  Logger.log('_seedAllProducts: inserted ' + newProducts.length + ' new products (' + (ALL_PRODUCTS.length - newProducts.length) + ' already existed).');
}

// ── Optional: reset products only ─────────────────────────────────────────────
function RESET_PRODUCTS_ONLY() {
  var s   = _getSheet('Products');
  var lr  = s.getLastRow();
  // Clear all data rows (keep header row 1)
  if (lr > 1) s.deleteRows(2, lr - 1);
  // Sheet is now header-only — safe to seed with no duplicates
  _seedAllProducts();
  SpreadsheetApp.getUi().alert('✅ Products sheet reset with all 15 products.');
}

// ═══════════════════════════════════════════════════════════════════════════════
// WEB APP ENTRY POINTS
// ═══════════════════════════════════════════════════════════════════════════════
function doGet(e) {
  var p = e.parameter, a = p.action || '';
  try {
    var r;
    if      (a==='getProducts')   r = getProducts(p);
    else if (a==='getProductById') r = getProduct(p.id);
    else if (a==='getProduct')    r = getProduct(p.id);
    else if (a==='getCategories') r = getCategories();
    else if (a==='getOrders')     r = getOrders(p);
    else if (a==='getOrder')      r = getOrderById(p.orderId);
    else if (a==='trackOrder')    r = trackOrder(p.orderId, p.phone);
    else if (a==='updateStatus')  r = updateOrderStatus(p.orderId, p.status);
    else if (a==='getQuotes')     r = getQuotes(p);
    else if (a==='getDashboard')  r = getDashboardStats();
    else if (a==='getBlogs')       r = getBlogs(p);
    else if (a==='getBlog')        r = getBlogById(p.blogId);
    else if (a==='ping')           r = {status:'ok', message:'Detoxy Hijama API v2.0 is connected ✓', sheets:['Orders','Products','Quotes','Users','Blogs']};
    else if (a==='getUserOrders') r = getUserOrders(p.email, p.phone);
    else r = {status:'ok', message:'Detoxy Hijama API v2.0 — use ?action=ping to test', sheets:['Orders','Products','Quotes','Users']};
    return _resp(r);
  } catch(err) { return _resp({error: err.message}); }
}

function doPost(e) {
  try {
    // IMPORTANT: Frontend sends Content-Type: text/plain (required for GAS CORS).
    // Body is still JSON string — parse it from postData.contents.
    var body = {};
    try {
      body = JSON.parse(e.postData.contents || '{}');
    } catch(parseErr) {
      body = {};
    }
    var a = e.parameter.action || body.action || '';
    var r;
    if      (a==='createOrder')       r = createOrder(body);
    else if (a==='quoteShipping')      r = quoteShipping(body);
    else if (a==='respondShipping')    r = respondShipping(body);
    else if (a==='updateOrder')       r = updateOrder(body);
    else if (a==='addTracking')       r = addTracking(body);
    else if (a==='register')          r = registerUser(body);
    else if (a==='login')             r = loginUser(body);
    else if (a==='addProduct')        r = addProduct(body);
    else if (a==='editProduct')       r = editProduct(body);
    else if (a==='deleteProduct')     r = deleteProduct(body.id);
    else if (a==='toggleProductHide') r = toggleProductHide(body.id, body.hidden);
    else if (a==='createQuote')       r = createQuote(body);
    else if (a==='updateQuote')       r = updateQuote(body);
    else if (a==='createBlog')        r = createBlog(body);
    else if (a==='updateBlog')        r = updateBlog(body);
    else if (a==='deleteBlog')        r = deleteBlog(body.blogId);
    else if (a==='updateUser')        r = updateUser(body);
    else if (a==='changePassword')    r = changePassword(body);
    else r = {error:'Unknown action: ' + a};
    return _resp(r);
  } catch(err) { return _resp({error: err.message}); }
}

function _resp(data) {
  // Google Apps Script automatically adds CORS headers when deployed as
  // "Execute as: Me" and "Who has access: Anyone"
  // Always return JSON — browser fetch works correctly with this setup
  var output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════
function _getSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function _toObjects(sheet) {
  var d = sheet.getDataRange().getValues();
  if (d.length < 2) return [];
  var h = d[0], rows = [];
  for (var i = 1; i < d.length; i++) {
    if (!d[i][0]) continue;
    var obj = {}; h.forEach(function(k,j){ obj[k] = d[i][j]; }); rows.push(obj);
  }
  return rows;
}

function _findRow(sheet, colName, val) {
  var d = sheet.getDataRange().getValues();
  var h = d[0], ci = h.indexOf(colName);
  for (var i = 1; i < d.length; i++) {
    if (String(d[i][ci]) === String(val)) return {row: i+1, headers: h, data: d[i]};
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCTS API
// ═══════════════════════════════════════════════════════════════════════════════
function getProducts(params) {
  var rows = _toObjects(_getSheet('Products'));
  var list = rows.map(function(p) {
    // Parse JSON fields safely
    try { if (typeof p.features==='string')     p.features=JSON.parse(p.features||'[]');     } catch(e){ p.features=[]; }
    try { if (typeof p.specs==='string')         p.specs=JSON.parse(p.specs||'{}');           } catch(e){ p.specs={}; }
    try { if (typeof p.images==='string')        p.images=JSON.parse(p.images||'[]');         } catch(e){ p.images=[]; }
    try { if (typeof p.variantStock==='string')  p.variantStock=JSON.parse(p.variantStock||'{}'); } catch(e){ p.variantStock={}; }
    try { if (typeof p.variants==='string')      p.variants=JSON.parse(p.variants||'{}');     } catch(e){ p.variants={}; }
    // Ensure images array is populated from individual image columns if needed
    if (!Array.isArray(p.images) || !p.images.length) {
      p.images = [p.image1||p.image, p.image2, p.image3, p.image4, p.image5, p.image6].filter(Boolean);
    }
    if (!p.images.length && p.image) p.images = [p.image];
    // Numeric coercions
    p.price   = Number(p.price)   || 0;
    p.mrp     = Number(p.mrp)     || 0;
    p.stock   = Number(p.stock)   || 0;
    p.rating  = Number(p.rating)  || 0;
    p.reviews = Number(p.reviews) || 0;
    // Ensure both name and title exist for frontend compatibility
    p.name  = p.title || p.name || '';
    p.title = p.name;
    p.slug  = p.slug  || p.id  || '';
    return p;
  });
  if (params && params.category) list = list.filter(function(p){ return p.category===params.category; });
  if (!params || !params.showHidden) list = list.filter(function(p){ return !p.hidden||p.hidden==='false'||p.hidden===false; });
  return {products:list, total:list.length};
}

function getProduct(id) {
  var p = getProducts({showHidden:true}).products.filter(function(x){return x.id===id;})[0];
  return p ? {product:p} : {error:'Product not found'};
}

function getCategories() {
  var cats={};
  getProducts({}).products.forEach(function(p){ if(p.category) cats[p.category]=(cats[p.category]||0)+1; });
  return {categories:cats};
}

function addProduct(data) {
  var s = _getSheet('Products');
  if (s.getLastRow()===0) { s.appendRow(P_COLS); _styleHeader(s,P_COLS.length,'#0d6b5e'); s.setFrozenRows(1); }

  if (!data.id) data.id = 'p-' + Date.now();

  // Prevent duplicate: if a product with this ID already exists, edit it instead
  var existing = _findRow(s, 'id', data.id);
  if (existing) {
    Logger.log('addProduct: ID ' + data.id + ' already exists — updating instead of inserting.');
    return editProduct(data);
  }

  var h = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];
  s.appendRow(h.map(function(k){
    var v = data[k];
    if (v === undefined || v === null) return '';
    if (typeof v === 'object') return JSON.stringify(v);
    return v;
  }));
  return {success:true, id:data.id};
}

function editProduct(data) {
  var s=_getSheet('Products'), found=_findRow(s,'id',data.id);
  if (!found) return {error:'Product not found: ' + data.id};
  // Ensure all columns exist (P_COLS may have expanded)
  var sheetHeaders = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];
  P_COLS.forEach(function(col){
    if (sheetHeaders.indexOf(col) === -1) {
      s.getRange(1, sheetHeaders.length+1).setValue(col);
      sheetHeaders.push(col);
    }
  });
  // Re-find after potential column additions
  found = _findRow(s,'id',data.id);
  found.headers.forEach(function(k,j){
    if (data[k] === undefined) return;
    var v = data[k];
    if (typeof v === 'object' && v !== null) v = JSON.stringify(v);
    s.getRange(found.row, j+1).setValue(v);
  });
  return {success:true};
}

function deleteProduct(id) {
  var s=_getSheet('Products'), found=_findRow(s,'id',id);
  if (!found) return {error:'Product not found'};
  s.deleteRow(found.row);
  return {success:true};
}

function toggleProductHide(id, hidden) {
  var s=_getSheet('Products'), found=_findRow(s,'id',id);
  if (!found) return {error:'Product not found: '+id};
  // Find 'hidden' column — search by header value for robustness
  var h = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];
  var hIdx = h.indexOf('hidden');
  if (hIdx === -1) {
    // Add hidden column if missing
    hIdx = h.length;
    s.getRange(1, hIdx+1).setValue('hidden');
  }
  var val = (hidden === true || hidden === 'true') ? 'true' : 'false';
  s.getRange(found.row, hIdx+1).setValue(val);
  Logger.log('toggleProductHide: id='+id+' hidden='+val+' row='+found.row+' col='+(hIdx+1));
  return {success:true, id:id, hidden:val};
}

// ═══════════════════════════════════════════════════════════════════════════════
// ORDERS API
// ═══════════════════════════════════════════════════════════════════════════════
function createOrder(data) {
  var s = _getSheet('Orders');
  if (s.getLastRow()===0) { s.appendRow(O_HDRS); _styleHeader(s,O_HDRS.length,'#1a3d35'); s.setFrozenRows(1); }
  var id  = data.orderId || ('DH' + Date.now().toString().slice(-8));
  var inv = 'INV-' + id;

  // Build human-readable items string and JSON detail
  var itemsStr = (data.items||[]).map(function(i){
    var line = i.name + ' x' + i.qty;
    if (i.size) line += ' [' + i.size + ']';
    return line;
  }).join(', ');

  var itemsDetail = JSON.stringify(data.items||[]);

  s.appendRow([
    id, data.name||'', data.phone||'', data.email||'',
    data.address||'', data.city||'', data.state||'', data.pincode||'',
    itemsStr, itemsDetail,
    data.subtotal||0, data.shipping||0, data.total||0,
    data.payment||'cod', data.notes||'', 'pending',
    data.date||new Date().toISOString(),
    '','','', inv
  ]);

  // Send notifications
  try { _notifyNewOrder(id, data); } catch(e){ Logger.log('Notify error: '+e); }

  return {success:true, orderId:id, invoiceNumber:inv};
}

function getOrders(params) {
  var list = _toObjects(_getSheet('Orders'));
  if (params&&params.status) list=list.filter(function(o){return o.status===params.status;});
  list.sort(function(a,b){return new Date(b.date)-new Date(a.date);});
  return {orders:list, total:list.length};
}

function getOrderById(orderId) {
  var o = getOrders({}).orders.filter(function(x){return String(x.order_id).toUpperCase()===String(orderId).toUpperCase();})[0];
  return o ? {order:o} : {error:'Order not found'};
}

function trackOrder(orderId, phone) {
  var orders = getOrders({}).orders;
  var idUpper = String(orderId||'').toUpperCase().trim();
  var clean   = function(s){ return String(s||'').replace(/\D/g,'').slice(-10); };
  var phoneClean = clean(phone||'');

  // Search by AWB/tracking number first
  var o = orders.filter(function(x){
    return String(x.tracking_number||'').toUpperCase() === idUpper;
  })[0];

  // If not found by AWB, search by order_id (phone optional)
  if (!o) {
    var byId = orders.filter(function(x){
      return String(x.order_id||'').toUpperCase() === idUpper;
    });
    if (byId.length === 1) {
      o = byId[0]; // unique match — no phone needed
    } else if (byId.length > 1 && phoneClean) {
      o = byId.filter(function(x){ return clean(x.phone) === phoneClean; })[0];
    } else if (byId.length === 1) {
      o = byId[0];
    }
  }

  return o ? {order:o} : {error:'Order not found. Please check your AWB or Order ID.'};
}

// ── Shipping Quote System ────────────────────────────────────────────────────
function quoteShipping(data) {
  // Admin quotes shipping for an order
  // data: {order_id, shipping_quote, shipping_notes}
  var s = _getSheet('Orders');
  var found = _findRow(s, 'order_id', data.order_id);
  if (!found) return {error: 'Order not found'};
  var h = found.headers;
  var set = function(col, val) {
    var i = h.indexOf(col);
    if (i > -1) s.getRange(found.row, i+1).setValue(val);
    else {
      // Add column if missing
      var lastCol = s.getLastColumn();
      s.getRange(1, lastCol+1).setValue(col);
      s.getRange(found.row, lastCol+1).setValue(val);
    }
  };
  set('shipping_quote',  data.shipping_quote || 0);
  set('shipping_status', 'quoted');
  set('shipping_notes',  data.shipping_notes || '');
  
  // Notify customer
  var orderObj = _toObjects(s).filter(function(o){ return String(o.order_id)===String(data.order_id); })[0];
  if (orderObj && orderObj.email) {
    try {
      GmailApp.sendEmail(orderObj.email,
        'Shipping Quote for Your Order #' + data.order_id + ' — Detoxy Hijama',
        'Dear ' + (orderObj.name||'Customer') + ',

' +
        'Your order has been reviewed and we have quoted shipping charges:

' +
        'Order ID    : ' + data.order_id + '
' +
        'Shipping    : ₹' + Number(data.shipping_quote||0).toLocaleString('en-IN') + '
' +
        (data.shipping_notes ? 'Note        : ' + data.shipping_notes + '
' : '') + '
' +
        'Please visit the Track Order page to accept or reject:
' +
        'https://detoxyhijama.github.io/track-order.html

' +
        'Questions? WhatsApp: +91 95665 96077

Team Detoxy Hijama'
      );
    } catch(e) { Logger.log('Shipping quote email failed: '+e); }
  }
  return {success: true};
}

function respondShipping(data) {
  // Customer accepts or rejects shipping quote
  // data: {order_id, response: 'accepted'|'rejected'}
  var s = _getSheet('Orders');
  var found = _findRow(s, 'order_id', data.order_id);
  if (!found) return {error: 'Order not found'};
  var h = found.headers;
  var set = function(col, val) { var i=h.indexOf(col); if(i>-1) s.getRange(found.row,i+1).setValue(val); };
  
  if (data.response === 'accepted' || data.shipping_status === 'accepted') {
    set('shipping_status', 'accepted');
    set('status', 'confirmed');
    // Update actual shipping with the quoted amount
    var sqIdx = h.indexOf('shipping_quote');
    if (sqIdx > -1) {
      var quotedAmt = s.getRange(found.row, sqIdx+1).getValue();
      set('shipping', quotedAmt);
      // Recalculate total
      var subtotalIdx = h.indexOf('subtotal');
      if (subtotalIdx > -1) {
        var subtotal = Number(s.getRange(found.row, subtotalIdx+1).getValue()) || 0;
        set('total', subtotal + Number(quotedAmt));
      }
    }
  } else {
    set('shipping_status', 'rejected');
    set('status', 'cancelled');
  }
  return {success: true};
}

function updateOrderStatus(orderId, status) {
  var s=_getSheet('Orders'), found=_findRow(s,'order_id',orderId);
  if (!found) return {error:'Order not found'};
  var si = found.headers.indexOf('status');
  s.getRange(found.row, si+1).setValue(status);
  return {success:true};
}

function updateOrder(data) {
  var s=_getSheet('Orders'), found=_findRow(s,'order_id',data.order_id);
  if (!found) return {error:'Order not found'};
  found.headers.forEach(function(k,j){
    if (data[k]!==undefined) s.getRange(found.row,j+1).setValue(data[k]);
  });
  return {success:true};
}

function addTracking(data) {
  var s=_getSheet('Orders'), found=_findRow(s,'order_id',data.orderId);
  if (!found) return {error:'Order not found'};
  var h=found.headers;
  var set = function(col,val){ var i=h.indexOf(col); if(i>-1) s.getRange(found.row,i+1).setValue(val); };
  set('courier_name',   data.courierName   ||'');
  set('tracking_number',data.trackingNumber||'');
  set('tracking_url',   data.trackingUrl   ||'');
  if (data.updateStatus) set('status','dispatched');
  return {success:true};
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUOTES API
// ═══════════════════════════════════════════════════════════════════════════════
function createQuote(data) {
  var s = _getSheet('Quotes');
  if (s.getLastRow()===0) { s.appendRow(Q_HDRS); _styleHeader(s,Q_HDRS.length,'#1a3d35'); s.setFrozenRows(1); }
  var qid = 'QT' + Date.now().toString().slice(-8);
  s.appendRow([
    qid, data.name||'', data.phone||'', data.email||'', data.address||'', data.org||'', data.city||'',
    typeof data.products==='object'?JSON.stringify(data.products):(data.products||''),
    data.message||'', 'new', '','','', new Date().toISOString()
  ]);
  return {success:true, quoteId:qid};
}

function getQuotes(params) {
  var list = _toObjects(_getSheet('Quotes'));
  list.forEach(function(q){ try{q.products=JSON.parse(q.products||'[]');}catch(e){q.products=[];} });
  if (params&&params.status) list=list.filter(function(q){return q.status===params.status;});
  list.sort(function(a,b){return new Date(b.date)-new Date(a.date);});
  return {quotes:list, total:list.length};
}

function updateQuote(data) {
  var s=_getSheet('Quotes'), found=_findRow(s,'quote_id',data.quote_id);
  if (!found) return {error:'Quote not found'};
  found.headers.forEach(function(k,j){
    if (data[k]!==undefined) s.getRange(found.row,j+1).setValue(typeof data[k]==='object'?JSON.stringify(data[k]):data[k]);
  });
  return {success:true};
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD STATS
// ═══════════════════════════════════════════════════════════════════════════════
function getDashboardStats() {
  var orders   = getOrders({}).orders;
  var quotes   = getQuotes({}).quotes;
  var products = getProducts({showHidden:true}).products;
  var revenue=0, pending=0, confirmed=0, dispatched=0, delivered=0;
  orders.forEach(function(o){
    var t=Number(o.total)||0;
    if(o.status==='pending')    {pending++;    revenue+=t;}
    if(o.status==='confirmed')  {confirmed++;  revenue+=t;}
    if(o.status==='dispatched') {dispatched++; revenue+=t;}
    if(o.status==='delivered')  {delivered++;  revenue+=t;}
  });
  var now=new Date();
  return {
    totalOrders:orders.length, totalRevenue:revenue,
    pending:pending, confirmed:confirmed, dispatched:dispatched, delivered:delivered,
    totalProducts:products.length, totalQuotes:quotes.length,
    newQuotes:quotes.filter(function(q){return q.status==='new';}).length,
    recentOrders:orders.filter(function(o){return (now-new Date(o.date))<7*86400000;}).length,
    recentOrdersList:orders.slice(0,10)
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// BLOGS API
// ═══════════════════════════════════════════════════════════════════════════════

function getBlogs(params) {
  var rows = _toObjects(_getSheet('Blogs'));
  if (params && params.status) {
    rows = rows.filter(function(b){ return b.status === params.status; });
  }
  rows.forEach(function(b){
    try { b.tags = JSON.parse(b.tags || '[]'); } catch(e){ b.tags = []; }
    b.read_time = Number(b.read_time) || 5;
  });
  rows.sort(function(a,b){ return new Date(b.date) - new Date(a.date); });
  return {blogs: rows, total: rows.length};
}

function getBlogById(blogId) {
  var b = getBlogs({}).blogs.filter(function(x){
    return String(x.blog_id) === String(blogId);
  })[0];
  return b ? {blog: b} : {error: 'Blog not found'};
}

function createBlog(data) {
  var s = _getSheet('Blogs');
  if (s.getLastRow() === 0) {
    s.appendRow(B_HDRS);
    _styleHeader(s, B_HDRS.length, '#2c3e50');
    s.setFrozenRows(1);
  }
  // Duplicate check by title
  var existing = _toObjects(s);
  var dup = existing.filter(function(b){
    return String(b.title||'').trim().toLowerCase() === String(data.title||'').trim().toLowerCase();
  })[0];
  if (dup) return {error: 'A blog with this title already exists (ID: ' + dup.blog_id + ')'};

  var h      = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];
  var blogId = data.blog_id || ('BL' + Date.now().toString().slice(-8));
  var now    = new Date().toISOString();
  var rowData = {
    blog_id:      blogId,
    title:        String(data.title||'').substring(0,200),
    category:     String(data.category||'General').substring(0,50),
    emoji:        String(data.emoji||'📝').substring(0,10),
    author:       String(data.author||'Detoxy Hijama Team').substring(0,100),
    read_time:    Number(data.read_time)||5,
    excerpt:      String(data.excerpt||'').substring(0,500),
    content:      String(data.content||''),
    tags:         typeof data.tags === 'object' ? JSON.stringify(data.tags) : String(data.tags||'[]'),
    status:       data.status === 'draft' ? 'draft' : 'published',
    date:         data.date || now,
    updated_date: now
  };
  s.appendRow(h.map(function(col){ return rowData[col] !== undefined ? rowData[col] : ''; }));
  return {success: true, blogId: blogId};
}

function updateBlog(data) {
  var s     = _getSheet('Blogs');
  var found = _findRow(s, 'blog_id', data.blog_id);
  if (!found) return {error: 'Blog not found: ' + data.blog_id};

  var allowed = ['title','category','emoji','author','read_time','excerpt','content','tags','status'];
  found.headers.forEach(function(col, j) {
    if (allowed.indexOf(col) === -1) return;
    if (data[col] === undefined) return;
    var val = col === 'tags' && typeof data[col] === 'object'
      ? JSON.stringify(data[col])
      : String(data[col]);
    s.getRange(found.row, j+1).setValue(val);
  });
  // Always update updated_date
  var updCol = found.headers.indexOf('updated_date');
  if (updCol > -1) s.getRange(found.row, updCol+1).setValue(new Date().toISOString());

  return {success: true};
}

function deleteBlog(blogId) {
  var s     = _getSheet('Blogs');
  var found = _findRow(s, 'blog_id', blogId);
  if (!found) return {error: 'Blog not found: ' + blogId};
  s.deleteRow(found.row);
  return {success: true};
}

// ── Seed all 20 built-in blogs (runs once via SETUP_EVERYTHING) ──────────────
function _seedAllBlogs() {
  var s = _getSheet('Blogs');
  if (s.getLastRow() === 0) {
    s.appendRow(B_HDRS);
    _styleHeader(s, B_HDRS.length, '#2c3e50');
    s.setFrozenRows(1);
  }

  // Read existing blog IDs to avoid duplicates
  var existing = _toObjects(s);
  var existingIds = {};
  existing.forEach(function(b){ if(b.blog_id) existingIds[String(b.blog_id)] = true; });

  var builtin = [
    {blog_id:'builtin-1', url:'/blog/what-is-hijama.html',  title:'What is Hijama? A Complete Beginner\'s Guide to Cupping Therapy',       category:'Benefits',    emoji:'🩸', read_time:8,  excerpt:'Hijama (Al-Hijamah) is the ancient practice of therapeutic cupping. Discover the history, types, and how it works on your body.',                               tags:'["Hijama Basics","Wet Cupping","Dry Cupping","Beginners"]', date:'2024-12-02T00:00:00.000Z'},
    {blog_id:'builtin-2', url:'/blog/hijama-in-islam.html',  title:'Hijama in Islam: Sunnah Days, Prophetic Guidance & Spiritual Benefits', category:'Sunnah',      emoji:'🌙', read_time:7,  excerpt:'Understand the deep Islamic roots of hijama, the recommended lunar calendar days, and why Sunnah cupping is considered one of the best prophetic medicines.',  tags:'["Sunnah","Prophetic Medicine","Tibb Nabawi","Islamic Healing"]', date:'2024-11-28T00:00:00.000Z'},
    {blog_id:'builtin-3', url:'/blog/hijama-for-back-pain.html',  title:'Hijama for Back Pain: Clinical Evidence & Treatment Points',            category:'Conditions',  emoji:'🦴', read_time:9,  excerpt:'Back pain is among the top 5 global health burdens. Discover the clinical evidence behind hijama for back pain relief.',                                          tags:'["Back Pain","Pain Relief","Evidence","Spine"]', date:'2024-11-25T00:00:00.000Z'},
    {blog_id:'builtin-4', url:'/blog/hijama-for-migraines.html',  title:'Hijama for Migraines & Chronic Headaches: Complete Guide',             category:'Conditions',  emoji:'🧠', read_time:8,  excerpt:'Millions suffer from migraines globally. Explore how hijama provides long-term relief for chronic headaches and migraines.',                                      tags:'["Migraines","Headaches","Chronic Pain","Neurology"]', date:'2024-11-22T00:00:00.000Z'},
    {blog_id:'builtin-5', url:'/blog/wet-hijama-guide.html',  title:'How to Perform Wet Hijama: A Step-by-Step Practitioner\'s Guide',      category:'How-To',      emoji:'💉', read_time:12, excerpt:'A professional practitioner\'s Guide to performing wet hijama safely and effectively, from preparation to aftercare.',                                            tags:'["Wet Hijama","Technique","Practitioners","Step-by-Step"]', date:'2024-11-18T00:00:00.000Z'},
    {blog_id:'builtin-6', url:'/blog/hijama-for-pcos.html',  title:'Hijama for PCOS & Hormonal Imbalances in Women',                       category:'Conditions',  emoji:'⚕️', read_time:9,  excerpt:'PCOS affects millions of women globally. Discover how hijama helps regulate hormones and improve reproductive health.',                                            tags:'["PCOS","Hormones","Women\'s Health","Fertility"]', date:'2024-11-15T00:00:00.000Z'},
    {blog_id:'builtin-7', url:'/blog/dry-vs-wet-cupping.html',  title:'Dry Cupping vs Wet Hijama: Which is Right for You?',                  category:'How-To',      emoji:'⚖️', read_time:7,  excerpt:'Compare dry cupping and wet hijama — understand the differences, benefits, and which form is best for your condition.',                                           tags:'["Dry Cupping","Wet Hijama","Comparison","Beginners"]', date:'2024-11-12T00:00:00.000Z'},
    {blog_id:'builtin-8', url:'/blog/hijama-equipment-guide.html',  title:'The Complete Guide to Hijama Equipment & Tools',                       category:'Products',    emoji:'🔬', read_time:10, excerpt:'A practitioner\'s handbook on cups, lancets, suction devices, and consumables for safe and professional hijama therapy.',                                          tags:'["Equipment","Cups","Lancets","Practitioner Guide"]', date:'2024-11-08T00:00:00.000Z'},
    {blog_id:'builtin-9', url:'/blog/hijama-aftercare.html',  title:'Hijama Aftercare: What to Do After Your Session',                      category:'Aftercare',   emoji:'🌿', read_time:6,  excerpt:'Proper aftercare is critical for maximising hijama benefits and safe recovery. Follow these evidence-based guidelines.',                                          tags:'["Aftercare","Recovery","Safety","Post-Session"]', date:'2024-11-05T00:00:00.000Z'},
    {blog_id:'builtin-10', url:'/blog/hijama-benefits.html', title:'Top 10 Evidence-Based Benefits of Hijama Cupping Therapy',            category:'Benefits',    emoji:'✨', read_time:8,  excerpt:'From pain relief to improved immunity, explore the top 10 clinically-supported benefits of regular hijama cupping therapy.',                                    tags:'["Benefits","Immunity","Wellness","Clinical Evidence"]', date:'2024-11-02T00:00:00.000Z'},
    {blog_id:'builtin-11', url:'/blog/hijama-for-athletes.html', title:'Hijama for Athletes & Sports Performance Recovery',                    category:'Benefits',    emoji:'🏃', read_time:7,  excerpt:'Elite athletes worldwide use cupping therapy for faster muscle recovery. Discover how hijama enhances sports performance.',                                       tags:'["Sports","Recovery","Athletes","Performance"]', date:'2024-10-28T00:00:00.000Z'},
    {blog_id:'builtin-12', url:'/blog/facial-cupping.html', title:'Facial Cupping: The Natural Anti-Aging Skincare Treatment',           category:'How-To',      emoji:'💆', read_time:8,  excerpt:'Facial cupping is revolutionising natural skincare. Learn the technique, benefits, and how to use facial cups for glowing skin.',                               tags:'["Facial","Anti-Aging","Skincare","Beauty"]', date:'2024-10-24T00:00:00.000Z'},
    {blog_id:'builtin-13', url:'/blog/hijama-for-diabetes.html', title:'Hijama for Diabetes Management & Blood Sugar Control',                category:'Conditions',  emoji:'🩺', read_time:9,  excerpt:'Type 2 diabetes is a growing epidemic in India. Explore how hijama helps regulate blood sugar and reduce diabetic complications.',                               tags:'["Diabetes","Blood Sugar","Management","Insulin"]', date:'2024-10-20T00:00:00.000Z'},
    {blog_id:'builtin-14', url:'/blog/hijama-for-hair-loss.html', title:'Hijama for Hair Loss, Alopecia & Scalp Rejuvenation',                category:'Conditions',  emoji:'💇', read_time:7,  excerpt:'Hair loss affects millions. Discover how scalp hijama stimulates dormant follicles and promotes natural hair regrowth.',                                           tags:'["Hair Loss","Alopecia","Scalp Health","Regrowth"]', date:'2024-10-16T00:00:00.000Z'},
    {blog_id:'builtin-15', url:'/blog/hijama-clinic-setup.html', title:'How to Set Up a Professional Hijama Clinic in India',                category:'How-To',      emoji:'🏥', read_time:11, excerpt:'A complete business and clinical guide to setting up a hygienic, professional, and profitable hijama clinic in India.',                                           tags:'["Clinic Setup","Business","Practitioners","India"]', date:'2024-10-12T00:00:00.000Z'},
    {blog_id:'builtin-16', url:'/blog/hijama-points-map.html', title:'Hijama Points Map: A Comprehensive Full Body Guide',                  category:'Aftercare',   emoji:'🗺️', read_time:10, excerpt:'A comprehensive visual guide to traditional and modern hijama cupping points across the human body for common conditions.',                                       tags:'["Points","Map","Practitioners","Anatomy"]', date:'2024-10-08T00:00:00.000Z'},
    {blog_id:'builtin-17', url:'/blog/hijama-for-fertility.html', title:'Hijama for Fertility & Reproductive Health',                          category:'Benefits',    emoji:'🌸', read_time:9,  excerpt:'Fertility challenges affect 1 in 6 couples in India. Explore how hijama supports reproductive health for both men and women.',                                   tags:'["Fertility","Reproductive Health","IVF","Hormones"]', date:'2024-10-04T00:00:00.000Z'},
    {blog_id:'builtin-18', url:'/blog/silicone-vs-glass-cups.html', title:'Silicone vs Glass vs Bamboo Hijama Cups: Which to Choose?',          category:'Products',    emoji:'🏆', read_time:8,  excerpt:'Not all hijama cups are equal. Compare silicone, glass, and bamboo cups to find the best material for your practice.',                                           tags:'["Cups","Equipment","Comparison","Materials"]', date:'2024-09-30T00:00:00.000Z'},
    {blog_id:'builtin-19', url:'/blog/hijama-mental-health.html', title:'Hijama for Mental Health: Anxiety, Depression & Stress',             category:'Benefits',    emoji:'🧘', read_time:8,  excerpt:'Mental health is a growing crisis. Discover the neuroscience behind how hijama supports the nervous system to reduce anxiety.',                                  tags:'["Mental Health","Anxiety","Depression","Stress"]', date:'2024-09-26T00:00:00.000Z'},
    {blog_id:'builtin-20', url:'/blog/hijama-safety.html', title:'Hijama Safety: Contraindications, Risks & Precautions',             category:'Aftercare',   emoji:'⚠️', read_time:7,  excerpt:'Hijama is safe when performed correctly — but there are critical contraindications every practitioner and patient must know.',                                  tags:'["Safety","Contraindications","Precautions","Risks"]', date:'2024-09-22T00:00:00.000Z'}
  ];

  var h = s.getRange(1,1,1,s.getLastColumn()).getValues()[0];
  var now = new Date().toISOString();
  var newBlogs = builtin.filter(function(b){ return !existingIds[b.blog_id]; });

  if (newBlogs.length === 0) {
    Logger.log('_seedAllBlogs: all built-in blogs already exist — nothing to add.');
    return;
  }

  var rows = newBlogs.map(function(b){
    return h.map(function(col){
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'url')          return b.url || '';
      if (col === 'content')      return b.content || ('Full article: ' + b.title);
      if (col === 'author')       return b.author || 'Detoxy Hijama Team';
      if (col === 'status')       return 'published';
      if (col === 'updated_date') return now;
      return b[col] !== undefined ? b[col] : '';
    });
  });

  s.getRange(s.getLastRow()+1, 1, rows.length, h.length).setValues(rows);
  s.autoResizeColumns(1, B_HDRS.length);
  Logger.log('_seedAllBlogs: inserted ' + newBlogs.length + ' built-in blogs.');
}


function updateVariantStock(data) {
  // data: {id, variantStockJson: '{"Size 1":10,"Size 2":5,...}'}
  var s=_getSheet('Products'), found=_findRow(s,'id',data.id);
  if (!found) return {error:'Product not found'};
  var h = found.headers;
  var vsIdx = h.indexOf('variantStock');
  if (vsIdx === -1) {
    // Add column
    vsIdx = s.getLastColumn();
    s.getRange(1, vsIdx+1).setValue('variantStock');
  }
  s.getRange(found.row, vsIdx+1).setValue(data.variantStockJson||'{}');
  return {success:true};
}


// ═══════════════════════════════════════════════════════════════════════════════
// NOTIFICATION SYSTEM — Email + WhatsApp alerts for every order event
// ═══════════════════════════════════════════════════════════════════════════════

var ADMIN_EMAIL   = 'detoxyhijama@gmail.com';
var ADMIN_PHONE   = '919566596077';
var NOTIFY_WA_URL = 'https://wa.me/'; // Base WhatsApp URL

function _notifyNewOrder(orderId, data) {
  var subject = '🛍 New Order Received — #' + orderId;
  var itemsList = (data.items||[]).map(function(i){
    return '  • ' + i.name + (i.size?' ['+i.size+']':'') + ' × ' + i.qty + ' = ₹' + (i.price*i.qty);
  }).join('\n');

  var body = [
    'NEW ORDER PLACED — Detoxy Hijama',
    '=====================================',
    'Order ID   : ' + orderId,
    'Customer   : ' + (data.name||''),
    'Phone      : ' + (data.phone||''),
    'Email      : ' + (data.email||''),
    'Address    : ' + [data.address,data.city,data.state,data.pincode].filter(Boolean).join(', '),
    'Payment    : ' + (data.payment||'cod').toUpperCase(),
    '',
    'ITEMS:',
    itemsList,
    '',
    'Subtotal   : ₹' + (data.subtotal||0),
    'Shipping   : ₹' + (data.shipping||0),
    'TOTAL      : ₹' + (data.total||0),
    '',
    'Login to admin panel to update status and add tracking.',
    'https://detoxyhijama.github.io/admin/'
  ].join('\n');

  // Email to admin
  try {
    GmailApp.sendEmail(ADMIN_EMAIL, subject, body);
  } catch(e) { Logger.log('Admin email failed: '+e); }

  // Email to customer (if email provided)
  if (data.email) {
    try {
      var custBody = [
        'Dear ' + (data.name||'Customer') + ',',
        '',
        'Thank you for your order at Detoxy Hijama! 🎉',
        '',
        'Order ID : ' + orderId,
        'Total    : ₹' + (data.total||0),
        'Payment  : ' + (data.payment||'cod').toUpperCase(),
        '',
        'We will dispatch your order within 24 hours.',
        'Track your order at: https://detoxyhijama.github.io/track-order.html',
        '',
        'Questions? Call/WhatsApp: +91 95665 96077',
        '',
        'Warm regards,',
        'Team Detoxy Hijama'
      ].join('\n');
      GmailApp.sendEmail(data.email, 'Your Detoxy Hijama Order #'+orderId+' is Confirmed!', custBody);
    } catch(e) { Logger.log('Customer email failed: '+e); }
  }
}

function _notifyStatusUpdate(orderId, newStatus, orderData) {
  if (!orderData || !orderData.email) return;
  var statusMsg = {
    confirmed:  'Your order has been confirmed and is being prepared.',
    dispatched: 'Great news! Your order has been dispatched.',
    delivered:  'Your order has been delivered. Thank you!'
  };
  var msg = statusMsg[newStatus];
  if (!msg) return;

  var tracking = '';
  if (newStatus === 'dispatched' && orderData.tracking_number) {
    tracking = '\nCourier  : ' + (orderData.courier_name||'') +
               '\nAWB No.  : ' + orderData.tracking_number +
               (orderData.tracking_url ? '\nTrack at : ' + orderData.tracking_url : '');
  }

  var body = [
    'Dear ' + (orderData.name||'Customer') + ',',
    '',
    msg,
    '',
    'Order ID : ' + orderId,
    tracking,
    '',
    'Track your order: https://detoxyhijama.github.io/track-order.html',
    '',
    'Team Detoxy Hijama | +91 95665 96077'
  ].join('\n');

  try {
    GmailApp.sendEmail(
      orderData.email,
      'Detoxy Hijama Order #'+orderId+' — '+newStatus.charAt(0).toUpperCase()+newStatus.slice(1),
      body
    );
  } catch(e) { Logger.log('Status email failed: '+e); }
}

// Wrap updateOrderStatus to send notification
function updateStatus(data) {
  var orderId = data.orderId || data.order_id;
  var status  = data.status;
  var s=_getSheet('Orders'), found=_findRow(s,'order_id',orderId);
  if (!found) return {error:'Order not found'};
  var si = found.headers.indexOf('status');
  s.getRange(found.row, si+1).setValue(status);
  // Send status notification email
  try {
    var orderObj = _toObjects(s).filter(function(o){return String(o.order_id)===String(orderId);})[0];
    _notifyStatusUpdate(orderId, status, orderObj);
  } catch(e){ Logger.log('Notify status error: '+e); }
  return {success:true};
}

// ═══════════════════════════════════════════════════════════════════════════════
// USERS API
// ═══════════════════════════════════════════════════════════════════════════════
function registerUser(data) {
  var s=_getSheet('Users');
  if (s.getLastRow()===0) { s.appendRow(U_HDRS); _styleHeader(s,U_HDRS.length,'#1a3d35'); s.setFrozenRows(1); }
  var d=s.getDataRange().getValues(), h=d[0], eC=h.indexOf('email');
  for (var i=1;i<d.length;i++){ if(d[i][eC]===data.email) return {error:'Email already registered'}; }
  var hash=Utilities.base64Encode(Utilities.computeHmacSha256Signature(data.password,'detoxy_secret_2024'));
  s.appendRow(['U'+Date.now(), data.name||'', data.email||'', hash, data.phone||'', data.address||'', data.city||'', data.state||'', data.pincode||'', new Date().toISOString()]);
  return {success:true};
}

function getUserOrders(email, phone) {
  var orders = getOrders({}).orders;
  var filtered = orders.filter(function(o) {
    var em = email && String(o.email||'').toLowerCase() === String(email).toLowerCase();
    var ph = phone && String(o.phone||'').replace(/\D/g,'').slice(-10) === String(phone).replace(/\D/g,'').slice(-10);
    return em || ph;
  });
  return {orders: filtered, total: filtered.length};
}

function updateUser(data) {
  var s = _getSheet('Users');
  var found = _findRow(s, 'id', data.id);
  if (!found) return {error:'User not found'};
  var h = found.headers;
  // Only allow updating safe fields (never email or password_hash via this endpoint)
  var allowedFields = ['name','phone','address','city','state','pincode'];
  allowedFields.forEach(function(field) {
    if (data[field] !== undefined) {
      var col = h.indexOf(field);
      if (col > -1) s.getRange(found.row, col+1).setValue(String(data[field]).substring(0,200));
    }
  });
  return {success:true};
}

function changePassword(data) {
  var s = _getSheet('Users');
  var vals = s.getDataRange().getValues();
  var h = vals[0];
  var eC = h.indexOf('email'), hC = h.indexOf('password_hash');

  var oldHash = Utilities.base64Encode(
    Utilities.computeHmacSha256Signature(data.oldPassword, 'detoxy_secret_2024')
  );
  var newHash = Utilities.base64Encode(
    Utilities.computeHmacSha256Signature(data.newPassword, 'detoxy_secret_2024')
  );

  // Rate limiting: max 5 attempts per session (tracked by script properties)
  var props   = PropertiesService.getScriptProperties();
  var key     = 'pw_attempts_' + (data.email||'').replace(/[^a-z0-9]/gi,'');
  var attempts = parseInt(props.getProperty(key)||'0');
  if (attempts >= 5) return {error:'Too many attempts. Please try again later.'};

  for (var i = 1; i < vals.length; i++) {
    if (String(vals[i][eC]).toLowerCase() === String(data.email||'').toLowerCase()) {
      if (vals[i][hC] !== oldHash) {
        props.setProperty(key, String(attempts+1));
        return {error:'Current password is incorrect.'};
      }
      if (data.newPassword.length < 8) return {error:'New password must be at least 8 characters.'};
      s.getRange(i+1, hC+1).setValue(newHash);
      props.deleteProperty(key); // Reset on success
      return {success:true};
    }
  }
  return {error:'User not found.'};
}

function loginUser(data) {
  var s=_getSheet('Users'), d=s.getDataRange().getValues();
  if (d.length<2) return {error:'Invalid credentials'};
  var h=d[0], eC=h.indexOf('email'), hC=h.indexOf('password_hash'), nC=h.indexOf('name'), iC=h.indexOf('id');
  var hash=Utilities.base64Encode(Utilities.computeHmacSha256Signature(data.password,'detoxy_secret_2024'));
  for (var i=1;i<d.length;i++){
    if(d[i][eC]===data.email&&d[i][hC]===hash)
      var u = {id:d[i][iC], name:d[i][nC], email:data.email, phone:d[i][h.indexOf('phone')]||'', address:d[i][h.indexOf('address')]||'', city:d[i][h.indexOf('city')]||'', state:d[i][h.indexOf('state')]||'', pincode:d[i][h.indexOf('pincode')]||'', loginTime:Date.now()};
      return {success:true, user:u};
  }
  return {error:'Invalid email or password'};
}

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

  SpreadsheetApp.getUi().alert(
    '✅ Detoxy Hijama Setup Complete!\n\n' +
    '• Orders sheet    → headers ready\n' +
    '• Products sheet  → all 15 products loaded\n' +
    '• Quotes sheet    → headers ready\n' +
    '• Users sheet     → headers ready\n\n' +
    'Next step: Deploy this file as a Web App, then paste the URL in Admin → Settings.'
  );
}

// NOTE: Blogs are managed via localStorage on the frontend — no Sheets needed.

// ── Sheet column definitions ───────────────────────────────────────────────────
var O_HDRS = ['order_id','name','phone','email','address','city','state','pincode',
              'items','subtotal','shipping','total','payment','notes','status','date',
              'courier_name','tracking_number','tracking_url','invoice_number'];

var P_COLS = ['id','title','description','price','mrp','category','categoryLabel',
              'image','images','rating','reviews','stock','badge','badgeType',
              'shortDesc','features','specs','hidden'];

var Q_HDRS = ['quote_id','name','phone','email','address','org','city',
              'products','message','status','notes','quoted_amount','validity_date','date'];

var U_HDRS = ['id','name','email','password_hash','phone','date'];

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
    id:'premium-cups', title:'Detoxy Hijama Premium Silicone Cups',
    description:'Detoxy Hijama Premium Silicone Cups are crafted from 100% medical-grade silicone, ensuring safe and effective cupping therapy. The flexible material allows for precise pressure control, making them ideal for both wet and dry cupping. Each set includes 12 cups in various sizes to cover different body areas.',
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
    id:'indian-standard-cup', title:'Detoxy Hijama Indian Standard Hijama Cup',
    description:'Detoxy Hijama Indian Standard Hijama Cup is our entry-level silicone cup manufactured in India for everyday clinic use. Soft, flexible, and easy to apply — ideal for practitioners looking for reliable quality at an accessible price point. Suitable for both wet and dry cupping.',
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
    else if (a==='getProduct')    r = getProduct(p.id);
    else if (a==='getCategories') r = getCategories();
    else if (a==='getOrders')     r = getOrders(p);
    else if (a==='getOrder')      r = getOrderById(p.orderId);
    else if (a==='trackOrder')    r = trackOrder(p.orderId, p.phone);
    else if (a==='updateStatus')  r = updateOrderStatus(p.orderId, p.status);
    else if (a==='getQuotes')     r = getQuotes(p);
    else if (a==='getDashboard')  r = getDashboardStats();
    else if (a==='ping') r = {status:'ok', message:'Detoxy Hijama API v2.0 is connected ✓', sheets:['Orders','Products','Quotes','Users']};
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
    try { p.features = JSON.parse(p.features||'[]'); } catch(e){ p.features=[]; }
    try { p.specs    = JSON.parse(p.specs   ||'{}'); } catch(e){ p.specs={}; }
    try { p.images   = JSON.parse(p.images  ||'[]'); } catch(e){ p.images=p.image?[p.image]:[]; }
    p.price=Number(p.price)||0; p.mrp=Number(p.mrp)||0;
    p.stock=Number(p.stock)||0; p.rating=Number(p.rating)||0; p.reviews=Number(p.reviews)||0;
    // Ensure both name and title fields exist for frontend compatibility
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
  found.headers.forEach(function(k,j){
    if (data[k] === undefined) return;
    var v = data[k];
    // If it is already a JSON string (arrays/objects sent as strings from frontend) keep as-is.
    // If it is a plain JS object/array, stringify it.
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
  if (!found) return {error:'Product not found'};
  var hIdx = found.headers.indexOf('hidden');
  if (hIdx===-1) { s.getRange(1,found.headers.length+1).setValue('hidden'); hIdx=found.headers.length; }
  s.getRange(found.row, hIdx+1).setValue(hidden?'true':'false');
  return {success:true};
}

// ═══════════════════════════════════════════════════════════════════════════════
// ORDERS API
// ═══════════════════════════════════════════════════════════════════════════════
function createOrder(data) {
  var s = _getSheet('Orders');
  if (s.getLastRow()===0) { s.appendRow(O_HDRS); _styleHeader(s,O_HDRS.length,'#1a3d35'); s.setFrozenRows(1); }
  var id  = data.orderId || ('DH' + Date.now().toString().slice(-8));
  var inv = 'INV-' + id;
  s.appendRow([
    id, data.name||'', data.phone||'', data.email||'',
    data.address||'', data.city||'', data.state||'', data.pincode||'',
    (data.items||[]).map(function(i){return i.name+' x'+i.qty;}).join(', '),
    data.subtotal||0, data.shipping||0, data.total||0,
    data.payment||'cod', data.notes||'', 'pending',
    data.date||new Date().toISOString(),
    '','','', inv
  ]);
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
  var clean = function(s){return String(s).replace(/\D/g,'').slice(-10);};
  var o = getOrders({}).orders.filter(function(x){
    return String(x.order_id)===String(orderId) && clean(x.phone)===clean(phone);
  })[0];
  return o ? {order:o} : {error:'Order not found. Please check your Order ID and phone number.'};
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
// USERS API
// ═══════════════════════════════════════════════════════════════════════════════
function registerUser(data) {
  var s=_getSheet('Users');
  if (s.getLastRow()===0) { s.appendRow(U_HDRS); _styleHeader(s,U_HDRS.length,'#1a3d35'); s.setFrozenRows(1); }
  var d=s.getDataRange().getValues(), h=d[0], eC=h.indexOf('email');
  for (var i=1;i<d.length;i++){ if(d[i][eC]===data.email) return {error:'Email already registered'}; }
  var hash=Utilities.base64Encode(Utilities.computeHmacSha256Signature(data.password,'detoxy_secret_2024'));
  s.appendRow(['U'+Date.now(), data.name||'', data.email||'', hash, data.phone||'', new Date().toISOString()]);
  return {success:true};
}

function loginUser(data) {
  var s=_getSheet('Users'), d=s.getDataRange().getValues();
  if (d.length<2) return {error:'Invalid credentials'};
  var h=d[0], eC=h.indexOf('email'), hC=h.indexOf('password_hash'), nC=h.indexOf('name'), iC=h.indexOf('id');
  var hash=Utilities.base64Encode(Utilities.computeHmacSha256Signature(data.password,'detoxy_secret_2024'));
  for (var i=1;i<d.length;i++){
    if(d[i][eC]===data.email&&d[i][hC]===hash)
      return {success:true, user:{id:d[i][iC], name:d[i][nC], email:data.email}};
  }
  return {error:'Invalid email or password'};
}

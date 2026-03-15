/**
 * DETOXY HIJAMA — Complete Google Apps Script Backend v3.0
 * =========================================================
 * STEP 1: Open Google Sheet → Extensions → Apps Script
 * STEP 2: Delete all existing code, paste this entire file
 * STEP 3: Run  SETUP_EVERYTHING  once to create all sheets + seed products
 * STEP 4: Deploy → New Deployment → Web App → Execute as Me → Anyone → Deploy
 * STEP 5: Copy Web App URL → paste in Admin Panel → Settings
 */

// ═══════════════════════════════════════════════════════════════════════════════
// COLUMN DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

var O_HDRS = [
  'order_id','name','phone','email','address','city','state','pincode',
  'items','items_detail','subtotal','shipping','total','payment','notes',
  'status','date','courier_name','tracking_number','tracking_url',
  'invoice_number','shipping_quote','shipping_status','shipping_notes'
];

var P_COLS = [
  'id','title','description','price','mrp','category','categoryLabel',
  'image','image1','image2','image3','image4','image5','image6',
  'images','youtube','rating','reviews','stock','badge','badgeType',
  'shortDesc','features','specs','hidden','variants','variantLabel','variantStock'
];

var Q_HDRS = [
  'quote_id','name','phone','email','address','org','city',
  'products','message','status','notes','quoted_amount','validity_date','date'
];

var U_HDRS = [
  'id','name','email','password_hash','phone','address','city','state','pincode','date'
];

var B_HDRS = [
  'blog_id','title','category','emoji','author','read_time','excerpt',
  'content','tags','status','date','updated_date','url'
];

var ADMIN_EMAIL = 'detoxyhijama@gmail.com';

// ═══════════════════════════════════════════════════════════════════════════════
// FIRST-TIME SETUP
// ═══════════════════════════════════════════════════════════════════════════════

function SETUP_EVERYTHING() {
  _setupSheet('Orders', O_HDRS, '#1a3d35');
  _setupSheet('Quotes', Q_HDRS, '#1a3d35');
  _setupSheet('Users',  U_HDRS, '#1a3d35');
  _setupSheet('Blogs',  B_HDRS, '#2c3e50');
  _seedAllProducts();
  _seedAllBlogs();
  SpreadsheetApp.getUi().alert(
    'Detoxy Hijama Setup Complete!\n\n' +
    '- Orders sheet ready\n' +
    '- Products sheet seeded (15 products)\n' +
    '- Quotes sheet ready\n' +
    '- Users sheet ready\n' +
    '- Blogs sheet seeded (20 blogs)\n\n' +
    'Next: Deploy as Web App and paste URL in Admin Settings.'
  );
}

function RESET_PRODUCTS_ONLY() {
  var s  = _getSheet('Products');
  var lr = s.getLastRow();
  if (lr > 1) { s.deleteRows(2, lr - 1); }
  _seedAllProducts();
  SpreadsheetApp.getUi().alert('Products sheet reset with all 15 products.');
}

// ═══════════════════════════════════════════════════════════════════════════════
// WEB APP ENTRY POINTS
// ═══════════════════════════════════════════════════════════════════════════════

function doGet(e) {
  var p = e.parameter;
  var a = p.action || '';
  try {
    var r;
    if      (a === 'getProducts')    { r = getProducts(p); }
    else if (a === 'getProductById') { r = getProduct(p.id); }
    else if (a === 'getProduct')     { r = getProduct(p.id); }
    else if (a === 'getCategories')  { r = getCategories(); }
    else if (a === 'getOrders')      { r = getOrders(p); }
    else if (a === 'getOrder')       { r = getOrderById(p.orderId); }
    else if (a === 'trackOrder')     { r = trackOrder(p.orderId, p.phone); }
    else if (a === 'updateStatus')   { r = updateOrderStatus(p.orderId, p.status); }
    else if (a === 'getQuotes')      { r = getQuotes(p); }
    else if (a === 'getDashboard')   { r = getDashboardStats(); }
    else if (a === 'getBlogs')       { r = getBlogs(p); }
    else if (a === 'getBlog')        { r = getBlogById(p.blogId); }
    else if (a === 'getUserOrders')  { r = getUserOrders(p.email, p.phone); }
    else if (a === 'ping')           { r = {status: 'ok', message: 'Detoxy Hijama API v3.0 connected'}; }
    else                             { r = {status: 'ok', message: 'Detoxy Hijama API v3.0'}; }
    return _resp(r);
  } catch (err) {
    return _resp({error: err.message});
  }
}

function doPost(e) {
  try {
    var body = {};
    try { body = JSON.parse(e.postData.contents || '{}'); } catch (pe) { body = {}; }
    var a = e.parameter.action || body.action || '';
    var r;
    if      (a === 'createOrder')        { r = createOrder(body); }
    else if (a === 'quoteShipping')      { r = quoteShipping(body); }
    else if (a === 'respondShipping')    { r = respondShipping(body); }
    else if (a === 'updateOrder')        { r = updateOrder(body); }
    else if (a === 'updateStatus')       { r = updateStatus(body); }
    else if (a === 'addTracking')        { r = addTracking(body); }
    else if (a === 'register')           { r = registerUser(body); }
    else if (a === 'login')              { r = loginUser(body); }
    else if (a === 'addProduct')         { r = addProduct(body); }
    else if (a === 'editProduct')        { r = editProduct(body); }
    else if (a === 'deleteProduct')      { r = deleteProduct(body.id); }
    else if (a === 'toggleProductHide')  { r = toggleProductHide(body.id, body.hidden); }
    else if (a === 'createQuote')        { r = createQuote(body); }
    else if (a === 'updateQuote')        { r = updateQuote(body); }
    else if (a === 'createBlog')         { r = createBlog(body); }
    else if (a === 'updateBlog')         { r = updateBlog(body); }
    else if (a === 'deleteBlog')         { r = deleteBlog(body.blogId); }
    else if (a === 'updateUser')         { r = updateUser(body); }
    else if (a === 'changePassword')     { r = changePassword(body); }
    else if (a === 'updateVariantStock') { r = updateVariantStock(body); }
    else                                 { r = {error: 'Unknown action: ' + a}; }
    return _resp(r);
  } catch (err) {
    return _resp({error: err.message});
  }
}

function _resp(data) {
  var out = ContentService.createTextOutput(JSON.stringify(data));
  out.setMimeType(ContentService.MimeType.JSON);
  return out;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function _getSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function _setupSheet(name, headers, color) {
  var s = _getSheet(name);
  if (s.getLastRow() === 0) {
    s.appendRow(headers);
    var r = s.getRange(1, 1, 1, headers.length);
    r.setBackground(color);
    r.setFontColor('#ffffff');
    r.setFontWeight('bold');
    r.setFontSize(10);
    s.setFrozenRows(1);
    s.autoResizeColumns(1, headers.length);
  }
}

function _toObjects(sheet) {
  var d = sheet.getDataRange().getValues();
  if (d.length < 2) { return []; }
  var h    = d[0];
  var rows = [];
  for (var i = 1; i < d.length; i++) {
    if (!d[i][0]) { continue; }
    var obj = {};
    for (var j = 0; j < h.length; j++) { obj[h[j]] = d[i][j]; }
    rows.push(obj);
  }
  return rows;
}

function _findRow(sheet, colName, val) {
  var d  = sheet.getDataRange().getValues();
  var h  = d[0];
  var ci = h.indexOf(colName);
  for (var i = 1; i < d.length; i++) {
    if (String(d[i][ci]) === String(val)) {
      return {row: i + 1, headers: h, data: d[i]};
    }
  }
  return null;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCT SEED DATA
// ═══════════════════════════════════════════════════════════════════════════════

var ALL_PRODUCTS = [
  {
    id: 'premium-cups',
    title: 'Detoxy Hijama Premium China Made Cups',
    description: 'Premium medical-grade platinum-cured silicone cupping set with 8 size variants including Curve Cups 3 and 4. BPA-free, autoclave-safe, latex-free.',
    price: 649, mrp: 999, category: 'cups', categoryLabel: 'Cupping Sets',
    image: 'assets/images/products/premium-cups/main.jpg',
    images: '["assets/images/products/premium-cups/main.jpg","assets/images/products/premium-cups/image2.jpg","assets/images/products/premium-cups/image3.jpg"]',
    rating: 4.8, reviews: 214, stock: 50, badge: 'Best Seller', badgeType: 'teal',
    shortDesc: 'Platinum-cured silicone cupping set in 8 variants including Curve Cups.',
    features: '["8 size variants (Size 1-6 + Curve Cup 3 & 4)","Platinum-cured medical silicone","BPA-free & latex-free","Autoclave safe","Squeeze + suction gun compatible"]',
    specs: '{"Material":"Platinum-cured silicone","Sizes":"8 variants","Usage":"Wet & Dry cupping","Sterilization":"Autoclave safe","Compatibility":"Suction gun + squeeze"}',
    hidden: 'false',
    variantStock: '{"Size 1":10,"Size 2":10,"Size 3":8,"Size 4":8,"Size 5":8,"Size 6":6,"Curve Cup 3":5,"Curve Cup 4":5}'
  },
  {
    id: 'indian-standard-cup',
    title: 'Detoxy Hijama Indian Standard Hijama Cups',
    description: 'India-manufactured medical-grade polymer hijama cups in 6 sizes. Valve-top design, BPA-free, autoclave-safe. Trusted by 5000+ clinics.',
    price: 199, mrp: 349, category: 'cups', categoryLabel: 'Cupping Sets',
    image: 'assets/images/products/indian-standard-cup/main.jpg',
    images: '["assets/images/products/indian-standard-cup/main.jpg"]',
    rating: 4.7, reviews: 312, stock: 150, badge: 'Featured', badgeType: 'teal',
    shortDesc: 'India-made standard hijama cups in 6 sizes for professional clinic use.',
    features: '["6 sizes (Size 1-6)","BPA-free medical polymer","Valve-top precision suction","Autoclave safe at 121C","Made in India"]',
    specs: '{"Material":"Medical polymer","Sizes":"6 sizes (Size 1-6)","Usage":"Wet & Dry cupping","Sterilization":"Autoclave 121C","Origin":"Made in India"}',
    hidden: 'false',
    variantStock: '{"Size 1":30,"Size 2":30,"Size 3":25,"Size 4":25,"Size 5":25,"Size 6":20}'
  },
  {
    id: 'electric-smart-cup',
    title: 'Detoxy Hijama Electric Smart Cupping Device',
    description: 'Electric smart cupping device with 9 suction levels, built-in heat therapy (40-50C), USB-C rechargeable battery, and LCD display.',
    price: 1899, mrp: 2999, category: 'electric', categoryLabel: 'Electric Devices',
    image: 'assets/images/products/electric-smart-cup/main.jpg',
    images: '["assets/images/products/electric-smart-cup/main.jpg","assets/images/products/electric-smart-cup/image2.jpg"]',
    rating: 4.7, reviews: 89, stock: 20, badge: 'New Arrival', badgeType: 'dark',
    shortDesc: 'Smart electric cupping device with 9 suction levels and heat therapy.',
    features: '["9 suction levels","Built-in heat therapy 40-50C","USB-C rechargeable","LCD display","Auto-pressure control"]',
    specs: '{"Power":"USB-C rechargeable","Battery":"2000mAh","Suction":"9 levels","Heat":"40C-50C","Display":"LCD"}',
    hidden: 'false',
    variantStock: '{}'
  },
  {
    id: 'fire-cupping-glass',
    title: 'Detoxy Hijama Fire Cupping Glass Set',
    description: 'Borosilicate glass fire cupping set with 16 cups in 3 sizes. Heat-resistant to 500C, smooth rounded rims, Sunnah hijama method.',
    price: 549, mrp: 799, category: 'cups', categoryLabel: 'Cupping Sets',
    image: 'assets/images/products/fire-cupping-glass/main.jpg',
    images: '["assets/images/products/fire-cupping-glass/main.jpg","assets/images/products/fire-cupping-glass/image2.jpg"]',
    rating: 4.6, reviews: 156, stock: 35, badge: 'Trending', badgeType: 'cream',
    shortDesc: 'Borosilicate glass fire cupping set (16 cups, 3 sizes) for Sunnah hijama.',
    features: '["16 borosilicate glass cups","3 sizes (S/M/L)","Heat-resistant to 500C","Smooth rounded rims","Professional clinic grade"]',
    specs: '{"Material":"Borosilicate glass","Sizes":"Small/Medium/Large","Quantity":"16 cups","Heat":"Up to 500C","Wall":"3mm thickness"}',
    hidden: 'false',
    variantStock: '{}'
  },
  {
    id: 'magnetic-vacuum-kit',
    title: 'Detoxy Hijama 24-Set Magnetic Vacuum Cupping Kit',
    description: '24-cup magnetic vacuum kit with pump gun, 4 sizes, extension hose, and carry case. Professional clinic starter kit.',
    price: 1149, mrp: 1699, category: 'kits', categoryLabel: 'Starter Kits',
    image: 'assets/images/products/magnetic-vacuum-kit/main.jpg',
    images: '["assets/images/products/magnetic-vacuum-kit/main.jpg","assets/images/products/magnetic-vacuum-kit/image2.jpg"]',
    rating: 4.9, reviews: 73, stock: 18, badge: 'Top Rated', badgeType: 'teal',
    shortDesc: '24-piece magnetic vacuum cupping kit with pump gun, 4 sizes, and carry case.',
    features: '["24 cups in 4 sizes","Magnetic lock pump gun","Airtight seal technology","Extension hose included","Carry case included"]',
    specs: '{"Cups":"24 pcs (4 sizes)","Pump":"Magnetic lock","Material":"ABS + silicone","Includes":"Pump, cups, case, hose","Use":"Professional & home"}',
    hidden: 'false',
    variantStock: '{}'
  },
  {
    id: 'curve-cups',
    title: 'Detoxy Hijama Curve Cup Set (Size 3 & 4)',
    description: 'Ergonomic curved silicone cups for joint, shoulder, knee, and curved body surface cupping.',
    price: 749, mrp: 1099, category: 'cups', categoryLabel: 'Cupping Sets',
    image: 'assets/images/products/curve-cups/main.jpg',
    images: '["assets/images/products/curve-cups/main.jpg"]',
    rating: 4.5, reviews: 62, stock: 28, badge: '', badgeType: '',
    shortDesc: 'Curved silicone cups for joints and curved body surfaces.',
    features: '["Ergonomic curved rim","Flexible medical silicone","Fits curved body parts","Sizes 3 & 4","Suction gun compatible"]',
    specs: '{"Design":"Ergonomic curve","Material":"Medical silicone","Sizes":"No. 3 & 4","Ideal":"Joints & shoulders","Set":"2 cups"}',
    hidden: 'false',
    variantStock: '{"Curve Cup 3":15,"Curve Cup 4":13}'
  },
  {
    id: 'lancet-pen',
    title: 'Detoxy Hijama Auto Lancet Pen',
    description: 'Spring-loaded auto lancet pen with 5 depth settings (0.8-1.8mm) for precise wet hijama incisions.',
    price: 299, mrp: 499, category: 'consumables', categoryLabel: 'Consumables',
    image: 'assets/images/products/lancet-pen/main.jpg',
    images: '["assets/images/products/lancet-pen/main.jpg"]',
    rating: 4.7, reviews: 198, stock: 100, badge: '', badgeType: '',
    shortDesc: 'Auto lancet pen with 5 depth settings for wet hijama incisions.',
    features: '["5 depth settings (0.8-1.8mm)","Auto spring mechanism","Single-use lancet heads","Ergonomic grip","Includes 10 lancet heads"]',
    specs: '{"Depths":"0.8mm-1.8mm (5 levels)","Mechanism":"Auto spring-loaded","Compatible":"Standard 28G lancets","Material":"Medical ABS","Includes":"Pen + 10 lancet heads"}',
    hidden: 'false',
    variantStock: '{}'
  },
  {
    id: 'latex-gloves',
    title: 'Detoxy Hijama Premium Latex Gloves (Box of 100)',
    description: 'Medical-grade examination latex gloves, box of 100. Powder-coated, textured fingertips, pinhole integrity tested.',
    price: 199, mrp: 349, category: 'consumables', categoryLabel: 'Consumables',
    image: 'assets/images/products/latex-gloves/main.jpg',
    images: '["assets/images/products/latex-gloves/main.jpg"]',
    rating: 4.6, reviews: 143, stock: 200, badge: '', badgeType: '',
    shortDesc: 'Medical-grade latex examination gloves, box of 100.',
    features: '["100 gloves per box","Medical-grade latex","Textured fingertips","Powder coated","Pinhole tested (ASTM D3578)"]',
    specs: '{"Quantity":"100 pcs","Material":"Natural rubber latex","Standard":"ASTM D3578 / EN455","Finish":"Powdered","Sizes":"M / L"}',
    hidden: 'false',
    variantStock: '{}'
  },
  {
    id: 'bamboo-cupping-set',
    title: 'Detoxy Hijama Bamboo Cupping Set',
    description: 'Handcrafted 8-piece bamboo cupping set for herbal steam cupping therapy. Sustainable and authentic.',
    price: 479, mrp: 699, category: 'cups', categoryLabel: 'Cupping Sets',
    image: 'assets/images/products/bamboo-cupping-set/main.jpg',
    images: '["assets/images/products/bamboo-cupping-set/main.jpg"]',
    rating: 4.6, reviews: 127, stock: 15, badge: '', badgeType: '',
    shortDesc: '8-piece handcrafted bamboo cups for herbal steam cupping therapy.',
    features: '["8 bamboo cups","Herbal steam compatible","Natural antimicrobial","3 diameter sizes","Eco-friendly & sustainable"]',
    specs: '{"Material":"Natural bamboo","Quantity":"8 cups","Sizes":"3 diameters","Use":"Herbal steam cupping","Finish":"Natural lacquer"}',
    hidden: 'false',
    variantStock: '{}'
  },
  {
    id: 'silicone-facial-4',
    title: 'Detoxy Hijama Silicone Facial Cups (4-Piece Set)',
    description: 'Soft silicone facial cupping set, 4 pieces. For lymphatic drainage, anti-aging, and skin rejuvenation.',
    price: 349, mrp: 549, category: 'facial', categoryLabel: 'Facial Cups',
    image: 'assets/images/products/silicone-facial-4/main.jpg',
    images: '["assets/images/products/silicone-facial-4/main.jpg"]',
    rating: 4.5, reviews: 88, stock: 45, badge: '', badgeType: '',
    shortDesc: '4-piece silicone facial cupping set for lymphatic drainage and anti-aging.',
    features: '["4 mini cups","Ultra-soft silicone","Hypoallergenic","Boosts collagen","Reduces puffiness"]',
    specs: '{"Quantity":"4 cups","Material":"Soft silicone","Sizes":"2 sizes","Use":"Face & neck","Safe":"Hypoallergenic"}',
    hidden: 'false',
    variantStock: '{}'
  },
  {
    id: 'silicone-facial-7',
    title: 'Detoxy Hijama Silicone Facial Cups (7-Piece Set)',
    description: 'Complete 7-piece silicone facial cupping set covering all facial zones and neck.',
    price: 499, mrp: 749, category: 'facial', categoryLabel: 'Facial Cups',
    image: 'assets/images/products/silicone-facial-7/main.jpg',
    images: '["assets/images/products/silicone-facial-7/main.jpg"]',
    rating: 4.6, reviews: 74, stock: 35, badge: 'Popular', badgeType: 'teal',
    shortDesc: 'Complete 7-piece facial cupping set for full face and neck treatment.',
    features: '["7 cups in 7 sizes","Full face & neck coverage","Hypoallergenic silicone","Anti-aging & lymphatic drainage","Includes storage pouch"]',
    specs: '{"Quantity":"7 cups","Material":"Soft silicone","Coverage":"Full face + neck","Skin":"All types","Includes":"Storage pouch"}',
    hidden: 'false',
    variantStock: '{}'
  },
  {
    id: 'silicone-moving-cup',
    title: 'Detoxy Hijama Silicone Moving Cup',
    description: 'Flexible silicone moving cup for gliding massage cupping therapy, deep tissue, and fascia release.',
    price: 249, mrp: 399, category: 'cups', categoryLabel: 'Cupping Sets',
    image: 'assets/images/products/silicone-moving-cup/main.jpg',
    images: '["assets/images/products/silicone-moving-cup/main.jpg"]',
    rating: 4.4, reviews: 56, stock: 40, badge: '', badgeType: '',
    shortDesc: 'Flexible silicone moving cup for gliding massage cupping therapy.',
    features: '["Flexible silicone","Gliding massage technique","Deep tissue stimulation","Use with massage oil","Reusable & sterilizable"]',
    specs: '{"Material":"Flexible silicone","Technique":"Moving/sliding","Use":"With massage oil","Sterilization":"Autoclave safe","Grade":"Clinical"}',
    hidden: 'false',
    variantStock: '{}'
  },
  {
    id: 'hijama-suction-gun',
    title: 'Detoxy Hijama Suction Gun',
    description: 'Professional hijama suction gun with ergonomic grip, precision vacuum valve, and universal cup compatibility.',
    price: 349, mrp: 549, category: 'kits', categoryLabel: 'Starter Kits',
    image: 'assets/images/products/hijama-suction-gun/main.jpg',
    images: '["assets/images/products/hijama-suction-gun/main.jpg"]',
    rating: 4.6, reviews: 167, stock: 30, badge: '', badgeType: '',
    shortDesc: 'Professional suction gun for precise vacuum cupping control.',
    features: '["Ergonomic pistol grip","Precision vacuum valve","Universal cup compatibility","Single-hand operation","Durable ABS construction"]',
    specs: '{"Type":"Manual vacuum gun","Compatibility":"Standard valve-top cups","Material":"Medical ABS","Operation":"Single-handed","Pressure":"Up to -65kPa"}',
    hidden: 'false',
    variantStock: '{}'
  },
  {
    id: 'surgical-blade',
    title: 'Detoxy Hijama Surgical Blade (Pack)',
    description: 'Sterile individually wrapped surgical blades for wet hijama incisions. ISO 13485 certified, single-use.',
    price: 149, mrp: 249, category: 'consumables', categoryLabel: 'Consumables',
    image: 'assets/images/products/surgical-blade/main.jpg',
    images: '["assets/images/products/surgical-blade/main.jpg"]',
    rating: 4.5, reviews: 221, stock: 300, badge: '', badgeType: '',
    shortDesc: 'Sterile surgical blades for wet hijama incisions. ISO 13485 certified.',
    features: '["Individually sterile wrapped","Size 22 & 15 available","Carbon steel","ISO 13485 certified","Single use only"]',
    specs: '{"Types":"Size 22 & Size 15","Material":"Carbon steel","Sterility":"Gamma-irradiated","Standard":"ISO 13485","Usage":"Single use"}',
    hidden: 'false',
    variantStock: '{}'
  },
  {
    id: 'surgical-cotton',
    title: 'Detoxy Hijama Surgical Cotton (Roll)',
    description: 'Medical-grade surgical cotton roll for pre and post-hijama skin preparation and wound care.',
    price: 129, mrp: 199, category: 'consumables', categoryLabel: 'Consumables',
    image: 'assets/images/products/surgical-cotton/main.jpg',
    images: '["assets/images/products/surgical-cotton/main.jpg"]',
    rating: 4.5, reviews: 189, stock: 200, badge: '', badgeType: '',
    shortDesc: 'Medical-grade surgical cotton roll for hijama session care.',
    features: '["100% medical-grade cotton","High absorbency","Lint-free quality","Antiseptic compatible","For pre & post hijama care"]',
    specs: '{"Material":"100% medical cotton","Grade":"Surgical","Use":"Pre & post hijama","Compatibility":"Antiseptic solutions","Pack":"Roll"}',
    hidden: 'false',
    variantStock: '{}'
  }
];

function _seedAllProducts() {
  var s = _getSheet('Products');
  if (s.getLastRow() === 0) {
    s.appendRow(P_COLS);
    var hr = s.getRange(1, 1, 1, P_COLS.length);
    hr.setBackground('#0d6b5e');
    hr.setFontColor('#ffffff');
    hr.setFontWeight('bold');
    s.setFrozenRows(1);
  }
  var existing    = s.getDataRange().getValues();
  var headers     = existing[0];
  var idCol       = headers.indexOf('id');
  var existingIds = {};
  for (var i = 1; i < existing.length; i++) {
    var rowId = String(existing[i][idCol] || '').trim();
    if (rowId) { existingIds[rowId] = true; }
  }
  var newProducts = ALL_PRODUCTS.filter(function (p) {
    return !existingIds[String(p.id)];
  });
  if (newProducts.length === 0) {
    Logger.log('_seedAllProducts: all products already exist.');
    return;
  }
  var rows = newProducts.map(function (p) {
    return P_COLS.map(function (col) {
      var v = p[col];
      if (v === undefined || v === null) { return ''; }
      return v;
    });
  });
  s.getRange(s.getLastRow() + 1, 1, rows.length, P_COLS.length).setValues(rows);
  s.autoResizeColumns(1, P_COLS.length);
  Logger.log('_seedAllProducts: inserted ' + newProducts.length + ' products.');
}

// ═══════════════════════════════════════════════════════════════════════════════
// PRODUCTS API
// ═══════════════════════════════════════════════════════════════════════════════

function getProducts(params) {
  var rows = _toObjects(_getSheet('Products'));
  var list = rows.map(function (p) {
    try { if (typeof p.features    === 'string') { p.features    = JSON.parse(p.features    || '[]'); } } catch (e) { p.features = []; }
    try { if (typeof p.specs       === 'string') { p.specs       = JSON.parse(p.specs       || '{}'); } } catch (e) { p.specs = {}; }
    try { if (typeof p.images      === 'string') { p.images      = JSON.parse(p.images      || '[]'); } } catch (e) { p.images = []; }
    try { if (typeof p.variantStock === 'string') { p.variantStock = JSON.parse(p.variantStock || '{}'); } } catch (e) { p.variantStock = {}; }
    try { if (typeof p.variants    === 'string') { p.variants    = JSON.parse(p.variants    || '{}'); } } catch (e) { p.variants = {}; }
    if (!Array.isArray(p.images) || !p.images.length) {
      p.images = [p.image1 || p.image, p.image2, p.image3, p.image4, p.image5, p.image6].filter(Boolean);
    }
    if (!p.images.length && p.image) { p.images = [p.image]; }
    p.price   = Number(p.price)   || 0;
    p.mrp     = Number(p.mrp)     || 0;
    p.stock   = Number(p.stock)   || 0;
    p.rating  = Number(p.rating)  || 0;
    p.reviews = Number(p.reviews) || 0;
    p.name    = p.title || p.name || '';
    p.title   = p.name;
    p.slug    = p.slug  || p.id  || '';
    return p;
  });
  if (params && params.category) {
    list = list.filter(function (p) { return p.category === params.category; });
  }
  if (!params || !params.showHidden) {
    list = list.filter(function (p) { return !p.hidden || p.hidden === 'false' || p.hidden === false; });
  }
  return {products: list, total: list.length};
}

function getProduct(id) {
  var p = getProducts({showHidden: true}).products.filter(function (x) { return x.id === id; })[0];
  return p ? {product: p} : {error: 'Product not found'};
}

function getCategories() {
  var cats = {};
  getProducts({}).products.forEach(function (p) {
    if (p.category) { cats[p.category] = (cats[p.category] || 0) + 1; }
  });
  return {categories: cats};
}

function addProduct(data) {
  var s = _getSheet('Products');
  if (s.getLastRow() === 0) {
    s.appendRow(P_COLS);
    var hr = s.getRange(1, 1, 1, P_COLS.length);
    hr.setBackground('#0d6b5e');
    hr.setFontColor('#ffffff');
    hr.setFontWeight('bold');
    s.setFrozenRows(1);
  }
  if (!data.id) { data.id = 'p-' + Date.now(); }
  var existing = _findRow(s, 'id', data.id);
  if (existing) { return editProduct(data); }
  var h = s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0];
  s.appendRow(h.map(function (k) {
    var v = data[k];
    if (v === undefined || v === null) { return ''; }
    if (typeof v === 'object') { return JSON.stringify(v); }
    return v;
  }));
  return {success: true, id: data.id};
}

function editProduct(data) {
  var s     = _getSheet('Products');
  var found = _findRow(s, 'id', data.id);
  if (!found) { return {error: 'Product not found: ' + data.id}; }
  found.headers.forEach(function (k, j) {
    if (data[k] === undefined) { return; }
    var v = data[k];
    if (typeof v === 'object' && v !== null) { v = JSON.stringify(v); }
    s.getRange(found.row, j + 1).setValue(v);
  });
  return {success: true};
}

function deleteProduct(id) {
  var s     = _getSheet('Products');
  var found = _findRow(s, 'id', id);
  if (!found) { return {error: 'Product not found'}; }
  s.deleteRow(found.row);
  return {success: true};
}

function toggleProductHide(id, hidden) {
  var s     = _getSheet('Products');
  var found = _findRow(s, 'id', id);
  if (!found) { return {error: 'Product not found: ' + id}; }
  var h    = s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0];
  var hIdx = h.indexOf('hidden');
  if (hIdx === -1) {
    hIdx = h.length;
    s.getRange(1, hIdx + 1).setValue('hidden');
  }
  var val = (hidden === true || hidden === 'true') ? 'true' : 'false';
  s.getRange(found.row, hIdx + 1).setValue(val);
  return {success: true, id: id, hidden: val};
}

function updateVariantStock(data) {
  var s     = _getSheet('Products');
  var found = _findRow(s, 'id', data.id);
  if (!found) { return {error: 'Product not found'}; }
  var h     = found.headers;
  var vsIdx = h.indexOf('variantStock');
  if (vsIdx === -1) {
    vsIdx = s.getLastColumn();
    s.getRange(1, vsIdx + 1).setValue('variantStock');
  }
  s.getRange(found.row, vsIdx + 1).setValue(data.variantStockJson || '{}');
  return {success: true};
}

// ═══════════════════════════════════════════════════════════════════════════════
// ORDERS API
// ═══════════════════════════════════════════════════════════════════════════════

function createOrder(data) {
  var s = _getSheet('Orders');
  if (s.getLastRow() === 0) {
    s.appendRow(O_HDRS);
    var hr = s.getRange(1, 1, 1, O_HDRS.length);
    hr.setBackground('#1a3d35');
    hr.setFontColor('#ffffff');
    hr.setFontWeight('bold');
    s.setFrozenRows(1);
  }
  var id  = data.orderId || ('DH' + Date.now().toString().slice(-8));
  var inv = 'INV-' + id;
  var itemsStr = (data.items || []).map(function (i) {
    var line = i.name + ' x' + i.qty;
    if (i.size) { line += ' [' + i.size + ']'; }
    return line;
  }).join(', ');
  s.appendRow([
    id, data.name || '', data.phone || '', data.email || '',
    data.address || '', data.city || '', data.state || '', data.pincode || '',
    itemsStr, JSON.stringify(data.items || []),
    data.subtotal || 0, data.shipping || 0, data.total || 0,
    data.payment || 'cod', data.notes || '', 'pending',
    data.date || new Date().toISOString(),
    '', '', '', inv, '', 'pending', ''
  ]);
  try { _notifyNewOrder(id, data); } catch (e) { Logger.log('Notify error: ' + e); }
  return {success: true, orderId: id, invoiceNumber: inv};
}

function getOrders(params) {
  var list = _toObjects(_getSheet('Orders'));
  if (params && params.status) {
    list = list.filter(function (o) { return o.status === params.status; });
  }
  list.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  return {orders: list, total: list.length};
}

function getOrderById(orderId) {
  var o = getOrders({}).orders.filter(function (x) {
    return String(x.order_id).toUpperCase() === String(orderId).toUpperCase();
  })[0];
  return o ? {order: o} : {error: 'Order not found'};
}

function trackOrder(orderId, phone) {
  var orders     = getOrders({}).orders;
  var idUpper    = String(orderId || '').toUpperCase().trim();
  var phoneClean = String(phone   || '').replace(/\D/g, '').slice(-10);
  var o = orders.filter(function (x) {
    return String(x.tracking_number || '').toUpperCase() === idUpper;
  })[0];
  if (!o) {
    var byId = orders.filter(function (x) {
      return String(x.order_id || '').toUpperCase() === idUpper;
    });
    if (byId.length === 1) {
      o = byId[0];
    } else if (byId.length > 1 && phoneClean) {
      o = byId.filter(function (x) {
        return String(x.phone || '').replace(/\D/g, '').slice(-10) === phoneClean;
      })[0];
    }
  }
  return o ? {order: o} : {error: 'Order not found. Please check your Order ID.'};
}

function quoteShipping(data) {
  var s     = _getSheet('Orders');
  var found = _findRow(s, 'order_id', data.order_id);
  if (!found) { return {error: 'Order not found'}; }
  var h = found.headers;

  function setCol(col, val) {
    var i = h.indexOf(col);
    if (i > -1) {
      s.getRange(found.row, i + 1).setValue(val);
    } else {
      var lc = s.getLastColumn();
      s.getRange(1, lc + 1).setValue(col);
      s.getRange(found.row, lc + 1).setValue(val);
    }
  }

  setCol('shipping_quote',  Number(data.shipping_quote) || 0);
  setCol('shipping_status', 'quoted');
  setCol('shipping_notes',  data.shipping_notes || '');

  var orderObj = _toObjects(s).filter(function (o) {
    return String(o.order_id) === String(data.order_id);
  })[0];

  if (orderObj && orderObj.email) {
    var emailBody = (
      'Dear ' + (orderObj.name || 'Customer') + ',\n\n' +
      'Your order has been reviewed. Shipping charges have been quoted below.\n\n' +
      'Order ID : ' + data.order_id + '\n' +
      'Shipping : Rs.' + (Number(data.shipping_quote) || 0) + '\n' +
      (data.shipping_notes ? ('Note     : ' + data.shipping_notes + '\n') : '') +
      '\nVisit Track Order to accept or reject:\n' +
      'https://detoxyhijama.github.io/track-order.html\n\n' +
      'WhatsApp: +91 95665 96077\n\n' +
      'Team Detoxy Hijama'
    );
    try {
      GmailApp.sendEmail(
        orderObj.email,
        'Shipping Quote for Order #' + data.order_id + ' - Detoxy Hijama',
        emailBody
      );
    } catch (emailErr) { Logger.log('Shipping quote email failed: ' + emailErr); }
  }
  return {success: true};
}

function respondShipping(data) {
  var s     = _getSheet('Orders');
  var found = _findRow(s, 'order_id', data.order_id);
  if (!found) { return {error: 'Order not found'}; }
  var h = found.headers;

  function setCol(col, val) {
    var i = h.indexOf(col);
    if (i > -1) { s.getRange(found.row, i + 1).setValue(val); }
  }

  if (data.response === 'accepted' || data.shipping_status === 'accepted') {
    setCol('shipping_status', 'accepted');
    setCol('status', 'confirmed');
    var sqIdx = h.indexOf('shipping_quote');
    if (sqIdx > -1) {
      var quotedAmt = Number(s.getRange(found.row, sqIdx + 1).getValue()) || 0;
      setCol('shipping', quotedAmt);
      var stIdx = h.indexOf('subtotal');
      if (stIdx > -1) {
        var subtotal = Number(s.getRange(found.row, stIdx + 1).getValue()) || 0;
        setCol('total', subtotal + quotedAmt);
      }
    }
  } else {
    setCol('shipping_status', 'rejected');
    setCol('status', 'cancelled');
  }
  return {success: true};
}

function updateOrderStatus(orderId, status) {
  var s     = _getSheet('Orders');
  var found = _findRow(s, 'order_id', orderId);
  if (!found) { return {error: 'Order not found'}; }
  var si = found.headers.indexOf('status');
  s.getRange(found.row, si + 1).setValue(status);
  return {success: true};
}

function updateStatus(data) {
  var orderId = data.orderId || data.order_id;
  var status  = data.status;
  var s       = _getSheet('Orders');
  var found   = _findRow(s, 'order_id', orderId);
  if (!found) { return {error: 'Order not found'}; }
  var si = found.headers.indexOf('status');
  s.getRange(found.row, si + 1).setValue(status);
  try {
    var orderObj = _toObjects(s).filter(function (o) {
      return String(o.order_id) === String(orderId);
    })[0];
    _notifyStatusUpdate(orderId, status, orderObj);
  } catch (e) { Logger.log('Notify status error: ' + e); }
  return {success: true};
}

function updateOrder(data) {
  var s     = _getSheet('Orders');
  var found = _findRow(s, 'order_id', data.order_id);
  if (!found) { return {error: 'Order not found'}; }
  found.headers.forEach(function (k, j) {
    if (data[k] !== undefined) { s.getRange(found.row, j + 1).setValue(data[k]); }
  });
  return {success: true};
}

function addTracking(data) {
  var s     = _getSheet('Orders');
  var found = _findRow(s, 'order_id', data.orderId);
  if (!found) { return {error: 'Order not found'}; }
  var h = found.headers;

  function setCol(col, val) {
    var i = h.indexOf(col);
    if (i > -1) { s.getRange(found.row, i + 1).setValue(val); }
  }

  setCol('courier_name',    data.courierName    || '');
  setCol('tracking_number', data.trackingNumber || '');
  setCol('tracking_url',    data.trackingUrl    || '');
  if (data.updateStatus) { setCol('status', 'dispatched'); }
  return {success: true};
}

// ═══════════════════════════════════════════════════════════════════════════════
// QUOTES API
// ═══════════════════════════════════════════════════════════════════════════════

function createQuote(data) {
  var s = _getSheet('Quotes');
  if (s.getLastRow() === 0) {
    s.appendRow(Q_HDRS);
    var hr = s.getRange(1, 1, 1, Q_HDRS.length);
    hr.setBackground('#1a3d35');
    hr.setFontColor('#ffffff');
    hr.setFontWeight('bold');
    s.setFrozenRows(1);
  }
  var qid = 'QT' + Date.now().toString().slice(-8);
  s.appendRow([
    qid, data.name || '', data.phone || '', data.email || '',
    data.address || '', data.org || '', data.city || '',
    typeof data.products === 'object' ? JSON.stringify(data.products) : (data.products || ''),
    data.message || '', 'new', '', '', '', new Date().toISOString()
  ]);
  return {success: true, quoteId: qid};
}

function getQuotes(params) {
  var list = _toObjects(_getSheet('Quotes'));
  list.forEach(function (q) {
    try { q.products = JSON.parse(q.products || '[]'); } catch (e) { q.products = []; }
  });
  if (params && params.status) {
    list = list.filter(function (q) { return q.status === params.status; });
  }
  list.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  return {quotes: list, total: list.length};
}

function updateQuote(data) {
  var s     = _getSheet('Quotes');
  var found = _findRow(s, 'quote_id', data.quote_id);
  if (!found) { return {error: 'Quote not found'}; }
  found.headers.forEach(function (k, j) {
    if (data[k] !== undefined) {
      var v = typeof data[k] === 'object' ? JSON.stringify(data[k]) : data[k];
      s.getRange(found.row, j + 1).setValue(v);
    }
  });
  return {success: true};
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

function getDashboardStats() {
  var orders   = getOrders({}).orders;
  var quotes   = getQuotes({}).quotes;
  var products = getProducts({showHidden: true}).products;
  var revenue = 0, pending = 0, confirmed = 0, dispatched = 0, delivered = 0;
  orders.forEach(function (o) {
    var t = Number(o.total) || 0;
    if (o.status === 'pending')    { pending++;    revenue += t; }
    if (o.status === 'confirmed')  { confirmed++;  revenue += t; }
    if (o.status === 'dispatched') { dispatched++; revenue += t; }
    if (o.status === 'delivered')  { delivered++;  revenue += t; }
  });
  var now = new Date();
  return {
    totalOrders:      orders.length,
    totalRevenue:     revenue,
    pending:          pending,
    confirmed:        confirmed,
    dispatched:       dispatched,
    delivered:        delivered,
    totalProducts:    products.length,
    totalQuotes:      quotes.length,
    newQuotes:        quotes.filter(function (q) { return q.status === 'new'; }).length,
    recentOrders:     orders.filter(function (o) { return (now - new Date(o.date)) < 7 * 86400000; }).length,
    recentOrdersList: orders.slice(0, 10)
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// BLOGS API
// ═══════════════════════════════════════════════════════════════════════════════

function getBlogs(params) {
  var rows = _toObjects(_getSheet('Blogs'));
  if (params && params.status) {
    rows = rows.filter(function (b) { return b.status === params.status; });
  }
  rows.forEach(function (b) {
    try { b.tags = JSON.parse(b.tags || '[]'); } catch (e) { b.tags = []; }
    b.read_time = Number(b.read_time) || 5;
  });
  rows.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
  return {blogs: rows, total: rows.length};
}

function getBlogById(blogId) {
  var b = getBlogs({}).blogs.filter(function (x) { return String(x.blog_id) === String(blogId); })[0];
  return b ? {blog: b} : {error: 'Blog not found'};
}

function createBlog(data) {
  var s = _getSheet('Blogs');
  if (s.getLastRow() === 0) {
    s.appendRow(B_HDRS);
    var hr = s.getRange(1, 1, 1, B_HDRS.length);
    hr.setBackground('#2c3e50');
    hr.setFontColor('#ffffff');
    hr.setFontWeight('bold');
    s.setFrozenRows(1);
  }
  var existing = _toObjects(s);
  var dup = existing.filter(function (b) {
    return String(b.title || '').trim().toLowerCase() === String(data.title || '').trim().toLowerCase();
  })[0];
  if (dup) { return {error: 'A blog with this title already exists (ID: ' + dup.blog_id + ')'}; }
  var h      = s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0];
  var blogId = data.blog_id || ('BL' + Date.now().toString().slice(-8));
  var now    = new Date().toISOString();
  var rowData = {
    blog_id:      blogId,
    title:        String(data.title    || '').substring(0, 200),
    category:     String(data.category || 'General').substring(0, 50),
    emoji:        String(data.emoji    || '📝').substring(0, 10),
    author:       String(data.author   || 'Detoxy Hijama Team').substring(0, 100),
    read_time:    Number(data.read_time) || 5,
    excerpt:      String(data.excerpt  || '').substring(0, 500),
    content:      String(data.content  || ''),
    tags:         typeof data.tags === 'object' ? JSON.stringify(data.tags) : String(data.tags || '[]'),
    status:       data.status === 'draft' ? 'draft' : 'published',
    date:         data.date || now,
    updated_date: now,
    url:          data.url || ''
  };
  s.appendRow(h.map(function (col) { return rowData[col] !== undefined ? rowData[col] : ''; }));
  return {success: true, blogId: blogId};
}

function updateBlog(data) {
  var s     = _getSheet('Blogs');
  var found = _findRow(s, 'blog_id', data.blog_id);
  if (!found) { return {error: 'Blog not found: ' + data.blog_id}; }
  var allowed = ['title','category','emoji','author','read_time','excerpt','content','tags','status','url'];
  found.headers.forEach(function (col, j) {
    if (allowed.indexOf(col) === -1) { return; }
    if (data[col] === undefined) { return; }
    var val = (col === 'tags' && typeof data[col] === 'object') ? JSON.stringify(data[col]) : String(data[col]);
    s.getRange(found.row, j + 1).setValue(val);
  });
  var updCol = found.headers.indexOf('updated_date');
  if (updCol > -1) { s.getRange(found.row, updCol + 1).setValue(new Date().toISOString()); }
  return {success: true};
}

function deleteBlog(blogId) {
  var s     = _getSheet('Blogs');
  var found = _findRow(s, 'blog_id', blogId);
  if (!found) { return {error: 'Blog not found: ' + blogId}; }
  s.deleteRow(found.row);
  return {success: true};
}

function _seedAllBlogs() {
  var s = _getSheet('Blogs');
  if (s.getLastRow() === 0) {
    s.appendRow(B_HDRS);
    var hr = s.getRange(1, 1, 1, B_HDRS.length);
    hr.setBackground('#2c3e50');
    hr.setFontColor('#ffffff');
    hr.setFontWeight('bold');
    s.setFrozenRows(1);
  }
  var existing    = _toObjects(s);
  var existingIds = {};
  existing.forEach(function (b) { if (b.blog_id) { existingIds[String(b.blog_id)] = true; } });

  var builtin = [
    {blog_id:'builtin-1',  url:'/blog/what-is-hijama.html',         title:'What is Hijama? A Complete Beginners Guide',           category:'Benefits',   emoji:'🩸', read_time:8,  excerpt:'Discover hijama cupping therapy, its types, and how it works.',            date:'2024-12-02T00:00:00.000Z', tags:'["Hijama Basics","Wet Cupping","Beginners"]'},
    {blog_id:'builtin-2',  url:'/blog/hijama-in-islam.html',        title:'Hijama in Islam: Sunnah Days and Prophetic Guidance',  category:'Sunnah',     emoji:'🌙', read_time:7,  excerpt:'The Islamic roots of hijama and Sunnah lunar calendar days.',              date:'2024-11-28T00:00:00.000Z', tags:'["Sunnah","Prophetic Medicine","Tibb Nabawi"]'},
    {blog_id:'builtin-3',  url:'/blog/hijama-for-back-pain.html',   title:'Hijama for Back Pain: Clinical Evidence',              category:'Conditions', emoji:'🦴', read_time:9,  excerpt:'Clinical evidence behind hijama for back pain relief.',                    date:'2024-11-25T00:00:00.000Z', tags:'["Back Pain","Pain Relief","Evidence"]'},
    {blog_id:'builtin-4',  url:'/blog/hijama-for-migraines.html',   title:'Hijama for Migraines and Chronic Headaches',           category:'Conditions', emoji:'🧠', read_time:8,  excerpt:'How hijama provides long-term relief for chronic headaches.',             date:'2024-11-22T00:00:00.000Z', tags:'["Migraines","Headaches","Chronic Pain"]'},
    {blog_id:'builtin-5',  url:'/blog/wet-hijama-guide.html',       title:'How to Perform Wet Hijama: Step-by-Step Guide',        category:'How-To',     emoji:'💉', read_time:12, excerpt:'Professional guide to performing wet hijama safely.',                     date:'2024-11-18T00:00:00.000Z', tags:'["Wet Hijama","Technique","Practitioners"]'},
    {blog_id:'builtin-6',  url:'/blog/hijama-for-pcos.html',        title:'Hijama for PCOS and Hormonal Imbalances in Women',     category:'Conditions', emoji:'⚕️', read_time:9,  excerpt:'How hijama helps regulate hormones and improve reproductive health.',     date:'2024-11-15T00:00:00.000Z', tags:'["PCOS","Hormones","Fertility"]'},
    {blog_id:'builtin-7',  url:'/blog/dry-vs-wet-cupping.html',     title:'Dry Cupping vs Wet Hijama: Which is Right for You?',   category:'How-To',     emoji:'⚖️', read_time:7,  excerpt:'Compare dry and wet hijama to find the best for your condition.',         date:'2024-11-12T00:00:00.000Z', tags:'["Dry Cupping","Wet Hijama","Comparison"]'},
    {blog_id:'builtin-8',  url:'/blog/hijama-equipment-guide.html', title:'The Complete Guide to Hijama Equipment and Tools',     category:'Products',   emoji:'🔬', read_time:10, excerpt:'Handbook on cups, lancets, and consumables for safe hijama.',            date:'2024-11-08T00:00:00.000Z', tags:'["Equipment","Cups","Lancets"]'},
    {blog_id:'builtin-9',  url:'/blog/hijama-aftercare.html',       title:'Hijama Aftercare: What to Do After Your Session',      category:'Aftercare',  emoji:'🌿', read_time:6,  excerpt:'Evidence-based aftercare guidelines for hijama sessions.',                date:'2024-11-05T00:00:00.000Z', tags:'["Aftercare","Recovery","Safety"]'},
    {blog_id:'builtin-10', url:'/blog/hijama-benefits.html',        title:'Top 10 Evidence-Based Benefits of Hijama',             category:'Benefits',   emoji:'✨', read_time:8,  excerpt:'Top 10 clinically-supported benefits of cupping therapy.',               date:'2024-11-02T00:00:00.000Z', tags:'["Benefits","Immunity","Wellness"]'},
    {blog_id:'builtin-11', url:'/blog/hijama-for-athletes.html',    title:'Hijama for Athletes and Sports Performance Recovery',  category:'Benefits',   emoji:'🏃', read_time:7,  excerpt:'How hijama enhances sports performance and recovery.',                    date:'2024-10-28T00:00:00.000Z', tags:'["Sports","Recovery","Athletes"]'},
    {blog_id:'builtin-12', url:'/blog/facial-cupping.html',         title:'Facial Cupping: The Natural Anti-Aging Treatment',     category:'How-To',     emoji:'💆', read_time:8,  excerpt:'Learn the technique and benefits of facial cupping.',                     date:'2024-10-24T00:00:00.000Z', tags:'["Facial","Anti-Aging","Skincare"]'},
    {blog_id:'builtin-13', url:'/blog/hijama-for-diabetes.html',    title:'Hijama for Diabetes Management and Blood Sugar Control',category:'Conditions', emoji:'🩺', read_time:9,  excerpt:'How hijama helps regulate blood sugar and reduce diabetic complications.',date:'2024-10-20T00:00:00.000Z', tags:'["Diabetes","Blood Sugar","Management"]'},
    {blog_id:'builtin-14', url:'/blog/hijama-for-hair-loss.html',   title:'Hijama for Hair Loss, Alopecia and Scalp Rejuvenation',category:'Conditions', emoji:'💇', read_time:7,  excerpt:'How scalp hijama stimulates follicles and promotes hair regrowth.',       date:'2024-10-16T00:00:00.000Z', tags:'["Hair Loss","Alopecia","Scalp"]'},
    {blog_id:'builtin-15', url:'/blog/hijama-clinic-setup.html',    title:'How to Set Up a Professional Hijama Clinic in India',  category:'How-To',     emoji:'🏥', read_time:11, excerpt:'Complete guide to setting up a profitable hijama clinic in India.',       date:'2024-10-12T00:00:00.000Z', tags:'["Clinic Setup","Business","India"]'},
    {blog_id:'builtin-16', url:'/blog/hijama-points-map.html',      title:'Hijama Points Map: Comprehensive Full Body Guide',     category:'Aftercare',  emoji:'🗺️', read_time:10, excerpt:'Visual guide to hijama cupping points across the human body.',           date:'2024-10-08T00:00:00.000Z', tags:'["Points","Map","Practitioners"]'},
    {blog_id:'builtin-17', url:'/blog/hijama-for-fertility.html',   title:'Hijama for Fertility and Reproductive Health',         category:'Benefits',   emoji:'🌸', read_time:9,  excerpt:'How hijama supports reproductive health for both men and women.',         date:'2024-10-04T00:00:00.000Z', tags:'["Fertility","Reproductive Health","Hormones"]'},
    {blog_id:'builtin-18', url:'/blog/silicone-vs-glass-cups.html', title:'Silicone vs Glass vs Bamboo Hijama Cups',              category:'Products',   emoji:'🏆', read_time:8,  excerpt:'Compare cup materials to find the best for your practice.',               date:'2024-09-30T00:00:00.000Z', tags:'["Cups","Equipment","Comparison"]'},
    {blog_id:'builtin-19', url:'/blog/hijama-mental-health.html',   title:'Hijama for Mental Health: Anxiety, Depression and Stress',category:'Benefits', emoji:'🧘', read_time:8,  excerpt:'Neuroscience behind how hijama supports the nervous system.',            date:'2024-09-26T00:00:00.000Z', tags:'["Mental Health","Anxiety","Depression"]'},
    {blog_id:'builtin-20', url:'/blog/hijama-safety.html',          title:'Hijama Safety: Contraindications, Risks and Precautions',category:'Aftercare', emoji:'⚠️', read_time:7,  excerpt:'Critical contraindications every practitioner and patient must know.',   date:'2024-09-22T00:00:00.000Z', tags:'["Safety","Contraindications","Precautions"]'}
  ];

  var h       = s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0];
  var now     = new Date().toISOString();
  var newBlog = builtin.filter(function (b) { return !existingIds[b.blog_id]; });
  if (newBlog.length === 0) {
    Logger.log('_seedAllBlogs: all blogs already exist.');
    return;
  }
  var rows = newBlog.map(function (b) {
    return h.map(function (col) {
      if (col === 'content')      { return b.content || ('Full article: ' + b.title); }
      if (col === 'author')       { return b.author  || 'Detoxy Hijama Team'; }
      if (col === 'status')       { return 'published'; }
      if (col === 'updated_date') { return now; }
      return b[col] !== undefined ? b[col] : '';
    });
  });
  s.getRange(s.getLastRow() + 1, 1, rows.length, h.length).setValues(rows);
  s.autoResizeColumns(1, B_HDRS.length);
  Logger.log('_seedAllBlogs: inserted ' + newBlog.length + ' blogs.');
}

// ═══════════════════════════════════════════════════════════════════════════════
// NOTIFICATIONS
// ═══════════════════════════════════════════════════════════════════════════════

function _notifyNewOrder(orderId, data) {
  var itemsList = (data.items || []).map(function (i) {
    return '  - ' + i.name + (i.size ? ' [' + i.size + ']' : '') + ' x' + i.qty + ' = Rs.' + (i.price * i.qty);
  }).join('\n');

  var adminBody = (
    'NEW ORDER - Detoxy Hijama\n' +
    '=============================\n' +
    'Order ID : ' + orderId + '\n' +
    'Customer : ' + (data.name  || '') + '\n' +
    'Phone    : ' + (data.phone || '') + '\n' +
    'Email    : ' + (data.email || '') + '\n' +
    'Address  : ' + [data.address, data.city, data.state, data.pincode].filter(Boolean).join(', ') + '\n' +
    'Payment  : ' + (data.payment || 'cod').toUpperCase() + '\n\n' +
    'ITEMS:\n' + itemsList + '\n\n' +
    'Subtotal : Rs.' + (data.subtotal || 0) + '\n' +
    'Shipping : Rs.' + (data.shipping || 0) + '\n' +
    'TOTAL    : Rs.' + (data.total    || 0) + '\n\n' +
    'Admin: https://detoxyhijama.github.io/admin/'
  );

  try { GmailApp.sendEmail(ADMIN_EMAIL, 'New Order #' + orderId + ' - Detoxy Hijama', adminBody); } catch (e) { Logger.log('Admin email failed: ' + e); }

  if (data.email) {
    var custBody = (
      'Dear ' + (data.name || 'Customer') + ',\n\n' +
      'Thank you for your order at Detoxy Hijama!\n\n' +
      'Order ID : ' + orderId + '\n' +
      'Total    : Rs.' + (data.total || 0) + '\n' +
      'Payment  : ' + (data.payment || 'cod').toUpperCase() + '\n\n' +
      'We will dispatch your order within 24 hours.\n' +
      'Track: https://detoxyhijama.github.io/track-order.html\n\n' +
      'WhatsApp: +91 95665 96077\n\nTeam Detoxy Hijama'
    );
    try { GmailApp.sendEmail(data.email, 'Your Detoxy Hijama Order #' + orderId + ' is Confirmed!', custBody); } catch (e) { Logger.log('Customer email failed: ' + e); }
  }
}

function _notifyStatusUpdate(orderId, newStatus, orderData) {
  if (!orderData || !orderData.email) { return; }
  var msgs = {
    confirmed:  'Your order has been confirmed and is being prepared.',
    dispatched: 'Your order has been dispatched!',
    delivered:  'Your order has been delivered. Thank you!'
  };
  var msg = msgs[newStatus];
  if (!msg) { return; }
  var tracking = '';
  if (newStatus === 'dispatched' && orderData.tracking_number) {
    tracking = (
      '\nCourier : ' + (orderData.courier_name  || '') +
      '\nAWB No. : ' + orderData.tracking_number +
      (orderData.tracking_url ? '\nTrack   : ' + orderData.tracking_url : '')
    );
  }
  var body = (
    'Dear ' + (orderData.name || 'Customer') + ',\n\n' +
    msg + '\n\nOrder ID : ' + orderId + tracking + '\n\n' +
    'Track: https://detoxyhijama.github.io/track-order.html\n\n' +
    'Team Detoxy Hijama | +91 95665 96077'
  );
  try {
    GmailApp.sendEmail(
      orderData.email,
      'Detoxy Hijama Order #' + orderId + ' - ' + newStatus.charAt(0).toUpperCase() + newStatus.slice(1),
      body
    );
  } catch (e) { Logger.log('Status email failed: ' + e); }
}

// ═══════════════════════════════════════════════════════════════════════════════
// USERS API
// ═══════════════════════════════════════════════════════════════════════════════

function registerUser(data) {
  var s = _getSheet('Users');
  if (s.getLastRow() === 0) {
    s.appendRow(U_HDRS);
    var hr = s.getRange(1, 1, 1, U_HDRS.length);
    hr.setBackground('#1a3d35');
    hr.setFontColor('#ffffff');
    hr.setFontWeight('bold');
    s.setFrozenRows(1);
  }
  var d  = s.getDataRange().getValues();
  var h  = d[0];
  var eC = h.indexOf('email');
  for (var i = 1; i < d.length; i++) {
    if (d[i][eC] === data.email) { return {error: 'Email already registered'}; }
  }
  var hash = Utilities.base64Encode(
    Utilities.computeHmacSha256Signature(data.password, 'detoxy_secret_2024')
  );
  s.appendRow([
    'U' + Date.now(), data.name || '', data.email || '', hash,
    data.phone || '', data.address || '', data.city || '',
    data.state || '', data.pincode || '', new Date().toISOString()
  ]);
  return {success: true};
}

function loginUser(data) {
  var s    = _getSheet('Users');
  var vals = s.getDataRange().getValues();
  if (vals.length < 2) { return {error: 'Invalid credentials'}; }
  var h    = vals[0];
  var eC   = h.indexOf('email');
  var hC   = h.indexOf('password_hash');
  var nC   = h.indexOf('name');
  var iC   = h.indexOf('id');
  var hash = Utilities.base64Encode(
    Utilities.computeHmacSha256Signature(data.password, 'detoxy_secret_2024')
  );
  for (var i = 1; i < vals.length; i++) {
    if (vals[i][eC] === data.email && vals[i][hC] === hash) {
      var u = {
        id:        vals[i][iC],
        name:      vals[i][nC],
        email:     data.email,
        phone:     vals[i][h.indexOf('phone')]   || '',
        address:   vals[i][h.indexOf('address')] || '',
        city:      vals[i][h.indexOf('city')]    || '',
        state:     vals[i][h.indexOf('state')]   || '',
        pincode:   vals[i][h.indexOf('pincode')] || '',
        loginTime: Date.now()
      };
      return {success: true, user: u};
    }
  }
  return {error: 'Invalid email or password'};
}

function getUserOrders(email, phone) {
  var orders   = getOrders({}).orders;
  var filtered = orders.filter(function (o) {
    var em = email && String(o.email || '').toLowerCase() === String(email).toLowerCase();
    var ph = phone && String(o.phone || '').replace(/\D/g, '').slice(-10) === String(phone).replace(/\D/g, '').slice(-10);
    return em || ph;
  });
  return {orders: filtered, total: filtered.length};
}

function updateUser(data) {
  var s     = _getSheet('Users');
  var found = _findRow(s, 'id', data.id);
  if (!found) { return {error: 'User not found'}; }
  var h       = found.headers;
  var allowed = ['name','phone','address','city','state','pincode'];
  allowed.forEach(function (field) {
    if (data[field] !== undefined) {
      var col = h.indexOf(field);
      if (col > -1) { s.getRange(found.row, col + 1).setValue(String(data[field]).substring(0, 200)); }
    }
  });
  return {success: true};
}

function changePassword(data) {
  var s    = _getSheet('Users');
  var vals = s.getDataRange().getValues();
  var h    = vals[0];
  var eC   = h.indexOf('email');
  var hC   = h.indexOf('password_hash');
  var oldHash = Utilities.base64Encode(
    Utilities.computeHmacSha256Signature(data.oldPassword, 'detoxy_secret_2024')
  );
  var newHash = Utilities.base64Encode(
    Utilities.computeHmacSha256Signature(data.newPassword, 'detoxy_secret_2024')
  );
  var props    = PropertiesService.getScriptProperties();
  var key      = 'pw_attempts_' + (data.email || '').replace(/[^a-z0-9]/gi, '');
  var attempts = parseInt(props.getProperty(key) || '0');
  if (attempts >= 5) { return {error: 'Too many attempts. Please try again later.'}; }
  for (var i = 1; i < vals.length; i++) {
    if (String(vals[i][eC]).toLowerCase() === String(data.email || '').toLowerCase()) {
      if (vals[i][hC] !== oldHash) {
        props.setProperty(key, String(attempts + 1));
        return {error: 'Current password is incorrect.'};
      }
      if (!data.newPassword || data.newPassword.length < 8) { return {error: 'New password must be at least 8 characters.'}; }
      s.getRange(i + 1, hC + 1).setValue(newHash);
      props.deleteProperty(key);
      return {success: true};
    }
  }
  return {error: 'User not found.'};
}

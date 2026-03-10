/**
 * DETOXY HIJAMA — Google Apps Script Backend
 * ============================================
 * Deploy as Web App: Execute as "Me", Access to "Anyone"
 * 
 * GOOGLE SHEETS STRUCTURE:
 * Sheet 1: "Orders"   — order_id | name | phone | email | address | city | state | pincode | items | subtotal | shipping | total | payment | notes | status | date
 * Sheet 2: "Products" — id | title | description | price | mrp | category | categoryLabel | image | rating | reviews | stock | badge | badgeType | shortDesc | features | specs
 * Sheet 3: "Users"    — id | name | email | password_hash | date
 */

var SPREADSHEET_ID = ''; // Auto-detected from active spreadsheet
var ORDERS_SHEET = 'Orders';
var PRODUCTS_SHEET = 'Products';
var USERS_SHEET = 'Users';

// ── Main Entry Point ──────────────────────────────────────────────────────────
function doGet(e) {
  var params = e.parameter;
  var action = params.action || '';

  try {
    var result;
    switch(action) {
      case 'getProducts':   result = getProducts(params); break;
      case 'getProduct':    result = getProduct(params.id); break;
      case 'getCategories': result = getCategories(); break;
      case 'getOrders':     result = getOrders(params); break;
      case 'updateStatus':  result = updateOrderStatus(params.orderId, params.status); break;
      default:              result = { status: 'ok', message: 'Detoxy Hijama API v1.0' };
    }
    return buildResponse(result);
  } catch(err) {
    return buildResponse({ error: err.message }, 500);
  }
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || '{}');
    var action = e.parameter.action || body.action || '';
    var result;

    switch(action) {
      case 'createOrder':  result = createOrder(body); break;
      case 'register':     result = registerUser(body); break;
      case 'login':        result = loginUser(body); break;
      case 'addProduct':   result = addProduct(body); break;
      case 'editProduct':  result = editProduct(body); break;
      case 'deleteProduct':result = deleteProduct(body.id); break;
      default:             result = { error: 'Unknown action: ' + action };
    }
    return buildResponse(result);
  } catch(err) {
    return buildResponse({ error: err.message }, 500);
  }
}

// ── CORS Response ─────────────────────────────────────────────────────────────
function buildResponse(data, code) {
  var output = ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ── Get Spreadsheet ───────────────────────────────────────────────────────────
function getSpreadsheet() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet(name) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

// ── PRODUCTS ──────────────────────────────────────────────────────────────────
function getProducts(params) {
  var sheet = getSheet(PRODUCTS_SHEET);
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return { products: [] };

  var headers = data[0];
  var products = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue; // Skip empty rows
    var p = {};
    headers.forEach(function(h, idx) { p[h] = row[idx]; });

    // Parse JSON fields
    try { p.features = JSON.parse(p.features || '[]'); } catch(e) { p.features = []; }
    try { p.specs = JSON.parse(p.specs || '{}'); } catch(e) { p.specs = {}; }
    try { p.images = JSON.parse(p.images || '[]'); } catch(e) { p.images = [p.image || '']; }

    if (params && params.category && p.category !== params.category) continue;
    products.push(p);
  }

  return { products: products, total: products.length };
}

function getProduct(id) {
  var products = getProducts({}).products;
  var p = products.find(function(x){ return x.id === id; });
  return p ? { product: p } : { error: 'Product not found' };
}

function getCategories() {
  var products = getProducts({}).products;
  var cats = {};
  products.forEach(function(p) {
    if (p.category) {
      cats[p.category] = (cats[p.category] || 0) + 1;
    }
  });
  return { categories: cats };
}

function addProduct(data) {
  var sheet = getSheet(PRODUCTS_SHEET);
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  if (headers[0] === '') {
    // Set headers if empty
    var cols = ['id','title','description','price','mrp','category','categoryLabel','image','images','rating','reviews','stock','badge','badgeType','shortDesc','features','specs'];
    sheet.getRange(1, 1, 1, cols.length).setValues([cols]);
    headers = cols;
  }
  var row = headers.map(function(h) { return data[h] !== undefined ? (typeof data[h] === 'object' ? JSON.stringify(data[h]) : data[h]) : ''; });
  sheet.appendRow(row);
  return { success: true, id: data.id };
}

function editProduct(data) {
  var sheet = getSheet(PRODUCTS_SHEET);
  var values = sheet.getDataRange().getValues();
  var headers = values[0];
  var idCol = headers.indexOf('id');
  for (var i = 1; i < values.length; i++) {
    if (values[i][idCol] === data.id) {
      headers.forEach(function(h, idx) {
        if (data[h] !== undefined) {
          sheet.getRange(i + 1, idx + 1).setValue(typeof data[h] === 'object' ? JSON.stringify(data[h]) : data[h]);
        }
      });
      return { success: true };
    }
  }
  return { error: 'Product not found' };
}

function deleteProduct(id) {
  var sheet = getSheet(PRODUCTS_SHEET);
  var values = sheet.getDataRange().getValues();
  var headers = values[0];
  var idCol = headers.indexOf('id');
  for (var i = 1; i < values.length; i++) {
    if (values[i][idCol] === id) {
      sheet.deleteRow(i + 1);
      return { success: true };
    }
  }
  return { error: 'Product not found' };
}

// ── ORDERS ────────────────────────────────────────────────────────────────────
function createOrder(data) {
  var sheet = getSheet(ORDERS_SHEET);

  // Set headers if first order
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['order_id','name','phone','email','address','city','state','pincode','items','subtotal','shipping','total','payment','notes','status','date']);
  }

  var orderId = data.orderId || ('DH' + Date.now().toString().slice(-8));
  var itemsSummary = (data.items || []).map(function(i){ return i.name + ' x' + i.qty; }).join(', ');

  sheet.appendRow([
    orderId,
    data.name || '',
    data.phone || '',
    data.email || '',
    data.address || '',
    data.city || '',
    data.state || '',
    data.pincode || '',
    itemsSummary,
    data.subtotal || 0,
    data.shipping || 0,
    data.total || 0,
    data.payment || 'cod',
    data.notes || '',
    'pending',
    data.date || new Date().toISOString()
  ]);

  // Send notification email (optional - requires Gmail setup)
  // try { sendOrderEmail(orderId, data); } catch(e) {}

  return { success: true, orderId: orderId };
}

function getOrders(params) {
  var sheet = getSheet(ORDERS_SHEET);
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return { orders: [] };

  var headers = data[0];
  var orders = [];

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[0]) continue;
    var o = {};
    headers.forEach(function(h, idx) { o[h] = row[idx]; });
    if (params.status && o.status !== params.status) continue;
    orders.push(o);
  }

  // Sort by date descending
  orders.sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  return { orders: orders, total: orders.length };
}

function updateOrderStatus(orderId, status) {
  var sheet = getSheet(ORDERS_SHEET);
  var values = sheet.getDataRange().getValues();
  var headers = values[0];
  var idCol = headers.indexOf('order_id');
  var statusCol = headers.indexOf('status');

  for (var i = 1; i < values.length; i++) {
    if (values[i][idCol] === orderId) {
      sheet.getRange(i + 1, statusCol + 1).setValue(status);
      return { success: true, orderId: orderId, status: status };
    }
  }
  return { error: 'Order not found: ' + orderId };
}

// ── USERS ─────────────────────────────────────────────────────────────────────
function registerUser(data) {
  var sheet = getSheet(USERS_SHEET);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['id','name','email','password_hash','phone','date']);
  }

  // Check if email exists
  var values = sheet.getDataRange().getValues();
  var headers = values[0];
  var emailCol = headers.indexOf('email');
  for (var i = 1; i < values.length; i++) {
    if (values[i][emailCol] === data.email) {
      return { error: 'Email already registered' };
    }
  }

  // Simple hash (NOT for production - use proper hashing)
  var hash = Utilities.base64Encode(Utilities.computeHmacSha256Signature(data.password, 'detoxy_secret_key'));
  var userId = 'U' + Date.now();

  sheet.appendRow([userId, data.name || '', data.email || '', hash, data.phone || '', new Date().toISOString()]);
  return { success: true, userId: userId };
}

function loginUser(data) {
  var sheet = getSheet(USERS_SHEET);
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return { error: 'Invalid credentials' };

  var headers = values[0];
  var emailCol = headers.indexOf('email');
  var hashCol = headers.indexOf('password_hash');
  var nameCol = headers.indexOf('name');
  var idCol = headers.indexOf('id');

  var hash = Utilities.base64Encode(Utilities.computeHmacSha256Signature(data.password, 'detoxy_secret_key'));

  for (var i = 1; i < values.length; i++) {
    if (values[i][emailCol] === data.email && values[i][hashCol] === hash) {
      return {
        success: true,
        user: { id: values[i][idCol], name: values[i][nameCol], email: data.email }
      };
    }
  }
  return { error: 'Invalid email or password' };
}

// ── SETUP ─────────────────────────────────────────────────────────────────────
function setupSheets() {
  // Run this once to set up all required sheets
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var ordersSheet = ss.getSheetByName('Orders') || ss.insertSheet('Orders');
  ordersSheet.getRange(1,1,1,16).setValues([['order_id','name','phone','email','address','city','state','pincode','items','subtotal','shipping','total','payment','notes','status','date']]);

  var productsSheet = ss.getSheetByName('Products') || ss.insertSheet('Products');
  productsSheet.getRange(1,1,1,17).setValues([['id','title','description','price','mrp','category','categoryLabel','image','images','rating','reviews','stock','badge','badgeType','shortDesc','features','specs']]);

  var usersSheet = ss.getSheetByName('Users') || ss.insertSheet('Users');
  usersSheet.getRange(1,1,1,6).setValues([['id','name','email','password_hash','phone','date']]);

  Logger.log('Setup complete!');
}

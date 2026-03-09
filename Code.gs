// ============================================================
// DETOXY HIJAMA — Google Apps Script Backend (Code.gs)
// Deploy as Web App: Execute as Me, Anyone can access
// ============================================================

const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID'; // Replace with your Sheet ID

// ── SHEET NAMES ──────────────────────────────────────────────
const SHEETS = {
  ORDERS:    'Orders',
  PRODUCTS:  'Products',
  CUSTOMERS: 'Customers',
  USERS:     'Users',
  SHIPPING:  'Shipping',
  BILLING:   'Billing',
  SETTINGS:  'Settings'
};

// ── DEFAULT USERS (stored in Users sheet) ────────────────────
// Email                        | Password Hash        | Role
// admin@detoxyhijama.com       | Admin@2025Detoxy!    | admin
// shipper@detoxyhijama.com     | Ship@2025Detoxy!     | shipper

function doPost(e) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };
  try {
    const body = JSON.parse(e.postData.contents);
    const action = body.action;
    let result;
    switch(action) {
      case 'login':          result = handleLogin(body); break;
      case 'placeOrder':     result = handlePlaceOrder(body); break;
      case 'getOrders':      result = handleGetOrders(body); break;
      case 'updateOrder':    result = handleUpdateOrder(body); break;
      case 'getProducts':    result = handleGetProducts(); break;
      case 'updateProduct':  result = handleUpdateProduct(body); break;
      case 'addProduct':     result = handleAddProduct(body); break;
      case 'deleteProduct':  result = handleDeleteProduct(body); break;
      case 'getCustomers':   result = handleGetCustomers(); break;
      case 'getShipments':   result = handleGetShipments(body); break;
      case 'updateShipment': result = handleUpdateShipment(body); break;
      case 'getDashboard':   result = handleGetDashboard(); break;
      case 'getBilling':     result = handleGetBilling(body); break;
      case 'getSettings':    result = handleGetSettings(); break;
      case 'updateSettings': result = handleUpdateSettings(body); break;
      default: result = { success: false, error: 'Unknown action' };
    }
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'Detoxy Hijama API running', version: '2.0' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── HELPERS ──────────────────────────────────────────────────
function getSheet(name) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function sheetToObjects(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    return obj;
  });
}

function generateId(prefix) {
  return prefix + '-' + Date.now() + '-' + Math.random().toString(36).substr(2,5).toUpperCase();
}

function hashPassword(pw) {
  // Simple hash for demo — use a proper hash in production
  let hash = 0;
  for (let i = 0; i < pw.length; i++) {
    hash = (hash << 5) - hash + pw.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(16);
}

// ── LOGIN ─────────────────────────────────────────────────────
function handleLogin(body) {
  const { email, password, role } = body;
  const sheet = getSheet(SHEETS.USERS);
  const users = sheetToObjects(sheet);
  
  // Bootstrap default users if sheet is empty
  if (users.length === 0) {
    sheet.appendRow(['id','name','email','password','role','status','created']);
    sheet.appendRow(['USR-001','Admin','admin@detoxyhijama.com', hashPassword('Admin@2025Detoxy!'), 'admin','active', new Date()]);
    sheet.appendRow(['USR-002','Shipper','shipper@detoxyhijama.com', hashPassword('Ship@2025Detoxy!'), 'shipper','active', new Date()]);
    users.push(
      {id:'USR-001',name:'Admin',email:'admin@detoxyhijama.com',password:hashPassword('Admin@2025Detoxy!'),role:'admin',status:'active'},
      {id:'USR-002',name:'Shipper',email:'shipper@detoxyhijama.com',password:hashPassword('Ship@2025Detoxy!'),role:'shipper',status:'active'}
    );
  }
  
  const user = users.find(u => u.email === email && u.password === hashPassword(password) && u.role === role && u.status === 'active');
  if (!user) return { success: false, error: 'Invalid credentials' };
  
  const token = Utilities.getUuid();
  const tokenSheet = getSheet('Tokens');
  if (tokenSheet.getLastRow() === 0) tokenSheet.appendRow(['token','userId','role','expires']);
  tokenSheet.appendRow([token, user.id, user.role, new Date(Date.now() + 8*3600*1000)]);
  
  return { success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

// ── PLACE ORDER ───────────────────────────────────────────────
function handlePlaceOrder(body) {
  const { customer, items, total, address, notes } = body;
  const orderId = generateId('ORD');
  const sheet = getSheet(SHEETS.ORDERS);
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['order_id','date','customer_name','customer_email','customer_phone','address','city','state','pincode','items','quantity','subtotal','shipping','total','payment_method','status','notes','shipper_id','tracking_no','dispatched_at','delivered_at','created_at']);
  }
  
  const now = new Date();
  const totalQty = items.reduce((s,i) => s+i.qty, 0);
  sheet.appendRow([
    orderId, now, customer.name, customer.email, customer.phone,
    address.street, address.city, address.state, address.pincode,
    JSON.stringify(items), totalQty, total, 0, total,
    'COD', 'pending', notes || '', '', '', '', '', now
  ]);
  
  // Add/update customer
  updateCustomerRecord(customer, orderId, total);
  
  // Send notification email
  try {
    MailApp.sendEmail({
      to: DETOXY_CONFIG_EMAIL,
      subject: `New Order ${orderId} — ₹${total}`,
      body: `New order received!\n\nOrder ID: ${orderId}\nCustomer: ${customer.name} (${customer.phone})\nItems: ${items.map(i=>`${i.name} x${i.qty}`).join(', ')}\nTotal: ₹${total}\nAddress: ${address.street}, ${address.city}, ${address.state} ${address.pincode}`
    });
  } catch(e) {}
  
  return { success: true, orderId };
}

function updateCustomerRecord(customer, orderId, total) {
  const sheet = getSheet(SHEETS.CUSTOMERS);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['customer_id','name','email','phone','city','state','total_orders','total_spent','last_order_id','created_at','updated_at']);
  }
  const customers = sheetToObjects(sheet);
  const idx = customers.findIndex(c => c.email === customer.email || c.phone === customer.phone);
  if (idx > -1) {
    const row = idx + 2;
    sheet.getRange(row, 7).setValue((customers[idx].total_orders || 0) + 1);
    sheet.getRange(row, 8).setValue((customers[idx].total_spent || 0) + total);
    sheet.getRange(row, 9).setValue(orderId);
    sheet.getRange(row, 11).setValue(new Date());
  } else {
    sheet.appendRow([generateId('CUS'), customer.name, customer.email, customer.phone, customer.city || '', customer.state || '', 1, total, orderId, new Date(), new Date()]);
  }
}

// ── GET ORDERS ────────────────────────────────────────────────
function handleGetOrders(body) {
  const sheet = getSheet(SHEETS.ORDERS);
  let orders = sheetToObjects(sheet);
  if (body.status && body.status !== 'all') orders = orders.filter(o => o.status === body.status);
  if (body.shipperId) orders = orders.filter(o => o.shipper_id === body.shipperId);
  if (body.search) {
    const s = body.search.toLowerCase();
    orders = orders.filter(o => (o.order_id+'').toLowerCase().includes(s) || (o.customer_name+'').toLowerCase().includes(s) || (o.customer_phone+'').includes(s));
  }
  orders.sort((a,b) => new Date(b.created_at) - new Date(a.created_at));
  return { success: true, orders: orders.slice(0, body.limit || 200) };
}

// ── UPDATE ORDER ──────────────────────────────────────────────
function handleUpdateOrder(body) {
  const { id, updates } = body;
  const sheet = getSheet(SHEETS.ORDERS);
  const orders = sheetToObjects(sheet);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const idx = orders.findIndex(o => o.order_id === id);
  if (idx === -1) return { success: false, error: 'Order not found' };
  const row = idx + 2;
  Object.keys(updates).forEach(key => {
    const col = headers.indexOf(key) + 1;
    if (col > 0) sheet.getRange(row, col).setValue(updates[key]);
  });
  
  // Auto-create shipment if status changes to processing
  if (updates.status === 'processing' && updates.shipper_id) {
    createShipmentRecord(id, updates.shipper_id);
  }
  
  return { success: true };
}

function createShipmentRecord(orderId, shipperId) {
  const sheet = getSheet(SHEETS.SHIPPING);
  if (sheet.getLastRow() === 0) sheet.appendRow(['shipment_id','order_id','shipper_id','status','tracking_no','courier','dispatched_at','delivered_at','notes','created_at']);
  sheet.appendRow([generateId('SHP'), orderId, shipperId, 'assigned', '', '', '', '', '', new Date()]);
}

// ── PRODUCTS ──────────────────────────────────────────────────
function handleGetProducts() {
  const sheet = getSheet(SHEETS.PRODUCTS);
  if (sheet.getLastRow() === 0) bootstrapProducts(sheet);
  return { success: true, products: sheetToObjects(sheet) };
}

function handleUpdateProduct(body) {
  const { id, data } = body;
  const sheet = getSheet(SHEETS.PRODUCTS);
  const products = sheetToObjects(sheet);
  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const idx = products.findIndex(p => p.product_id === id);
  if (idx === -1) return { success: false, error: 'Product not found' };
  const row = idx + 2;
  Object.keys(data).forEach(key => {
    const col = headers.indexOf(key)+1;
    if (col>0) sheet.getRange(row,col).setValue(data[key]);
  });
  return { success: true };
}

function handleAddProduct(body) {
  const sheet = getSheet(SHEETS.PRODUCTS);
  if (sheet.getLastRow() === 0) sheet.appendRow(['product_id','name','category','price','bulk_price','stock','description','emoji','badge','active','created_at']);
  const { data } = body;
  sheet.appendRow([generateId('PRD'), data.name, data.category, data.price, data.bulk_price||0, data.stock||999, data.description||'', data.emoji||'📦', data.badge||'', true, new Date()]);
  return { success: true };
}

function handleDeleteProduct(body) {
  const sheet = getSheet(SHEETS.PRODUCTS);
  const products = sheetToObjects(sheet);
  const idx = products.findIndex(p => p.product_id === body.id);
  if (idx === -1) return { success: false, error: 'Not found' };
  sheet.deleteRow(idx + 2);
  return { success: true };
}

// ── CUSTOMERS ─────────────────────────────────────────────────
function handleGetCustomers() {
  const sheet = getSheet(SHEETS.CUSTOMERS);
  const customers = sheetToObjects(sheet);
  return { success: true, customers };
}

// ── SHIPPING ──────────────────────────────────────────────────
function handleGetShipments(body) {
  const sheet = getSheet(SHEETS.SHIPPING);
  let shipments = sheetToObjects(sheet);
  if (body.shipperId) shipments = shipments.filter(s => s.shipper_id === body.shipperId);
  if (body.status && body.status !== 'all') shipments = shipments.filter(s => s.status === body.status);
  return { success: true, shipments };
}

function handleUpdateShipment(body) {
  const { id, data } = body;
  const sheet = getSheet(SHEETS.SHIPPING);
  const items = sheetToObjects(sheet);
  const headers = sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  const idx = items.findIndex(s => s.shipment_id === id);
  if (idx === -1) return { success: false, error: 'Shipment not found' };
  const row = idx + 2;
  Object.keys(data).forEach(key => {
    const col = headers.indexOf(key)+1;
    if (col>0) sheet.getRange(row,col).setValue(data[key]);
  });
  // Also update order tracking
  if (data.tracking_no || data.status) {
    const orderSheet = getSheet(SHEETS.ORDERS);
    const orders = sheetToObjects(orderSheet);
    const oHeaders = orderSheet.getRange(1,1,1,orderSheet.getLastColumn()).getValues()[0];
    const oIdx = orders.findIndex(o => o.order_id === items[idx].order_id);
    if (oIdx > -1) {
      if (data.tracking_no) { const c=oHeaders.indexOf('tracking_no')+1; if(c>0) orderSheet.getRange(oIdx+2,c).setValue(data.tracking_no); }
      if (data.status === 'delivered') { const c=oHeaders.indexOf('status')+1; if(c>0) orderSheet.getRange(oIdx+2,c).setValue('delivered'); const dc=oHeaders.indexOf('delivered_at')+1; if(dc>0) orderSheet.getRange(oIdx+2,dc).setValue(new Date()); }
    }
  }
  return { success: true };
}

// ── DASHBOARD ─────────────────────────────────────────────────
function handleGetDashboard() {
  const orders = sheetToObjects(getSheet(SHEETS.ORDERS));
  const customers = sheetToObjects(getSheet(SHEETS.CUSTOMERS));
  const today = new Date(); today.setHours(0,0,0,0);
  const todayOrders = orders.filter(o => new Date(o.created_at) >= today);
  const pending = orders.filter(o => o.status === 'pending');
  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s,o) => s+(parseFloat(o.total)||0), 0);
  const last30 = orders.filter(o => new Date(o.created_at) >= new Date(Date.now()-30*86400*1000));
  const last30Rev = last30.filter(o => o.status !== 'cancelled').reduce((s,o) => s+(parseFloat(o.total)||0), 0);
  // Revenue by day (last 7)
  const days = [];
  for (let i=6; i>=0; i--) {
    const d = new Date(); d.setDate(d.getDate()-i); d.setHours(0,0,0,0);
    const next = new Date(d); next.setDate(next.getDate()+1);
    const dayOrders = orders.filter(o => { const od=new Date(o.created_at); return od>=d && od<next && o.status!=='cancelled'; });
    days.push({ label: d.toLocaleDateString('en-IN',{weekday:'short'}), revenue: dayOrders.reduce((s,o)=>s+(parseFloat(o.total)||0),0), orders: dayOrders.length });
  }
  return {
    success: true,
    stats: { totalOrders: orders.length, todayOrders: todayOrders.length, pendingOrders: pending.length, totalRevenue: revenue, last30Revenue: last30Rev, totalCustomers: customers.length },
    chart: days,
    recentOrders: orders.slice(-10).reverse()
  };
}

// ── BILLING ───────────────────────────────────────────────────
function handleGetBilling(body) {
  const orders = sheetToObjects(getSheet(SHEETS.ORDERS));
  const filtered = body.orderId ? orders.filter(o => o.order_id === body.orderId) : orders.filter(o => o.status !== 'cancelled');
  return { success: true, billing: filtered };
}

// ── SETTINGS ──────────────────────────────────────────────────
function handleGetSettings() {
  const sheet = getSheet(SHEETS.SETTINGS);
  const rows = sheetToObjects(sheet);
  const settings = {};
  rows.forEach(r => { settings[r.key] = r.value; });
  return { success: true, settings };
}

function handleUpdateSettings(body) {
  const sheet = getSheet(SHEETS.SETTINGS);
  if (sheet.getLastRow() === 0) sheet.appendRow(['key','value','updated_at']);
  const rows = sheetToObjects(sheet);
  Object.keys(body.settings).forEach(key => {
    const idx = rows.findIndex(r => r.key === key);
    if (idx > -1) sheet.getRange(idx+2, 2).setValue(body.settings[key]);
    else sheet.appendRow([key, body.settings[key], new Date()]);
  });
  return { success: true };
}

// ── BOOTSTRAP PRODUCTS ────────────────────────────────────────
function bootstrapProducts(sheet) {
  sheet.appendRow(['product_id','name','slug','category','price','bulk_price','bulk_min','stock','description','emoji','badge','active','created_at']);
  const products = [
    ['PRD-001','Detoxy Hijama Indian Made Standard Cup','detoxy-hijama-standard-cups','cups',9,8,5000,9999,'BPA-free medical PVC dome-shaped hijama cups, sizes 1–6. Strong suction valve. Wet & dry cupping.','🫙','BESTSELLER',true,new Date()],
    ['PRD-002','Detoxy Hijama Premium Transparent Cups','detoxy-hijama-premium-cups','cups',12,10,500,9999,'Ultra-clear transparent plastic, high-precision suction valve. Professional clinic grade. 6 sizes.','🧊','PREMIUM',true,new Date()],
    ['PRD-003','Detoxy Hijama Fire Cupping Glass Set of 16','detoxy-hijama-fire-cupping-glass','cups',900,800,10,999,'Traditional borosilicate glass fire cupping set. 16 cups in 5 sizes. Carry bag included.','🪔','',true,new Date()],
    ['PRD-004','Detoxy Hijama 24-Set Magnetic Vacuum Kit','detoxy-hijama-magnetic-vacuum-kit','accessories',700,600,10,999,'Complete dry cupping kit. 24 cups, manual pump, extender pipe, magnetic needle, gun head included.','🔧','',true,new Date()],
    ['PRD-005','Detoxy Hijama Silicone Facial Cup Set of 4','detoxy-hijama-silicone-facial-4','cups',250,220,20,999,'Ultra-soft medical silicone facial cups. 4 sizes for all facial zones. Lymphatic drainage.','🌸','',true,new Date()],
    ['PRD-006','Detoxy Hijama Silicone Facial Cup Set of 7','detoxy-hijama-silicone-facial-7','cups',600,550,10,999,'Complete 7-piece professional silicone facial cupping set. Full face, neck and décolletage.','💆','POPULAR',true,new Date()],
    ['PRD-007','Detoxy Hijama Silicone Moving Cup Set of 4','detoxy-hijama-silicone-moving-cups','cups',700,650,10,999,'Thick-walled blue silicone moving cups. 4 sizes 3cm–7.2cm. Deep tissue massage.','💨','',true,new Date()],
    ['PRD-008','Detoxy Hijama Bamboo Cupping Set','detoxy-hijama-bamboo-cupping-set','cups',500,450,5,999,'100% natural eco-friendly bamboo cups. Natural antibacterial. Traditional authentic therapy.','🎋','',true,new Date()],
    ['PRD-009','Detoxy Hijama Curve Cup Size 3 & 4','detoxy-hijama-curve-cups','cups',12,10,200,9999,'Curved base design hijama cups. Better suction grip on curved body areas — shoulders, knees.','⭕','',true,new Date()],
    ['PRD-010','Detoxy Hijama Electric Smart Vacuum Cup','detoxy-hijama-electric-smart-cup','electric',750,700,10,999,'12-level suction, hot compress 40°C, 2 modes. USB-C rechargeable. Pain & muscle relief.','⚡','NEW',true,new Date()],
    ['PRD-011','Detoxy Hijama Suction Gun','detoxy-hijama-suction-gun','accessories',160,140,20,999,'Professional manual suction gun. Ergonomic trigger-grip. Compatible with all cup sizes 1–6.','🔫','',true,new Date()],
    ['PRD-012','Detoxy Hijama 3 Lancet Pen Massager','detoxy-hijama-lancet-pen','medical',550,500,5,999,'Professional 3-lancet pen massager. Adjustable depth, ergonomic grip. For wet cupping.','💉','',true,new Date()],
    ['PRD-013','Detoxy Hijama Surgical Blade No.11 Pack 100','detoxy-hijama-surgical-blade','medical',250,220,10,999,'CE marked sterile surgical blades. Size No.11 stainless steel. 100 individually wrapped.','🔪','STERILE',true,new Date()],
    ['PRD-014','Detoxy Hijama Premium Latex Gloves Pack 100','detoxy-hijama-latex-gloves','medical',320,280,10,999,'Medical examination grade latex gloves. Powder-free. 100 gloves. Sizes S, M, L.','🧤','',true,new Date()],
    ['PRD-015','Detoxy Hijama Surgical Cotton 400g','detoxy-hijama-surgical-cotton','medical',160,140,20,999,'Pure absorbent surgical cotton roll 400g. Sterile. Essential for hijama aftercare.','🩹','',true,new Date()],
  ];
  products.forEach(p => sheet.appendRow(p));
}

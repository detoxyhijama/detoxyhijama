/**
 * DETOXY HIJAMA — Google Apps Script (Code.gs)
 * ================================================
 * Deploy this as a Web App in Google Apps Script:
 *   Extensions → Apps Script → Deploy → New Deployment
 *   Type: Web App | Execute as: Me | Who has access: Anyone
 *
 * Then paste the Web App URL in:
 *   Admin Panel → Sheets Setup → Step 4
 */

// ── COLUMN ORDER IN YOUR SHEET ──
// timestamp | Order ID | Name | Phone | Email | Address | City | State | Pincode
// Items | Subtotal | Payment | Notes | Status | Type | Synced At

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Ensure header row exists
    _ensureHeaders(sheet);

    var raw = e.postData ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    var now = new Date().toISOString();

    sheet.appendRow([
      data.timestamp  || data.savedAt || now,        // A: Order Time
      data.id         || 'ORD-' + Date.now(),         // B: Order ID
      data.name       || data.company || '',           // C: Customer Name
      data.phone      || '',                           // D: Phone
      data.email      || '',                           // E: Email
      data.address    || '',                           // F: Address
      data.city       || '',                           // G: City
      data.state      || '',                           // H: State
      data.pincode    || '',                           // I: Pincode
      data.items      || '',                           // J: Items
      data.subtotal   || data.total || 0,              // K: Subtotal (₹)
      data.payment    || data.type  || '',             // L: Payment Method
      data.notes      || '',                           // M: Notes
      data.status     || 'New',                        // N: Status
      data.type       || 'ORDER',                      // O: Type
      now                                              // P: Synced At
    ]);

    return _json({ success: true, id: data.id });
  } catch (err) {
    return _json({ success: false, error: err.message });
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Detoxy Hijama Orders API is running ✓')
    .setMimeType(ContentService.MimeType.TEXT);
}

// ── Add header row if sheet is empty ──
function _ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Order Time', 'Order ID', 'Customer Name', 'Phone', 'Email',
      'Address', 'City', 'State', 'Pincode', 'Items',
      'Subtotal (₹)', 'Payment', 'Notes', 'Status', 'Type', 'Synced At'
    ]);
    // Format header row
    var headerRange = sheet.getRange(1, 1, 1, 16);
    headerRange.setBackground('#1a3d35');
    headerRange.setFontColor('#ffffff');
    headerRange.setFontWeight('bold');
    headerRange.setFontSize(10);
    sheet.setFrozenRows(1);

    // Set column widths for readability
    sheet.setColumnWidth(1, 160);   // Order Time
    sheet.setColumnWidth(2, 130);   // Order ID
    sheet.setColumnWidth(3, 150);   // Name
    sheet.setColumnWidth(4, 120);   // Phone
    sheet.setColumnWidth(5, 180);   // Email
    sheet.setColumnWidth(6, 200);   // Address
    sheet.setColumnWidth(10, 300);  // Items
  }
}

// ── JSON response helper ──
function _json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── TEST FUNCTION — run this manually to verify sheet works ──
function testManualOrder() {
  var testOrder = {
    timestamp: new Date().toISOString(),
    id: 'TEST-' + Date.now(),
    name: 'Test Customer',
    phone: '9999999999',
    email: 'test@example.com',
    address: '123 Test Street, Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600001',
    items: 'Premium Cups x10, Suction Gun x1',
    subtotal: 250,
    payment: 'UPI',
    notes: 'This is a test order',
    status: 'New',
    type: 'ORDER'
  };

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  _ensureHeaders(sheet);

  sheet.appendRow([
    testOrder.timestamp, testOrder.id, testOrder.name, testOrder.phone,
    testOrder.email, testOrder.address, testOrder.city, testOrder.state,
    testOrder.pincode, testOrder.items, testOrder.subtotal, testOrder.payment,
    testOrder.notes, testOrder.status, testOrder.type, new Date().toISOString()
  ]);

  Logger.log('✓ Test order added to sheet: ' + testOrder.id);
}

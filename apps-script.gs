// ============================================================
// Detoxy Hijama — Google Apps Script
// Deploy as: Web App → Execute as: Me → Who has access: Anyone
// ============================================================

const SHEET_NAME = 'Orders';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // Parse the JSON body — sent as text/plain to avoid CORS preflight
    const body = JSON.parse(e.postData.contents);
    const action = body.action;

    let result;
    if      (action === 'placeOrder')  result = placeOrder(body);
    else if (action === 'getOrders')   result = getOrders();
    else if (action === 'updateOrder') result = updateOrder(body.id || body.orderNumber, body.updates);
    else result = { success: false, error: 'Unknown action: ' + action };

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Also handle GET for quick connection test
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: true, message: 'Detoxy Hijama API is live' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ── PLACE ORDER ────────────────────────────────────────────
function placeOrder(data) {
  const sheet = getOrCreateSheet();
  const headers = getHeaders(sheet);

  // Map flat payload to sheet columns
  const row = headers.map(h => {
    const map = {
      'Order Number':  data.orderNumber  || '',
      'Status':        data.status       || 'Pending',
      'Date':          data.createdAt    || new Date().toISOString(),
      'First Name':    data.firstName    || '',
      'Last Name':     data.lastName     || '',
      'Email':         data.email        || '',
      'Phone':         data.phone        || '',
      'Address 1':     data.address1     || '',
      'Address 2':     data.address2     || '',
      'City':          data.city         || '',
      'State':         data.state        || '',
      'Pincode':       data.pincode      || '',
      'Items':         data.itemsSummary || data.items || '',
      'Items JSON':    data.items        || '[]',
      'Subtotal':      data.subtotal     || 0,
      'Shipping':      data.shippingCost || 0,
      'COD Fee':       data.codFee       || 0,
      'Total':         data.total        || 0,
      'Payment':       data.payment      || '',
      'Notes':         data.notes        || '',
      'Carrier':       '',
      'AWB':           '',
      'Dispatched At': '',
      'Delivered At':  '',
    };
    return map[h] !== undefined ? map[h] : '';
  });

  sheet.appendRow(row);
  return { success: true, orderNumber: data.orderNumber };
}

// ── GET ORDERS ─────────────────────────────────────────────
function getOrders() {
  const sheet = getOrCreateSheet();
  const data   = sheet.getDataRange().getValues();
  // BUG FIX: Previously returned a plain array [], inconsistent with the
  // {success, ...} envelope returned by placeOrder and updateOrder.
  // Client code expecting result.success would silently fail.
  if (data.length < 2) return { success: true, orders: [] };

  const headers = data[0];
  const orders  = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i]; });
    // Normalise key names for the frontend
    return {
      orderNumber:   obj['Order Number'] || obj['orderNumber'] || '',
      status:        obj['Status']       || 'Pending',
      createdAt:     obj['Date']         || '',
      firstName:     obj['First Name']   || '',
      lastName:      obj['Last Name']    || '',
      email:         obj['Email']        || '',
      phone:         obj['Phone']        || '',
      address1:      obj['Address 1']    || '',
      address2:      obj['Address 2']    || '',
      city:          obj['City']         || '',
      state:         obj['State']        || '',
      pincode:       obj['Pincode']      || '',
      itemsSummary:  obj['Items']        || '',
      items:         obj['Items JSON']   || obj['Items'] || '',
      subtotal:      obj['Subtotal']     || 0,
      shippingCost:  obj['Shipping']     || 0,
      codFee:        obj['COD Fee']      || 0,
      total:         obj['Total']        || 0,
      payment:       obj['Payment']      || '',
      notes:         obj['Notes']        || '',
      carrier:       obj['Carrier']      || '',
      awb:           obj['AWB']          || '',
      dispatchedAt:  obj['Dispatched At']|| '',
      deliveredAt:   obj['Delivered At'] || '',
    };
  });

  return { success: true, orders: orders };
}

// ── UPDATE ORDER ───────────────────────────────────────────
function updateOrder(orderNumber, updates) {
  // BUG FIX: The caller may pass either body.id or body.orderNumber.
  // Accept whichever is provided.
  if (!orderNumber) return { success: false, error: 'No order number provided' };

  const sheet   = getOrCreateSheet();
  const data    = sheet.getDataRange().getValues();
  const headers = data[0];
  const colIdx  = {};
  headers.forEach((h, i) => { colIdx[h] = i; });

  const orderNumCol = colIdx['Order Number'];
  if (orderNumCol === undefined) return { success: false, error: 'Sheet missing "Order Number" column' };

  for (let r = 1; r < data.length; r++) {
    if (String(data[r][orderNumCol]) === String(orderNumber)) {
      // Map update keys to column headers
      const fieldMap = {
        status:       'Status',
        carrier:      'Carrier',
        awb:          'AWB',
        dispatchedAt: 'Dispatched At',
        deliveredAt:  'Delivered At',
        notes:        'Notes',
      };
      for (const [key, val] of Object.entries(updates || {})) {
        const col = fieldMap[key] ? colIdx[fieldMap[key]] : colIdx[key];
        if (col !== undefined) {
          sheet.getRange(r + 1, col + 1).setValue(val);
        }
      }
      return { success: true, updated: orderNumber };
    }
  }
  return { success: false, error: 'Order not found: ' + orderNumber };
}

// ── HELPERS ────────────────────────────────────────────────
function getOrCreateSheet() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let   sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Create header row
    const headers = [
      'Order Number','Status','Date',
      'First Name','Last Name','Email','Phone',
      'Address 1','Address 2','City','State','Pincode',
      'Items','Items JSON',
      'Subtotal','Shipping','COD Fee','Total',
      'Payment','Notes',
      'Carrier','AWB','Dispatched At','Delivered At'
    ];
    sheet.appendRow(headers);
    // Bold + freeze header
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#0b1f1c').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function getHeaders(sheet) {
  const firstRow = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  if (firstRow.every(h => h === '')) {
    // Empty sheet — create headers
    const headers = [
      'Order Number','Status','Date',
      'First Name','Last Name','Email','Phone',
      'Address 1','Address 2','City','State','Pincode',
      'Items','Items JSON',
      'Subtotal','Shipping','COD Fee','Total',
      'Payment','Notes',
      'Carrier','AWB','Dispatched At','Delivered At'
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    return headers;
  }
  return firstRow.filter(h => h !== '');
}

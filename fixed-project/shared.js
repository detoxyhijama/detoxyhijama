// Detoxy Hijama — Shared utilities & OrderSync
// All admin pages depend on this file.

const OrderSync = (() => {

  const STORAGE_KEY = "detoxy_orders";

  /** Return all orders from localStorage (array). */
  function getLocalOrders() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      console.error("OrderSync: failed to parse orders", e);
      return [];
    }
  }

  /** Save a full orders array to localStorage. */
  function saveLocalOrders(orders) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }

  /**
   * Add or update a single order in localStorage, then optionally
   * push it to Google Sheets if a URL is configured.
   */
  function submit(order) {
    const orders = getLocalOrders();
    const idx = orders.findIndex(o => o.id === order.id);
    if (idx >= 0) {
      orders[idx] = order;
    } else {
      orders.push(order);
    }
    saveLocalOrders(orders);

    // Async push to Google Sheets (silent fail if not configured)
    const url = (window.DETOXY_CONFIG || {}).sheetsUrl
              || localStorage.getItem("detoxy_sheets_url");
    if (url) {
      fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      }).catch(() => { /* silent */ });
    }

    return order;
  }

  /** Generate a unique order ID. */
  function generateId() {
    const now = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
    return "DH-" + now + rand;
  }

  /** Count orders by status. */
  function countByStatus(status) {
    return getLocalOrders().filter(o => (o.status || "New") === status).length;
  }

  /** Calculate total revenue (all non-cancelled orders). */
  function totalRevenue() {
    return getLocalOrders()
      .filter(o => o.status !== "Cancelled")
      .reduce((sum, o) => sum + parseFloat(o.subtotal || o.total || 0), 0);
  }

  return { getLocalOrders, saveLocalOrders, submit, generateId, countByStatus, totalRevenue };
})();

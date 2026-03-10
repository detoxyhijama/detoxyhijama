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
  // Seed products are defined here; admin can override via localStorage.
  products: []

};

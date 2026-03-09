# Detoxy Hijama Cups — Website Setup Guide

**Brand:** Detoxy Hijama Cups  
**Owner:** Mohamed Aasiq  
**WhatsApp:** +91-9566596077  
**Email:** detoxyhijamacups@gmail.com  
**Location:** Pollachi, Coimbatore, Tamil Nadu 642005  
**GitHub Pages:** https://detoxyhijama.github.io

---

## 📁 File Structure

```
detoxy/
├── index.html              ← Homepage
├── products.html           ← All 15 products listing
├── cart.html               ← Cart & Checkout
├── config.js               ← Shared config (set your Apps Script URL here)
├── shared.js               ← Cart utility / shared JS
├── Code.gs                 ← Google Apps Script backend
├── assets/
│   └── logo.png            ← Brand logo
├── products/               ← 15 individual product pages
│   ├── detoxy-hijama-standard-cups.html
│   ├── detoxy-hijama-premium-cups.html
│   ├── detoxy-hijama-fire-cupping-glass.html
│   └── ... (15 pages total)
├── blogs/                  ← Blog posts (5 pages)
│   ├── blog1-why-hijama.html
│   └── ...
├── admin/
│   └── index.html          ← Admin Panel
└── shipper/
    └── index.html          ← Shipper Panel
```

---

## 🚀 Step 1: Deploy Google Apps Script Backend

1. Go to [script.google.com](https://script.google.com) → **New Project**
2. Paste the contents of `Code.gs` (replaces the default `Code.gs`)
3. Click **Deploy → New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy** → Copy the **Web App URL**
   - It looks like: `https://script.google.com/macros/s/XXXXXXX/exec`

5. **Paste the URL** in two places:
   - `config.js` → replace `AKfycbzFt2178utJfKENXEurMTrzVQ7CuhMd_LNmdeB7xPc` in the URL
   - `admin/index.html` → replace `AKfycbzFt2178utJfKENXEurMTrzVQ7CuhMd_LNmdeB7xPc` in the `API_URL` const
   - `shipper/index.html` → replace `AKfycbzFt2178utJfKENXEurMTrzVQ7CuhMd_LNmdeB7xPc` in the `API_URL` const
   - `cart.html` → replace `AKfycbzFt2178utJfKENXEurMTrzVQ7CuhMd_LNmdeB7xPc`

6. On first run, open the Apps Script editor and run `bootstrapProducts()` to seed all 15 products into Google Sheets.

---

## 📊 Google Sheets Structure (auto-created)

The script automatically creates these sheets:
| Sheet | Purpose |
|-------|---------|
| Orders | All customer orders |
| Products | Product catalog |
| Customers | Customer database |
| Users | Admin & shipper accounts |
| Shipping | Shipment tracking |
| Billing | Revenue records |
| Settings | Site settings |
| Tokens | Auth tokens |

---

## 🌐 Step 2: Deploy to GitHub Pages

1. Create repo: `detoxyhijama.github.io` (must match this exact name for root domain)
2. Upload all files maintaining the folder structure shown above
3. Go to **Settings → Pages → Source: Deploy from branch → main → / (root)**
4. Site will be live at: `https://detoxyhijama.github.io`

### File Upload Order:
```bash
# Using git:
git init
git add .
git commit -m "Initial Detoxy Hijama website"
git remote add origin https://github.com/detoxyhijama/detoxyhijama.github.io.git
git push -u origin main
```

---

## 🔐 Login Credentials

### Admin Panel (`/admin/index.html`)
- **Email:** admin@detoxyhijama.com
- **Password:** Admin@2025Detoxy!
- **Access:** Full dashboard, orders, products, customers, shipping, billing, settings

### Shipper Panel (`/shipper/index.html`)
- **Email:** shipper@detoxyhijama.com
- **Password:** Ship@2025Detoxy!
- **Access:** Shipments assigned to shipper — dispatch & track

> ⚠️ Change passwords by editing the Users sheet in Google Sheets after first run.

---

## 🛒 How Orders Work

1. Customer adds products to cart on any page
2. Goes to `cart.html`, fills delivery details
3. Clicks **"Place Order (COD)"** → sends to Google Sheets via Apps Script
4. **OR** clicks **"Order via WhatsApp"** → opens WhatsApp with full order details

Admin receives order in the Orders sheet + email notification.

---

## 💬 WhatsApp & LinkedIn Integration

Every product has:
- **WhatsApp Order** button → opens pre-filled WA message
- **Bulk / Wholesale** button → opens WA with bulk query
- **LinkedIn** links in nav, footer, and hero

Business WhatsApp: +91-9566596077  
LinkedIn: https://www.linkedin.com/company/detoxy-hijama

---

## 📦 Products (15 total)

| ID | Product | Price | Bulk |
|----|---------|-------|------|
| PRD-001 | Standard Cup | ₹9/cup | ₹8 @5000+ |
| PRD-002 | Premium Cups | ₹12/cup | ₹10 @500+ |
| PRD-003 | Fire Glass Set 16 | ₹900/set | ₹800 @10+ |
| PRD-004 | Magnetic Kit 24 | ₹700/kit | ₹600 @10+ |
| PRD-005 | Silicone Facial 4pc | ₹250/set | ₹220 @20+ |
| PRD-006 | Silicone Facial 7pc | ₹600/set | ₹550 @10+ |
| PRD-007 | Moving Cups 4pc | ₹700/set | ₹650 @10+ |
| PRD-008 | Bamboo Set | ₹500/set | ₹450 @5+ |
| PRD-009 | Curve Cup | ₹12/cup | ₹10 @200+ |
| PRD-010 | Electric Smart Cup | ₹750/unit | ₹700 @10+ |
| PRD-011 | Suction Gun | ₹160/unit | ₹140 @20+ |
| PRD-012 | Lancet Pen | ₹550/unit | ₹500 @5+ |
| PRD-013 | Surgical Blade 100pk | ₹250/pack | ₹220 @10+ |
| PRD-014 | Latex Gloves 100pk | ₹320/box | ₹280 @10+ |
| PRD-015 | Surgical Cotton 400g | ₹160/roll | ₹140 @20+ |

---

## 🔧 Customization

### Update Google Sheets URL
In `config.js`:
```js
APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbzFt2178utJfKENXEurMTrzVQ7CuhMd_LNmdeB7xPc/exec',
```

### Update WhatsApp Number
In `config.js`:
```js
WHATSAPP_NUMBER: '919566596077',  // with country code, no +
```

### Change Admin Password
Edit the Users sheet in Google Sheets → change the password column for admin/shipper rows.

---

## 📱 Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Home | `/index.html` | Landing page with hero, products, social links |
| Products | `/products.html` | All 15 products grid with filters |
| Cart | `/cart.html` | Cart, checkout form, COD + WA order |
| Product Pages | `/products/*.html` | 15 individual SEO pages |
| Blog | `/blogs/*.html` | 5 hijama blog posts |
| Admin | `/admin/index.html` | Full admin panel |
| Shipper | `/shipper/index.html` | Shipper dispatch panel |

---

## 📞 Contact

**Mohamed Aasiq**  
Detoxy Hijama Cups, Pollachi, Coimbatore, Tamil Nadu 642005  
📞 +91-9566596077  
✉️ detoxyhijamacups@gmail.com  
🔗 https://www.linkedin.com/company/detoxy-hijama  
💬 https://wa.me/919566596077

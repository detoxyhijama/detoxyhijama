# Detoxy Hijama — E-Commerce Website

Production-quality e-commerce website for Detoxy Hijama. Runs with **zero hosting cost** using GitHub Pages + Google Sheets + Google Apps Script.

---

## Folder Structure

```
detoxy-hijama/
├── index.html              ← Homepage (hero, categories, featured, testimonials)
├── products.html           ← Product listing with filters & sort
├── cart.html               ← Shopping cart (localStorage)
├── checkout.html           ← Checkout form + COD / UPI / WhatsApp
├── confirmation.html       ← Order success page
├── login.html              ← Login / Register
├── quote.html              ← Bulk / wholesale quote form
├── contact.html            ← Contact page
├── sitemap.xml             ← SEO sitemap
├── robots.txt              ← Crawler rules
├── google-apps-script.gs  ← Backend API code (paste into Apps Script)
│
├── assets/
│   ├── style.css           ← Global brand styles + components
│   └── js/
│       └── shared.js       ← Products data, Cart, Header, Footer, Toast
│
├── products/               ← Individual product detail pages
│   ├── premium-cups.html
│   ├── electric-smart-cup.html
│   ├── fire-cupping-glass.html
│   ├── magnetic-vacuum-kit.html
│   ├── curve-cups.html
│   ├── lancet-pen.html
│   ├── latex-gloves.html
│   ├── bamboo-cupping-set.html
│   └── silicone-facial-4.html
│
└── admin/
    └── index.html          ← Admin dashboard (orders, products, settings)
```

---

## Step 1 — Deploy on GitHub Pages (Free)

1. Create a GitHub account at [github.com](https://github.com)
2. Create a new repository named **exactly**: `detoxyhijama.github.io`
   - Set visibility to **Public**
3. Upload all website files to the repository root
4. Go to **Settings → Pages → Source**: select `main` branch, `/ (root)`
5. Your site will be live at: `https://detoxyhijama.github.io`

---

## Step 2 — Set Up Google Sheets Database

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet
2. Name the spreadsheet: `Detoxy Hijama Orders`
3. The Apps Script will auto-create sheets — or create them manually:

**Sheet: Orders**
| order_id | name | phone | email | address | city | state | pincode | items | subtotal | shipping | total | payment | notes | status | date |

**Sheet: Products** *(optional — site uses hardcoded data by default)*
| id | title | description | price | mrp | category | categoryLabel | image | rating | reviews | stock | badge | shortDesc | features | specs |

**Sheet: Users**
| id | name | email | password_hash | phone | date |

---

## Step 3 — Deploy Google Apps Script API

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete the default code
3. Copy the entire contents of `google-apps-script.gs` and paste it
4. Click **Save** (Ctrl+S)
5. Click **Deploy → New Deployment**
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy** → **Authorize** → Copy the **Web App URL**

---

## Step 4 — Connect Frontend to API

1. Open the website at `https://detoxyhijama.github.io`
2. Go to `https://detoxyhijama.github.io/admin/`
3. Log in with password: `detoxy2024admin`
4. Go to **Settings** tab
5. Paste your Google Apps Script URL in the **Google Apps Script URL** field
6. Click **Save**

Orders will now automatically save to your Google Sheet.

---

## Step 5 — Change Admin Password

**Option A (recommended):** In the Admin panel → Settings → change password in the UI.

**Option B:** In `assets/js/shared.js`, find:
```js
var ADMIN_PASS = localStorage.getItem('dh_admin_pass') || 'detoxy2024admin';
```
Change `'detoxy2024admin'` to your new password.

---

## Adding / Editing Products

Products are defined in `assets/js/shared.js` in the `PRODUCTS` array.

To add a product:
1. Copy an existing product object
2. Give it a unique `id` and `slug`
3. Add a product image to `assets/images/products/your-product-id/main.jpg`
4. Create a product page: copy `products/product-template.html` → `products/your-slug.html`
5. Add the URL to `sitemap.xml`

---

## Brand Customization

All brand variables are in `assets/style.css` at the top:

```css
--t: #2aab97;          /* Primary teal */
--td: #0d6b5e;         /* Dark teal */
--dark: #1a3d35;       /* Deep green */
--cream: #f8f5f0;      /* Background */
```

---

## Admin Dashboard

URL: `/admin/`  
Default password: `detoxy2024admin`

Features:
- Live order list from Google Sheets
- Update order status (Pending → Confirmed → Dispatched → Delivered)
- Product inventory overview
- Google Sheets API configuration

---

## Performance Notes

- All images are lazy-loaded with `loading="lazy"`
- CSS and JS are single-file, no build step required
- Fonts loaded via Google Fonts with `preconnect`
- Cart stored in `localStorage` (no server needed)
- Total site size: under 100 KB (excluding product images)

---

## Payments

| Method | Details |
|---|---|
| Cash on Delivery | Default — enabled for orders under ₹5,000 |
| UPI / NEFT | Pay before dispatch — share UPI ID in WhatsApp |
| WhatsApp Order | Routes order details to your WhatsApp number |

For Razorpay/Stripe integration, add the payment gateway SDK and update `checkout.html`.

---

## Support

WhatsApp: [+91 95665 96077](https://wa.me/919566596077)  
Email: detoxyhijama@gmail.com

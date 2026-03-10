# Detoxy Hijama — E-Commerce Website

## 📁 Folder Structure

```
detoxy-ecommerce/
├── index.html              ← Homepage
├── products.html           ← All products listing
├── cart.html               ← Shopping cart
├── checkout.html           ← Checkout with full form
├── confirmation.html       ← Order success page
├── config.js               ← Products data + site config
├── shared.js               ← Shared UI components
├── assets/
│   ├── style.css           ← Global styles
│   ├── logo.png            ← Your logo (copy here)
│   └── images/
│       └── products/
│           ├── standard-cups/
│           │   └── main.jpg
│           ├── premium-cups/
│           │   └── main.jpg
│           ├── curve-cups/
│           │   └── main.jpg
│           ├── electric-smart-cup/
│           │   └── main.jpg
│           ├── fire-cupping-glass/
│           │   └── main.jpg
│           ├── magnetic-vacuum-kit/
│           │   └── main.jpg
│           ├── suction-gun/
│           │   └── main.jpg
│           ├── lancet-pen/
│           │   └── main.jpg
│           ├── surgical-blade/
│           │   └── main.jpg
│           ├── latex-gloves/
│           │   └── main.jpg
│           ├── surgical-cotton/
│           │   └── main.jpg
│           ├── bamboo-cupping-set/
│           │   └── main.jpg
│           ├── silicone-facial-4/
│           │   └── main.jpg
│           ├── silicone-facial-7/
│           │   └── main.jpg
│           └── silicone-moving-cups/
│               └── main.jpg
├── products/               ← Individual product pages (auto-generated)
│   ├── standard-cups.html
│   ├── premium-cups.html
│   └── ... (15 files total)
└── admin/
    └── index.html          ← Admin orders dashboard
```

## 🖼️ Adding Product Images

When you upload your product images zip, place the images like this:

- `assets/images/products/standard-cups/main.jpg`
- `assets/images/products/premium-cups/main.jpg`
- `assets/images/products/electric-smart-cup/main.jpg`
- etc.

**Important:** The folder name must match exactly. If your zip has images with different names, just rename the folder to match the product ID above.

## ⚙️ Configuration

Edit `config.js` to update:
- `SITE.APPS_SCRIPT_URL` — your Google Apps Script URL for order saving
- `SITE.EMAIL`, `SITE.PHONE` — contact details
- `SITE.FREE_SHIPPING_ABOVE` — free shipping threshold (default ₹999)
- Product prices, descriptions, features

## 🔑 Admin Panel

URL: `/admin/index.html`
Default password: `detoxy2025`

Change the password by editing `admin/index.html` — find `const ADMIN_PASS = 'detoxy2025'` and update it.

## 🚀 Deployment

This is a static HTML website. Deploy on:
- **GitHub Pages** (free) — just push to a repo
- **Netlify** (free) — drag and drop the folder
- **Any web hosting** with static file support

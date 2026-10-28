# Glory Garments — website prototype

A visual demonstration of the Glory Garments storefront. **Not a live shop:** no backend, payments, accounts or data collection. Checkout shows "Prototype — purchases are not available" and the waitlist form sends and stores nothing. Accessories in "The rest of the armour" are concept pieces, not confirmed inventory.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to dist/
```

## Deploy

- **Vercel:** import the folder or repo. `vercel.json` sets build `npm run build`, output `dist`.
- **Netlify:** drag the folder in or connect the repo. `netlify.toml` is already configured.

## Assets (`/public/assets`)

Every image is referenced by path in `src/data.js`. Replace a file with the same name and the site picks it up. Missing files render a designed placeholder that shows the expected path.

| Path | Used for | Source |
| --- | --- | --- |
| `brand/glory-garments-logo-silver.png` | Footer logo | Pitch deck p.14 (transparent) |
| `brand/glory-garments-monogram-silver.png` | Header mark, favicon | Cropped from p.14 |
| `campaign/hero-worship-back-bw.jpg` | Homepage hero | Supplied B&W photograph (2× Lanczos upscale) |
| `campaign/model-front-oversized-hoodie.jpg` | Breastplate card, Core Hoodie gallery | Deck p.10/12, deck text removed |
| `campaign/model-back-chamados-hoodie.jpg` | Chamados Hoodie gallery | Deck p.10/12 |
| `campaign/profile-hood-detail.jpg` | Story detail strip | Deck p.10/12 |
| `campaign/detail-chest-embroidery.jpg` | Story strip, product galleries | Deck p.10/12 |
| `campaign/detail-cargo-star.jpg` | Story strip | Deck p.10/12 |
| `campaign/sleeve-trends-fade-truth-remains.jpg` | Our Story | Deck p.13 |
| `products/hoodie-chamados-back.jpg` | Chamados Hoodie | Deck flat-lay (low-res crop) |
| `products/hoodie-core-front.jpg` | Glory Core Hoodie | Deck flat-lay (low-res crop) |
| `products/tee-chamados-back.jpg` | Chamados Tee | Deck flat-lay (low-res crop) |
| `products/tee-core-front.jpg` | Glory Core Tee | Deck flat-lay (low-res crop) |
| `products/cap-star.jpg` | Helmet of Salvation card | Deck flat-lay (low-res crop) |
| `collection/belt-of-truth-waist-bag.jpg` | Belt of Truth card, Waist Bag concept | Accessories collage, 4:5 |
| `collection/belt-of-truth-utility-belt.jpg` | Utility Belt concept | Accessories collage, 4:5 |
| `collection/belt-of-truth-leather-belt.jpg` | Leather Belt concept | Accessories collage, 4:5 |
| `collection/shoes-of-peace-sneakers.jpg` | Shoes of the Gospel of Peace card, Sneaker concept | Accessories collage, 4:5 |
| `collection/shield-of-faith-backpack.jpg` | Shield of Faith card, Backpack concept | Accessories collage, 4:5 |
| `collection/sword-of-the-spirit-jewellery.jpg` | Sword of the Spirit card, Jewellery Set concept | Accessories collage, 4:5 |

Unused but kept: `campaign/detail-sneakers-hem.jpg`, `products/cargo-pants.jpg`.

Collage tiles were cut above their captions and extended to 4:5 with a blurred continuation of their own backdrop, so no product is cropped.

Recommended sizes: hero/campaign shots 1600px+ on the long edge, product flat-lays 1600×2000 (4:5) on a plain dark backdrop, logo as transparent PNG or SVG.

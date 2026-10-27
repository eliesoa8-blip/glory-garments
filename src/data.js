// All image paths resolve against /public/assets. Swap files in place to update the site.
export const asset = (path) => `${import.meta.env.BASE_URL}assets/${path}`;

export const IMAGES = {
  logo: 'brand/glory-garments-logo-silver.png',
  monogram: 'brand/glory-garments-monogram-silver.png',
  heroFront: 'campaign/model-front-oversized-hoodie.jpg',
  heroBack: 'campaign/model-back-chamados-hoodie.jpg',
  profile: 'campaign/profile-hood-detail.jpg',
  chest: 'campaign/detail-chest-embroidery.jpg',
  cargo: 'campaign/detail-cargo-star.jpg',
  sneakers: 'campaign/detail-sneakers-hem.jpg',
  sleeve: 'campaign/sleeve-trends-fade-truth-remains.jpg',
};

export const ARMOR = [
  {
    id: 'helmet',
    name: 'Helmet of Salvation',
    category: 'Caps & beanies',
    verse: 'Ephesians 6:17',
    image: 'products/cap-star.jpg',
    position: 'center 55%',
    live: false,
  },
  {
    id: 'breastplate',
    name: 'Breastplate of Righteousness',
    category: 'Hoodies & tees',
    verse: 'Ephesians 6:14',
    image: 'campaign/model-front-oversized-hoodie.jpg',
    position: 'center 30%',
    live: true,
  },
  {
    id: 'belt',
    name: 'Belt of Truth',
    category: 'Belt bags',
    verse: 'Ephesians 6:14',
    image: 'collection/belt-of-truth-belt-bag.jpg',
    live: false,
  },
  {
    id: 'shield',
    name: 'Shield of Faith',
    category: 'Backpacks',
    verse: 'Ephesians 6:16',
    image: 'collection/shield-of-faith-backpack.jpg',
    live: false,
  },
  {
    id: 'shoes',
    name: 'Shoes of the Gospel of Peace',
    category: 'Sneakers',
    verse: 'Ephesians 6:15',
    image: 'campaign/detail-sneakers-hem.jpg',
    position: 'center 70%',
    live: false,
  },
  {
    id: 'sword',
    name: 'Sword of the Spirit',
    category: 'Jewellery',
    verse: 'Ephesians 6:17',
    image: 'collection/sword-of-the-spirit-jewellery.jpg',
    live: false,
  },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export const PRODUCTS = [
  {
    id: 'chamados-hoodie',
    name: 'Chamados Heavyweight Hoodie',
    type: 'Hoodie',
    colour: 'Washed cocoa',
    price: 75,
    verse: '1 John 3:1',
    blurb:
      'Our signature back print. The Portuguese reads "que fôssemos chamados filhos de Deus": that we should be called children of God. Cut wide through the body with a deep hood and dropped shoulders.',
    images: ['products/hoodie-chamados-back.jpg', 'campaign/model-back-chamados-hoodie.jpg', 'products/hoodie-core-front.jpg'],
    details: ['400 GSM heavyweight brushed cotton', 'Oversized, drop-shoulder fit', 'Screen-printed back graphic', 'Embroidered chest wordmark'],
  },
  {
    id: 'core-hoodie',
    name: 'Glory Core Hoodie',
    type: 'Hoodie',
    colour: 'Washed cocoa',
    price: 65,
    verse: 'Ephesians 6:14',
    blurb:
      'The everyday piece of the Breastplate drop. A clean tonal wordmark at the chest and a weight that holds its shape wash after wash.',
    images: ['products/hoodie-core-front.jpg', 'campaign/model-front-oversized-hoodie.jpg', 'campaign/detail-chest-embroidery.jpg'],
    details: ['400 GSM heavyweight brushed cotton', 'Oversized, drop-shoulder fit', 'Embroidered chest wordmark', 'Kangaroo pocket, ribbed cuffs'],
  },
  {
    id: 'chamados-tee',
    name: 'Chamados Oversized Tee',
    type: 'T-shirt',
    colour: 'Washed cocoa',
    price: 40,
    verse: '1 John 3:1',
    blurb:
      'The Chamados mountain graphic on a boxy heavyweight tee. Called, not just covered.',
    images: ['products/tee-chamados-back.jpg', 'products/tee-core-front.jpg'],
    details: ['Heavyweight cotton jersey', 'Boxy oversized fit', 'Screen-printed back graphic', 'Chest wordmark'],
  },
  {
    id: 'core-tee',
    name: 'Glory Core Tee',
    type: 'T-shirt',
    colour: 'Washed cocoa',
    price: 35,
    verse: 'Ephesians 6:14',
    blurb: 'A quiet essential with the Glory Garments wordmark. Layers under the hoodies or stands on its own.',
    images: ['products/tee-core-front.jpg', 'campaign/detail-chest-embroidery.jpg'],
    details: ['Heavyweight cotton jersey', 'Boxy oversized fit', 'Tonal chest wordmark', 'Garment-washed finish'],
  },
];

export const formatPrice = (n) => `£${n.toFixed(2).replace(/\.00$/, '')}`;

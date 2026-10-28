import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, Menu, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { ARMOR, CONCEPTS, IMAGES, PRODUCTS, asset, formatPrice } from './data.js';

/* ---------- Shared pieces ---------- */

// Image with a designed fallback, so missing assets never show a broken icon.
function Media({ src, alt, className = '', position, eager = false }) {
  const [failed, setFailed] = useState(!src);
  useEffect(() => setFailed(!src), [src]);
  if (failed) {
    return (
      <div className={`media media--placeholder ${className}`} role="img" aria-label={alt}>
        <span className="ph-mark" aria-hidden="true">GG</span>
        <span className="ph-label">Image to come</span>
        <span className="ph-path">/public/assets/{src}</span>
      </div>
    );
  }
  return (
    <img
      className={`media ${className}`}
      src={asset(src)}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      style={position ? { objectPosition: position } : undefined}
      onError={() => setFailed(true)}
    />
  );
}

function Logo({ onClick }) {
  const [hasMark, setHasMark] = useState(true);
  return (
    <a href="#home" className="logo" onClick={onClick} aria-label="Glory Garments, back to top">
      {hasMark && (
        <img src={asset(IMAGES.monogram)} alt="" className="logo-mark" onError={() => setHasMark(false)} />
      )}
      <span className="logo-type">
        <span className="logo-word">GLORY</span>
        <span className="logo-sub">GARMENTS</span>
      </span>
    </a>
  );
}

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function useEscape(active, handler) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === 'Escape' && handler();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, handler]);
}

/* ---------- Header ---------- */

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'collection', label: 'Collection' },
  { id: 'story', label: 'Our Story' },
];

function Header({ cartCount, onCart }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 40);
      const y = window.scrollY + window.innerHeight * 0.35;
      let current = 'home';
      for (const id of ['collection', 'drop', 'concepts', 'story', 'waitlist']) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      const map = { drop: 'collection', concepts: 'collection', waitlist: 'story' };
      setActive(map[current] || current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useScrollLock(open);
  useEscape(open, () => setOpen(false));

  const go = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <header className={`header ${solid || open ? 'header--solid' : ''}`}>
        <div className="header-inner">
          <Logo onClick={go('home')} />
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className={active === n.id ? 'is-active' : ''}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="header-actions">
            <button className="icon-btn cart-btn" onClick={onCart} aria-label={`Open bag, ${cartCount} items`}>
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>
            <button
              className="icon-btn menu-btn"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} tabIndex={open ? 0 : -1}>
              {n.label}
            </a>
          ))}
          <a href="#waitlist" onClick={go('waitlist')} tabIndex={open ? 0 : -1}>
            Waitlist
          </a>
        </nav>
        <p className="mobile-menu-foot">Fully armored. Fully you.</p>
      </div>
    </>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-media">
        <Media
          src={IMAGES.hero}
          alt="A man in a black Glory Garments tee stands with his back to the camera during worship"
          eager
          className="hero-photo"
        />
        <div className="hero-shade" />
      </div>
      <div className="hero-content">
        <p className="eyebrow eyebrow--light hero-anim" style={{ '--d': '0ms' }}>
          Drop 01 · The Breastplate of Righteousness
        </p>
        <h1 className="hero-title hero-anim" style={{ '--d': '90ms' }}>
          The Armor
          <br /> of God,
          <br /> Reimagined.
        </h1>
        <p className="hero-sub hero-anim" style={{ '--d': '180ms' }}>
          Wear who you are. Faith in every thread.
        </p>
        <a
          href="#collection"
          className="btn btn--light hero-anim"
          style={{ '--d': '260ms' }}
          onClick={(e) => {
            e.preventDefault();
            scrollToId('collection');
          }}
        >
          Shop the collection <ArrowRight size={18} strokeWidth={1.5} />
        </a>
      </div>
      <p className="hero-verse" aria-hidden="true">
        EPH 6:11
      </p>
    </section>
  );
}

/* ---------- Collection ---------- */

function Collection() {
  return (
    <section id="collection" className="section collection">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Ephesians 6:13–17</p>
            <h2 className="display">The Armor of God</h2>
          </div>
          <p className="section-intro">
            Six pieces of armour, six categories. Each one starts from Scripture and is cut for the street. We launch with
            the Breastplate and release the rest in phases.
          </p>
        </div>
        <div className="armor-grid">
          {ARMOR.map((a) => (
            <button
              key={a.id}
              className={`armor-card ${a.live ? 'is-live' : ''}`}
              onClick={() => scrollToId(a.target)}
            >
              <div className="armor-img">
                <Media src={a.image} alt={`${a.name}: ${a.category}`} position={a.position} />
                <span className={`tag ${a.live ? 'tag--live' : ''} ${a.status === 'Concept' ? 'tag--concept' : ''}`}>
                  {a.status}
                </span>
              </div>
              <div className="armor-meta">
                <div>
                  <h3>{a.name}</h3>
                  <p className="armor-cat">{a.category}</p>
                </div>
                <span className="verse">{a.verse}</span>
              </div>
              <span className="armor-cta">
                {a.cta} <ArrowUpRight size={16} strokeWidth={1.5} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Drop 01 ---------- */

function ProductCard({ product, onOpen }) {
  return (
    <article className="product-card">
      <button className="product-img" onClick={() => onOpen(product)} aria-label={`View ${product.name}`}>
        <Media src={product.images[0]} alt={product.name} />
        {product.images[1] && <Media src={product.images[1]} alt="" className="product-img-alt" position="center 25%" />}
        {product.concept && <span className="tag tag--concept">Concept</span>}
        <span className="quick-view">Quick view</span>
      </button>
      <div className="product-meta">
        <div>
          <h3>
            <button className="link-reset" onClick={() => onOpen(product)}>
              {product.name}
            </button>
          </h3>
          <p className="product-sub">
            {product.type} · {product.colour}
          </p>
        </div>
        <p className="price">
          {formatPrice(product.price)}
          <span className="price-note">Sample</span>
        </p>
      </div>
    </article>
  );
}

function Drop({ onOpen }) {
  return (
    <section id="drop" className="section drop">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow eyebrow--gold">Drop 01 · Ephesians 6:14</p>
            {/* --fit: width of the longest word ("RIGHTEOUSNESS") in ems, so the heading shrinks before it can overflow */}
            <h2 className="display display--light display--fit" style={{ '--fit': 12 }}>
              The Breastplate of Righteousness
            </h2>
          </div>
          <p className="section-intro section-intro--light">
            Hoodies and tees in 400 GSM heavyweight cotton, cut oversized. The first piece of the armour, and the one you
            wear closest to the heart.
          </p>
        </div>
        <p className="price-disclaimer">Prices are illustrative samples for this prototype.</p>
        <div className="product-grid">
          {PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Concept accessories ---------- */

function Concepts({ onOpen }) {
  return (
    <section id="concepts" className="section concepts">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Phase 2 and beyond · Concepts</p>
            <h2 className="display display--fit" style={{ '--fit': 10 }}>
              The rest of the armour
            </h2>
          </div>
          <p className="section-intro">
            Early concepts for the Belt of Truth, Shoes of the Gospel of Peace, Shield of Faith and Sword of the Spirit.
            These pieces are illustrative and not confirmed inventory.
          </p>
        </div>
        <p className="price-disclaimer price-disclaimer--dark">Concept pieces · prices are illustrative samples</p>
        <div className="product-grid product-grid--concepts">
          {CONCEPTS.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Product modal ---------- */

function ProductModal({ product, onClose, onAdd }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [size, setSize] = useState(null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    setImgIndex(0);
    setSize(product?.sizes?.length === 1 ? product.sizes[0] : null);
    setError(false);
    setAdded(false);
    if (product) setTimeout(() => closeRef.current?.focus(), 30);
  }, [product]);

  useScrollLock(!!product);
  useEscape(!!product, onClose);

  if (!product) return null;

  const add = () => {
    if (!size) {
      setError(true);
      return;
    }
    onAdd(product, size);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="overlay overlay--center" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button ref={closeRef} className="icon-btn modal-close" onClick={onClose} aria-label="Close product details">
          <X size={22} strokeWidth={1.5} />
        </button>
        <div className="modal-gallery">
          <div className="modal-main">
            <Media key={product.images[imgIndex]} src={product.images[imgIndex]} alt={product.name} position="center 25%" />
          </div>
          {product.images.length > 1 && (
            <div className="thumbs">
              {product.images.map((src, i) => (
                <button
                  key={src}
                  className={`thumb ${i === imgIndex ? 'is-active' : ''}`}
                  onClick={() => setImgIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                >
                  <Media src={src} alt="" position="center 25%" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="modal-info">
          <p className="eyebrow">
            {product.collection} · {product.verse}
          </p>
          <h2 id="modal-title" className="modal-title">
            {product.name}
          </h2>
          <p className="modal-price">
            {formatPrice(product.price)} <span className="price-note">Illustrative price</span>
          </p>
          {product.concept && (
            <p className="concept-note">Concept piece. Shown for illustration and not confirmed inventory.</p>
          )}
          <p className="modal-blurb">{product.blurb}</p>

          <div className="field">
            <div className="field-label">
              <span>Size</span>
              <span className="muted">{product.sizeNote}</span>
            </div>
            <div
              className={`sizes ${product.sizes.length === 1 ? 'sizes--single' : ''}`}
              role="radiogroup"
              aria-label="Size"
            >
              {product.sizes.map((s) => (
                <button
                  key={s}
                  role="radio"
                  aria-checked={size === s}
                  className={`size ${size === s ? 'is-selected' : ''}`}
                  onClick={() => {
                    setSize(s);
                    setError(false);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            {error && <p className="field-error">Choose a size to add this to your bag.</p>}
          </div>

          <button className="btn btn--burgundy btn--block" onClick={add}>
            {added ? (
              <>
                <Check size={18} strokeWidth={1.75} /> Added to bag
              </>
            ) : (
              <>Add to bag · {formatPrice(product.price)}</>
            )}
          </button>
          <p className="demo-note">Demo bag only. Nothing is reserved or charged.</p>

          <ul className="details">
            <li>
              <span>Colour</span>
              {product.colour}
            </li>
            {product.details.map((d) => (
              <li key={d}>
                <Check size={14} strokeWidth={1.75} /> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------- Cart drawer ---------- */

function CartDrawer({ open, items, onClose, onQty, onRemove }) {
  const [notice, setNotice] = useState(false);
  useScrollLock(open);
  useEscape(open, onClose);
  useEffect(() => {
    if (!open) setNotice(false);
  }, [open]);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className={`overlay overlay--drawer ${open ? 'is-open' : ''}`} onMouseDown={(e) => e.target === e.currentTarget && onClose()} aria-hidden={!open}>
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your bag">
        <div className="drawer-head">
          <h2>
            Your bag <span className="muted">({count})</span>
          </h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close bag" tabIndex={open ? 0 : -1}>
            <X size={22} strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <ShoppingBag size={32} strokeWidth={1} />
            <p>Your bag is empty.</p>
            <button
              className="btn btn--dark"
              tabIndex={open ? 0 : -1}
              onClick={() => {
                onClose();
                scrollToId('drop');
              }}
            >
              Shop Drop 01
            </button>
          </div>
        ) : (
          <>
            <ul className="drawer-items">
              {items.map((item) => (
                <li key={item.key} className="line">
                  <div className="line-img">
                    <Media src={item.product.images[0]} alt="" />
                  </div>
                  <div className="line-body">
                    <div className="line-top">
                      <div>
                        <p className="line-name">{item.product.name}</p>
                        <p className="muted">
                          {item.size === 'One size' ? 'One size' : `Size ${item.size}`} · {item.product.colour}
                        </p>
                      </div>
                      <p className="line-price">{formatPrice(item.product.price * item.qty)}</p>
                    </div>
                    <div className="line-actions">
                      <div className="qty" aria-label="Quantity">
                        <button onClick={() => onQty(item.key, -1)} aria-label="Decrease quantity" tabIndex={open ? 0 : -1}>
                          <Minus size={14} />
                        </button>
                        <span aria-live="polite">{item.qty}</span>
                        <button onClick={() => onQty(item.key, 1)} aria-label="Increase quantity" tabIndex={open ? 0 : -1}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button className="remove" onClick={() => onRemove(item.key)} tabIndex={open ? 0 : -1}>
                        <Trash2 size={14} strokeWidth={1.5} /> Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <div className="subtotal">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <p className="muted small">Illustrative prices. Shipping and taxes would be calculated at checkout.</p>
              {notice && (
                <p className="checkout-notice" role="status">
                  Prototype — purchases are not available.
                </p>
              )}
              <button className="btn btn--burgundy btn--block" onClick={() => setNotice(true)} tabIndex={open ? 0 : -1}>
                Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* ---------- Story ---------- */

function Story() {
  return (
    <section id="story" className="section story">
      <div className="wrap story-grid">
        <div className="story-image">
          <Media src={IMAGES.sleeve} alt="Sleeve print on a black Glory Garments hoodie" />
        </div>
        <div className="story-text">
          <p className="eyebrow">Our Story</p>
          <h2 className="display">
            Fully armored.
            <br /> Fully you.
          </h2>
          <p className="lead">
            Glory Garments is for UK Christians in their twenties who refuse to choose between who they are and what they
            wear. We build streetwear piece by piece from the armour of God, so you can come as you are and leave fully
            armored.
          </p>
          <p className="serif-line">More than clothes. It's a calling.</p>
          <ul className="pillars">
            <li>
              <span className="pillar-num">Ephesians 6</span>
              <h3>Scripture-backed</h3>
              <p>Every product follows the blueprint of the armour, and every design starts from a verse.</p>
            </li>
            <li>
              <span className="pillar-num">400 GSM</span>
              <h3>Heavyweight cotton</h3>
              <p>Dense, soft-brushed cotton with real structure, made to outlast the season it drops in.</p>
            </li>
            <li>
              <span className="pillar-num">Oversized</span>
              <h3>Streetwear fits</h3>
              <p>Dropped shoulders, wide bodies and boxy tees. Streetwear first, shaped by feedback from our community.</p>
            </li>
          </ul>
          <div className="story-details">
            <Media src={IMAGES.chest} alt="Embroidered Glory Garments wordmark on the hoodie" />
            <Media src={IMAGES.cargo} alt="Star embroidery on the cargo trousers" />
            <Media src={IMAGES.profile} alt="Model in profile wearing the hood up" position="center 30%" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Waitlist (demo only) ---------- */

function Waitlist() {
  const [value, setValue] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setValue('');
    setDone(true);
  };

  return (
    <section id="waitlist" className="section waitlist">
      <div className="wrap waitlist-grid">
        <div>
          <p className="eyebrow eyebrow--gold">The first 500</p>
          <h2 className="display display--light">Join the waitlist</h2>
          <p className="section-intro section-intro--light">
            When the waitlist reaches 500 sign-ups, everyone on it is invited to a pop-up in London to try the drop and
            meet the community.
          </p>
        </div>
        <div className="waitlist-panel">
          <span className="demo-badge">Demo only · no data is collected</span>
          <form className="waitlist-form" onSubmit={submit} noValidate>
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              placeholder="Email address (demo)"
              value={value}
              autoComplete="off"
              onChange={(e) => {
                setValue(e.target.value);
                setDone(false);
              }}
            />
            <button type="submit" className="btn btn--light">
              Join <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </form>
          <p className="waitlist-msg" role="status">
            {done
              ? 'This is a prototype. Nothing was sent or saved, and the field has been cleared.'
              : 'In this prototype the form does not send or store anything.'}
          </p>
          <dl className="facts">
            <div>
              <dt>500</dt>
              <dd>Sign-up target</dd>
            </div>
            <div>
              <dt>London</dt>
              <dd>Waitlist pop-up</dd>
            </div>
            <div>
              <dt>Drop 01</dt>
              <dd>Hoodies &amp; tees</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  const [hasLogo, setHasLogo] = useState(true);
  const go = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            {hasLogo ? (
              <img src={asset(IMAGES.logo)} alt="Glory Garments" className="footer-logo" onError={() => setHasLogo(false)} />
            ) : (
              <span className="logo-type logo-type--lg">
                <span className="logo-word">GLORY</span>
                <span className="logo-sub">GARMENTS</span>
              </span>
            )}
          </div>
          <blockquote className="footer-verse">
            <p>“Put on the whole armour of God, that ye may be able to stand against the wiles of the devil.”</p>
            <cite>Ephesians 6:11</cite>
          </blockquote>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Shop</h4>
            <a href="#drop" onClick={go('drop')}>Drop 01</a>
            <a href="#collection" onClick={go('collection')}>The Armor of God</a>
            <a href="#waitlist" onClick={go('waitlist')}>Waitlist</a>
          </div>
          <div>
            <h4>Brand</h4>
            <a href="#story" onClick={go('story')}>Our Story</a>
            <a href="#home" onClick={go('home')}>Home</a>
          </div>
          <div>
            <h4>Follow</h4>
            <span>Instagram</span>
            <span>TikTok</span>
          </div>
          <div>
            <h4>Prototype</h4>
            <span>Demonstration site only</span>
            <span>No purchases or data collection</span>
          </div>
        </div>
        <div className="footer-base">
          <span>© 2026 Glory Garments · United Kingdom</span>
          <span>Fully armored. Fully you.</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Toast ---------- */

function Toast({ message }) {
  return (
    <div className={`toast ${message ? 'is-visible' : ''}`} role="status" aria-live="polite">
      {message && (
        <>
          <Check size={16} strokeWidth={1.75} /> {message}
        </>
      )}
    </div>
  );
}

/* ---------- App ---------- */

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [toast, setToast] = useState('');
  const toastTimer = useRef(null);

  const count = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const addToCart = useCallback((p, size) => {
    const key = `${p.id}-${size}`;
    setCart((c) => {
      const found = c.find((i) => i.key === key);
      if (found) return c.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i));
      return [...c, { key, product: p, size, qty: 1 }];
    });
    setToast(`${p.name}${size === 'One size' ? '' : `, size ${size}`}, added to your bag`);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 2600);
  }, []);

  const changeQty = (key, d) =>
    setCart((c) => c.map((i) => (i.key === key ? { ...i, qty: Math.max(1, i.qty + d) } : i)));
  const remove = (key) => setCart((c) => c.filter((i) => i.key !== key));
  const closeModal = useCallback(() => setProduct(null), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  return (
    <>
      <div className="proto-pill" aria-hidden="true">Prototype · sample prices</div>
      <Header cartCount={count} onCart={() => setCartOpen(true)} />
      <main>
        <Hero />
        <Collection />
        <Drop onOpen={setProduct} />
        <Concepts onOpen={setProduct} />
        <Story />
        <Waitlist />
      </main>
      <Footer />
      <ProductModal product={product} onClose={closeModal} onAdd={addToCart} />
      <CartDrawer open={cartOpen} items={cart} onClose={closeCart} onQty={changeQty} onRemove={remove} />
      <Toast message={toast} />
    </>
  );
}

import React, { useEffect, useMemo, useRef, useState } from 'react';
import ProductItem from '../components/ProductItem';
import useProducts from '../hooks/useProducts';

const CATEGORY_MAP = [
  { label: 'All', value: 'all' },
  { label: 'Fragrance', value: 'fragrances' },
  { label: 'Beauty', value: 'beauty' },
  { label: 'Furniture', value: 'furniture' },
  { label: 'Groceries', value: 'groceries' }
];

const ProductList = () => {
  const { data: products, loading, error, refetch } = useProducts();

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);

  // Filter logic
  const filtered = useMemo(() => {
    let list = products;

    if (category !== 'all') {
      list = list.filter(p => String(p.category).toLowerCase() === category);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, query, category]);

  const newArrivals = useMemo(() => products.slice(0, 8), [products]);
  const hotSelling = useMemo(() => {
    const copy = [...products];
    copy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return copy.slice(0, 8);
  }, [products]);

  const onCategoryClick = (value) => {
    setCategory(value);
    setPanelOpen(value !== 'all');
  };

  useEffect(() => {
    if (panelOpen && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [panelOpen]);

  const clearCategory = () => {
    setCategory('all');
    setPanelOpen(false);
  };

  const showHomeSections =
    !loading && !error && products.length > 0 && !query && !panelOpen && category === 'all';

  return (
    <main className="container">
      {/* HERO */}
      <section className="hero">
        <div className="hero__content">
          <p className="hero__eyebrow">Welcome to ShoppyGlobe</p>
          <h1 className="hero__title">Discover. Love. Repeat.</h1>
          <p className="hero__tagline">
            Handpicked products from trusted brands — fragrance, beauty, furniture, groceries & more.
          </p>
          <div className="hero__actions">
            <a href="#catalog" className="btn">Shop Now</a>
            <a href="#hot" className="btn-link">See What’s Hot</a>
          </div>
        </div>
        <div className="hero__art" aria-hidden>
          <div className="hero__shape hero__shape--a"></div>
          <div className="hero__shape hero__shape--b"></div>
          <div className="hero__shape hero__shape--c"></div>
        </div>
      </section>

      {/* PAGE HEAD */}
      <div id="catalog" className="page-head">
        <h2 className="page-head__title">Products</h2>
        <div className="search-box">
          <label className="visually-hidden" htmlFor="search">Search products</label>
          <input
            id="search"
            type="search"
            placeholder="Search by name, description, brand, or category..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* CATEGORY PILLS */}
      <div className="pillbar" role="tablist" aria-label="Category filter">
        {CATEGORY_MAP.map(c => (
          <button
            key={c.value}
            role="tab"
            aria-selected={category === c.value}
            className={`pill ${category === c.value ? 'pill--active' : ''}`}
            onClick={() => onCategoryClick(c.value)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* CATEGORY PANEL */}
      {panelOpen && (
        <section ref={panelRef} className="category-panel is-open">
          <div className="category-panel__head">
            <h3 className="category-panel__title">
              {category !== 'all' ? CATEGORY_MAP.find(c => c.value === category)?.label : 'All'}
            </h3>
            <div className="category-panel__actions">
              {category !== 'all' && (
                <button className="btn-link" onClick={clearCategory}>Clear</button>
              )}
              <button
                className="btn"
                onClick={() => setPanelOpen(false)}
                aria-expanded={panelOpen}
              >
                Hide
              </button>
            </div>
          </div>
          <div className="category-panel__body">
            <div className="row-scroll">
              {(filtered.length ? filtered : products).slice(0, 10).map(p => (
                <div className="row-scroll__item" key={`cat-${p.id}`}>
                  <ProductItem product={p} />
                </div>
              ))}
            </div>
            <p className="category-panel__hint">
              Scroll down to see all products in this category.
            </p>
          </div>
        </section>
      )}

      {/* ERROR / LOADING */}
      {error && (
        <div className="notice notice--error">
          <p>Could not load products. {error}</p>
          <button className="btn" onClick={refetch}>Retry</button>
        </div>
      )}
      {loading && <p>Loading products...</p>}

      {/* MAIN GRID */}
      {!loading && !error && (
        <section className="grid">
          {filtered.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
          {filtered.length === 0 && <p>No products match your search.</p>}
        </section>
      )}

      {/* HOME SECTIONS */}
      {showHomeSections && (
        <>
          <section className="section" id="new">
            <div className="section__head">
              <h2>New Arrivals</h2>
            </div>
            <div className="row-scroll">
              {newArrivals.map(p => (
                <div className="row-scroll__item" key={`new-${p.id}`}>
                  <ProductItem product={p} />
                </div>
              ))}
            </div>
          </section>

          <section className="section" id="hot">
            <div className="section__head">
              <h2>Hot Selling</h2>
            </div>
            <div className="row-scroll">
              {hotSelling.map(p => (
                <div className="row-scroll__item" key={`hot-${p.id}`}>
                  <ProductItem product={p} />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default ProductList;

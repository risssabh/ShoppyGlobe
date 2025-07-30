import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import RatingStars from '../components/RatingStars';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDetail() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://dummyjson.com/products/${id}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch product #${id}: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Unknown error while fetching product');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
    return () => controller.abort();
  }, [id]);

  const onAdd = () => data && dispatch(addToCart(data));

  return (
    <main className="container">
      {loading && <p>Loading product...</p>}
      {error && (
        <div className="notice notice--error">
          <p>Could not load product. {error}</p>
          <Link className="btn" to="/">Back to products</Link>
        </div>
      )}

      {!loading && !error && data && (
        <article className="detail">
          <div className="detail__media">
            <img src={data.thumbnail} alt={data.title} />
          </div>
          <div className="detail__body">
            <h1>{data.title}</h1>
            <p className="detail__brand"><strong>Brand:</strong> {data.brand || '—'}</p>
            <div className="detail__rating">
              <RatingStars rating={data.rating} size="md" />
            </div>

            <p className="detail__price">₹ {data.price}</p>
            <p className="detail__desc">{data.description}</p>

            <div className="detail__actions">
              <button className="btn" onClick={onAdd}>Add to Cart</button>
              <Link className="btn-link" to="/cart">Go to Cart</Link>
            </div>
            <p className="detail__meta">
              <strong>Category:</strong> {data.category}
            </p>
          </div>
        </article>
      )}
    </main>
  );
};

export default ProductDetail;

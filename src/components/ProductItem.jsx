import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cartSlice';
import RatingStars from './RatingStars';
import './ProductItem.css';

/**
 * ProductItem shows brand, title, price, and customer rating.
 */
const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className="product-card">
      <Link to={`/product/${product.id}`} className="product-card__image-wrap" aria-label={`View ${product.title}`}>
        <img src={product.thumbnail} alt={product.title} className="product-card__image" />
      </Link>

      <div className="product-card__body">
        <div className="product-card__brand">{product.brand || '—'}</div>
        <h3 className="product-card__title">{product.title}</h3>
        <div className="product-card__meta">
          <RatingStars rating={product.rating} size="sm" />
        </div>
        <p className="product-card__price">₹ {product.price}</p>

        <div className="product-card__actions">
          <Link className="btn-link" to={`/product/${product.id}`}>Details</Link>
          <button className="btn" onClick={onAdd}>Add to Cart</button>
        </div>
      </div>
    </article>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.string,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number
  }).isRequired
};

export default ProductItem;

import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';
import './CartItem.css';

/**
 * CartItem is a single row in the cart with quantity controls and remove button.
 */
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const onRemove = () => dispatch(removeFromCart(item.id));
  const onQtyChange = (e) => dispatch(updateQuantity({ id: item.id, quantity: e.target.value }));

  return (
    <div className="cart-item" role="listitem">
      <img src={item.thumbnail} alt={item.title} className="cart-item__thumb" />
      <div className="cart-item__info">
        <h4 className="cart-item__title">{item.title}</h4>
        <p className="cart-item__price">₹ {item.price}</p>
      </div>
      <div className="cart-item__qty">
        <label className="visually-hidden" htmlFor={`qty-${item.id}`}>Quantity</label>
        <input
          id={`qty-${item.id}`}
          type="number"
          min="1"
          value={item.quantity}
          onChange={onQtyChange}
        />
      </div>
      <div className="cart-item__subtotal">₹ {item.price * item.quantity}</div>
      <button className="btn btn--ghost" onClick={onRemove}>Remove</button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired
};

export default CartItem;

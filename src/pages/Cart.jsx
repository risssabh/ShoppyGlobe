import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import { selectCartItems, selectCartTotal, clearCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';

const Cart = () => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();

  const onClear = () => dispatch(clearCart());

  return (
    <main className="container">
      <h1>Your Cart</h1>

      {items.length === 0 ? (
        <div className="notice">
          <p>Your cart is empty.</p>
          <Link className="btn" to="/">Start shopping</Link>
        </div>
      ) : (
        <>
          <div role="list" aria-label="Cart items">
            {items.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-summary">
            <p className="cart-summary__total"><strong>Total:</strong> ₹ {total}</p>
            <div className="cart-summary__actions">
              <button className="btn btn--ghost" onClick={onClear}>Clear Cart</button>
              <Link className="btn" to="/checkout">Proceed to Checkout</Link>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;

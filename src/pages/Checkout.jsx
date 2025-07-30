import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../store/cartSlice';

const Checkout = () => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  return (
    <main className="container">
      <h1>Checkout</h1>
      {items.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <>
          <ul>
            {items.map(i => (
              <li key={i.id}>{i.title} × {i.quantity} — ₹ {i.price * i.quantity}</li>
            ))}
          </ul>
          <p><strong>Grand Total:</strong> ₹ {total}</p>
          <p><em>(This is a demo screen — payment is not implemented.)</em></p>
        </>
      )}
    </main>
  );
};

export default Checkout;

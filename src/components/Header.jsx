import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../store/cartSlice';
import './Header.css';

const Header = () => {
  const cartCount = useSelector(selectCartCount);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen(prev => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <header className="header">
      <div className="container header__inner">
        {/* Brand with 🛍️ logo */}
        <Link to="/" className="brand" onClick={closeMenu}>
          <span className="brand__logo" aria-hidden>🛍️</span>
          <span className="brand__text">ShoppyGlobe</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={toggleMenu}
        >
          <span className="menu-toggle__bar" />
          <span className="menu-toggle__bar" />
          <span className="menu-toggle__bar" />
        </button>

        {/* Primary nav */}
        <nav
          id="primary-navigation"
          className={`nav ${open ? 'nav--open' : ''}`}
          onClick={closeMenu}
        >
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
            Home
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
            Cart
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => isActive ? 'nav__link nav__link--active' : 'nav__link'}>
            Checkout
          </NavLink>
        </nav>

        {/* Cart shortcut */}
        <Link to="/cart" className="cart" aria-label="Open cart" onClick={closeMenu}>
          <span className="cart__icon" aria-hidden>🛒</span>
          <span className="visually-hidden">Cart</span>
          {cartCount > 0 && (
            <span className="cart__badge" aria-label={`${cartCount} items in cart`}>{cartCount}</span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import PropTypes from 'prop-types';
import './RatingStars.css';

/**
 * Displays 0–5 stars based on the numeric rating (0–5).
 * Rounds to the nearest half for a nicer look.
 */
const RatingStars = ({ rating, size = 'md' }) => {
  const rounded = Math.round((Number(rating) || 0) * 2) / 2;
  const stars = [1, 2, 3, 4, 5].map(i => {
    if (rounded >= i) return 'full';
    if (rounded + 0.5 === i) return 'half';
    return 'empty';
  });

  return (
    <div className={`stars stars--${size}`} aria-label={`Rated ${rounded} out of 5`}>
      {stars.map((t, idx) => (
        <span key={idx} className={`star star--${t}`} aria-hidden>
          {t === 'full' ? '★' : t === 'half' ? '⯨' : '☆'}
        </span>
      ))}
      <span className="stars__text">{rounded.toFixed(1)}</span>
    </div>
  );
};

RatingStars.propTypes = {
  rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

export default RatingStars;

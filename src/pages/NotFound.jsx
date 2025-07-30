import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <main className="container">
      <h1>404 — Page Not Found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link className="btn" to="/">Go Home</Link>
    </main>
  );
};

export default NotFound;

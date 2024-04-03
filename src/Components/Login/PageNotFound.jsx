import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="page-not-fopund">
      <h1 className="h1-page-not-found">404 - Not Found</h1>
      <p className="text-page-not-found">The page you're looking for does not exist.</p>
      <Link to="/" className="link-page-not-found">Go to Home</Link>
      <br />
      <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="404 Not Found" className="image-page-not-found" />
    </div>
  );
};

export default PageNotFound;

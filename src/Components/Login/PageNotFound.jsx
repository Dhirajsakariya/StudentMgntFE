import React from 'react';
import { Link } from 'react-router-dom';
import pagenotfound from '../Assets/pagenotfound.png'

const PageNotFound = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <img src={pagenotfound} alt="Page Not Found" />
      <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
      <Link to="/">Go to Home Page</Link>
    </div>
  );
};

export default PageNotFound;

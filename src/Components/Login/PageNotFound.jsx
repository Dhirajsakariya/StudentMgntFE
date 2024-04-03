import React from 'react'
import { Link } from 'react-router-dom';


 const PageNotFound = () => {
    return (
        <div>
          <h1>404 - Not Found</h1>
          <p>The page you're looking for does not exist.</p>
          <Link to="/">Go to Home</Link>
          <br />
          <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt="404 Not Found" />
        </div>
      );
    };

    export default PageNotFound;

    

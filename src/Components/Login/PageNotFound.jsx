import React from 'react';
import { Link } from 'react-router-dom';
import pagenotfound1 from '../Assets/pagenotfound1.png'
import './PageNotFound.css';


const PageNotFound = () => {
  return (
    <div>
      <h1 className='h1pagenotfound'>404 - Page Not Found</h1>
      <Link  to="/"  className="pagenot-fount-redirect">Go to Home Page</Link>
      <div>
      <img src={pagenotfound1} alt="Page Not Found" className='image-pagenotfound'/>
      </div>
      {/* <div className='pagenotfountd-message'>
        The page you are looking for might have been removed or is temporarily unavailable.
    </div> */}
    </div>
  );
};

export default PageNotFound;

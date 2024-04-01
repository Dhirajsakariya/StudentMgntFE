// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const isAuthenticated = () => {
//   return localStorage.getItem('authToken') !== null;
// };

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) =>
//       isAuthenticated() ? (
//         <Component {...props} />
//       ) : (
//         <Redirect to="/" />
//       )
//     }
//   />
// );

// export default PrivateRoute;


// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';
// function PrivateRoute({ component: Component, ...rest }) {
//   const isAuthenticated = /* Check if the user is authenticated */ false;
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
//       }
//     />
//   );
// }
// export default PrivateRoute;

// import React from 'react'
// import { Outlet } from 'react-router-dom'

// const PrivateRoute = () => {

// let loggedIn = false;
// if( loggedIn){
//     return  <Outlet />
// }
// else
// {
//     return "user not loggin"
// }

// }

// export default PrivateRoute

// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, isAuthenticated, role, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => {
//       if (!isAuthenticated) {
//         return <Redirect to="/" />;
//       } else {
//         switch (role) {
//           case 'admin':
//             return <Redirect to="/AdminPersonal" />;
//           case 'teacher':
//             return <Redirect to="/TeacherPersonal" />;
//           case 'student':
//             return <Redirect to="/StudentPersonal" />;
//           default:
//             return <Component {...props} />;
//         }
//       }
//     }}
//   />
// );

// export default PrivateRoute;
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('loggedInRole') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

export default PrivateRoute;

// import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';

// const ProtectedRoute = ({ component: Component,...rest }) => {
//   const auth = getAuth();
//   const [isAuthenticated, setIsAuthenticated] = React.useState(false);

//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       setIsAuthenticated(true);
//     } else {
//       setIsAuthenticated(false);
//     }
//   });

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated? (
//           <Component {...props} />
//         ) : (
//           <Navigate to={{ pathname: '/login' }} />
//         )
//       }
//     />
//   );
// };

// export default ProtectedRoute;
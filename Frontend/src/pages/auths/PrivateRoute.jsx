import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../context/Usercontext.jsx';


const PrivateRoute = ({ children }) => {
  const { user } = useUser();
  

  return user.user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
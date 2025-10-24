import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setIsAuth(false);
      return;
    }

    axios.get("http://localhost:3000/verify", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => setIsAuth(true))
    .catch(() => setIsAuth(false));
  }, [token]);

  if (isAuth === null) return <p>Loading...</p>;
  if (!isAuth) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;

import { Navigate,Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';

const ProtectedRoute = ({ element }) => {
  const { auth,setAuth } = useAuth();
  console.log(auth ,"auth");
  
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, [setAuth]);

  return auth?.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

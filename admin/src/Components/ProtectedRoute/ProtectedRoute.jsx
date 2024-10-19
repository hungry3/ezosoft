import { Navigate,Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ element }) => {
  const { auth } = useAuth();
  console.log(auth ,"auth");
  

  return auth?.user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

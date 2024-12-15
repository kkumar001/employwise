import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  return Cookies.get("accesstoken") ? children : <Navigate to="/login" replace />;
};

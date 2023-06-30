import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AuthPage from '../pages/Auth/AuthPage';

import AuthContext from './AuthContext';

const ProtectedRoute = ({ children, user }) => {
  const navigate = useNavigate();
  console.log({ user });

  if (!user) {
    console.log('how???', { id: user });
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

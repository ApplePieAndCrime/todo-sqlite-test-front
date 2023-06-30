import React, { useContext } from 'react';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
import TodoPage from './pages/Todo/TodoPage';
import { Provider } from 'react-redux';
import store from './store';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AuthContext, { AuthContextProvider } from './helpers/AuthContext';
import ProtectedRoute from './helpers/ProtectedRoute';
import Logout from './pages/Auth/Logout';

const App = () => {
  const { user } = useContext(AuthContext);
  console.log({ 'app user': user });

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute user={user}>
          <TodoPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/login',
      element: <AuthPage />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/redirect',
      element: () => {
        console.log('redirect');
        return <Navigate to="/" replace />;
      },
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;

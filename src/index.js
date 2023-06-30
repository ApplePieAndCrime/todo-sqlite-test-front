import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
  useNavigate,
} from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
import TodoPage from './pages/Todo/TodoPage';
import { Provider } from 'react-redux';
import store from './store';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AuthContext, { AuthContextProvider } from './helpers/AuthContext';
import ProtectedRoute from './helpers/ProtectedRoute';
import Logout from './pages/Auth/Logout';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

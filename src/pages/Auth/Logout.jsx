import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../helpers/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout().then(() => navigate('/login'));
  }, []);

  return <div></div>;
};

export default Logout;

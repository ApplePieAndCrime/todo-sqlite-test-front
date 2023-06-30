import React, { useContext } from 'react';
import { Box, AppBar, Typography, Button, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import Login from '../pages/Auth/Login';
import useToken from '../helpers/useToken';
import AuthPage from '../pages/Auth/AuthPage';
import AuthContext from '../helpers/AuthContext';

const Main = ({ children }) => {
  const { token, setToken } = useToken();
  const { user } = useContext(AuthContext);

  //   if (!token) {
  //     return <AuthPage setToken={setToken} />;
  //   }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {user.email}
            </Typography>
            <Button>
              <Link
                to="/logout"
                style={{ textDecoration: 'none', color: 'white' }}
              >
                Logout
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </>
  );
};

export default Main;

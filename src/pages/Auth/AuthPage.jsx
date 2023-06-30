import Paper from '@mui/material/Paper';

import React from 'react';
import { Box, Tab, Tabs, Typography, Divider } from '@mui/material';
import Login from './Login';
import Registration from './Registration';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const AuthPage = ({ setToken }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper
        sx={{
          width: '70%',
          maxWidth: '400px',
          margin: 'auto',
          marginTop: 20,
          //   backgroundColor: '#fae6f5',
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange}>
            <Tab sx={{ width: '50%' }} label="SIGN IN" />
            <Tab sx={{ width: '50%' }} label="SIGN UP" />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Login setToken={setToken} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Registration setToken={setToken} />
        </TabPanel>
      </Paper>
    </div>
  );
};

export default AuthPage;

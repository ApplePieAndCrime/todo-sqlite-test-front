import React, { useState } from 'react';
import { Paper, TextField, Button } from '@mui/material';
import { apiUrl } from '../../helpers/baseVars';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const sendEmail = async () => {
    await axios.get(apiUrl + '/auth/forgot-password', { params: { email } });
    navigate('/login');
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '70%',
        maxWidth: '400px',
        margin: 'auto',
        marginTop: 20,
        padding: 5,
        backgroundColor: '#fae6f5',
      }}
    >
      <TextField
        type="email"
        name="email"
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        sx={{ width: '60%', bgcolor: 'whitesmoke' }}
      />
      <Button variant="contained" sx={{ width: '30%' }} onClick={sendEmail}>
        SEND
      </Button>
    </Paper>
  );
};

export default ForgotPassword;

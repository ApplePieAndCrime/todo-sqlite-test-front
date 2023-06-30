import React, { useContext } from 'react';
import { TextField, Box, Button, Divider, Typography } from '@mui/material';
import axios from 'axios';
import { apiUrl } from '../../helpers/baseVars';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { isEmpty } from 'lodash';
import AuthContext from '../../helpers/AuthContext';

const useFieldsStyle = {
  margin: '10px 0',
};
const Registration = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AuthContext);

  const onSubmit = async fields => {
    const { email, password, repeat } = fields;
    if (password !== repeat) {
      setError('repeate password', {
        type: 'custom',
        message: 'does not match password',
      });
      return;
    }

    await login(apiUrl + '/auth/signup', { email, password })
      .then(() => navigate('/'))
      .catch(err => console.log({ 'axios error': err }));
  };

  const onInvalid = errors => console.error(errors);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TextField
        required
        type="email"
        name="email"
        label="Email"
        sx={useFieldsStyle}
        {...register('email', {
          required: { value: true, message: 'required field' },
          minLength: { value: 6, message: 'must not be less than 6' },
          maxLength: { value: 50, message: 'must not be more than 50' },
        })}
      />
      <TextField
        required
        type="password"
        name="password"
        label="Password"
        sx={useFieldsStyle}
        {...register('password', {
          required: { value: true, message: 'required field' },
          minLength: { value: 6, message: 'must not be less than 6' },
          maxLength: { value: 50, message: 'must not be more than 50' },
        })}
      />
      <TextField
        required
        type="password"
        label="Repeat password"
        sx={useFieldsStyle}
        {...register('repeat', {})}
      />

      {!isEmpty(errors) &&
        Object.entries(errors).map(([key, value]) => (
          <Typography color="red">{`${key}: ${value.message}`}</Typography>
        ))}

      <Button
        variant="contained"
        sx={useFieldsStyle}
        onClick={handleSubmit(onSubmit, onInvalid)}
      >
        SIGN UP
      </Button>
      <Divider />
      <Typography sx={{ margin: 'auto', paddingTop: '10px' }}>
        <Link
          to={'/forgot-password'}
          style={{ textDecoration: 'none', color: 'grey' }}
        >
          Forgot password?
        </Link>
      </Typography>
    </Box>
  );
};

export default Registration;

import React, { useCallback, useContext } from 'react';
import {
  TextField,
  Box,
  Button,
  FormControl,
  Divider,
  Typography,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '@hookform/error-message';
import { isEmpty } from 'lodash';
import axios from 'axios';
import { apiUrl } from '../../helpers/baseVars';
import AuthContext from '../../helpers/AuthContext';

const useFieldsStyle = {
  margin: '10px 0',
};
const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AuthContext);

  const onSubmit = async fields => {
    const { email, password } = fields;
    console.log({ fields, errors });
    await login(apiUrl + '/auth/signin', { email, password })
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
        {...register('email', {
          required: { value: true, message: 'required field' },
          minLength: { value: 6, message: 'must not be less than 6' },
          maxLength: { value: 50, message: 'must not be more than 50' },
        })}
        sx={useFieldsStyle}
      />
      <TextField
        required
        type="password"
        name="password"
        label="Password"
        {...register('password', {
          required: { value: true, message: 'required field' },
          minLength: { value: 6, message: 'must not be less than 6' },
          maxLength: { value: 50, message: 'must not be more than 50' },
        })}
        sx={useFieldsStyle}
      />

      {!isEmpty(errors) &&
        Object.entries(errors).map(([key, value]) => (
          <Typography color="red">{`${key}: ${value.message}`}</Typography>
        ))}

      <Button
        variant="contained"
        type="submit"
        onClick={handleSubmit(onSubmit, onInvalid)}
        sx={useFieldsStyle}
      >
        SIGN IN
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

export default Login;

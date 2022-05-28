import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../utils';

import { loginUser } from '../../../api/requests';
import { axiosInstance } from '../../../api/config';
import { getUser, getSteamProfile } from '../../../api/requests';

import { CTX } from '../../../store';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  boxShadow: 'none',
}));

export const Login = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch, state } = useContext(CTX);

  useEffect(() => {
    let user = setUser();
    if (user) {
      navigate('/');
    }
  }, [navigate]);
  const handleChangeUname = (event) => {
    setUsername(event.target.value);
    return;
  };
  const handleChangePass = (event) => {
    setPassword(event.target.value);
    return;
  };

  const handleSubmit = async (event) => {
    const formData = new FormData();
    event.preventDefault();
    formData.set('username', username);
    formData.set('password', password);
    const res = await loginUser(formData);
    if (typeof res === 'object') {
      localStorage.setItem('Bearer', res.token);
      axiosInstance.defaults.headers.common['Authorization'] =
        'bearer ' + res.token;
      const userData = await getUser();
      if (typeof userData === 'object') {
        dispatch({ type: 'LOG_IN', payload: userData });
        const steamProfile = await getSteamProfile();
        dispatch({ type: 'SET_STEAM', payload: steamProfile });
        navigate('/');
      }
    }
    if (res === 403) {
      dispatch({
        type: 'SET_ERRORS',
        payload: 'invalid credentials',
      });
    }
    if (res > 450) {
      dispatch({
        type: 'SET_ERRORS',
        payload: 'internal server error',
      });
    }
    return;
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={6}>
          <Item style={{ paddingTop: '200px' }}>
            <TextField
              style={{ padding: '10px' }}
              onChange={handleChangeUname}
              id="username"
              label="Username"
              variant="outlined"
            />
            <TextField
              style={{ padding: '10px' }}
              onChange={handleChangePass}
              id="password"
              label="Password"
              variant="outlined"
              type="password"
              helperText={state.error}
            />
          </Item>
          <Item>
            <Button onClick={handleSubmit}>Login</Button>
          </Item>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Box>
  );
};
export default Login;

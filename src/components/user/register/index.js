import { useState, useContext } from 'react';

import { useNavigate } from 'react-router';

import { registerUser } from '../../../api/requests';
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

export const Register = ({ isRegistered }) => {
  let navigate = useNavigate();
  const [userProfile, setProfile] = useState({});
  const { dispatch, state } = useContext(CTX);
  const handleChange = (event) => {
    if (event.target.id === 'username') {
      userProfile.username = event.target.value;
    }
    if (event.target.id === 'password') {
      userProfile.password = event.target.value;
    }
    if (event.target.id === 'passwordConfirmation') {
      userProfile.passwordConfirmation = event.target.value;
    }
  };
  const handleSubmit = (event) => {
    if (userProfile.password === userProfile.passwordConfirmation) {
      registerUser({
        username: userProfile.username,
        password: userProfile.password,
      })
        .then((res) => {
          if (res) {
            isRegistered(true);
            return navigate('/signup');
          }
        })
        .catch((err) => {
          if (err === 422) {
            dispatch({
              type: 'SET_ERRORS',
              payload: 'unaccessable property',
            });
          } else {
            dispatch({ type: 'SET_ERRORS', payload: 'service down' });
          }
        });
    } else {
      dispatch({
        type: 'SET_ERRORS',
        payload: 'passwords do not match',
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
              onChange={handleChange}
              id="username"
              label="Username"
              variant="outlined"
            />

            <TextField
              style={{ padding: '10px' }}
              onChange={handleChange}
              id="password"
              label="Password"
              variant="outlined"
              type="password"
            />
            <TextField
              style={{ padding: '10px' }}
              onChange={handleChange}
              id="passwordConfirmation"
              label="Confirm password"
              variant="outlined"
              type="password"
              helperText={state.error}
            />
          </Item>

          <Button onClick={handleSubmit}>Register</Button>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </Box>
  );
};
export default Register;

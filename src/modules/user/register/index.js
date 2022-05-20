import { useState } from 'react';

import { useNavigate } from 'react-router';

import { registerUser, verifySteam } from '../../../api/requests';

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
    if (event.target.id === 'steam64') {
      userProfile.steam64 = event.target.value;
    }
  };
  const handleSubmit = (event) => {
    if (userProfile.password === userProfile.passwordConfirmation) {
      console.log(userProfile);
      registerUser({
        username: userProfile.username,
        password: userProfile.password,
        steam64: userProfile.steam64,
      }).then((res) => {
        if (res) {
          isRegistered(true);
          return navigate('/signup');
        }
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={6}>
          <Item style={{ paddingTop: '200px' }}>
            <TextField
              onChange={handleChange}
              id="username"
              label="Username"
              variant="outlined"
            />

            <TextField
              onChange={handleChange}
              id="password"
              label="Password"
              variant="outlined"
              type="password"
            />
            <TextField
              onChange={handleChange}
              id="passwordConfirmation"
              label="Confirm password"
              variant="outlined"
              type="password"
            />
            <TextField
              onChange={handleChange}
              id="steam64"
              label="steam profile page url"
              variant="outlined"
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

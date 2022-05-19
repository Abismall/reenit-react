import { useState } from 'react';

import { useNavigate } from 'react-router'

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
  boxShadow: 'none'
}));



export const Register = ({ isRegistered }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [profileUrl, setProfileUrl] = useState("");
    const [steamID, setSteamID] = useState(null);
    const [userProfile, setUserProfile] = useState({});
    let navigate = useNavigate();
 
    const handleChange = (event) => {
        if (event.target.id === "username") {
            setUsername(event.target.value)
        }
        if (event.target.id === "password") {
            setPassword(event.target.value);
        }
        if (event.target.id === "passwordConfirmation") {
            setPasswordConfirmation(event.target.value);
        }
        if (event.target.id === "steam64") {
            setProfileUrl(event.target.value);
        }
        
    };
    const handleSubmit = (event) => {
        if (password === passwordConfirmation){
            setUserProfile({ username: username, password: password, steam64: steamID })
            verifySteam({ url: profileUrl })
                .then((res) => {
                    if (res) {
                        setSteamID(res.steam64)
                    }
                })
                .catch((err) => {
                })
        if (steamID != null) {
            registerUser(userProfile)
                .then((res) => {
                    if (res) {
                    isRegistered(true);
                    return navigate("/signup")                          
                    }
                })
                .catch((err) => {
                })
            }
        }
    }
    
    return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs>
                    </Grid>
                <Grid item xs={6}>
                    <Item style={{ paddingTop: '200px' }}>
                        
                        <TextField onChange={handleChange}  id="username" label="Username" variant="outlined" />
                        
                
                    
                        <TextField onChange={handleChange}  id="password" label="Password" variant="outlined" type="password" />
                        <TextField onChange={handleChange}  id="passwordConfirmation" label="Confirm password" variant="outlined" type="password" />
                        <TextField onChange={handleChange}  id="steam64" label="steam profile page url" variant="outlined" />

                    </Item>
                        
                        <Button onClick={handleSubmit}>Register</Button>
                    
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
                </Box>
        
    )
}
export default Register
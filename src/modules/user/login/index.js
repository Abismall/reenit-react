import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../utils';

import { loginUser } from '../../../api/requests';
import { axiosInstance } from '../../../api/config';
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



export const Login = () => {
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        let user = setUser();
        if (user){
            navigate("/")
        }
    }, [navigate])
    const handleChangeUname = event => {
        setUsername(event.target.value)
    };
    const handleChangePass = event => {
        setPassword(event.target.value);
    };
    
    const handleSubmit = (event) => {
        const formData = new FormData();
        //Prevent page reload
        event.preventDefault();

    
        
        formData.set("username", username);
        formData.set("password", password);
        loginUser(formData)
            .then((res) => {
                if (res){
                    localStorage.setItem('Bearer', res.token)
                    axiosInstance.defaults.headers.common['Authorization'] = 'bearer ' + res.token
                    return navigate("/")
                }

            })
            .catch((err) => {
        })

  
  }
    return (
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs>
                    </Grid>
                    <Grid item xs={6}>
                    <Item style={{paddingTop: '200px'}}>
                        <TextField onChange={handleChangeUname} id="username" label="Username" variant="outlined" />
                        <TextField onChange={handleChangePass} id="password" label="Password" variant="outlined" type="password" />
                    </Item>
                    <Item>
                        <Button onClick={handleSubmit}>Login</Button>
                    </Item>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
                </Box>
        
    )
}
export default Login
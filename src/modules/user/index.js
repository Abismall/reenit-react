import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


import reenitLogo from '../../static/images/reenitLogo.png'
import { Login } from './login'
import { Register } from './register'

import User from '../../components/User'

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
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



export const SignUp = () => {
    let navigate = useNavigate();
    const [isRegistered, setRegistered] = useState(true);
    const handleOnClick = () => {
        setRegistered(false);
    }
    // useEffect(() => {
    //     setHasAuth(false);
    //     try {
    //         const token = localStorage.getItem('Bearer')
    //         getUser()
    //             .then((res) => {
    //                 setCurrentUser(res)
    //                 setHasAuth(true);
                    

    //             })
    //             .catch((err) => {
    //                 setHasAuth(false);
    //                 console.log(err ,"error")
    //         })
            
    //     }
    //     catch {
    //         setHasAuth(false);
    //     }
             
    // }, []);
  
    return (
        <Grid container spacing={3}>
            <Grid item xs>
            </Grid>
            <Grid item xs={6}>
                <Item>
                    <Avatar
                        style={{ margin: 'auto', width: '100px', height: '100px', top: '80px' }}
                        alt="Reenit"
                        src={reenitLogo}
                    />
                    {isRegistered ? <Login /> : <Register isRegistered={setRegistered} />}
                    {isRegistered && <Button onClick={handleOnClick}>Not registered?</Button>}
                </Item>
            </Grid>
            <Grid item xs>
            </Grid>
        </Grid >
    )
}

export default SignUp


            
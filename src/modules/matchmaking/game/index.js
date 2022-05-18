import React from 'react';

import { getCurrentUser } from '../../../utils'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Team } from './team'
import { Settings } from './settings'

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'center',
}));
const ActiveGame = (props) => {
    const { current, onSwitch, handleUpdateLobby, handleMapChange} = props
    const baseUrl = 'www.turlenfanikerho.com/aulat/'



    return (
        <React.Fragment>
            
            <Grid item xs={4} >
                {current.Players.length <= 10 && <Button onClick={() => { onSwitch() }} variant="contained" style={{ backgroundColor: 'green' }}>Switch team</Button>}
                <Typography variant='h4' textAlign='center'>{baseUrl + current.lobby.title}</Typography>
                <Item style={{height: '200px' }}>
                    <Team team={current.team_two} />
                </Item>
            </Grid>
            
      <Grid item xs={4}>
                <Item style={{height: '200px'}}>
                    
                    <Team team={current.team_one} />
                    
                </Item>
            </Grid>
            <Grid item xs={4} align='center'>
                <Settings settings={{ current }} handleUpdateLobby={handleUpdateLobby} handleMapChange={handleMapChange} />
                
            </Grid>
    </React.Fragment>
    )

}

export default ActiveGame
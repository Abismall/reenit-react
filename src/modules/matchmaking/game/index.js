import React from 'react';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';
import { Team } from './team'
import { Settings } from './settings'


const ActiveGame = (props) => {
    const { current, onSwitch, handleUpdateLobby, handleMapChange, handleJoinLobby, handleLeaveLobby } = props

    const baseUrl = 'www.turlenfanikerho.com/aulat/'



    return (
        <React.Fragment>
            

                <Typography variant='h4' textAlign='center'>{baseUrl + current.lobby.title}</Typography>
                    <Team team={current.team_two} />
                    <Team team={current.team_one} />
                <Button onClick={() => { onSwitch() }}  style={{ color: 'blue' }}>Switch team</Button>
                {current.Players.length <= 10? <Button onClick={() => { handleJoinLobby(current.lobby.title) }} style={{ color: 'green' }}>Join</Button> : <Button disabled>Join</Button>}
                <Button onClick={() => { handleLeaveLobby() }}  style={{ color: 'red' }}>Leave</Button>
                <Settings settings={{ current }} handleUpdateLobby={handleUpdateLobby} handleMapChange={handleMapChange} />
    </React.Fragment>
    )

}

export default ActiveGame
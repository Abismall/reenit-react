
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';

import { useState, useEffect } from 'react'

import { startServer, getServerData } from '../../../../api/requests'

export const Launcher = ({ location, current, handleUpdateLobby }) => {
    const [isLaunched, setLaunched] = useState(false);
    const [serverInfo, setInfo] = useState({});
    useEffect(() => {
        initialize();
    }, [])
    const initialize = () => {
        
        startServer(location, current)
            .then(() => [
                getServerData(location)
                    .then((res) => {
                        if (res) {
                            current.lobby.active = true
                            console.log(current.lobby)
                            handleUpdateLobby(current.lobby, false)
                            setInfo(res);
                            setLaunched(true);

                    }
                })
        ])
    }
    
    return (
        <Paper align='center'>
            {isLaunched? <p>GL & HF</p> : <p>Starting server...</p>}
            {!isLaunched && <CircularProgress/>}
            {isLaunched && "connect" + " " + serverInfo.ip + ":" + serverInfo.ports.game}
        </Paper>
    )

};
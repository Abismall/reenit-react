import { useState, useEffect } from 'react';

import { getAllCurrentGames, getCurrentGame, leaveLobby, switchTeam, updateLobby, joinLobby } from '../../api/requests';
import { setUser } from '../../utils';
import ActiveGame from './game'
import Sidebar from '../../components/Sidebar'
import { LobbyList } from './lobbyList'

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
    color: theme.palette.text.secondary,
  boxShadow: 'none'
}));




const Lobby = () => {
    const [activeGames, setActiveGames] = useState([]);
    const [currentGame, setCurrentGame] = useState(false);
    const [change, setChange] = useState(false);

    useEffect(() => {
        const user = setUser();
        if (user){
            console.log(user)
            getCurrentGame()
            .then(res => {
                if (res) {
                    setCurrentGame(res);
                }
            })
            .catch(error => {
                setCurrentGame(false);
            })
        }
        setChange(false);
    }, [change])
    useEffect(() => {
        getAllCurrentGames()
        .then(res => {
            if (res) {
                setActiveGames(res);
            }
        })
        .catch(error => {
            setActiveGames([]);
        })
        setChange(false);
    }, [change])
    const handleTeamSwitch = () => {
        switchTeam();
        setChange(true);
    }
    const handleUpdateLobby = (data) => {
        updateLobby(data);
        setChange(true);
    }
    const handleMapChange = (data) => {
        updateLobby(data);
        setChange(true);
    }
    const handleJoinLobby = (data) => {
        joinLobby({title: data});
        setChange(true);
    }
    const handleLeaveLobby = () => {
        leaveLobby();
        setChange(true);
    }
    return (
            <Grid container spacing={3}>
            <Grid item xs={2}>
            </Grid>
            <Grid item xs={6}>
                            <Item style={{paddingTop: '140px'}}>
                                {currentGame ? <ActiveGame
                                    onSwitch={handleTeamSwitch}
                                    handleUpdateLobby={handleUpdateLobby} handleMapChange={handleMapChange}
                                    handleJoinLobby={handleJoinLobby} handleLeaveLobby={handleLeaveLobby}
                                    current={currentGame} />
                        : <LobbyList activeGames={activeGames} handleJoinLobby={handleJoinLobby}></LobbyList>}
                </Item>
            </Grid>
            <Grid item xs>
                <Sidebar/>
            </Grid>
            </Grid>
            )
            }
export default Lobby




import { useEffect, useContext } from 'react';
import {
  getAllCurrentGames,
  getCurrentGame,
  leaveLobby,
  switchTeam,
  updateLobby,
  joinLobby,
  HostGame,
  getUser,
  getSteamProfile,
} from '../../api/requests';

import ActiveGame from './game';
import Sidebar from '../../components/Sidebar';
import { LobbyList } from './lobbyList';
import GameCreator from '../../components/GameCreator';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ScoreBoard from './scoreboard';
import { setUser } from '../../utils';
import { CTX } from '../../store';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
}));

const Lobby = () => {
  const {
    state,
    setCurrentGame,
    refreshCurrent,
    getLocations,
    dispatch,
  } = useContext(CTX);
  useEffect(() => {
    onReload();
  }, []);
  useEffect(() => {
    setCurrent();
  }, []);
  const onReload = async () => {
    setUser();
    await getLocations();
    const userData = await getUser();
    if (userData != null) {
      dispatch({ type: 'LOG_IN', payload: userData });
      const steamProfile = await getSteamProfile();
      if (steamProfile) {
        dispatch({ type: 'SET_STEAM', payload: steamProfile });
      }
      const listOfGames = await getAllCurrentGames();
      dispatch({ type: 'SET_LOBBY_LIST', payload: listOfGames });
    }
  };

  const setCurrent = async () => {
    const currentGame = await getCurrentGame();
    if (currentGame) {
      setCurrentGame(currentGame.lobby.id);
      dispatch({ type: 'SET_CURRENT_LOBBY', payload: currentGame });
    }
  };

  const handleTeamSwitch = async () => {
    await switchTeam();
    refreshCurrent(state.currentGame.lobby.id);
  };
  const handleUpdateLobby = async (data) => {
    await updateLobby(data);
    refreshCurrent(state.currentGame.lobby.id);
  };
  const handleMapChange = async (data) => {
    await updateLobby(data);
    refreshCurrent(state.currentGame.lobby.id);
  };
  const handleJoinLobby = async (data) => {
    const currentGame = await getCurrentGame();
    if (currentGame) {
      setCurrent(currentGame.lobby.id);
      setCurrentGame(currentGame.lobby.id);
      dispatch({ type: 'SET_CURRENT_LOBBY', payload: currentGame });
    } else {
      await joinLobby({ title: data });
      const newGame = await getCurrentGame();
      setCurrentGame(newGame.lobby.id);
      dispatch({ type: 'SET_CURRENT_LOBBY', payload: newGame });
    }

    return;
  };
  const handleLeaveLobby = async () => {
    await leaveLobby();
    dispatch({ type: 'SET_CURRENT_LOBBY', payload: false });
    refreshCurrent(state.currentGame.lobby.id);
  };
  const handleHostGame = async (data) => {
    await HostGame(data);
    const newGame = await getCurrentGame();
    setCurrentGame(newGame.lobby.id);
    dispatch({ type: 'SET_CURRENT_LOBBY', payload: newGame });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={2}></Grid>
      <Grid item xs={6}>
        {state.UI === 'LOBBY' && (
          <Item style={{ paddingTop: '280px' }}>
            {!state.currentGame && (
              <GameCreator handleHostGame={handleHostGame} />
            )}
            {state.currentGame && state.locations ? (
              <ActiveGame
                onSwitch={handleTeamSwitch}
                handleUpdateLobby={handleUpdateLobby}
                handleMapChange={handleMapChange}
                handleJoinLobby={handleJoinLobby}
                handleLeaveLobby={handleLeaveLobby}
              />
            ) : (
              <LobbyList
                handleJoinLobby={handleJoinLobby}
              ></LobbyList>
            )}
          </Item>
        )}
        {state.UI === 'SCOREBOARD' && (
          <Item style={{ paddingTop: '280px' }}>
            <ScoreBoard />
          </Item>
        )}
      </Grid>
      <Grid item xs>
        <Sidebar />
      </Grid>
    </Grid>
  );
};
export default Lobby;

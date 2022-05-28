import css from '../../App.css';
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
import { resetUser } from '../../utils';
import ActiveGame from './game';
import Sidebar from '../../components/Sidebar';
import { LobbyList } from './lobbyList';
import GameCreator from '../../components/GameCreator';
import Banner from '../../components/Banner';
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
    loadChat,
    dispatch,
  } = useContext(CTX);
  useEffect(() => {
    onReload();
  }, []);
  useEffect(() => {
    setCurrent();
  }, [state.currentUser]);
  const onReload = async () => {
    setUser();
    loadChat();
    await getLocations();
    const userData = await getUser();
    if (typeof userData === 'object') {
      dispatch({ type: 'LOG_IN', payload: userData });
      dispatch({ type: 'SET_ERRORS', payload: null });
      const steamProfile = await getSteamProfile();
      if (typeof steamProfile === 'object') {
        dispatch({ type: 'SET_STEAM', payload: steamProfile });
        dispatch({ type: 'SET_ERRORS', payload: null });
      }
      const listOfGames = await getAllCurrentGames();
      if (typeof listOfGames === 'object') {
        dispatch({ type: 'SET_LOBBY_LIST', payload: listOfGames });
        dispatch({ type: 'SET_ERRORS', payload: null });
      }
    } else {
      resetUser();
    }
    return;
  };

  const setCurrent = async () => {
    const currentGame = await getCurrentGame();
    if (typeof currentGame === 'object') {
      console.log(state, '  STATE');
      setCurrentGame(currentGame.lobby.id, state.currentUser);
      dispatch({ type: 'SET_CURRENT_LOBBY', payload: currentGame });
      dispatch({ type: 'SET_ERRORS', payload: null });
    }
    return;
  };

  const handleTeamSwitch = async () => {
    await switchTeam();
    refreshCurrent(state.currentGame.lobby.id);
    return;
  };
  const handleUpdateLobby = async (data) => {
    await updateLobby(data);
    refreshCurrent(state.currentGame.lobby.id);
    return;
  };
  const handleMapChange = async (data) => {
    await updateLobby(data);
    refreshCurrent(state.currentGame.lobby.id);
    return;
  };
  const handleJoinLobby = async (data) => {
    const currentGame = await getCurrentGame();
    if (typeof currentGame === 'object') {
      setCurrent(currentGame.lobby.id);
      setCurrentGame(currentGame.lobby.id, state.currentUser);
      dispatch({ type: 'SET_CURRENT_LOBBY', payload: currentGame });
      dispatch({ type: 'SET_ERRORS', payload: null });
    } else {
      await joinLobby({ title: data });
      const newGame = await getCurrentGame();
      if (typeof newGame === 'object') {
        setCurrentGame(newGame.lobby.id, state.currentUser);
        dispatch({
          type: 'SET_CURRENT_LOBBY',
          payload: newGame,
        });
        dispatch({ type: 'SET_ROOM_CHAT', payload: [] });
        dispatch({ type: 'SET_ERRORS', payload: null });
      }
    }

    return;
  };
  const handleLeaveLobby = async () => {
    await leaveLobby();
    dispatch({ type: 'SET_CURRENT_LOBBY', payload: false });
    refreshCurrent(state.currentGame.lobby.id);
    return;
  };
  const handleHostGame = async (data) => {
    await HostGame(data);
    const newGame = await getCurrentGame();
    if (typeof newGame === 'object') {
      setCurrentGame(newGame.lobby.id, state.currentUser);
      dispatch({ type: 'SET_CURRENT_LOBBY', payload: newGame });
      dispatch({ type: 'SET_ROOM_CHAT', payload: [] });
      dispatch({ type: 'SET_ERRORS', payload: null });
    }
    return;
  };

  return (
    <Grid container spacing={3}>
      <Banner />
      <Grid item xs={2}></Grid>
      <Grid item xs={6}>
        {state.UI === 'LOBBY' && (
          <Item>
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
          <Item style={{ paddingTop: '130px' }}>
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

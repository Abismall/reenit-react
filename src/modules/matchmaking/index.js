import { useState, useEffect } from 'react';
import {
  getAllCurrentGames,
  getCurrentGame,
  leaveLobby,
  switchTeam,
  updateLobby,
  joinLobby,
  HostGame,
  getAvailableLocations,
} from '../../api/requests';
import { setUser } from '../../utils';
import ActiveGame from './game';
import Sidebar from '../../components/Sidebar';
import { LobbyList } from './lobbyList';
import GameCreator from '../../components/GameCreator';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import ScoreBoard from './scoreboard';
import { getUser, getSteamProfile } from '../../api/requests';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
}));

const Lobby = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [profileLoaded, setLoaded] = useState(false);
  const [steamProfile, setProfile] = useState(false);
  const [activeGames, setActiveGames] = useState([]);
  const [currentGame, setCurrentGame] = useState(false);
  const [availableLocations, setAvailableLocations] = useState([]);
  const [currentView, setView] = useState('Lobby');
  const [change, setChange] = useState(false);

  useEffect(() => {
    setChange(false);
    reloadData();
  }, [change]);
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const user = setUser();
    if (user === true) {
      const userData = await getUser();
      if (userData != null) {
        setCurrentUser(userData);
      }
      if (steamProfile === false) {
        const steamProfile = await getSteamProfile();
        console.log(steamProfile);
        if (steamProfile != null) {
          setProfile(steamProfile);
        } else {
          setProfile(false);
        }
      }
      setLoaded(true);
    }
  };
  const reloadData = async () => {
    const serverList = await getAllCurrentGames();
    if (serverList) {
      setActiveGames(serverList);
    } else {
      setActiveGames([]);
    }
    const currentGame = await getCurrentGame();
    if (currentGame) {
      setCurrentGame(currentGame);
      if (currentGame.lobby.owner_id === currentUser.id) {
        const locationList = await getAvailableLocations();
        if (
          locationList &&
          currentGame !== false &&
          locationList.length > 0
        ) {
          setAvailableLocations(locationList);
        }
      }
    }
  };

  const handleTeamSwitch = () => {
    switchTeam();
    setChange(true);
  };
  const handleUpdateLobby = (data, reload) => {
    updateLobby(data);
    if (reload === true) {
      setChange(true);
    }
  };
  const handleMapChange = (data) => {
    updateLobby(data);
    setChange(true);
  };
  const handleJoinLobby = (data) => {
    joinLobby({ title: data }).then(() => {
      setChange(true);
    });
  };
  const handleLeaveLobby = async () => {
    leaveLobby();
    setCurrentGame(false);
    setChange(true);
  };
  const handleHostGame = (data) => {
    HostGame(data).then(() => {
      setChange(true);
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={2}></Grid>
      <Grid item xs={6}>
        {currentView === 'Lobby' && (
          <Item style={{ paddingTop: '280px' }}>
            {!currentGame && (
              <GameCreator handleHostGame={handleHostGame} />
            )}
            {currentGame ? (
              <ActiveGame
                onSwitch={handleTeamSwitch}
                handleUpdateLobby={handleUpdateLobby}
                handleMapChange={handleMapChange}
                handleJoinLobby={handleJoinLobby}
                handleLeaveLobby={handleLeaveLobby}
                current={currentGame}
                available={availableLocations}
                setChange={setChange}
              />
            ) : (
              <LobbyList
                activeGames={activeGames}
                handleJoinLobby={handleJoinLobby}
              ></LobbyList>
            )}
          </Item>
        )}
        {currentView === 'Scoreboard' && (
          <Item style={{ paddingTop: '280px' }}>
            <ScoreBoard />
          </Item>
        )}
      </Grid>
      <Grid item xs>
        <Sidebar
          loadUser={loadUser}
          setView={setView}
          profileLoaded={profileLoaded}
          steamProfile={steamProfile}
          currentUser={currentUser}
        />
      </Grid>
    </Grid>
  );
};
export default Lobby;

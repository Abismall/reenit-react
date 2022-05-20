import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  getAllCurrentGames,
  getCurrentGame,
  leaveLobby,
  switchTeam,
  updateLobby,
  joinLobby,
  HostGame,
  getAvailableServers,
} from '../../api/requests';
import { setUser } from '../../utils';
import ActiveGame from './game';
import Sidebar from '../../components/Sidebar';
import { LobbyList } from './lobbyList';
import GameCreator from '../../components/GameCreator';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
}));

const Lobby = () => {
  const [activeGames, setActiveGames] = useState([]);
  const [currentGame, setCurrentGame] = useState(false);
  const [availableServers, setAvailableServers] = useState([]);
  const [change, setChange] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const user = setUser();
    if (user == true) {
      getCurrentGame()
        .then((res) => {
          if (res) {
            console.log(res);
            setCurrentGame(res);
          }
        })
        .catch((error) => {
          setCurrentGame(false);
        });
    } else if (user == false) {
      setChange(false);
      navigate('/signup');
    }
  }, [change]);
  useEffect(() => {
    getAllCurrentGames()
      .then((res) => {
        if (res) {
          setActiveGames(res);
        }
      })
      .catch((error) => {
        setActiveGames([]);
      });
    setChange(false);
  }, []);
  useEffect(() => {
    getAvailableServers().then((res) => {
      setAvailableServers(res);
    });
  }, []);
  const handleTeamSwitch = () => {
    switchTeam();
    setChange(true);
  };
  const handleUpdateLobby = (data, update) => {
    updateLobby(data);
    if (update === true) {
      setChange(true);
    }
  };
  const handleMapChange = (data) => {
    updateLobby(data);
    setChange(true);
  };
  const handleJoinLobby = (data) => {
    joinLobby({ title: data }).then((res) => {
      setChange(true);
    });
  };
  const handleLeaveLobby = () => {
    leaveLobby();
    navigate('/');
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
              available={availableServers}
              setChange={setChange}
            />
          ) : (
            <LobbyList
              activeGames={activeGames}
              handleJoinLobby={handleJoinLobby}
            ></LobbyList>
          )}
        </Item>
      </Grid>
      <Grid item xs>
        <Sidebar />
      </Grid>
    </Grid>
  );
};
export default Lobby;

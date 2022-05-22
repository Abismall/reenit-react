import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Team } from './team';
import { Settings } from './settings';
import { Launcher } from './launcher';
import { useState } from 'react';
import { getCurrentUser } from '../../../utils';
const ActiveGame = (props) => {
  const {
    current,
    onSwitch,
    handleUpdateLobby,
    handleMapChange,
    handleJoinLobby,
    handleLeaveLobby,
    available,
    setChange,
  } = props;
  const [location, setLocation] = useState('');
  const [isReady, setReady] = useState(false);
  const baseUrl = 'www.turlenfanikerho.com/aulat/';
  const handleOnClick = () => {
    setReady(true);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" textAlign="center">
        {baseUrl + current.lobby.title}
      </Typography>
      <Team team={current.team_two} />
      <Team team={current.team_one} />
      {!isReady && (
        <Button
          onClick={() => {
            onSwitch();
          }}
          style={{ color: 'blue' }}
        >
          Switch team
        </Button>
      )}
      {current.Players.length <= 10 && !isReady && (
        <Button
          onClick={() => {
            handleJoinLobby(current.lobby.title);
          }}
          style={{ color: 'green' }}
        >
          Join
        </Button>
      )}
      {!isReady && (
        <Button
          onClick={() => {
            handleLeaveLobby();
          }}
          style={{ color: 'red' }}
        >
          Leave
        </Button>
      )}
      {!isReady &&
        current.lobby.owner_id == getCurrentUser().user_id && (
          <Button onClick={handleOnClick}>Launch</Button>
        )}
      {isReady && (
        <Launcher
          location={location}
          isReady={isReady}
          available={available}
          current={current}
          handleUpdateLobby={handleUpdateLobby}
        />
      )}
      {!isReady &&
        current.lobby.owner_id == getCurrentUser().user_id && (
          <Settings
            settings={{ current }}
            handleUpdateLobby={handleUpdateLobby}
            handleMapChange={handleMapChange}
            available={available}
            location={location}
            setLocation={setLocation}
            setChange={setChange}
          />
        )}
    </React.Fragment>
  );
};

export default ActiveGame;

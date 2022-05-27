import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Team } from './team';
import { Settings } from './settings';
import { Launcher } from './launcher';
import { useState, useContext } from 'react';
import { getCurrentUser } from '../../../utils';
import { CTX } from '../../../store';
const ActiveGame = (props) => {
  const {
    onSwitch,
    handleUpdateLobby,
    handleMapChange,
    handleJoinLobby,
    handleLeaveLobby,
    setChange,
  } = props;
  const { state } = useContext(CTX);

  const handleOnClick = () => {
    state.currentGame.lobby.active = true;
    handleUpdateLobby(state.currentGame.lobby);
  };

  return (
    <React.Fragment>
      <Typography variant="h4" textAlign="center">
        {`${state.currentGame.lobby.title.toUpperCase()} [${
          state.currentGame.Players.length
        }]`}
      </Typography>
      <Team team={state.currentGame.team_two} />
      <Team team={state.currentGame.team_one} />
      {!state.currentGame.lobby.active && (
        <Button
          onClick={() => {
            onSwitch();
          }}
          style={{ color: 'blue' }}
        >
          Switch team
        </Button>
      )}
      {state.currentGame.Players.length <= 10 &&
        !state.currentGame.lobby.active && (
          <Button
            onClick={() => {
              handleJoinLobby(state.currentGame.lobby.title);
            }}
            style={{ color: 'green' }}
          >
            Join
          </Button>
        )}
      {!state.currentGame.lobby.active && (
        <Button
          onClick={() => {
            handleLeaveLobby();
          }}
          style={{ color: 'red' }}
        >
          Leave
        </Button>
      )}
      {!state.currentGame.lobby.active &&
        state.currentGame.lobby.owner_id ===
          getCurrentUser().user_id && (
          <Button onClick={handleOnClick}>Launch</Button>
        )}
      {state.currentGame.lobby.active && (
        <Launcher
          current={state.currentGame}
          handleUpdateLobby={handleUpdateLobby}
        />
      )}
      {!state.currentGame.lobby.active &&
        state.currentGame.lobby.owner_id ===
          getCurrentUser().user_id && (
          <Settings
            settings={state.currentGame}
            handleUpdateLobby={handleUpdateLobby}
            handleMapChange={handleMapChange}
            setChange={setChange}
          />
        )}
    </React.Fragment>
  );
};

export default ActiveGame;

import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

import { useState } from 'react';

import { MapDropDown } from '../map';

import { settingsColumns } from '../../../../utils';

import { movePlayers } from '../../../../api/requests';

import { AvailableDropDown } from '../server';

import { useContext } from 'react';
import { CTX } from '../../../../store';

export const Settings = ({ handleUpdateLobby }) => {
  const { state } = useContext(CTX);
  const [selection, setSelection] = useState([]);
  const SettingsColumns = settingsColumns;

  const handleOnClick = (e) => {
    if (e.target.id === 'teamDamage') {
      state.currentGame.lobby.team_damage =
        !state.currentGame.lobby.team_damage;
    }
    if (e.target.id === 'overtime') {
      state.currentGame.lobby.overtime =
        !state.currentGame.lobby.overtime;
    }
    if (e.target.id === 'move') {
      movePlayers(selection);
    }
    handleUpdateLobby(state.currentGame.lobby);
    return;
  };
  const handleOnSelectionChange = (e) => {
    if (e) {
      setSelection(e);
    }
    return;
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Button onClick={handleOnClick} id="overtime">
        {state.currentGame.lobby.overtime
          ? 'disable OT'
          : 'enable OT'}
      </Button>
      <Button onClick={handleOnClick} id="teamDamage">
        {state.currentGame.lobby.team_damage
          ? 'disable ff'
          : 'enable ff'}
      </Button>
      <MapDropDown
        current={state.currentGame.lobby}
        handleUpdateLobby={handleUpdateLobby}
      />
      {state.currentGame.lobby.server_id === '' && (
        <AvailableDropDown handleUpdateLobby={handleUpdateLobby} />
      )}
      {selection.length > 0 && (
        <Button
          onClick={handleOnClick}
          style={{ color: 'red' }}
          id="move"
        >
          {selection.length > 1 ? 'Move players' : 'Move player'}
        </Button>
      )}
      <DataGrid
        rows={state.currentGame.Players}
        columns={SettingsColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={handleOnSelectionChange}
        disableSelectionOnClick
      />
    </div>
  );
};

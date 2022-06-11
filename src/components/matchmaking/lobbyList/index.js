import { DataGrid } from '@mui/x-data-grid';
import { useState, useContext } from 'react';
import { CTX } from '../../../store';
import { LobbyListColumns } from '../../../utils';
import Button from '@mui/material/Button';

export const LobbyList = (props) => {
  const { handleJoinLobby } = props;
  const { state } = useContext(CTX);
  const [selected, setSelected] = useState(false);
  const handleOnClick = (e) => {
    setSelected(e.row.title);
    return;
  };
  const handleFocusOut = (e) => {
    e.row.active = false;
    setSelected(false);
    return;
  };
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={state.lobbyList ? state.lobbyList : []}
        columns={LobbyListColumns}
        pageSize={5}
        LoadingOverlay={true}
        loading={state.loading}
        rowsPerPageOptions={[5]}
        hideFooterSelectedRowCount
        onCellClick={handleOnClick}
        onCellFocusOut={handleFocusOut}
      />
      {selected && state.currentUser && (
        <Button
          style={{ backgroundColor: 'green', color: 'white' }}
          onClick={() => handleJoinLobby(selected)}
        >
          Join [{selected}]
        </Button>
      )}
    </div>
  );
};

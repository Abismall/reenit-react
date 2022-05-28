import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CTX } from '../../../../store';
import { useContext } from 'react';
export const AvailableDropDown = ({ handleUpdateLobby }) => {
  const { state } = useContext(CTX);
  const handleOnChange = (e) => {
    state.currentGame.lobby.server_id = e.target.value;
    handleUpdateLobby(state.currentGame.lobby);
    return;
  };
  return (
    <FormControl fullWidth>
      <Select
        labelId="map-select-DropDown"
        id="map-simple-select"
        label="Map"
        onChange={handleOnChange}
      >
        {state.locations.map((server) => (
          <MenuItem key={server.id} value={server.id}>
            {server.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default AvailableDropDown;

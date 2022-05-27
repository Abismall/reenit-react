import { mapPool } from '../../../../utils/';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const MapDropDown = ({ current, handleUpdateLobby }) => {
  const handleOnChange = (e) => {
    current.current_map = e.target.value;
    handleUpdateLobby(current, true);
  };
  return (
    <FormControl fullWidth>
      <Select
        labelId="map-select-DropDown"
        id="map-simple-select"
        value={current.current_map}
        label="Map"
        onChange={handleOnChange}
      >
        {mapPool.map((map) => (
          <MenuItem key={map} value={map}>
            {map}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default MapDropDown;


import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export const AvailableDropDown = ({ available, setLocation, location }) => {

    const handleOnChange = (e) => {
        setLocation(e.target.value)
    }
    return (
        <FormControl fullWidth>
            <Select
                labelId="map-select-DropDown"
                id="map-simple-select"
                value={location}
                label="Map"
                onChange={handleOnChange}
                >
                {available.map((server) =>
                     
                      <MenuItem key={server.id}  value={server.id}>{server.name}</MenuItem>
                  )}
                  
                </Select>
        </FormControl>
        
    )
}
export default AvailableDropDown

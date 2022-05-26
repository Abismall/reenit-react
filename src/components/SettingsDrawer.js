import { useState } from 'react';
import { updateUser } from '../api/requests';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export default function SettingsDrawer({ toggleDrawer, isOpen }) {
  const [newProfile, setNewProfile] = useState('');
  const handleOnChange = (e) => {
    e.preventDefault();
    setNewProfile(e.target.value);
  };
  const handleOnClick = (e) => {
    if (newProfile !== '') {
      let update = {
        steam64: newProfile,
      };
      updateUser(update);
      //loadUser();
    }
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 350,
            textAlign: 'center',
            marginTop: 10,
          }}
          role="presentation"
        >
          <TextField
            onChange={handleOnChange}
            id="username"
            label="STEAM64"
            variant="outlined"
          />
          <Button onClick={handleOnClick} style={{ marginTop: 6 }}>
            ADD
          </Button>
        </Box>
      </Drawer>
    </div>
  );
}

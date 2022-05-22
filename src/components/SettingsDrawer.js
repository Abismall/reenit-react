import { useState } from 'react';

import { updateUser } from '../api/requests';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
export default function SettingsDrawer({
  toggleDrawer,
  isOpen,
  currentUser,
  steamProfile,
  loadUser,
}) {
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
      loadUser();
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

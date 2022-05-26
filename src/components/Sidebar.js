import React, { useState, useContext } from 'react';
import { CTX } from '../store';
import User from './User';
import Guest from './Guest';
import UserPanel from './UserPanel';
import SettingsDrawer from './SettingsDrawer';
// MUI
import Paper from '@mui/material/Paper';

const Sidebar = (props) => {
  const { state } = useContext(CTX);
  const [isOpen, setOpen] = useState(false);
  const toggleDrawer = (isOpen) => (event) => {
    console.log(event);
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(isOpen);
  };

  return (
    <Paper style={{ marginTop: 350 }}>
      {state.currentUser ? <User /> : <Guest />}
      {state.currentUser && (
        <UserPanel toggleDrawer={toggleDrawer} isOpen={isOpen} />
      )}
      <SettingsDrawer toggleDrawer={toggleDrawer} isOpen={isOpen} />
    </Paper>
  );
};
export default Sidebar;

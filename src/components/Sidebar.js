import React, { useState } from 'react';

import User from './User';
import Guest from './Guest';
import UserPanel from './UserPanel';
import SettingsDrawer from './SettingsDrawer';
// MUI
import Paper from '@mui/material/Paper';

const Sidebar = (props) => {
  const [isOpen, setOpen] = useState(false);
  const {
    loadUser,
    setView,
    steamProfile,
    profileLoaded,
    currentUser,
  } = props;
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
      {profileLoaded ? (
        <User user={currentUser} steamProfile={steamProfile} />
      ) : (
        <Guest />
      )}
      {profileLoaded && (
        <UserPanel
          toggleDrawer={toggleDrawer}
          isOpen={isOpen}
          setView={setView}
        />
      )}
      <SettingsDrawer
        toggleDrawer={toggleDrawer}
        isOpen={isOpen}
        currentUser={currentUser}
        steamProfile={steamProfile}
        loadUser={loadUser}
      />
    </Paper>
  );
};
export default Sidebar;

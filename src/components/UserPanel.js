import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PublicIcon from '@mui/icons-material/Public';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import ListItemButton from '@mui/material/ListItemButton';

// MUI

import { CTX } from '../store';
import { useContext } from 'react';
const UserPanel = (props) => {
  const { toggleDrawer, isOpen } = props;
  const { state, dispatch } = useContext(CTX);
  const handleOnClick = (e) => {
    if (e.target.outerText === 'Lobby') {
      dispatch({ type: 'SET_UI', payload: 'LOBBY' });
    }
    if (e.target.outerText === 'Scoreboard') {
      dispatch({ type: 'SET_UI', payload: 'SCOREBOARD' });
    }
    return;
  };
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <AccessibilityIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemButton onClick={toggleDrawer(!isOpen)}>
          <ListItemText primary="Settings" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DensitySmallIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemButton onClick={handleOnClick}>
          <ListItemText primary="Lobby" />
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PublicIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemButton onClick={handleOnClick}>
          <ListItemText primary="Scoreboard" />
        </ListItemButton>
      </ListItem>
    </List>
  );
};
export default UserPanel;

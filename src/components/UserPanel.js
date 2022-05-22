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

const UserPanel = (props) => {
  const { toggleDrawer, isOpen, setView } = props;
  const handleOnClick = (e) => {
    if (e.target.outerText === 'Lobby') {
      setView('Lobby');
    }
    if (e.target.outerText === 'Scoreboard') {
      setView('Scoreboard');
    }
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

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import GitHubIcon from '@mui/icons-material/GitHub';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

export const Team = (props) => {
  const { team, captainOne, captainTwo, name } = props;
  return (
    <Paper
      style={{
        height: '100%',
        minHeight: '100px',
      }}
    >
      <List>
        <Typography
          style={{ color: name === 'one' ? 'blue' : 'red' }}
        >
          Team {name}
        </Typography>
        {team &&
          team.map((player) => {
            return (
              <Tooltip
                placement="top"
                key={player.steam64}
                title={player.steam64 ? `${player.steam64}` : null}
              >
                <ListItem
                  style={{
                    borderBottom: '1px solid red',
                    width: '35%',
                  }}
                >
                  <ListItemText
                    primary={player.username ? player.username : null}
                  />
                  {player.username === captainOne ||
                  player.username === captainTwo ? (
                    <GitHubIcon />
                  ) : null}
                </ListItem>
              </Tooltip>
            );
          })}
      </List>
    </Paper>
  );
};

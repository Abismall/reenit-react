import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import GitHubIcon from '@mui/icons-material/GitHub';

import Tooltip from '@mui/material/Tooltip';

export const Team = (props) => {
    const profileBaseUrl = 'https://steamcommunity.com/profiles/'
    const { team, captainOne, captainTwo } = props
    return (
        <List style={{}}>
            {team && team.map(player => {
                return (
                    
                    <Tooltip placement='top' key={player.steam64} title={player.steam64 ? profileBaseUrl + player.steam64 : null}>
                        <ListItem style={{borderBottom: '1px solid red', width: '35%'}}>
                            <ListItemText
                                primary={player.username ? player.username : 'Loading player...'}  
                            />
                            {player.username === captainOne || captainTwo ? <GitHubIcon/> : null}
                        </ListItem>
                    </Tooltip>
                )
            })}
        </List> 
    )
};
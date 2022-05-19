

import { timeAgo } from '../utils'

// MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const User = (props) => {
    const { user: { username, id, steam64, created_at }, steamProfile} = props;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="100%"
                image={steamProfile? steamProfile.avatarfull : "/"}
                alt="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {steamProfile? steamProfile.personaname : username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {steamProfile? steamProfile.steamid : steam64}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {steamProfile? steamProfile.realname : id}
                </Typography>
                <Typography>
                    Verified sonni since {timeAgo(created_at)}
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    )
};
export default User
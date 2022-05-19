

import { timeAgo } from '../utils'

// MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';


const User = (props) => {
    const { user: { username, id, steam64, created_at } } = props;


    return (
        <Card sx={{ maxWidth: 345 }}>
            {/* <CardMedia
                component="img"
                height="140"
                image={profileUrl ? `${ profileUrl }` : "/"}
                alt="green iguana"
            /> */}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {steam64}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    member nr. {id}
                </Typography>
                <Typography>
                    Member since {timeAgo(created_at)}
                </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    )
};
export default User
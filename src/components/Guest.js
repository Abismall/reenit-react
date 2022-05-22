import { useNavigate } from 'react-router';
// MUI
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Guest = () => {
  let navigate = useNavigate();
  const handleOnClick = () => {
    return navigate('/signup');
  };
  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', boxShadow: 'none' }}>
      {/* <CardMedia
                component="img"
                height="140"
                image={profileUrl ? `${ profileUrl }` : "/"}
                alt="green iguana"
            /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Welcome Guest!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Button onClick={handleOnClick}>Login</Button>
        </Typography>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
};
export default Guest;

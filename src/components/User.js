import { timeAgo } from '../utils';

// MUI
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
const User = (props) => {
  const {
    user: { username, id, steam64, created_at },
    steamProfile,
  } = props;
  return (
    <Card sx={{ maxWidth: 445, margin: 'auto', boxShadow: 'none' }}>
      <Box sx={{ p: 4, display: 'flex' }}>
        {steamProfile && (
          <Avatar
            src={steamProfile.avatarfull}
            style={{ width: '80px', height: '80px' }}
          />
        )}
        <Stack spacing={0.5}>
          <Typography
            fontWeight={700}
            style={{ textAlign: 'center' }}
          >
            {steamProfile ? steamProfile.personaname : username}
          </Typography>
          <Typography
            fontWeight={700}
            style={{ margin: '0px 35px 0px 50px' }}
          >
            {steamProfile ? steamProfile.steamid : steam64}
          </Typography>
          <Typography fontWeight={800}>
            150kg sonni since {timeAgo(created_at)}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
};
export default User;

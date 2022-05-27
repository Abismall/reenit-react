import { timeAgo } from '../utils';
import { useContext } from 'react';
import { CTX } from '../store';
// MUI
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
const User = () => {
  const { state } = useContext(CTX);
  return (
    <Card sx={{ maxWidth: 445, margin: 'auto', boxShadow: 'none' }}>
      <Box sx={{ p: 4, display: 'flex' }}>
        {state.steamProfile && (
          <Avatar
            src={state.steamProfile.avatarfull}
            style={{
              width: '80px',
              height: '80px',
              border: '1px solid black',
            }}
          />
        )}
        <Stack spacing={0.5}>
          <Typography
            fontWeight={700}
            style={{ textAlign: 'center' }}
          >
            {state.steamProfile
              ? state.steamProfile.personaname
              : state.currentUser.username}
          </Typography>
          <Typography
            fontWeight={700}
            style={{ margin: '0px 35px 0px 50px' }}
          >
            {state.steamProfile ? state.steamProfile.steamid : null}
          </Typography>
          <Typography fontWeight={800}>
            150kg sonni since {timeAgo(state.currentUser.created)}
          </Typography>
        </Stack>
      </Box>
    </Card>
  );
};
export default User;

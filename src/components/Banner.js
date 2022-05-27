// MUI
import Paper from '@mui/material/Paper';
import backGround from '../assets/images/reenitLogo.png';

const Banner = () => {
  return (
    <Paper
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        boxShadow: 'none',
      }}
    >
      {/* <video
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        autoPlay
        loop
        muted
        src={loop}
        playbackRate
        type="video/mp4"
      /> */}
      <img
        style={{
          width: '210px',
          height: '210px',
          margin: '10px auto auto auto',
        }}
        src={backGround}
      ></img>
    </Paper>
  );
};
export default Banner;

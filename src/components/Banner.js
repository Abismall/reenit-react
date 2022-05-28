// MUI
import Paper from '@mui/material/Paper';
import backGround from '../assets/images/reenitLogo.png';

const Banner = () => {
  return (
    <Paper
      style={{
        paddingTop: '10px',
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
          width: '120px',
          height: '120px',
          margin: '10px auto auto auto',
        }}
        src={backGround}
      ></img>
    </Paper>
  );
};
export default Banner;

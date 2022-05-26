// MUI
import Paper from '@mui/material/Paper';
import backGround from '../assets/images/vecteezy_retro-futurism-background_rd0221-01_generated.jpg';

const Banner = () => {
  return (
    <Paper
      style={{
        textALign: 'center',
        border: '2px solid red',
        width: '100%',
        height: '100%',
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
      {/* <img
        style={{ width: '100%', height: '100%' }}
        src={backGround}
      ></img> */}
    </Paper>
  );
};
export default Banner;

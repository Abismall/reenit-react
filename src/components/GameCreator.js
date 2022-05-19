
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react'
// MUI


const GameCreator = ({handleHostGame}) => {
    const [gameTitle, setGameTitle] = useState("");

    const handleOnChange = (e) => {
        setGameTitle(e.target.value)
    }
    const handleOnClick = (e) => {
        handleHostGame({title: gameTitle})
    }
    return (
        <div >
            <Box
                component="form"
                sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                onChange={handleOnChange}
            >
                <TextField id="outlined-basic" label="Host a game" variant="outlined" />
                <Button onClick={handleOnClick} style={{backgroundColor: gameTitle === "" ? "red" : "green", color: 'white', marginTop: '15px'}} disabled={gameTitle === ""} variant="outlined">Host</Button>
            </Box>
        </div>

    )
};
export default GameCreator
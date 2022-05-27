import { useState, useContext, useEffect } from 'react';
import {
  updateUser,
  getUser,
  getSteamProfile,
  getSteamProfileByID,
} from '../api/requests';
import { resetUser } from '../utils';
import { CTX } from '../store';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import KeyOffIcon from '@mui/icons-material/KeyOff';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
export default function SettingsDrawer({ toggleDrawer, isOpen }) {
  const [newProfile, setNewProfile] = useState('');
  const { state, dispatch } = useContext(CTX);
  useEffect(() => {
    setNewProfile('');
  }, [isOpen]);
  const handleChange = async (event) => {
    let update = {
      steam64: event.target.value,
    };
    await updateUser(update);
    const userData = await getUser();
    dispatch({ type: 'LOG_IN', payload: userData });
    const steamProfileData = await getSteamProfile();
    dispatch({
      type: 'SET_STEAM',
      payload: steamProfileData,
    });
    dispatch({ type: 'SET_ERRORS', payload: null });
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    setNewProfile(e.target.value);
  };
  const handleOnClick = async (e) => {
    if (newProfile !== '') {
      for (
        var i = 0;
        i < state.currentUser.profile_list.length;
        i++
      ) {
        if (state.currentUser.profile_list[i].steam64 == newProfile) {
          dispatch({
            type: 'SET_ERRORS',
            payload: 'profile already exists',
          });
          break;
        }
      }
      if (!state.error) {
        const steamProfileData = await getSteamProfileByID(
          newProfile
        );
        if (steamProfileData) {
          let update = {
            steam64: newProfile,
            profile_list: [
              ...state.currentUser.profile_list,
              {
                steam64: newProfile,
                username: steamProfileData.personaname,
                avatar: steamProfileData.avatarfull,
              },
            ],
          };
          await updateUser(update);
          const userData = await getUser();
          dispatch({ type: 'LOG_IN', payload: userData });
          dispatch({
            type: 'SET_STEAM',
            payload: steamProfileData,
          });
          dispatch({ type: 'SET_ERRORS', payload: null });
        } else {
          dispatch({
            type: 'SET_ERRORS',
            payload: 'invalid steam64',
          });
        }
      }
    }
  };

  return (
    <div>
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 260,
            textAlign: 'center',
            marginTop: 10,
          }}
          role="presentation"
        >
          <Box
            sx={{
              textAlign: 'left',
              marginLeft: '20px',
              paddingBottom: '20px',
            }}
          >
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Current profile
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={state.currentUser.steam64}
                onChange={handleChange}
              >
                {state.currentUser.profile_list &&
                  state.currentUser.profile_list.map((profile) => {
                    return (
                      <FormControlLabel
                        key={profile.steam64}
                        value={profile.steam64}
                        control={<Radio />}
                        label={profile.username}
                        disabled={state.currentGame ? true : false}
                      />
                    );
                  })}
              </RadioGroup>
            </FormControl>
          </Box>

          {!state.error ? (
            <TextField
              onChange={handleOnChange}
              id="username"
              label="STEAM64"
              variant="standard"
            />
          ) : (
            <TextField
              error
              id="standard-error"
              label="Error"
              variant="standard"
              helperText={state.error}
            />
          )}
          <Fab
            color="primary"
            style={{
              backgroundColor: newProfile === '' ? 'gray' : 'green',
              margin: '20px 140px 0px 0px ',
            }}
            aria-label="add"
            onClick={handleOnClick}
          >
            <AddIcon />
          </Fab>

          <Tooltip title="Log out">
            <IconButton
              style={{
                width: '60px',
                height: '60px',
                margin: '340px 10px 10px 10px',
              }}
              disabled={state.currentGame ? true : false}
              onClick={() => {
                dispatch({ type: 'LOG_OUT' });
                resetUser();
              }}
            >
              <KeyOffIcon
                style={{
                  width: '40px',
                  height: '40px',
                  color: 'red',
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Drawer>
    </div>
  );
}

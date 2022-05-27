import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { CTX } from '../store';
import { useContext, useState, useRef, useEffect } from 'react';
import { getCurrentUser, timeAgo } from '../utils';

const Chat = () => {
  const { state, dispatch, updateChat } = useContext(CTX);
  const scrollRef = useRef(null);
  const [message, setMessage] = useState('');
  const [currentChat, setCurrentChat] = useState([]);
  const [view, setView] = useState('Global');
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [state.globalChat, view]);
  const handleOnClick = (e) => {
    if (e.target.id === 'global') {
      setView('Global');
    }
    if (e.target.id === 'lobby') {
      setView('Lobby');
    }
  };
  const handleKeypress = (e) => {
    if (e.code === 'Enter') {
      if (view === 'Global') {
        updateChat(
          {
            user: getCurrentUser().username,
            msg: message,
          },
          null
        );
      } else {
        updateChat(
          {
            user: getCurrentUser().username,
            msg: message,
          },
          state.currentGame.lobby.title
        );
      }

      setMessage('');
    }
  };
  return (
    <Box>
      <Paper
        style={{
          textALign: 'center',
          borderTop: '1px solid gray',
          width: '100%',
          height: '100px',
        }}
      >
        <InsertCommentIcon
          style={{ padding: '20px 10px 10px 10px' }}
        />
        <Button
          style={{ marginBottom: '20px' }}
          onClick={handleOnClick}
          id="global"
        >
          Global
        </Button>
        <Button
          style={{ marginBottom: '20px' }}
          disabled={!state.currentGame}
          onClick={handleOnClick}
          id="lobby"
        >
          Lobby
        </Button>
        <List
          sx={{
            width: '100%',
            height: 220,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 220,

            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          {Object.values(
            view === 'Global' ? state.globalChat : state.roomChat
          ).map((message, i) => (
            <li key={`section-${(message, i)}`} ref={scrollRef}>
              <ul>
                <ListSubheader>{`${message.user}:
                `}</ListSubheader>
                <ListItem key={`${(message.username, i)}`}>
                  <ListItemText primary={`${message.msg}`} />
                </ListItem>
              </ul>
            </li>
          ))}
        </List>
        <div style={{ display: 'flex' }}>
          <TextField
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeypress}
            style={{
              width: '88%',
              marginTop: '20px',
              marginBottom: '50px',
            }}
            id="globalChat"
            label="Message"
            variant="outlined"
            value={message}
          />
          <Button
            variant="outlined"
            onClick={() => {
              updateChat(
                {
                  user: getCurrentUser().username,
                  msg: message,
                },
                view === 'Global'
                  ? null
                  : state.currentGame.lobby.title
              );
              setMessage('');
            }}
            style={{
              height: '55px',
              marginTop: '20px',
              backgroundColor: 'green',
              color: 'white',
            }}
          >
            SEND
          </Button>
        </div>
      </Paper>
    </Box>
  );
};
export default Chat;

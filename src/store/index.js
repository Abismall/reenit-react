import React from 'react';
import { leaveLobby } from '../api/requests';
import { useEffect } from 'react';
export const CTX = React.createContext();

const initialState = {
  loading: false,
  lobbyList: [],
  UI: 'LOBBY',
  globalChat: [],
  roomChat: [],
};

const io = require('socket.io-client');
let socket;
function reducer(state, action) {
  switch (action.type) {
    case 'LOG_IN':
      return {
        error: null,
        ...state,
        currentUser: {
          id: action.payload.id,
          steam64: action.payload.steam64,
          username: action.payload.username,
          profile_list: action.payload.profile_list,
          created: action.payload.created_at,
        },
      };
    case 'LOG_OUT':
      return {
        ...initialState,
      };

    case 'SET_STEAM':
      return {
        error: null,
        ...state,
        steamProfile: action.payload,
      };
    case 'SET_LOCATIONS':
      return {
        error: null,
        ...state,
        locations: action.payload,
      };
    case 'SET_LOBBY_LIST':
      return {
        error: null,
        ...state,
        lobbyList: action.payload,
      };
    case 'SET_CURRENT_LOBBY':
      return {
        error: null,
        ...state,
        currentGame: action.payload,
      };
    case 'SET_SOCKET':
      return {
        error: null,
        ...state,
        socket: action.payload,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    case 'SET_UI':
      return {
        ...state,
        UI: action.payload,
      };
    case 'SET_CHAT':
      return {
        ...state,
        globalChat: action.payload,
      };
    case 'SET_ROOM_CHAT':
      return {
        ...state,
        roomChat: action.payload,
      };
    case 'SET_ERRORS':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
}

const refreshCurrent = (room) => {
  socket.emit('update', room);
  return;
};
const setCurrentGame = (room, user) => {
  socket.emit('setCurrentRoom', room, user);
  return;
};
const getLocations = () => {
  socket.emit('getLocations');
  return;
};
const loadChat = () => {
  socket.emit('loadChat');
  return;
};
const updateChat = (message, room) => {
  socket.emit('chatMessage', message, room);
  return;
};
export function Store(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  if (!socket) {
    socket = io(':5000');
    console.log(socket, 'HI');
  }
  useEffect(() => {
    dispatch({ type: 'SET_SOCKET', payload: socket.id });
  }, [socket.id]);
  socket.on('refreshCurrentGame', function (data) {
    dispatch({ type: 'SET_CURRENT_LOBBY', payload: data });
    return;
  });
  socket.on('setLocations', function (data) {
    if (typeof data === 'object') {
      dispatch({ type: 'SET_LOCATIONS', payload: data });
    }
    return;
  });
  socket.on('chatMessage', function (data, room) {
    if (room == null) {
      dispatch({ type: 'SET_CHAT', payload: data });
    } else {
      dispatch({ type: 'SET_ROOM_CHAT', payload: data });
    }
    return;
  });
  socket.on('leaveLobby', async (socket) => {
    await leaveLobby();

    return;
  });

  return (
    <CTX.Provider
      value={{
        state,
        dispatch,
        refreshCurrent,
        setCurrentGame,
        getLocations,
        updateChat,
        loadChat,
      }}
    >
      {props.children}
    </CTX.Provider>
  );
}

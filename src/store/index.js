import React from 'react';
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
        loading: false,
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
        loading: false,
        error: null,
        ...state,
        steamProfile: action.payload,
      };
    case 'SET_LOCATIONS':
      return {
        loading: false,
        error: null,
        ...state,
        locations: action.payload,
      };
    case 'SET_LOBBY_LIST':
      return {
        loading: false,
        error: null,
        ...state,
        lobbyList: action.payload,
      };
    case 'SET_CURRENT_LOBBY':
      return {
        loading: false,
        error: null,
        ...state,
        currentGame: action.payload,
      };
    case 'SET_LOADING':
      return {
        loading: true,
      };
    case 'SET_UI':
      return {
        loading: true,
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
};
const setCurrentGame = (room) => {
  socket.emit('setCurrentRoom', room);
};
const getLocations = () => {
  socket.emit('getLocations');
};
const loadChat = () => {
  socket.emit('loadChat');
};
const updateChat = (message, room) => {
  socket.emit('chatMessage', message, room);
};
export function Store(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  if (!socket) {
    socket = io(':5000');
  }
  socket.on('refreshCurrentGame', function (data) {
    dispatch({ type: 'SET_CURRENT_LOBBY', payload: data });
  });
  socket.on('setLocations', function (data) {
    dispatch({ type: 'SET_LOCATIONS', payload: data });
  });
  socket.on('chatMessage', function (data, room) {
    if (room == null) {
      dispatch({ type: 'SET_CHAT', payload: data });
    } else {
      dispatch({ type: 'SET_ROOM_CHAT', payload: data });
    }
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

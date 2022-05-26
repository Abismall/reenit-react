import React from 'react';
export const CTX = React.createContext();

const initialState = {
  loading: false,
  lobbyList: [],
  UI: 'LOBBY',
};

const io = require('socket.io-client');
let socket;
function reducer(state, action) {
  switch (action.type) {
    case 'LOG_IN':
      return {
        loading: false,
        ...state,
        currentUser: {
          id: action.payload.id,
          steam64: action.payload.steam64,
          username: action.payload.username,
          created: action.payload.created_at,
        },
      };
    case 'SET_STEAM':
      return {
        loading: false,
        ...state,
        steamProfile: action.payload,
      };
    case 'SET_LOCATIONS':
      return {
        loading: false,
        ...state,
        locations: action.payload,
      };
    case 'SET_LOBBY_LIST':
      return {
        loading: false,
        ...state,
        lobbyList: action.payload,
      };
    case 'SET_CURRENT_LOBBY':
      return {
        loading: false,
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

  return (
    <CTX.Provider
      value={{
        state,
        dispatch,
        refreshCurrent,
        setCurrentGame,
        getLocations,
      }}
    >
      {props.children}
    </CTX.Provider>
  );
}

import { axiosInstance } from '../api/config';
import jwt_decode from 'jwt-decode';
export const getCurrentToken = () => {
  return localStorage.getItem('Bearer') || null;
};
export const getCurrentUser = () => {
  return jwt_decode(getCurrentToken()).username;
};
export const setUser = () => {
  const token = getCurrentToken();
  if (token != null) {
    const decoded = jwt_decode(token);
    const validity = checkValidity(decoded.exp);
    if (validity == true) {
      axiosInstance.defaults.headers.common['Authorization'] =
        'bearer ' + token;
      return true;
    }
    localStorage.removeItem('Bearer');
    return false;
  }
};

export const checkValidity = (exp) => {
  if (Date.now() >= exp * 1000) {
    return false;
  }
  return true;
};

export const timeAgo = (time) => {
  switch (typeof time) {
    case 'number':
      break;
    case 'string':
      time = +new Date(time);
      break;
    case 'object':
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, 'seconds', 1], // 60
    [120, '1 minute ago', '1 minute from now'], // 60*2
    [3600, 'minutes', 60], // 60*60, 60
    [7200, '1 hour ago', '1 hour from now'], // 60*60*2
    [86400, 'hours', 3600], // 60*60*24, 60*60
    [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
    [604800, 'days', 86400], // 60*60*24*7, 60*60*24
    [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
    [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
    [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
    [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
    [58060800000, 'centuries', 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = 'ago',
    list_choice = 1;

  if (seconds === 0) {
    return 'Just now';
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = 'from now';
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == 'string') return format[list_choice];
      else
        return (
          Math.floor(seconds / format[2]) +
          ' ' +
          format[1] +
          ' ' +
          token
        );
    }
  return time;
};

export const mapPool = [
  'De_dust2',
  'De_mirage',
  'De_overpass',
  'De_nuke',
];
export const settingsColumns = [
  { field: 'team', headerName: 'Team', width: 90 },
  {
    field: 'username',
    headerName: 'Username',
    width: 150,
  },
  {
    field: 'steam64',
    headerName: 'steamID',
    width: 150,
  },
];
export const LobbyListColumns = [
  {
    field: 'title',
    headerName: 'Game',
    width: 150,
  },
  {
    field: 'current_map',
    headerName: 'current map',
    width: 150,
  },
  {
    field: 'team_damage',
    headerName: 'team damage',
    width: 150,
  },
  {
    field: 'overtime',
    headerName: 'overtime',
    width: 150,
  },
  {
    field: 'active',
    headerName: 'Active',
    width: 150,
  },
];

import jwt_decode from "jwt-decode";
export const getCurrentToken = () => {
    return localStorage.getItem('Bearer') || null;
}
export const getCurrentUser = () => {
  return jwt_decode(getCurrentToken()).username
}
export const mapPool = [
    "De_dust2",
    "De_mirage",
    "De_overpass",
    "De_nuke",
]
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

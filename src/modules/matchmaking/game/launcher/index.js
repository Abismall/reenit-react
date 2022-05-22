import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { useState, useEffect } from 'react';

import { startServer, getServerData } from '../../../../api/requests';

export const Launcher = ({
  location,
  current,
  handleUpdateLobby,
}) => {
  const [isLaunched, setLaunched] = useState(false);
  const [isCrashed, setCrashed] = useState(false);
  const [serverInfo, setInfo] = useState({});
  useEffect(() => {
    initialize();
  }, []);
  const initialize = async () => {
    await startServer(location, current);
    const serverData = await getServerData(location);
    if (serverData != null) {
      current.lobby.active = true;
      console.log(current);
      handleUpdateLobby(current.lobby, false);
      setInfo(serverData);
      setLaunched(true);
    } else {
      setLaunched(false);
      setCrashed(true);
    }
  };
  const grabAddress = () => {
    var copyText = document.getElementById('server-info');
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };
  const handleReboot = () => {
    initialize();
  };
  const ConnectInfo = () => {
    return (
      <div>
        <input
          readOnly
          onClick={grabAddress}
          type="text"
          style={{
            border: 'none',
            width: '100%',
            fontSize: '25px',
          }}
          value={`connect ${serverInfo.ip}:${serverInfo.ports.game}`}
          id="server-info"
        ></input>
      </div>
    );
  };
  const RebootServer = () => {
    return (
      <div>
        <p>Error launching the server.</p>
        <Button onClick={handleReboot}> REBOOT </Button>
      </div>
    );
  };
  const StartingServer = () => {
    if (!isLaunched && !isCrashed) {
      return <CircularProgress />;
    }
    return <RebootServer />;
  };
  return (
    <Paper align="center">
      {isLaunched ? <ConnectInfo /> : <StartingServer />}
    </Paper>
  );
};

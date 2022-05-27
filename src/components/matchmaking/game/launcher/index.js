import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

import { useState, useEffect, useContext } from 'react';
import { CTX } from '../../../../store';
import { startServer, getServerData } from '../../../../api/requests';

export const Launcher = ({ handleUpdateLobby }) => {
  const [isLaunched, setLaunched] = useState(false);
  const [isCrashed, setCrashed] = useState(false);
  const [booting, setBooting] = useState(false);
  const [serverInfo, setInfo] = useState({});
  const { state } = useContext(CTX);
  useEffect(() => {
    initialize();
  }, []);
  const initialize = async () => {
    if (
      state.currentGame.lobby.server_address === false ||
      booting === true
    ) {
      setCrashed(false);
      setLaunched(false);
      await startServer(
        state.currentGame.lobby.server_id,
        state.currentGame
      );
      const serverData = await getServerData(
        state.currentGame.lobby.server_id
      );
      if (serverData !== null) {
        setInfo(serverData);
        state.currentGame.lobby.server_address = serverData;
        await handleUpdateLobby(state.currentGame.lobby);
        setLaunched(true);
      } else {
        setLaunched(false);
        setCrashed(true);
      }
    } else {
      setLaunched(true);
      setInfo(state.currentGame.lobby.server_address);
    }
  };
  const grabAddress = () => {
    var copyText = document.getElementById('server-info');
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
  };
  const handleReboot = () => {
    setCrashed(false);
    setLaunched(false);
    setBooting(true);
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
        <RebootServer />
      </div>
    );
  };
  const RebootServer = () => {
    return (
      <div>
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

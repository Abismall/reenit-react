import { useState, useEffect } from 'react';

import { getAllCurrentGames, getCurrentGame, switchTeam, updateLobby } from '../../api/requests';

import ActiveGame from './game'

import { getCurrentToken } from '../../utils/'





const Lobby = () => {
    const [activeGames, setActiveGames] = useState([]);
    const [currentGame, setCurrentGame] = useState(false);
    const [change, setChange] = useState(false);

    useEffect(() => {
        getCurrentGame(getCurrentToken())
            .then(res => setCurrentGame(res));
        getAllCurrentGames()
            .then(res => setActiveGames(res));
        setChange(false);
        
    }, [change])
    const handleTeamSwitch = () => {
        switchTeam();
        setChange(true);
        
    }
    const handleUpdateLobby = (data) => {
        updateLobby(data)
        setChange(true);
    }
    const handleMapChange = (data) => {
        updateLobby(data)
        setChange(true);
    }

    

    if (activeGames.length === 0 || !currentGame) {return <div>No games found.</div>;}
  return (
      <div><ActiveGame onSwitch={handleTeamSwitch} handleUpdateLobby={handleUpdateLobby} handleMapChange={handleMapChange} current={currentGame}/></div>
  )
}

export default Lobby
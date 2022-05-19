
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid';

import { useState } from 'react'

import { MapDropDown } from '../map'

import { settingsColumns } from '../../../../utils'

import { movePlayers } from '../../../../api/requests'

export const Settings = ({settings, handleUpdateLobby, handleMapChange}) => {
    const { current: { lobby } } = settings
    const [selection, setSelection] = useState([])
    const SettingsColumns = settingsColumns
    
    const handleOnClick = (e) => {
        if (e.target.id === 'teamDamage') {
            lobby.team_damage = !lobby.team_damage
        }
        if (e.target.id === 'overtime') {
            lobby.overtime = !lobby.overtime
        }
        if (e.target.id === 'move') {
            movePlayers(selection)


        }
        handleUpdateLobby(lobby)
    }
    const handleOnSelectionChange = (e) => {
        if (e) {
            setSelection(e)
        }
    }

    return (
        <div style={{ height: '400px', width: '100%' }}>
            
            <Button onClick={handleOnClick}  id="overtime">{lobby.overtime? "disable OT" : "enable OT"}</Button>
            <Button onClick={handleOnClick}  id="teamDamage">{lobby.team_damage ? "disable ff" : "enable ff"}</Button>
            <MapDropDown current={lobby} updateLobby={handleUpdateLobby} />
            {selection.length > 0 && <Button onClick={handleOnClick} style={{color: 'red'}} id="move">{selection.length > 1? "Move players" : "Move player"}</Button>}
            <DataGrid
                
                rows={settings.current.Players}
                
                columns={SettingsColumns}
                
                pageSize={5}
                
                rowsPerPageOptions={[5]}
                
                checkboxSelection
                
                onSelectionModelChange={handleOnSelectionChange}
                
                disableSelectionOnClick
                
                
            />
            
        </div>
    )

};
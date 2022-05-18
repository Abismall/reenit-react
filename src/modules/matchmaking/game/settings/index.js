import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid';

import { useState, useEffect } from 'react'

import { MapDropDown } from '../map'

import { settingsColumns } from '../../../../utils'

export const Settings = ({settings, handleUpdateLobby, handleMapChange}) => {
    const { current: { lobby } } = settings
    const SettingsColumns = settingsColumns
    
    const handleOnClick = (e) => {
        if (e.target.id === 'teamDamage') {
            lobby.team_damage = !lobby.team_damage
        }
        if (e.target.id === 'overtime') {
            lobby.overtime = !lobby.overtime
        }
        handleUpdateLobby(lobby)
    }
    const handleOnSelectionChange = (e) => {
        console.log(e)
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            
            <Button onClick={handleOnClick}  id="overtime">{lobby.overtime? "disable OT" : "enable OT"}</Button>
            <Button onClick={handleOnClick}  id="teamDamage">{lobby.team_damage ? "disable ff" : "enable ff"}</Button>
            <MapDropDown current={lobby} updateLobby={handleUpdateLobby}/>
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
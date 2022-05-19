import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react'
import { LobbyListColumns } from '../../../utils'
import Button from '@mui/material/Button';

export const LobbyList = (props) => {
    const { activeGames, handleJoinLobby } = props
    const [selected, setSelected] = useState(false);
    const handleOnClick = (e) => {
        setSelected(e.id);
        
    }
    const handleFocusOut = (e) => {
        setSelected(false);
    }
    return (
        <div style={{ height: 400, width: '100%' }}>
            
        <DataGrid
                rows={activeGames}
                columns={LobbyListColumns}
                pageSize={5}
                LoadingOverlay={true}
                rowsPerPageOptions={[5]}
                hideFooterSelectedRowCount
                onCellClick={handleOnClick}
                onCellFocusOut={handleFocusOut}
            />
            {selected && <Button onClick={() => handleJoinLobby(activeGames[selected - 1].title)}>Join [{activeGames[selected - 1].title}]</Button>}
        </div>
        
    )

}
import { DataGrid } from '@mui/x-data-grid';
import { LobbyListColumns } from '../../../utils'
export const LobbyList = (props) => {
    const { activeGames } = props
 
    return (
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
                
                rows={activeGames}
                
                columns={LobbyListColumns}
                
                pageSize={5}
                LoadingOverlay={true}
                rowsPerPageOptions={[5]}
                
                                
                
            />
        </div>
        
    )

}
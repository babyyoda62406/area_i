import './TablaProyectos.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { rows } from './Helper/Rows';
import { columns } from './Helper/Columnas';
import { esES } from "@mui/x-data-grid/locales";


const TablaProyectos = () => {
    // idioma de las opciones de la tabla
    const idioma = esES.components.MuiDataGrid.defaultProps.localeText

    return <Box className='ContainerTable'  >
        
        <DataGrid
            className='TablaProyectos'
            localeText={idioma}
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[2]}

            disableRowSelectionOnClick
        />
    </Box>
}

export default TablaProyectos
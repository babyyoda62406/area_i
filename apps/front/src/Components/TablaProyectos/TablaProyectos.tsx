import './TablaProyectos.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { rows } from './Helper/Rows';
import { columns } from './Helper/Columnas';
import { esES } from "@mui/x-data-grid/locales";
import { reloadTabla } from './services/ReloadTabla';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';


const TablaProyectos = () => {
    // idioma de las opciones de la tabla
    const idioma = esES.components.MuiDataGrid.defaultProps.localeText
    const [actualizarTabla, setActualizarTabla] = useState<boolean>(false)
    const [data,setData] = useState<any>([])
    const {token} = useContext(GlobalContext)

    useEffect(() => {
        reloadTabla(token,setData)
       
    }, [actualizarTabla])
    console.log(data)

    return <Box className='ContainerTable'  >
        
        <DataGrid
            className='TablaProyectos'
            localeText={idioma}
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[2,5,7]}

            disableRowSelectionOnClick
        />
    </Box>
}

export default TablaProyectos
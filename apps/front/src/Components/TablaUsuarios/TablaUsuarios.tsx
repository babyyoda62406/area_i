import { Box } from '@mui/material'
import './TablaUsuarios.css'
import { DataGrid, GridColDef, esES } from '@mui/x-data-grid'
import { useState } from 'react'
import {tpDatosTablaUsers } from './types/tabla'


const TablaUsuarios = () => {
    // idioma de las opciones de la tabla
    const idioma = esES.components.MuiDataGrid.defaultProps.localeText
    const [data, setData] = useState<tpDatosTablaUsers[]>([])
    
    const columnas: GridColDef[] = [
        {
            field: '',
            headerName: 'candela',
            width:10,
        },
        {
            field: 'correo',
            headerName: 'Correo',
            width: 100,
            editable: true,
            filterable:true,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 50,
            editable: true,
            filterable:true,
        },
        {
            field: 'password',
            headerName: 'Contraseña',
            width: 10,
            editable: true,
            filterable:true,
        },
        
    ]


    return <Box className="TablaUsuarios">
        <DataGrid
        className='TablaUsuarios'
            localeText={idioma}
            columns={columnas}
            rows={data}


        />


    </Box>
}

export default TablaUsuarios
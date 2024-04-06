import { Box } from '@mui/material'
import './TablaUsuarios.css'
import { DataGrid, GridColDef, GridRowHeightParams, esES } from '@mui/x-data-grid'
import { useContext, useEffect, useState } from 'react'
import {tpDatosTablaUsers } from './types/tabla'
import { GlobalContext } from '../../Contexts/GlobalContext'
import { getUSers } from './Services/GetUsers'
import SelectorHeight from './Components/Selectorheight/SelectorHeight'
import BtnAddUser from './Components/AgregarUsuario/AgregarUsuario'


const TablaUsuarios = () => {
    // idioma de las opciones de la tabla
    const idioma = esES.components.MuiDataGrid.defaultProps.localeText
    const {token,actualizarTabla} = useContext(GlobalContext)
    const [data, setData] = useState<tpDatosTablaUsers[]>([])

    useEffect(() => {
        getUSers(token,setData)
    },[actualizarTabla.tablaUsuarios])
    
    const columnas: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Identificacion',
            width:10,
        },
        {
            field: 'correo',
            headerName: 'Correo',
            width: 150,
            editable: true,
            filterable:true,
        },
        {
            field: 'estado',
            headerName: 'Estado',
            width: 80,
            editable: true,
            filterable:true,
        },
        {
            field: 'password',
            headerName: 'Contraseña',
            width: 200,
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
            getRowHeight={({ id, densityFactor }: GridRowHeightParams) => {
				if ((id as number) % 2 === 0) {
					return 50 * densityFactor;
				}

				return null;
			}}
            slots={{
				toolbar: () => {
					return <div className='HeaderTable'>
						<SelectorHeight />
						<BtnAddUser/>
					</div>
				},
				
				
			}}

        />


    </Box>
}

export default TablaUsuarios
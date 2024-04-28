import { Box } from '@mui/material'
import './TablaRoles.css'
import { DataGrid, esES, GridColDef, GridRowHeightParams } from '@mui/x-data-grid'
import { ItfTableRolesProyectos } from './interfaces/ItfTableRoles'
import { useState } from 'react'
import SelectorHeight from '../Selectorheight/SelectorHeight'
import BtnAddRol from './Components/AgregarRol/AgregarRol'

const TablaRolesProyectos = () => {
    
	const idioma = esES.components.MuiDataGrid.defaultProps.localeText
    const [data,setData] = useState<ItfTableRolesProyectos[]>([])


    

    const columns: GridColDef[] = [
        {
			field: 'numElement',
			headerName: 'Orden',
			width: 30,
			flex: 1,
			type:'text'
        },
        {
			field: 'numElement',
			headerName: 'Orden',
			width: 30,
			flex: 1,
			type:'text'
        },
        {
			field: 'numElement',
			headerName: 'Orden',
			width: 30,
			flex: 1,
			type:'text'
        },
        {
			field: 'numElement',
			headerName: 'Orden',
			width: 30,
			flex: 1,
			type:'text'
		},
    ]

    return <Box className="ContainerTable">
        <DataGrid
            className='TablaRolesProyectos'
            localeText={idioma}
            columns={columns}
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
						<BtnAddRol/>
					</div>
				},
				
            }}
            // toolbar:BtnAddProyect
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 5,
					},
				},
			}}
            pageSizeOptions={[2, 5, 7]}
			disableRowSelectionOnClick
        
        />
        
        
      

    </Box>
}

export default TablaRolesProyectos
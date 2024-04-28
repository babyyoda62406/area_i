import { Box } from '@mui/material'
import './TablaRoles.css'
import { DataGrid, GridColDef, GridRowHeightParams } from '@mui/x-data-grid'
import { ItfTableRoles } from './interfaces/ItfTableRoles'
import { useState } from 'react'
import SelectorHeight from '../Selectorheight/SelectorHeight'
import BtnAddRol from './Components/AgregarRol/AgregarRol'

const TablaRoles = () => {
    
    const [data,setData] = useState<ItfTableRoles[]>([])

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

    return <Box className="TablaRoles">
        <DataGrid
            className='TablaRoles'
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
        
        
        />
        
        
      

    </Box>
}

export default TablaRoles
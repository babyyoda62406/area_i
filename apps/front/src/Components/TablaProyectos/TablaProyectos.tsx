import './TablaProyectos.css'
import Box from '@mui/material/Box';
import { DataGrid, GridRowHeightParams, } from '@mui/x-data-grid';
import { esES } from "@mui/x-data-grid/locales";
import { reloadTabla } from './services/ReloadTabla';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { Item } from '../../Interfaces/TableInterfaces';
import { DatoModificado } from './services/Update.ts';
import { tpColumnModified } from './types/tpcolumnas';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectorHeight from './Components/Selectorheight/SelectorHeight';
import { DeleteElement } from './services/Delete';



const TablaProyectos = () => {
	// idioma de las opciones de la tabla
	const idioma = esES.components.MuiDataGrid.defaultProps.localeText
	const [data, setData] = useState<Item[]>([])
	const [columnModified, setcolumnModified] = useState<tpColumnModified>({
		idRow: 0,
		column: ''
	})

	const { token,actualizarTabla,setActualizarTabla } = useContext(GlobalContext)

	useEffect(() => {
		reloadTabla(token, setData)

	}, [actualizarTabla])

	const HandlerModified = (arg: any) => { setcolumnModified({ ['idRow']: arg.id, ['column']: arg.field }) }


	// estrutura de columnas
	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{
			field: 'uid',
			headerName: 'UId',
			width: 150,
			editable: true,
			filterable: true,
	
		},
		{
			field: 'nombre',
			headerName: 'Nombre',
			width: 150,
			editable: true,
		},
		{
			field: 'organizacion',
			headerName: 'Organizacion',
			type: 'text',
			width: 100,
			editable: true,
			align:"right"
		},
		{
			field: 'estado',
			headerName: 'Estado',
			sortable: true,
			width: 160,
			editable: true,
			
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Operaciones',
			width: 100,
			cellClassName: 'actions',
			getActions: ({ id,row }) => {
			  
	  
			  return [
				<GridActionsCellItem
				  icon={<EditIcon />}
				  label="Editar"
				  className="textPrimary"
				  onClick={()=> alert(row)}
				  color="inherit"
				/>,
				<GridActionsCellItem
				  icon={<DeleteIcon />}
				  label="Eliminar"
				  onClick={()=>DeleteElement(id,token,actualizarTabla,setActualizarTabla)}
				  color="inherit"
				/>,
			  ];
			},
		  }
	];


	return <Box className='ContainerTable'  >

		<DataGrid
			className='TablaProyectos'
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
				toolbar: SelectorHeight,
			}}

			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 5,
					},
				},
			}}
			pageSizeOptions={[2, 5, 7]}
			disableRowSelectionOnClick
			onCellEditStop={HandlerModified}
			processRowUpdate={(updatedRow, paramsold) =>
				DatoModificado(token, updatedRow, paramsold, columnModified, data, setData)
			}
			onProcessRowUpdateError={(err) => console.log(err)}
		/>
	</Box>
}

export default TablaProyectos
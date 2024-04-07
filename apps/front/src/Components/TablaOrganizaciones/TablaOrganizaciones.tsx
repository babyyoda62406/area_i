
import { Box, Popover } from '@mui/material'
import './Components'
import { DataGrid, esES, GridActionsCellItem, GridColDef, GridRowHeightParams } from '@mui/x-data-grid'
import { useContext, useMemo, useState } from 'react'
import { GlobalContext } from '../../Contexts/GlobalContext'
import { getOrganizations } from './Services/getOrganizations'
import { tpDataOrganizations } from './Types/DataOrganizations'


const TablaOrganizaciones = () => {

    // idioma de las opciones de la tabla
	const idioma = esES.components.MuiDataGrid.defaultProps.localeText
    const { token, actualizarTabla, setActualizarTabla } = useContext(GlobalContext)
    const [data,setData] = useState<tpDataOrganizations[]>([])

    useMemo(() => {
        getOrganizations(token,setData)
    },[actualizarTabla.tablaOrganizaciones])


    const columns: GridColDef[] = []
	// 	{
	// 		field: 'numElement',
	// 		headerName: '',
	// 		width: 30,
	// 		type:'number'
			
	// 	},
	// 	{
	// 		field: 'identificador',
	// 		headerName: 'Identificador',
	// 		width: 100,
	// 		editable: true,
	// 		filterable: true,
			
	// 	},
	// 	{
	// 		field: 'nombre',
	// 		headerName: 'Nombre',
	// 		width: 150,
	// 		editable: true,
	// 	},
	// 	{
	// 		field: 'estado',
	// 		headerName: 'Estado',
	// 		sortable: true,
	// 		width: 80,
	// 		editable: true,

	// 	},
	// 	{
	// 		field: 'nombreOrg',
	// 		headerName: 'Organizacion',
	// 		type: 'text',
	// 		width: 150,
	// 		editable: true,
	// 		align: "left"
	// 	},
	// 	{
	// 		field: 'enUso',
	// 		headerName: 'Uso',
	// 		sortable: true,
	// 		width: 80,
	// 		editable: false,
	// 		type: 'boolean'
	// 	},
		
	// 	{
	// 		field: 'actions',
	// 		type: 'actions',
	// 		headerName: 'Operaciones',
	// 		width: 100,
	// 		cellClassName: 'actions',
	// 		getActions: ({ id, row }) => {

	// 			return [
	// 				<GridActionsCellItem
	// 					icon={<EditIcon />}
	// 					label="Editar"
	// 					className="textPrimary"
	// 					onClick={() => EditarRow(row, id)}
	// 					color="inherit"
	// 				/>,
	// 				<Popover content={contenidoPopover} onOpenChange={() => setIdRowDelete(id)}  >
	// 					<GridActionsCellItem
	// 						icon={<DeleteIcon />}
	// 						label="Eliminar"
	// 						color="inherit"
	// 					/>
	// 				</Popover>
	// 				,
	// 			];
	// 		},
	// 	}
	// ];

    return <Box>
        <DataGrid
			className='TablaProyectos'
			localeText={idioma}
			columns={columns}
			rows={data}
// 			getRowHeight={({ id, densityFactor }: GridRowHeightParams) => {
// 				if ((id as number) % 2 === 0) {
// 					return 50 * densityFactor;
// 				}

// 				return null;
// 			}}
// 			slots={{
// 				toolbar: () => {
// 					return <div className='HeaderTable'>
// 						<SelectorHeight />
// 						<BtnAddProyect/>
// 					</div>
// 				},
				
				
// 			}}
// // toolbar:BtnAddProyect
// 			initialState={{
// 				pagination: {
// 					paginationModel: {
// 						pageSize: 5,
// 					},
// 				},
// 			}}
// 			pageSizeOptions={[2, 5, 7]}
// 			disableRowSelectionOnClick
// 			onCellEditStop={HandlerModified}
// 			processRowUpdate={(updatedRow, paramsold) =>
// 				// DatoModificado(token, updatedRow, paramsold, columnModified, data, actualizarTabla,setActualizarTabla)
// 			}
// 			onProcessRowUpdateError={(err) => console.log(err)}
			
		/>


    </Box>
}

export default TablaOrganizaciones
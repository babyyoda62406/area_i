import { Box } from '@mui/material'
import './TablaOrganizaciones.css'
import { DataGrid, esES, GridActionsCellItem, GridColDef, GridRowHeightParams, GridRowId } from '@mui/x-data-grid'
import { useContext, useMemo, useState } from 'react'
import { GlobalContext } from '../../Contexts/GlobalContext'
import { getOrganizations } from './Services/getOrganizations'
import { tpDataOrganizations } from './Types/DataOrganizations'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { tpColumnModified } from '../TablaProyectos/types/tpcolumnas'
import { Button, Popover } from 'antd'
import { DeleteOrganizations } from './Services/DeleteOrganizations'
import SelectorHeight from '../TablaUsuarios/Components/Selectorheight/SelectorHeight'
import BtnAddOrganization from './Components/AgregarOrganizacion/AgregarOrganizacion'
import ModalFormulario from '../ModalFormulario/ModalFormulario'
import FormularioUpdateOrganization from './Components/FormularioUpdateOrganization/FormularioUpdateOrganization'
import { UpdateOrganization } from './Services/UpdateOrganizations'

const TablaOrganizaciones = () => {

    // idioma de las opciones de la tabla
	const idioma = esES.components.MuiDataGrid.defaultProps.localeText
    const { token, actualizarTabla, setActualizarTabla } = useContext(GlobalContext)
    const [data, setData] = useState<tpDataOrganizations[]>([])
    const [columnModified, setcolumnModified] = useState<tpColumnModified>({
		idRow: 0,
		column: ''
	})
	const [idRowDelete, setIdRowDelete] = useState<GridRowId>(0)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [rowEdit, setRowEdit] = useState<tpDataOrganizations>({ ...data[0] })
	

    useMemo(() => {
        getOrganizations(token,setData)
    },[actualizarTabla.tablaOrganizaciones])


    const EditarRow = (row: tpDataOrganizations, id: GridRowId) => {

		setRowEdit(row)
		setcolumnModified({ ...columnModified, ['idRow']: id })
		setShowModal(true)
	}

	const handlerModified = (arg:any)=>{setcolumnModified({ ['idRow']: arg.id, ['column']: arg.field })}

    const contenidoPopover = <div className='PopoverOrganizations'>
		<span className='TitlePopover'>Estas seguro que deseas eliminar este proyecto?</span>
        <div className='BodyPopover '>
            
			<Button className='ButtonPop yes' onClick={() => DeleteOrganizations(idRowDelete, token, actualizarTabla, setActualizarTabla)}>
				Si
			</Button>
		</div>
	</div>

    const columns: GridColDef[] = [
		{
			field: 'numElement',
			headerName: '',
			width: 30,
			type:'number'
			
		},
		
		{
			field: 'nombre',
			headerName: 'Nombre',
			width: 150,
			editable: true,
		},
		{
			field: 'estado',
			headerName: 'Estado',
			sortable: true,
			width: 80,
			editable: true,

		},
		
		{
			field: 'enUso',
			headerName: 'Uso',
			sortable: true,
			width: 80,
			editable: false,
			type: 'boolean'
		},
		
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Operaciones',
			width: 100,
			cellClassName: 'actions',
			getActions: ({ id, row }) => {

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Editar"
						className="textPrimary"
						onClick={() => EditarRow(row, id)}
						color="inherit"
					/>,
					<Popover content={contenidoPopover} onOpenChange={() => setIdRowDelete(id)}  >
						<GridActionsCellItem
							icon={<DeleteIcon />}
							label="Eliminar"
							color="inherit"
						/>
					</Popover>
					,
				];
			},
		}
	];

    return <Box className='ContainerTable' >
        <DataGrid
			className='TablaOrganizaciones'
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
						<BtnAddOrganization/>
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
			onCellEditStop={handlerModified}
			// processRowUpdate={(updatedRow, paramsold) =>
			// 	UpdateOrganization(token, updatedRow, paramsold, columnModified, data, actualizarTabla,setActualizarTabla)
			// }
			onProcessRowUpdateError={(err) => console.log(err)}
			
		/>
		<ModalFormulario showModal={showModal} setShowModal={() => setShowModal(false)} Formulario={<FormularioUpdateOrganization data={rowEdit} id={columnModified.idRow} setShowModal={() => setShowModal(false)} />} />


    </Box>
}

export default TablaOrganizaciones
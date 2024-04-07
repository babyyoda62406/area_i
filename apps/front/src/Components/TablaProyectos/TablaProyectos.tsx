import './TablaProyectos.css'
import Box from '@mui/material/Box';
import { DataGrid, GridRowHeightParams, GridRowId, } from '@mui/x-data-grid';
import { esES } from "@mui/x-data-grid/locales";
import { reloadTabla } from './services/ReloadTabla';
import {  useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { DatoModificado } from './services/Update.ts';
import { tpColumnModified } from './types/tpcolumnas';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectorHeight from './Components/Selectorheight/SelectorHeight';
import { DeleteElement } from './services/Delete';
import { Button, Popover } from 'antd';
import ModalFormulario from '../ModalFormulario/ModalFormulario.tsx';
import FormularioProyectsUpdate from './Components/FormularioUpdate/FormularioProyectsUpdate.tsx';
import { typeDatosProyServer } from '../../Types/CMP.ts';
import BtnAddProyect from './Components/AgregarProyecto/AgregarProyecto.tsx';



const TablaProyectos = () => {
	// idioma de las opciones de la tabla
	const idioma = esES.components.MuiDataGrid.defaultProps.localeText
	const { token, actualizarTabla, setActualizarTabla } = useContext(GlobalContext)
	const [data, setData] = useState<typeDatosProyServer[]>([])
	const [columnModified, setcolumnModified] = useState<tpColumnModified>({
		idRow: 0,
		column: ''
	})
	const [idRowDelete, setIdRowDelete] = useState<GridRowId>(0)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [rowEdit, setRowEdit] = useState<typeDatosProyServer>({ ...data[0] })
	

	useEffect(() => {
		reloadTabla(token, setData)
		
	}, [actualizarTabla.tablaProyectos])

	const HandlerModified = (arg: any) => { setcolumnModified({ ['idRow']: arg.id, ['column']: arg.field }) }

	const contenidoPopover = <div className='PopoverProyects'>
		<span className='TitlePopover'>Estas seguro que deseas eliminar este proyecto?</span>
		<div className='BodyPopover '>

			<Button className='ButtonPop yes' onClick={() => DeleteElement(idRowDelete, token, actualizarTabla, setActualizarTabla)}>
				Si
			</Button>
		</div>
	</div>


	const EditarRow = (row: typeDatosProyServer, id: GridRowId) => {

		setRowEdit(row)
		setcolumnModified({ ...columnModified, ['idRow']: id })
		setShowModal(true)
	}

	

	// estrutura de columnas
	const columns: GridColDef[] = [
		{
			field: 'numElement',
			headerName: '',
			width:30
			
		},
		{
			field: 'identificador',
			headerName: 'Identificador',
			width: 100,
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
			field: 'estado',
			headerName: 'Estado',
			sortable: true,
			width: 80,
			editable: true,

		},
		{
			field: 'nombreOrg',
			headerName: 'Organizacion',
			type: 'text',
			width: 150,
			editable: true,
			align: "left"
		},
		{
			field: 'enUso',
			headerName: 'Uso',
			sortable: true,
			width: 80,
			editable: true,

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
				toolbar: () => {
					return <div className='HeaderTable'>
						<SelectorHeight />
						<BtnAddProyect/>
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
			onCellEditStop={HandlerModified}
			processRowUpdate={(updatedRow, paramsold) =>
				DatoModificado(token, updatedRow, paramsold, columnModified, data, actualizarTabla,setActualizarTabla)
			}
			onProcessRowUpdateError={(err) => console.log(err)}
			
		/>
		<ModalFormulario showModal={showModal} setShowModal={() => setShowModal(false)} Formulario={<FormularioProyectsUpdate data={rowEdit} id={columnModified.idRow} setShowModal={() => setShowModal(false)} />} />
	</Box>
}

export default TablaProyectos
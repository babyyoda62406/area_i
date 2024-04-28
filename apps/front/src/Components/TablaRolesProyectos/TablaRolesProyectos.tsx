import { Box } from '@mui/material'
import './TablaRolesProyectos.css'
import { DataGrid, esES, GridActionsCellItem, GridColDef, GridRowHeightParams, GridRowId } from '@mui/x-data-grid'
import { ItfTableRolesProyectos } from './interfaces/ItfTableRoles'
import { useContext, useEffect, useState } from 'react'
import SelectorHeight from '../Selectorheight/SelectorHeight'
import BtnAddRol from './Components/AgregarRol/AgregarRol'
import { getRolesProyectos } from './Services/getRolesProyectos'
import { GlobalContext } from '../../Contexts/GlobalContext'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { tpColumnModified } from '../TablaProyectos/types/tpcolumnas'
import { Button, Popover } from 'antd'

const TablaRolesProyectos = () => {
    
	const idioma = esES.components.MuiDataGrid.defaultProps.localeText
    const {token,actualizarTabla,setActualizarTabla} = useContext(GlobalContext)
	const [data, setData] = useState<ItfTableRolesProyectos[]>([])
	const [columnModified, setcolumnModified] = useState<tpColumnModified>({
		idRow: 0,
		column: ''
	})
	const [idRowDelete, setIdRowDelete] = useState<GridRowId>(0)
	const [showModal, setShowModal] = useState<boolean>(false)
	const [rowEdit, setRowEdit] = useState<ItfTableRolesProyectos>({ ...data[0] })

	useEffect(() => {
		getRolesProyectos(token, setData)
	}, [actualizarTabla])
    

	const EditarRow = (row: ItfTableRolesProyectos, id: GridRowId) => {

		setRowEdit(row)
		setcolumnModified({ ...columnModified, ['idRow']: id })
		setShowModal(true)
	}


	const contenidoPopover = <div className='PopoverOrganizations'>
		<span className='TitlePopover'>Estas seguro que deseas eliminar este proyecto?</span>
        <div className='BodyPopover '>
            
			<Button className='ButtonPop yes' onClick={() => {}}>
				Si
			</Button>
		</div>
	</div>

    const columns: GridColDef[] = [
        {
			field: 'numElement',
			headerName: 'Orden',
			width: 30,
			flex: 1,
			type:'text'
        },
        {
			field: 'nombre',
			headerName: 'Nombre',
			width: 30,
			flex: 1,
			type:'text'
        },
        {
			field: 'estado',
			headerName: 'Estado',
			width: 30,
			flex: 1,
			type:'text'
        },
        {
			field: 'enUso',
			headerName: 'Uso',
			width: 30,
			flex: 1,
			type:'boolean'
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Operaciones',
			width: 100,
			flex: 2,

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
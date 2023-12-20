import {  GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
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
	
	// {
	//   field: 'operaciones',
	//   type: 'actions',
	//   headerName: 'Actions',
	//   width: 100,
	//   cellClassName: 'actions',

	//     }
];
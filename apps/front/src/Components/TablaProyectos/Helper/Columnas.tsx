import {  GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 90 },
	{
		field: 'primer nombre',
		headerName: 'First name',
		width: 150,
		editable: true,
		filterable: true,

	},
	{
		field: 'segundo nombre',
		headerName: 'Last name',
		width: 150,
		editable: true,
	},
	{
		field: 'age',
		headerName: 'Age',
		type: 'number',
		width: 100,
		editable: true,
		align:"right"
	},
	{
		field: 'fullName',
		headerName: 'Full name',
		description: 'This column has a value getter and is not sortable.',
		sortable: true,
		width: 160,
		editable: true,
		// valueGetter: (params: GridValueGetterParams) =>
		//   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
	},
	// {
	//   field: 'operaciones',
	//   type: 'actions',
	//   headerName: 'Actions',
	//   width: 100,
	//   cellClassName: 'actions',

	//     }
];
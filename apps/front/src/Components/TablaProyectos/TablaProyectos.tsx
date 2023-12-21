import './TablaProyectos.css'
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './Helper/Columnas';
import { esES } from "@mui/x-data-grid/locales";
import { reloadTabla } from './services/ReloadTabla';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { Item } from '../../Interfaces/TableInterfaces';
import { DatoModificado } from './services/Update';
import { tpColumnModified } from './types/tpcolumnas';


const TablaProyectos = () => {
    // idioma de las opciones de la tabla
    const idioma = esES.components.MuiDataGrid.defaultProps.localeText
    const [actualizarTabla, setActualizarTabla] = useState<boolean>(false)
    const [data, setData] = useState<Item[]>([])
    const [columnModified, setcolumnModified] = useState<tpColumnModified>({
        idRow: 0,
        column: ''
    })

    const { token } = useContext(GlobalContext)

    useEffect(() => {
        reloadTabla(token, setData)

    }, [actualizarTabla])

    const HandlerModified = (arg: any) => { setcolumnModified({ ['idRow']: arg.id, ['column']: arg.field })}

    
    return <Box className='ContainerTable'  >

        <DataGrid
            className='TablaProyectos'
            localeText={idioma}
            rows={data}
            columns={columns}
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

            processRowUpdate={(updatedRow,paramsold) =>
                DatoModificado(token,updatedRow,paramsold,columnModified, data,setData)
            }
            onProcessRowUpdateError={(err)=>console.log(err)}
        />
    </Box>
}

export default TablaProyectos
import { FC, useContext, useEffect, useMemo, useState } from 'react'
import './TablaGeneralProyects.css'
import { typeDatosTabla, typeTablaElements } from '../../Types/TpHlayout'
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, } from 'mantine-react-table'
import { FetchService } from '../../Services/FetchService';
import { RutaServer } from '../../Helpers/RutaServer';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { ALerta } from '../../Services/Alerta';

const TablaGeneralProyects: FC<typeTablaElements> = () => {
    
    const { token } = useContext(GlobalContext)
    const [proyectosServer, setProyectosSever]= useState<typeDatosTabla[]>([])
    


    
        FetchService(RutaServer.getProyectos, {
            headers: {
                'Content-Type': 'application/json',
                "token":token
            }
        })
            .then(async (res:Response) => {
                
                switch (res.status) {
                    case 200:
                        let data = await res.json()
                        setProyectosSever(data)
                        
                        break
                    case 304:
                        let dataNM = await res.json()
                        setProyectosSever(dataNM)
                        
                        break
                    
                    default:
                        ALerta({title:'tiene algun error',icon:'warning'})
                        break
                }
        })

    

    
      
    
    const data: typeDatosTabla[] = proyectosServer
      
      
        
    const columns = useMemo<MRT_ColumnDef<typeDatosTabla>[]>(
        () => [
            {
                accessorKey: 'nombre', //access nested data with dot notation
                header: 'Nombre Proyecto',
            },
            {
                accessorKey: 'organizacion',
                header: 'Organizacion',
            },
            {
                accessorKey: 'id', //normal accessorKey
                header: 'Identificador del Proyecto',
                
            },
            
        ],
        [],
    );
      
    console.log(proyectosServer)
    console.log(data)

    const table = useMantineReactTable({
        columns,
        data,
        
    });
      
        
      
    
    return <div className="TablageneralProyects">

        <MantineReactTable table={table} />;
       
    </div>
}
export default TablaGeneralProyects
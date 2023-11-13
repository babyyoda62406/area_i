import { FC, useMemo } from 'react'
import './TablaGeneralProyects.css'
import { typeTablaElements } from '../../Types/TpHlayout'
import { MantineReactTable, useMantineReactTable, type MRT_ColumnDef, } from 'mantine-react-table'
import { DatosTablaPrueba, typeDatosPersons } from '../../Helpers/DatosTablaPrueba';

const TablaGeneralProyects: FC<typeTablaElements> = () => {
    
    

    
      
    
    const data: typeDatosPersons[] = DatosTablaPrueba
      
      
        
    const columns = useMemo<MRT_ColumnDef<typeDatosPersons>[]>(
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
                accessorKey: 'estado', //normal accessorKey
                header: 'Estado',
                
            },
            
        ],
        [],
    );
      
    

    const table = useMantineReactTable({
        columns,
        data,
        
    });
      
        
      
    
    return <div className="TablageneralProyects">

        <MantineReactTable table={table} />;
       
    </div>
}
export default TablaGeneralProyects
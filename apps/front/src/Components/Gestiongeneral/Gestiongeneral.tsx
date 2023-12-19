
import { typeGestionG } from '../../Types/TpHlayout';
import TablaProyectos from '../TablaProyectos/TablaProyectos';
// import TablageneralProyects from '../TablageneralProyects/TablaGeneralProyects'
import './GestionGeneral.css'
import { FC } from 'react';

const GestionGeneral:FC<typeGestionG> = () => {
    
    
    return <div className="GestionGeneral">
        
    {/* <TablageneralProyects/> */}

        <TablaProyectos/>
    </div>
}

export default GestionGeneral
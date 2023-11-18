
import { typeGestionG } from '../../Types/TpHlayout';
import TablageneralProyects from '../TablageneralProyects/TablaGeneralProyects'
import './GestionGeneral.css'
import { FC } from 'react';

const GestionGeneral:FC<typeGestionG> = () => {
    
    
    return <div className="GestionGeneral">
        
    <TablageneralProyects/>

    </div>
}

export default GestionGeneral
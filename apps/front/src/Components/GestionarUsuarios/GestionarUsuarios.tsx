
import { FC } from 'react'
import './GestionarUsuarios.css'
import { typeGestionarUsuarios } from '../../Types/TpHlayout'
import TablaUsuarios from '../TablaUsuarios/TablaUsuarios'

const GestionarUsuarios:FC<typeGestionarUsuarios> = () => {
    

    return <div className="GestionarUsuarios">
         <TablaUsuarios/> 
        
    </div>
}

export default GestionarUsuarios
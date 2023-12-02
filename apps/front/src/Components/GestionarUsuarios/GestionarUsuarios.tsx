
import { FC, useEffect, useState } from 'react'
import './GestionarUsuarios.css'
import { typeGestionarUsuarios } from '../../Types/TpHlayout'
import TablaUsuarios from '../TablaUsuarios/TablaUsuarios'
import { INTUsuario } from '../TablaUsuarios/interfaces/Usuario'

const GestionarUsuarios: FC<typeGestionarUsuarios> = () => {
    
    return <div className="GestionarUsuarios">
        <TablaUsuarios />
    </div>
}

export default GestionarUsuarios
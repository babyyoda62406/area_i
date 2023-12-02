import { FC, ReactElement, useContext, useEffect, useState } from 'react'
import './HomeLayout.css'
import { typeHomeLayout } from '../../Types/TpHlayout'
import Navbar from '../NavBar/Navbar'
import GestionGeneral from '../Gestiongeneral/Gestiongeneral'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../Contexts/GlobalContext'
import ModalFormulario from '../ModalFormulario/ModalFormulario'
import GestionarUsuarios from '../GestionarUsuarios/GestionarUsuarios'
import { ALerta } from '../../Services/Alerta'




const HomeLayout:FC<typeHomeLayout> = () => {
    
    const { token,showLayout,setShowLayout } = useContext(GlobalContext)
    // const [vista , setVista]= useState<ReactElement>()  
    let elemento:any = null
    
    
    
    
  
    const navigation = useNavigate()
    
   
    useEffect(() => {
        

      token ===''? navigation('/'):''
        
     },[])
    
    
    switch (true) {
        case showLayout.gestionProyectos:
            // se renderiza infinitamente 
            elemento = <GestionGeneral />
            break;
          case showLayout.gestionUsuarios:
            ALerta({title:'el gestor de usuarios', icon:'info'})
            // elemento =  <GestionarUsuarios />
            break;
        
        
    }
    // console.log(elemento)
    
    return <div className="HomeLayout">
        <Navbar />
         {elemento} 
         
        
        <ModalFormulario tipoModal='proyectos'/>
        
    </div>
}

export default HomeLayout
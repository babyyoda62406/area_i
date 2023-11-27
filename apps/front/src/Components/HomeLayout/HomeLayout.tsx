import { FC, useContext, useEffect } from 'react'
import './HomeLayout.css'
import { typeHomeLayout } from '../../Types/TpHlayout'
import Navbar from '../NavBar/Navbar'
import GestionGeneral from '../Gestiongeneral/Gestiongeneral'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../Contexts/GlobalContext'
import ModalFormulario from '../ModalFormulario/ModalFormulario'




const HomeLayout:FC<typeHomeLayout> = () => {
    
    const { token,showLayout } = useContext(GlobalContext)
    
    const navigation = useNavigate()
    let elemento 
   
    useEffect(() => {
        

      token ===''? navigation('/'):''
        
     },[])
    
    
    switch (true) {
        case showLayout.gestionGeneral:
            
            elemento = <GestionGeneral />
            break
        case showLayout.gestionUsuarios:
            console.log('la gestion personal esta activa')
            break
        
        
    }
    
    
    return <div className="HomeLayout">
        <Navbar />
        {elemento} 
        <ModalFormulario tipoModal='proyectos'/>
        
    </div>
}

export default HomeLayout
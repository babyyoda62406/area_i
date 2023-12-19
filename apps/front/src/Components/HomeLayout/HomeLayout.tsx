import { FC, useContext, useEffect } from 'react'
import './HomeLayout.css'
import { typeHomeLayout } from '../../Types/TpHlayout'
import Navbar from '../NavBar/Navbar'

import { Outlet, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../Contexts/GlobalContext'
import ModalFormulario from '../ModalFormulario/ModalFormulario'





const HomeLayout:FC<typeHomeLayout> = () => {
    
    const { token } = useContext(GlobalContext)
    // const [vista , setVista]= useState<ReactElement>()  
    
    
    
    
    
  
    const navigation = useNavigate()
    
   
    useEffect(() => {
        

      token ===''? navigation('/'):''
        
     },[])
    
    
    
    
    return <div className="HomeLayout">
        <Navbar />
         <Outlet/>
         
        
        <ModalFormulario tipoModal='proyectos'/>
        
    </div>
}

export default HomeLayout
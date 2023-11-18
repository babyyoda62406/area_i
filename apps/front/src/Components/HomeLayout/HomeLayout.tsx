import { FC, useContext, useEffect } from 'react'
import './HomeLayout.css'
import { typeHomeLayout } from '../../Types/TpHlayout'
import Navbar from '../NavBar/Navbar'
import GestionGeneral from '../Gestiongeneral/Gestiongeneral'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../Contexts/GlobalContext'




const HomeLayout:FC<typeHomeLayout> = () => {
    
    const { token } = useContext(GlobalContext)
    
    const navigation = useNavigate()

   
    useEffect(() => {
        

      token ===''? navigation('/'):''
        
     },[])
    
    
    
    return <div className="HomeLayout">
        <Navbar />
        <GestionGeneral/> 
        
    </div>
}

export default HomeLayout
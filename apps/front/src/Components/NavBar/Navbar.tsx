
import { FC, useContext } from 'react'
import './Navbar.css'
import { typeNavbar } from '../../Types/TpHlayout'
import Hamburguer from 'hamburger-react'
import TitleNavbar from '../TitleNavbar/TitleNavbar'
import Sidebar from '../Sidebar/Sidebar'

import { GlobalContext } from '../../Contexts/GlobalContext'
import HerramientasNavbar from '../HerramientasNavbar/herramientasNavbar'

const Navbar: FC<typeNavbar> = () => {

    const {setShowSidebar,showSidebar} = useContext(GlobalContext)
    

          

    return <div className="Navbar">

        <div className={`BtnHamburguer `}>
            
            <Hamburguer toggled={showSidebar} toggle={()=>setShowSidebar(!showSidebar)} />
        </div>

        
            <Sidebar Show={showSidebar} />
        
        <TitleNavbar />
        <HerramientasNavbar />

    </div>
}

export default Navbar

import { FC, useContext, useState } from 'react'
import './Navbar.css'
import { typeNavbar } from '../../Types/TpHlayout'
import Hamburguer from 'hamburger-react'
import TitleNavbar from '../TitleNavbar/TitleNavbar'
import HerramientasNavbar from '../HerramientasNavbar/herramientasNavbar'
import Sidebar from '../Sidebar/Sidebar'
import { MagicMotion } from 'react-magic-motion'
import { GlobalContext } from '../../Contexts/GlobalContext'

const Navbar: FC<typeNavbar> = () => {

    const {setShowSidebar} = useContext(GlobalContext)
    const [isOpen, setOpen] = useState(false)

        setShowSidebar(isOpen)

    return <div className="Navbar">

        <div className={`BtnHamburguer `}>
            
            <Hamburguer toggled={isOpen} toggle={setOpen} />
        </div>

        <MagicMotion>
            <Sidebar Show={isOpen} />
        </MagicMotion>
        <TitleNavbar />
        {/* <HerramientasNavbar /> */}

    </div>
}

export default Navbar
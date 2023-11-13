
import { FC, useState } from 'react'
import './Navbar.css'
import { typeNavbar } from '../../Types/TpHlayout'
import Hamburguer from 'hamburger-react'
import TitleNavbar from '../TitleNavbar/TitleNavbar'
import HerramientasNavbar from '../HerramientasNavbar/herramientasNavbar'
import Sidebar from '../Sidebar/Sidebar'
import { MagicMotion } from 'react-magic-motion'

const Navbar: FC<typeNavbar> = () => {

    const [isOpen, setOpen] = useState(false)



    return <div className="Navbar">

        <div className={`BtnHamburguer ${isOpen ? 'ActiveHamburguer' : 'DesactiveHamburguer'}`}>
            
            <Hamburguer toggled={isOpen} toggle={setOpen} />
        </div>

        <MagicMotion>
            <Sidebar Show={isOpen} />
        </MagicMotion>
        <TitleNavbar />
        <HerramientasNavbar />

    </div>
}

export default Navbar
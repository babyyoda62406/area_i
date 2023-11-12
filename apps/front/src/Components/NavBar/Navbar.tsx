
import { FC, useState } from 'react'
import './Navbar.css'
import { typeNavbar } from '../../Types/TpHlayout'
import Hamburguer from 'hamburger-react'
import TitleNavbar from '../TitleNavbar/TitleNavbar'
import HerramientasNavbar from '../HerramientasNavbar/herramientasNavbar'

const Navbar: FC<typeNavbar> = () => {
    
    const [isOpen, setOpen] = useState(false)

    
    
    return <div className="Navbar">
        <div className='BtnHamburguer'>
        <Hamburguer toggled={isOpen} toggle={setOpen}/>
        </div>
        <TitleNavbar />
        <HerramientasNavbar/>

    </div>
}

export default Navbar
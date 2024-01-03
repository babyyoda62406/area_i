import { FC } from 'react'
import { typeHerrmtasNavb } from '../../Types/TpHlayout'
import './HerramientasNavbar.css'
import LogoApp from '/src/assets/Logo/FINANCIUS_LOGO.fw.png'


const HerramientasNavbar:FC<typeHerrmtasNavb> = () => {
    
    return <div className="HerramientasNavbar">
        <img src={LogoApp} alt="" />
    </div>
}

export default HerramientasNavbar
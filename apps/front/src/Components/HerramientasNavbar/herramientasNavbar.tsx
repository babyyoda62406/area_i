import { FC } from 'react'
import { typeHerrmtasNavb } from '../../Types/TpHlayout'
import './HerramientasNavbar.css'
import SearchNavbar from '../SearchNavbar/SearchNavbar'

const HerramientasNavbar:FC<typeHerrmtasNavb> = () => {
    
    return <div className="HerramientasNavbar">
        <SearchNavbar/>
    </div>
}

export default HerramientasNavbar
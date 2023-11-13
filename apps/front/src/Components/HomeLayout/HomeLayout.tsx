import { FC } from 'react'
import './HomeLayout.css'
import { typeHomeLayout } from '../../Types/TpHlayout'
import Navbar from '../NavBar/Navbar'

import GestionGeneral from '../Gestiongeneral/Gestiongeneral';


const HomeLayout:FC<typeHomeLayout> = () => {
    

    return <div className="HomeLayout">
        <Navbar/>
        <GestionGeneral/>
    </div>
}

export default HomeLayout
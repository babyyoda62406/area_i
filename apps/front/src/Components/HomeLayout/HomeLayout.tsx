import { FC } from 'react'
import './HomeLayout.css'
import { typeHomeLayout } from '../../Types/TpHlayout'
import Navbar from '../NavBar/Navbar'


const HomeLayout:FC<typeHomeLayout> = () => {
    

    return <div className="HomeLayout">
        <Navbar/>

    </div>
}

export default HomeLayout
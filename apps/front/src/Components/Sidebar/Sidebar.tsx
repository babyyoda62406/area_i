
import { FC } from 'react'
import './Sidebar.css'
import { typeSidebar } from '../../Types/TpHlayout'


const Sidebar:FC<typeSidebar> = ({Show}) => {
    
    

    return <div className={`Sidebar ${Show ? 'ShowAside': 'CerrarAside'}`}>


    </div>
}

export default Sidebar
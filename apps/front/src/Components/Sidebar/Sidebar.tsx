
import { FC, useState } from 'react'
import './Sidebar.css'
import { typeSidebar } from '../../Types/TpHlayout'
import { OptionsSidebar } from '../../Helpers/OptionsSidebar'


const Sidebar:FC<typeSidebar> = ({Show}) => {
    
    const [seleccionado, setSeleccionado] = useState<number>(0)

    const mostrarElemento = (posicion:number) => {
        setSeleccionado(posicion)

        
    }
    

    return <div className={`Sidebar ${Show ? 'ShowAside': 'CerrarAside'}`}>
        {OptionsSidebar.map((element, index) => {
            const{nombre } = element

            return <span className={`ElementAside ${seleccionado===index?'ElementActive':''}`} onClick={()=>{mostrarElemento(index)}} key={index}>{ nombre}</span>
        })}

    </div>
}

export default Sidebar
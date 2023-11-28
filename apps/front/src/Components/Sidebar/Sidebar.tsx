
import { FC, useContext, useState } from 'react'
import './Sidebar.css'
import { typeSidebar } from '../../Types/TpHlayout'

import { Collapse, CollapseProps } from 'antd'
import { itemsASide } from '../../Helpers/OptionsSidebar'
import {  typeSubElAside } from '../../Types/UseStates'
import { GlobalContext } from '../../Contexts/GlobalContext'
import { HandlerSidebar } from './Services/ServicesSidebar'


const Sidebar: FC<typeSidebar> = ({ Show }) => {

  const {showModal,setShowModal,showLayout,setShowLayout} = useContext(GlobalContext)

  const ElementsStyle = {
    marginBottom: '',
    borderRadius: 'none'

  }

  const [elementActive, setElementActive] = useState<typeSubElAside>({
    element: ''
  })

/**
 * 
 * @param arg:   nombre del elemento k se kiere activar en el aside
 * @param elementFunc 
 */
  const activarSubItem = (arg: string, elementFunc: string) => {
    
    HandlerSidebar(elementFunc,showLayout,setShowLayout,setShowModal,showModal)

    elementActive.element == arg ? setElementActive({...elementActive, ['element']:''}):setElementActive((prevelementActive) => {
      return {
        ...prevelementActive,
        ['element']:arg
      }
    })
  }
    

/**
 * recibe un array de objetos para generar los componentes del sidebar
 */
  
  const ElementSidebar: CollapseProps['items'] = itemsASide.map((element, index) => {
    return {
      key: index,
      className: 'ElementCollapse',
      label: element.name,
      /** 
       * children: subitems del sidebar
       * recorre el array de objetos de children
       * se genera un span
       * onClick: activa el elemento en el sidebar
       * onClickCapture: hace una llamada a una funcion
      */
      children: element.children.map((elemento, index) => {
        
        return <span  key={index} onClickCapture={()=>console.log('se ha ejecutado')} className={`SubElementCollapse ${elementActive.element == elemento.name ? "SubElementActive" : ''}`}  onClick={()=>{activarSubItem(elemento.name,elemento.optionFunc)}} >{elemento.name }</span>
      }),
      style: ElementsStyle,
      
    }
  })


  return <div className={`Sidebar ${Show ? 'ShowAside' : 'CerrarAside'}`}>

    <Collapse accordion  expandIconPosition='end' size='large' items={ElementSidebar} defaultActiveKey={['0']}>
    </Collapse>

  </div>
}

export default Sidebar
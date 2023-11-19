
import { FC, useContext, useState } from 'react'
import './Sidebar.css'
import { typeSidebar } from '../../Types/TpHlayout'

import { Collapse, CollapseProps } from 'antd'
import { itemsASide } from '../../Helpers/OptionsSidebar'
import { typeShowModal, typeSubElAside } from '../../Types/UseStates'
import { GlobalContext } from '../../Contexts/GlobalContext'


const Sidebar: FC<typeSidebar> = ({ Show }) => {

  const {setShowModal} = useContext(GlobalContext)

  const ElementsStyle = {
    marginBottom: '',
    borderRadius: 'none'

  }

  const [elementActive, setElementActive] = useState<typeSubElAside>({
    element: ''
  })


  /**
   * 
   * @param arg 
   *nombre del elemento k se kiere activar en el aside
   */
  const activarSubItem = (arg: string) => {
    setElementActive((prevelementActive) => {
      return {
        ...prevelementActive,
        ['element']:arg
      }
    })
  }


/**
 * 
 * @param arg 
 * arg: tipo de modal a mostrar
 */
  const mostrarModal = (arg:string) => {
    setShowModal((prevShowModal: typeShowModal) => {
      return{...prevShowModal,
      [arg]:true,}
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
        
        return <span key={index}  className={`SubElementCollapse ${elementActive.element == elemento.name ? "SubElementActive" : ''}`}  onClick={()=>{activarSubItem(elemento.name)}} >{elemento.name }</span>
      }),
      style: ElementsStyle
    }
  })


  return <div className={`Sidebar ${Show ? 'ShowAside' : 'CerrarAside'}`}>

    <Collapse accordion expandIconPosition='end' size='large' items={ElementSidebar} defaultActiveKey={['1']}>
    </Collapse>

  </div>
}

export default Sidebar
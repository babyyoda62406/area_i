
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


  const activarSubItem = (arg: string) => {
    setElementActive((prevelementActive) => {
      return {
        ...prevelementActive,
        ['element']:arg
      }
    })
  }


  const mostrarModal = (arg:string) => {
    setShowModal((prevShowModal: typeShowModal) => {
      return{...prevShowModal,
      [arg]:true,}
    })

  } 



  const ElementSidebar: CollapseProps['items'] = itemsASide.map((element, index) => {
    return {
      key: index,
      className: 'ElementCollapse',
      label: element.name,
      children: element.children.map((elemento, index) => {
        
        // onClickCapture={() => mostrarModal('proyectos')}
        // className={`SubElementCollapse ${elementActive.element == elemento ? "SubElementActive" : ''}`} onClick={() => { setElementActive({elemento.name }) }}
        return <span key={index} className={`SubElementCollapse ${elementActive.element == elemento.name ? "SubElementActive" : ''}`}  onClick={()=>{activarSubItem(elemento.name)}} >{elemento.name }</span>
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
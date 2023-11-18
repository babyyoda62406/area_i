
import { FC, useState } from 'react'
import './Sidebar.css'
import { typeSidebar } from '../../Types/TpHlayout'

import { Collapse, CollapseProps } from 'antd'
import { itemsASide } from '../../Helpers/OptionsSidebar'
import { typeSubElAside } from '../../Types/UseStates'


const Sidebar: FC<typeSidebar> = ({ Show }) => {

  const ElementsStyle = {
    marginBottom: '',
    borderRadius: 'none'

  }

  const [elementActive, setElementActive] = useState<typeSubElAside>({
    element: ''
  })

  const ElementSidebar: CollapseProps['items'] = itemsASide.map((element, index) => {
    return {
      key: index,
      className: 'ElementCollapse',
      label: element.name,
      children: element.children.map((elemento, index) => {

        return <span key={index} className={`SubElementCollapse ${elementActive.element == elemento ? "SubElementActive" : ''}`} onClick={() => { setElementActive({ element: elemento }) }}>{elemento}</span>
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
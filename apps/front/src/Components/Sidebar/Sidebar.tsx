
import { FC } from 'react'
import './Sidebar.css'
import { typeSidebar } from '../../Types/TpHlayout'

import { Collapse, CollapseProps } from 'antd'
import { itemASide1, itemASide2, itemASide3 } from '../../Helpers/OptionsSidebar'


const Sidebar: FC<typeSidebar> = ({ Show }) => {

  const ElementsStyle = {
    marginBottom: '',
    backgroundColor: '#bec8d1',


  }

  const ElementSidebar: CollapseProps['items'] = [

    {
      key: '1',
      className: 'ElementCollapse',
      label: itemASide1.name,
      children: <p className='FuncionCollapse'>{itemASide1.children}</p>,
      style: ElementsStyle,
    },
    {
      key: '2',
      className: 'ElementCollapse',
      label: itemASide2.name,
      children: <p>{itemASide2.children}</p>,
      style: ElementsStyle,
    },
    {
      key: '3',
      className: 'ElementCollapse',
      label: itemASide3.name,
      children: <p>{itemASide3.children}</p>,
      style: ElementsStyle,
    },

  ]



  return <div className={`Sidebar ${Show ? 'ShowAside' : 'CerrarAside'}`}>
    <Collapse accordion expandIconPosition='end' size='large' items={ElementSidebar} defaultActiveKey={['1']}>
    </Collapse>

  </div>
}

export default Sidebar
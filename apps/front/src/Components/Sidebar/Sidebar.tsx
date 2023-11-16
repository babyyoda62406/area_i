
import { FC } from 'react'
import './Sidebar.css'
import { typeSidebar } from '../../Types/TpHlayout'

import { Collapse, CollapseProps } from 'antd'
import { itemASide1, itemASide2, itemASide3 } from '../../Helpers/OptionsSidebar'


const Sidebar:FC<typeSidebar> = ({Show}) => {
    
    const ElementsStyle = {
        // marginBottom: '100px'
    }   

    const ElementSidebar:CollapseProps['items'] = [
    
        {
            key: '1',
            label: itemASide1.name,
            children: <p>{itemASide1.children}</p>,
            style:ElementsStyle,
          },
          {
            key: '2',
            label: itemASide2.name,
            children: <p>{itemASide2.children}</p>,
          },
          {
            key: '3',
            label: itemASide3.name,
            children: <p>{itemASide3.children}</p>,
          },
        
    ]

    

    return <div className={`Sidebar ${Show ? 'ShowAside': 'CerrarAside'}`}>
        <Collapse accordion items={ElementSidebar} defaultActiveKey={['1']}>
        </Collapse>    

    </div>
}

export default Sidebar
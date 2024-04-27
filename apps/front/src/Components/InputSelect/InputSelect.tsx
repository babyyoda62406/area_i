import { FC } from 'react'
import './InputSelect.css'

import { Select, Space } from 'antd'
import { tpInputSelect } from '../../Types/CMP'


const InputSelect: FC<tpInputSelect> = ({   data,updateSize,defaultValue }) => {

    const handleChange = (arg: string) => {
        updateSize(arg)
    }

    return <div className="InputSelect" >
        <Space wrap  >

            <Select
                // style={{background:'red'}}
                className='InputSelectItem'
                style={{ width:'max-content',minWidth:110, height:25,fontSize:'smaller' }}
                allowClear={false}
                options={data}
                defaultValue={defaultValue }
                defaultActiveFirstOption={true}
                onChange={handleChange}
                />
            
            
        </Space>
    </div>
}

export default InputSelect
import { FC } from 'react'
import './InputForm.css'
import { tpInputForm } from '../../Types/CMP'

const InputForm:FC<tpInputForm> = ({label,tipo,evento}) => {
    

    return <div className={`InputForm ${tipo==='submit'?'InputEnviar':''}`}>
        <label>{label }</label>
        <input type={tipo} onChange={(event) => { evento(event.target.value) }} />
    
    </div>
}

export default InputForm
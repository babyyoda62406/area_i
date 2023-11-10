import { FC } from 'react'
import './LoginLayout.css'
import { typeLoginLayout } from '../../Types/CMP'
import FormularioLogin from '../FormularioLogin/FormularioLogin'
import {useForm} from 'react-hook-form'

const LoginLayout:FC<typeLoginLayout> = () => {
    
    const {register, handleSubmit} = useForm()

    return <div className="LoginLayout">
        
        <FormularioLogin registro={register } gestionForm={handleSubmit}  />

    </div>
}

export default LoginLayout
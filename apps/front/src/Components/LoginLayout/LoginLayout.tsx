import { FC } from 'react'
import './LoginLayout.css'
import { typeLoginLayout } from '../../Types/CMP'
import FormularioLogin from '../FormularioLogin/FormularioLogin'





const LoginLayout: FC<typeLoginLayout> = () => {



    return <div className="LoginLayout">
        <div className='FormLogin'>
            


            <FormularioLogin />

        </div>


    </div>
}

export default LoginLayout
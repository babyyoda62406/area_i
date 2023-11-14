import { FC } from 'react'
import './LoginLayout.css'
import { typeLoginLayout } from '../../Types/CMP'
import FormularioLogin from '../FormularioLogin/FormularioLogin'

import Bienvenida from '../Bienvenida/Bienvenida'




const LoginLayout: FC<typeLoginLayout> = () => {



    return <div className="LoginLayout">
        <div className='FormLogin'>
            <Bienvenida />


            <FormularioLogin />

        </div>


    </div>
}

export default LoginLayout
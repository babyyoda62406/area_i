import { FC, useState } from 'react'
import './LoginLayout.css'
import { typeLoginLayout } from '../../Types/CMP'
import FormularioLogin from '../FormularioLogin/FormularioLogin'

import Bienvenida from '../Bienvenida/Bienvenida'
import FormularioLogout from '../FormularioLogout/FormularioLogout'
import { MagicMotion } from 'react-magic-motion'



const LoginLayout: FC<typeLoginLayout> = () => {

    const [tipo, setTipo] = useState<boolean>(false)

    const cambiarForm = () => {
        setTipo(!tipo)
    }

    return <div className="LoginLayout">
        <div className='FormLogin'>
            <Bienvenida />
            <MagicMotion transition={{ duration: 5000, ease: "easeInOut" }}>
                <div className='ItemViews'>
                    <span className={`ItemIniciar ${!tipo ? 'ItemLoginActive' : ''}`} onClick={() => { cambiarForm() }} >Iniciar Sesion</span>
                    <span className={`ItemRegistrar ${tipo ? 'ItemLoginActive' : ''}`} onClick={() => { cambiarForm() }}> Registrarse</span>
                </div>
            </MagicMotion >
            
                {tipo ? <FormularioLogout /> : <FormularioLogin />}
            
        </div>


    </div>
}

export default LoginLayout
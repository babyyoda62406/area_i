import { FC, useState } from 'react'
import './LoginLayout.css'
import { typeLoginLayout } from '../../Types/CMP'
import FormularioLogin from '../FormularioLogin/FormularioLogin'
import { useForm } from 'react-hook-form'
import Bienvenida from '../Bienvenida/Bienvenida'
import FormularioLogout from '../FormularioLogout/FormularioLogout'



const LoginLayout: FC<typeLoginLayout> = () => {

    const [tipo, setTipo] = useState<boolean>(false)
    const { register, handleSubmit } = useForm()

    const cambiarForm = () => {
        setTipo(!tipo)
    }

    return <div className="LoginLayout">
        <div className='FormLogin'>
            <Bienvenida />
            <div className='ItemViews'>
                <span className={`ItemIniciar ${!tipo?'ItemLoginActive':''}`} onClick={()=>{cambiarForm()}} >Iniciar Sesion</span>
                <span className={`ItemRegistrar ${tipo?'ItemLoginActive':''}`} onClick={()=>{cambiarForm()}}> Registrarse</span>
            </div>
            {tipo?<FormularioLogout registro={register} gestionForm={handleSubmit}/>:<FormularioLogin registro={register} gestionForm={handleSubmit} />}

        </div>
        

    </div>
}

export default LoginLayout
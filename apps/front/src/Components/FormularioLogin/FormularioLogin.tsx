import { FC } from 'react'
import './FormularioLogin.css'
import { typeFormularioLogin } from '../../Types/CMP'

const FormularioLogin: FC<typeFormularioLogin> = ({ registro, gestionForm }) => {


    const GestionarDatos = (data: any) => {
        console.log(data)
    }

    return <div className="FormularioLogin">

        <form action="" onSubmit={gestionForm(GestionarDatos)}>
            <div className='ElementsFormLogin'>
                <label htmlFor="">Cuenta de Correo</label>
                <input type="text" autoFocus {...registro('email')} />
            </div>
            <div className='ElementsFormLogin'>
                <label htmlFor="">Contraseña</label>
                <input type="text" {...registro('password')} />
            </div>
            <div className='EnvioLogin'>
                <input type="submit" value='Entrar' /></div>
        </form>
    </div>
}

export default FormularioLogin
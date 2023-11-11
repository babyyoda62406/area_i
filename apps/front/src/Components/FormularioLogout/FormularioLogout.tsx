import { FC } from 'react'
import './FormularioLogout.css'
import { typeFormularioLogout } from '../../Types/CMP'

const FormularioLogout:FC<typeFormularioLogout> = ({registro, gestionForm}) => {
    
    const GestionarDatos = (data:object) => {
        console.log(data)
    }

    return <form className="FormularioLogout" onSubmit={gestionForm(GestionarDatos)}>
            <div className='ElementsFormLogout'>
                <label htmlFor="">Cuenta de Correo</label>
                <input type="text" autoFocus {...registro('email')} />
            </div>
            <div className='ElementsFormLogout'>
                <label htmlFor="">Contraseña</label>
                <input type="text" {...registro('password')} />
            </div>
            <div className='EnvioLogout'>
                <input type="submit" value='Entrar' /></div>


    </form>
}

export default FormularioLogout
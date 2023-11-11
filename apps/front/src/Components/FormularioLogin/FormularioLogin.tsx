import { FC } from 'react'
import './FormularioLogin.css'
import { typeFormularioLogin } from '../../Types/CMP'


const FormularioLogin: FC<typeFormularioLogin> = () => {


    const GestionarDatos = (event:object) => {
        console.log(event)
    }

    return <form action="" className='FormularioLogin' onSubmit={(event)=>GestionarDatos(event)}>
            <div className='ElementsFormLogin'>
                <label htmlFor="">Cuenta de Correo</label>
                <input type="text"  />
            </div>
            <div className='ElementsFormLogin'>
                <label htmlFor="">Contraseña</label>
                <input type="text"  />
            </div>
            <div className='EnvioLogin'>
                <input type="submit" value='Entrar' /></div>
        </form>
    
}

export default FormularioLogin
import { FC } from 'react'
import './FormularioLogout.css'
import { typeFormularioLogout } from '../../Types/CMP'

const FormularioLogout:FC<typeFormularioLogout> = () => {
    
    const GestionarDatos = (data:object) => {
        console.log(data)
    }

    return <form className="FormularioLogout" onSubmit={()=>GestionarDatos}>
            <div className='ElementsFormLogout'>
                <label htmlFor="">Cuenta de Correo</label>
                <input type="text" autoFocus  />
            </div>
            <div className='ElementsFormLogout'>
                <label htmlFor="">Contraseña</label>
                <input type="text"  />
            </div>
            <div className='EnvioLogout'>
                <input type="submit" value='Entrar' /></div>


    </form>
}

export default FormularioLogout
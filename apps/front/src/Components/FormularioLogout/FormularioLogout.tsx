import { FC, useState } from 'react'
import './FormularioLogout.css'
import { typeFormularioLogout } from '../../Types/CMP'
import { ValidarCampos } from '../../Services/ValidarCampos'
import { typeDatosForm, typeErrorForm } from '../../Types/UseStates'
import { MdDangerous as IconError } from 'react-icons/md'

const FormularioLogout: FC<typeFormularioLogout> = () => {

    const [errorForm, setErrorForm] = useState<typeErrorForm>({
        'email': false,
        'password': false
    })

    const [datosForm, setDatosForm] = useState<typeDatosForm>({
        "email": '',
        "password": ''
    })


    /** 
     * 
     * @param event
     * prevenir el  onsubmit
     * se controla la validacion del formulario  
     */
    const GestionarDatos = (event: any) => {
        event.preventDefault()
        setErrorForm((prevDatos: object) => ({
            ...prevDatos,
            ['email']: false,
            ['password']: false
        }))

        const errorEmail = ValidarCampos('email', datosForm.email);
        const errorPassword = ValidarCampos('password', datosForm.password)


        if (!errorPassword && !errorEmail) {
            const datosEnviar = new FormData()
            datosEnviar.set('email', datosForm.email)
            datosEnviar.set('password', datosForm.password)

        } else {
            errorEmail ? setErrorForm({ ['email']: errorEmail, ['password']: errorPassword }) : ''
            errorPassword ? setErrorForm({ ['email']: errorEmail, ['password']: errorPassword }) : ''

        }
    }

    /**
     * guarda todos los datos k se introducen en el formulario
     * @param clave 
     * @param value 
     */
    const GuardarDatos = (clave: keyof typeDatosForm, value: string) => {
        setDatosForm((prevDatos) => ({
            ...prevDatos,
            [clave]: value,
        }));

    }

    /**
     * FUncion para eliminar el componente visual del error
     * recibe el tipo de input como clave 
     * y el valor booleano k deberia ser falso
     * @param clave 
     * @param value 
     */
    const eliminarError = (clave: keyof typeErrorForm, value: boolean) => {

        setErrorForm((prevDatos) => ({
            ...prevDatos,
            [clave]: value,
        }));
    }

    return <form className="FormularioLogout" onSubmit={(event) => GestionarDatos(event)}>

        <div className='ElementsFormLogout'>

            <label htmlFor="">Cuenta de Correo</label>
            
            <input type="email" autoFocus className='InpEmailOut' onChange={(arg) => { GuardarDatos('email', arg.target.value) }} />
            
            {errorForm.email === true ? <span className='IconErrorEmOut' onClick={() => { eliminarError('email', false) }}><IconError /></span> : ''}
        </div>

        <div className='ElementsFormLogout'>
            <label htmlFor="">Contraseña</label>
            <input type="text" className='InpPassOut' onChange={(arg) => { GuardarDatos('password', arg.target.value) }} />
            
            {errorForm.password === true ? <span className='IconErrorPsOut' onClick={() => { eliminarError('password', false) }}><IconError /></span> : ''}

        </div>

        <div className='EnvioLogout'>
            <input type="submit" value='Entrar' />
        </div>


    </form>
}

export default FormularioLogout
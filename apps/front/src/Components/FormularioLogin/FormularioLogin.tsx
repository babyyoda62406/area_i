import { FC, useState } from 'react'
import './FormularioLogin.css'
import { typeFormularioLogin } from '../../Types/CMP'
import { ValidarCampos } from '../../Services/ValidarCampos'
import { typeDatosForm } from '../../Types/UseStates'
import {MdDangerous as IconError} from 'react-icons/md'


const FormularioLogin: FC<typeFormularioLogin> = () => {

    const [errorForm, setErrorForm] = useState<number>(0)

    const [ datosForm, setDatosForm ] = useState<typeDatosForm>({
        "email":'',
        "password":''
    })
    

    /** 
     * 
     * @param event
     * prevenir el  onsubmit
     * se controla la validacion del formulario  
     */
    const GestionarDatos = (event: any) => {
        event.preventDefault()
        setErrorForm(0)
        
        const errorEmail = ValidarCampos('email', datosForm.email);
        const errorPassword = ValidarCampos('password', datosForm.password)


        if (!errorPassword && !errorEmail) {
            const datosEnviar = new FormData()
            datosEnviar.set('email', datosForm.email)
            datosEnviar.set('password', datosForm.password)
            
        } else {
            errorEmail ?    setErrorForm(1) : ''
            errorPassword ? setErrorForm(2) : ''
        
        }
    }

    const GuardarDatos = (clave:keyof typeDatosForm, value:string) => {
        setDatosForm((prevDatos) => ({
            ...prevDatos,
            [clave]: value,
          }));

    }

    return <form action="" className='FormularioLogin' onSubmit={(event) => GestionarDatos(event)}>
        <div className='ElementsFormLogin'>
            <label htmlFor="">Cuenta de Correo</label>
            <input type="text" onChange={(arg)=>{GuardarDatos('email',arg.target.value)}} />
        </div>
        <div className='ElementsFormLogin'>
            <label htmlFor="">Contraseña</label>
            <input type="text" onChange={(arg)=>{GuardarDatos('password',arg.target.value)}}/>
        </div>
        <div className='EnvioLogin'>
            <input type="submit" value='Entrar' /></div>
    </form>

}

export default FormularioLogin
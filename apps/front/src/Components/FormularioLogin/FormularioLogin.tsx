import { FC, useContext, useState } from 'react'
import './FormularioLogin.css'
import { typeFormularioLogin } from '../../Types/CMP'
import { ValidarCampos } from '../../Services/ValidarCampos'
import { typeDatosForm, typeErrorForm } from '../../Types/UseStates'
import { MdDangerous as IconError } from 'react-icons/md'
import { FetchService } from '../../Services/FetchService'
import { RutaServer } from '../../Helpers/RutaServer'
import { GlobalContext } from '../../Contexts/GlobalContext'
import { ALerta } from '../../Services/Alerta'


const FormularioLogin: FC<typeFormularioLogin> = () => {

    const {setToken} = useContext(GlobalContext)


    /**
     * hook para gestionar si alguna validacion da
     *  error enc aso de true es k hay un campo invalido
     */
    const [errorForm, setErrorForm] = useState<typeErrorForm>({
        'email': false,
        'password': false
    })

    const [datosForm, setDatosForm] = useState<typeDatosForm>({
        "correo": '',
        "password": ''
    })


    /**
         * guarda los datos k se introducen en el formulario
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

        const errorEmail = ValidarCampos('email', datosForm.correo);
        const errorPassword = ValidarCampos('password', datosForm.password)


        if (!errorPassword && !errorEmail) {


            /**
             * envio de datos para inciar sesion en el usuario via post 
             *  */
            FetchService(RutaServer.iniciarUsuario, { method: "POST", body: JSON.stringify(datosForm) })
                .then(async (res) => {
                    

                    switch (res.status) {
                        case 200:
                             const {token, message:title} = await res.json();
                            setToken(token)
                            
                            ALerta({title,position:'top-right'})
                            
                            break;  
                        case 404:
                            const {message:error} = await res.json();
                            ALerta({title:error,icon:'error'})
                            
                            break;
                        
                        default:

                            alert(`Status desconocido ${res.status}`)
                    }
                })
                .catch((err: Error) => {
                    // Desarrollo 
                    alert(err)
                    console.log(err)
                })


        } else {
            errorEmail ? setErrorForm({ ['email']: errorEmail, ['password']: errorPassword }) : ''
            errorPassword ? setErrorForm({ ['email']: errorEmail, ['password']: errorPassword }) : ''

        }
    }



    return <form action="" className='FormularioLogin' onSubmit={(event) => GestionarDatos(event)}>
        <div className='ElementsFormLogin'>
            <label htmlFor="">Cuenta de Correo</label>

            <input type="email" required className='InpEmailIn' onChange={(arg) => { GuardarDatos('correo', arg.target.value) }} />

            {errorForm.email === true ? <span className='IconErrorEmIn' onClick={() => { eliminarError('email', false) }}><IconError /></span> : ''}
        </div>
        <div className='ElementsFormLogin'>
            <label htmlFor="">Contraseña</label>

            <input type="text" required className='InpPassIn' onChange={(arg) => { GuardarDatos('password', arg.target.value) }} />

            {errorForm.password === true ? <span className='IconErrorPsIn' onClick={() => { eliminarError('password', false) }}><IconError /></span> : ''}
        </div>
        <div className='EnvioLogin'>
            <input type="submit" value='Entrar' /></div>
    </form>

}

export default FormularioLogin
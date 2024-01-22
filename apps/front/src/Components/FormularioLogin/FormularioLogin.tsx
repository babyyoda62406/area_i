import { FC, useContext, useState } from 'react'
import './FormularioLogin.css'
import { typeFormularioLogin } from '../../Types/CMP'
import { ValidarCampos } from '../../Services/ValidarCampos'
import { typeDatosForm } from '../../Types/UseStates'

import { FetchService } from '../../Services/FetchService'
import { RutaServer } from '../../Helpers/RutaServer'
import { GlobalContext } from '../../Contexts/GlobalContext'
import { ALerta } from '../../Services/Alerta'
import { useNavigate } from 'react-router-dom'
import { CookieToken } from '../../Services/CookieToken'


const FormularioLogin: FC<typeFormularioLogin> = () => {

    const navigation = useNavigate()
    const { setToken } = useContext(GlobalContext)

    const [formState, setFormState] = useState({
        loading: false,
        message: 'Iniciar',
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
     * 
     * @param event
     * prevenir el  onsubmit
     * se controla la validacion del formulario  
     */
    const GestionarDatos = (event: any) => {
        event.preventDefault()

        const errorEmail = ValidarCampos('email', datosForm.correo);
        const errorPassword = ValidarCampos('password', datosForm.password)

        if (!errorPassword && !errorEmail) {
            setFormState({ loading: true, message: 'Autenticando' })

            /**
             * envio de datos para inciar sesion en el usuario via post 
             *  */
            FetchService(RutaServer.iniciarSesion, { method: "POST", body: JSON.stringify(datosForm) })
                .then(async (res) => {


                    switch (res.status) {
                        case 200:
                            const { token, message: title } = await res.json();

                            setToken(token)
                            CookieToken(token)
                            ALerta({ title, position: 'top-right' })
                            setTimeout(() => {
                                navigation('Home')
                            }, 1000);
                            break;
                        
                        case 400:
                            const { message: cliError } = await res.json();
                            ALerta({ text: cliError })
                            setFormState({ loading: false, message: 'Iniciar' })
                            break;

                        case 401:
                            const { message: passError } = await res.json();
                            ALerta({ title: passError, icon: 'error', })
                            setFormState({ loading: false, message: 'Iniciar' })
                            break;

                        case 404:
                            const { message: error } = await res.json();
                            ALerta({ title: error, icon: 'error' })
                            setFormState({ loading: false, message: 'Iniciar' })

                            break;
                        default:

                            alert(`Status desconocido ${res.status}`)
                            setFormState({ loading: false, message: 'Iniciar' })
                    }
                })
                .catch((err: Error) => {
                    // Desarrollo 
                    alert(err)
                    setFormState({ loading: false, message: 'Iniciar' })
                    console.log(err)
                })


        } else {
            setFormState({ loading: false, message: 'Iniciar' })
            ALerta({ text: 'por favor rectifique su informacion de sesion', icon: 'error', position: 'center' })
        }
    }



    return (
        <div className="LoginForm">

            <div className="ContentForm">
                <form className={formState.loading ? 'login loading' : 'login'} onSubmit={GestionarDatos}>
                    <p className="title">Iniciar Sesion</p>
                    <input type="email" required className="InputLogin" placeholder="Correo" autoFocus onChange={(e => GuardarDatos('correo', e.target.value))} />
                    <i className="fa fa-user"></i>
                    <input type="password" required className="InputLogin" placeholder="Contraseña" onChange={(e => GuardarDatos('password', e.target.value))} />
                    <i className="fa fa-key"></i>
                    <button className="BTNLogin">
                        <i className="spinner"></i>
                        <span className="state">{formState.message}</span>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default FormularioLogin
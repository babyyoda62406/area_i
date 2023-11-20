import { FC, useContext, useState } from 'react'
import './FormularioLogout.css'
import { typeFormularioLogout } from '../../Types/CMP'
import { ValidarCampos } from '../../Services/ValidarCampos'
import { typeDatosForm, typeErrorForm } from '../../Types/UseStates'
import { MdDangerous as IconError } from 'react-icons/md'
import { FetchService } from '../../Services/FetchService'
import { RutaServer } from '../../Helpers/RutaServer'
import { ALerta } from '../../Services/Alerta'
import { GlobalContext } from '../../Contexts/GlobalContext'
import { useNavigate } from 'react-router-dom'



const FormularioLogout: FC<typeFormularioLogout> = () => {
    const navigate = useNavigate()
    const {setToken}= useContext(GlobalContext)

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
            const datosEnviar = new FormData()
            datosEnviar.set('email', datosForm.correo)
            datosEnviar.set('password', datosForm.password)

            FetchService(RutaServer.registrarUsuario, { method: "POST", body: JSON.stringify(datosForm) })
                .then(async (res: Response) => {
                    switch (res.status) {
                        case 200:
                            const {message} = await res.json()
                            ALerta({ title: message })
                            
                            console.log(res.status)
                            break;
                        
                        case 201:
                            console.log(res.status)
                            const {token, message:title} = await res.json()
                            setToken(token)
                            setInterval(() => {
                                navigate('Home',{replace:false,unstable_viewTransition:true})
                            },2000)
                            
                            ALerta({ title: title })


                            break

                        case 400:
                            const {message:titulo } = await res.json()
                            ALerta({ title: titulo, icon:'error'})
                            break

                        default:
                            console.log(res.status)
                            alert(res.status)
                            break;
                    }
            })

        } else {
            errorEmail ? setErrorForm({ ['email']: errorEmail, ['password']: errorPassword }) : ''
            errorPassword ? setErrorForm({ ['email']: errorEmail, ['password']: errorPassword }) : ''

        }
    }

    

    return <form className="FormularioLogout" onSubmit={(event) => GestionarDatos(event)}>

        <div className='ElementsFormLogout'>

            <label htmlFor="">Cuenta de Correo</label>
            
            <input type="email" required autoFocus className='InpEmailOut' onChange={(arg) => { GuardarDatos('correo', arg.target.value) }} />
            
            {errorForm.email === true ? <span className='IconErrorEmOut' onClick={() => { eliminarError('email', false) }}><IconError /></span> : ''}
        </div>

        <div className='ElementsFormLogout'>
            <label htmlFor="">Contraseña</label>
            <input type="text" required className='InpPassOut' onChange={(arg) => { GuardarDatos('password', arg.target.value) }} />
            
            {errorForm.password === true ? <span className='IconErrorPsOut' onClick={() => { eliminarError('password', false) }}><IconError /></span> : ''}

        </div>

        <div className='EnvioLogout'>
            <input type="submit" value='Entrar' />
        </div>


    </form>
}

export default FormularioLogout
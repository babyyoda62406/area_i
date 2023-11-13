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

    // const {token, setToken} = useContext(GlobalContext)


    /**
     * hook para gestionar si alguna validacion da
     *  error enc aso de true es k hay un campo invalido
     */
    const [errorForm, setErrorForm] = useState<typeErrorForm>({
        'email': false,
        'password': false
    })

    const [datosForm, setDatosForm] = useState<typeDatosForm>({
        "email": '',
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

        ALerta({
            titulo: 'hola',
            texto: '',
            icono: 'success',
            button: false,
            showConfirmButton:false,
            tiempo: 2000,
            position:'top-right'
        })



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

            /**
             * envio de datos para inciar sesion en el usuario via post 
             *  */
            // FetchService(RutaServer.iniciarUsuario, {
            //     method: 'Post',
            //     body: datosEnviar,
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // }, (res: JSON) => {
            //     /**
            //      * aki se deberia de gestionar el token y guardar cosas de la respuesat del server
            //      */
            //     console.log(res)

            // }, (err: object) => { console.log(err) }

            // )

        } else {
            errorEmail ? setErrorForm({ ['email']: errorEmail, ['password']: errorPassword }) : ''
            errorPassword ? setErrorForm({ ['email']: errorEmail, ['password']: errorPassword }) : ''

        }
    }



    return <form action="" className='FormularioLogin' onSubmit={(event) => GestionarDatos(event)}>
        <div className='ElementsFormLogin'>
            <label htmlFor="">Cuenta de Correo</label>

            <input type="email" required className='InpEmailIn' onChange={(arg) => { GuardarDatos('email', arg.target.value) }} />

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
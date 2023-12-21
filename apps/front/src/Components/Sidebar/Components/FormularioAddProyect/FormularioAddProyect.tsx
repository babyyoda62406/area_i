import { FC, useContext, useState } from 'react'
import { GlobalContext } from '../../../../Contexts/GlobalContext'
import InputForm from '../../../InputForm/InputForm'
import './FormularioAddProyect.css'
import { RutaServer } from '../../../../Helpers/RutaServer'
import { ALerta } from '../../../../Services/Alerta'
import { FetchService } from '../../../../Services/FetchService'
import { typeDatosProyServer } from '../../../../Types/CMP'
import { tpFormularioAddProyecto } from '../../../../Types/Formularios'

const FormularioAddProyect: FC<tpFormularioAddProyecto> = ({ setShowModal }) => {

    const { token } = useContext(GlobalContext)

    const [dataServer, setDataServer] = useState<typeDatosProyServer>({
        nombre: '',
        organizacion: '',
        ownerId: 0,
        uid: ''
    })

    const guardarDatos = (arg: string, type: keyof typeDatosProyServer) => {

        switch (type) {
            case 'nombre':
                setDataServer({ ...dataServer, [type]: arg })
                break;
            case 'uid':
                setDataServer({ ...dataServer, [type]: arg })

                break;
            case 'organizacion':
                setDataServer({ ...dataServer, [type]: arg })

                break;

        }

    }

    const enviarDatos = (event: any) => {
        event.preventDefault()

        // FetchService(RutaServer.setProyectos, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'token': token
        //     },
        //     body: JSON.stringify(dataServer)
        // })
        //     .then(async (res: Response) => {
        //         switch (res.status) {
        //             case 201:
        //                 const { message } = await res.json()
        //                 ALerta({ title: message, icon: 'success' })
        //                 setShowModal(false)
        //                 break

        //             case 400:
        //                 //@ts-ignore
        //                 const { message: messageError } = await res.json()
        //                 ALerta({ title: messageError, icon: 'error' })
        //                 break
        //             case 404:
        //                 //@ts-ignore
        //                 const { message: messageError } = await res.json()
        //                 ALerta({ title: messageError, icon: 'error' })
        //                 break

        //             case 409:
        //                 const { messageConflicto } = await res.json()
        //                 ALerta({ title: messageConflicto, icon: 'error' })
        //                 break

        //             default:
        //                 ALerta({ title: 'status desconocido', icon: 'warning' })
        //                 break
        //         }

        //     })



    }

    return <form className='FormAddProyecto' onSubmit={(event) => { enviarDatos(event) }}>

        <InputForm tipo={'text'} label='Introduzca el nombre de su proyecto'
            evento={(arg) => guardarDatos(arg, 'nombre')} />
        <InputForm tipo={'text'} label='Introduzca el id  de su proyecto'
            evento={(arg) => guardarDatos(arg, 'uid')} />
        <InputForm tipo={'text'} label='Introduzca la organizacion de su proyecto'
            evento={(arg) => guardarDatos(arg, 'organizacion')} />
        <InputForm tipo={'submit'} evento={() => guardarDatos} />

    </form>
}

export default FormularioAddProyect
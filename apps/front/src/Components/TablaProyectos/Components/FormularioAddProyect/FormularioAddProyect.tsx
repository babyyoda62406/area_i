import { FC, useContext, useState } from 'react'
import { GlobalContext } from '../../../../Contexts/GlobalContext'
import InputForm from '../../../InputForm/InputForm'
import './FormularioAddProyect.css'
import { RutaServer } from '../../../../Helpers/RutaServer'
import { ALerta } from '../../../../Services/Alerta'
import { FetchService } from '../../../../Services/FetchService'
import { typeDatosProyServer } from '../../../../Types/CMP'
import { tpFormularioAddProyecto } from '../../../../Types/Formularios'
import { ReadToken } from '../../../../Services/DecodingToken'
import InputSelect from '../../../InputSelect/InputSelect'

const FormularioAddProyect: FC<tpFormularioAddProyecto> = ({ setShowModal }) => {

    const { token,actualizarTabla,setActualizarTabla } = useContext(GlobalContext)

    const [dataServer, setDataServer] = useState<{
        id: number,
        nombre: string,
        identificador: string,
        idOrganizacion:number
    }>({
        nombre: '',
        id: ReadToken(token),
        identificador: '',
        idOrganizacion:1
    })

    const guardarDatos = (arg: string, type: keyof typeDatosProyServer | 'idOrganizacion') => {
        
        switch (type) {
            case 'nombre':
                setDataServer({ ...dataServer, [type]: arg })
                break;
            case 'identificador':
                console.log(arg)
                setDataServer({ ...dataServer, [type]: arg })

                break;
            case 'idOrganizacion':
                setDataServer({ ...dataServer, [type]: Number(arg) })

                break;

        }

    }

    const enviarDatos = (event: any) => {
        event.preventDefault()

        if (Object.keys(dataServer).find((item: string) => { dataServer[item as keyof typeof dataServer] == '' })) {
            
            return
        }

        FetchService(RutaServer.setProyectos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(dataServer)
        })
            .then(async (res: Response) => {
                switch (res.status) {
                    case 201:
                        const { message } = await res.json()
                        ALerta({ title: message, icon: 'success' })
                        setShowModal(false)
                        setActualizarTabla({...actualizarTabla,['tablaProyectos']:!actualizarTabla.tablaProyectos})
                        break

                    case 400:

                        const { message: messageError } = await res.json()
                        ALerta({ title: messageError, icon: 'error' })
                        break
                    case 404:

                        const { message: messageErrorN } = await res.json()
                        ALerta({ title: messageErrorN, icon: 'error' })
                        break

                    case 409:
                        const { message:messageConflicto } = await res.json()
                       
                        ALerta({ title: messageConflicto, icon: 'error' })
                        break

                    default:
                        ALerta({ title: 'status desconocido', icon: 'warning' })
                        break
                }

            })



    }

    return <form className='FormAddProyecto' onSubmit={(event) => { enviarDatos(event) }}>

        <InputForm tipo={'text'} label='Introduzca el nombre de su proyecto'
            evento={(arg) => guardarDatos(arg, 'nombre')} />
        <InputForm tipo={'text'} label='Introduzca el id  de su proyecto'
            evento={(arg) => guardarDatos(arg, 'identificador')} />
        <InputSelect data={[]} defaultValue='candela' updateSize={(arg) => guardarDatos(arg, 'idOrganizacion')}/>
        {/* <InputForm tipo={'text'} label='Introduzca la organizacion de su proyecto'
            evento={(arg) => guardarDatos(arg, 'nombreOrg')} /> */}
        <InputForm tipo={'submit'} evento={() => guardarDatos} />

    </form>
}

export default FormularioAddProyect
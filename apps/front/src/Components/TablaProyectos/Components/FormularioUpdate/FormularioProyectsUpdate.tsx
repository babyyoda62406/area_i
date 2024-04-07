import './FormularioProyectsUpdate.css'
import { FC, SyntheticEvent, useContext, useEffect, useMemo, useState } from "react"
import { tpDataUpdateProyect, tpFormularioUpdateProyects } from "../../types/FormularioProyects"
import InputForm from "../../../InputForm/InputForm"
import { RutaServer } from '../../../../Helpers/RutaServer'
import { ALerta } from '../../../../Services/Alerta'
import { FetchService } from '../../../../Services/FetchService'
import { GlobalContext } from '../../../../Contexts/GlobalContext'
import InputSelect from '../../../InputSelect/InputSelect'

const FormularioProyectsUpdate: FC<tpFormularioUpdateProyects> = ({ data, id, setShowModal }) => {


    const [newData, setNewData] = useState<tpDataUpdateProyect>({ //objeto k permite mostrar los datos para modificarse
        id: data.id,
        nombre: data.nombre,
        identificador: data.identificador,
        nombreOrg: data.nombreOrg,
        estado: data.estado
    })
    const [dataSend, setDataSend] = useState<{ //objeto k recoge unicamente la propiedad modificada con su valor
        id: number,
        nombre?: string,
        identificador?: string,
        nombreOrg?: string
        estado?: 'Activo' | 'Inactivo'
    }>({ id: newData.id })
    const [refreshDataSend, setRefreshDataSend] = useState<boolean>(false) //booleano k permite modificar el dataSend despues de cargado el componente
    const { token, actualizarTabla, setActualizarTabla } = useContext(GlobalContext)


    useMemo(() => { //recoge los datos a mostrar antes de renderizar el componente
        setNewData({
            ...newData,
            ['identificador']: data.identificador,
            ['nombreOrg']: data.nombreOrg
        })
    }, [data])

    useEffect(() => {
        if (refreshDataSend) {
            Object.keys(newData).map((item: string) => {
                if (newData[item as keyof typeof newData] != data[item as keyof typeof data]) {
                    setDataSend({ ...dataSend, [item]: newData[item as keyof typeof newData] })

                }
            })
        }
        setRefreshDataSend(true)
    }, [newData])

    //funcion apra guardar lso datos del formulario
    // recibe un arg: dato introducido
    //type: el input modificado
    const guardarDatos = (arg: string, type: keyof tpDataUpdateProyect) => {

        switch (type) {
            case 'nombre':
                setNewData({ ...newData, [type]: arg })
                break;
            case 'identificador':
                setNewData({ ...newData, [type]: arg })

                break;
            case 'nombreOrg':
                setNewData({ ...newData, [type]: arg })

                break;

        }

    }

    const enviarDatos = (event: SyntheticEvent) => {
        event.preventDefault()

        let newUrl = ` ${RutaServer.getProyectos}/${id}`
        FetchService(newUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(dataSend),
        })
            .then(async (res: Response) => {

                switch (res.status) {

                    case 200:

                        const { message: mesSucces } = await res.json()
                        setActualizarTabla({ ...actualizarTabla, ['tablaProyectos']: !actualizarTabla.tablaProyectos })
                        ALerta({ title: mesSucces, icon: "success", position: 'top-right' })
                        setShowModal(false)

                        break;

                    case 400:
                        const { message: mesError } = await res.json()
                        ALerta({ title: mesError, icon: "error", position: 'center' })
                        break;

                    case 409:
                        const { message: mesErrorDat } = await res.json()
                        ALerta({ title: mesErrorDat, icon: "error", position: 'center' })
                        break;

                    default:
                        ALerta({ title: 'por favor revise su conexion', icon: 'warning' })
                }
            })


    }

    return <form className="FormularioProyectsUpdate" onSubmit={(event) => enviarDatos(event)}>
        <InputForm tipo="text"
            evento={(arg) => guardarDatos(arg, 'nombre')}
            label='Modifique el nuevo nombre de su proyecto'
            value={newData.nombre} />
        <InputForm tipo="text" evento={(arg) => guardarDatos(arg, 'identificador')}
            label='Modifique el identificador de su proyecto'
            value={newData.identificador} />
        <div className='SelectsElements'>
            <InputSelect data={[]} defaultValue='Organizacion' updateSize={(arg) => { arg }} />
            <InputSelect data={[]} defaultValue='Activo' updateSize={(arg) => { arg }} />
        </div>



        <InputForm tipo="submit" evento={() => guardarDatos} />
    </form>
}

export default FormularioProyectsUpdate
import './FormularioProyectsUpdate.css'
import { FC, SyntheticEvent, useContext, useEffect, useMemo, useState } from "react"
import { tpDataSendProyect, tpDataUpdateProyect, tpFormularioUpdateProyects } from "../../types/FormularioProyects"
import InputForm from "../../../InputForm/InputForm"
import { RutaServer } from '../../../../Helpers/RutaServer'
import { ALerta } from '../../../../Services/Alerta'
import { FetchService } from '../../../../Services/FetchService'
import { GlobalContext } from '../../../../Contexts/GlobalContext'
import InputSelect from '../../../InputSelect/InputSelect'
import { tpDataOrganizations } from '../../../TablaOrganizaciones/Types/DataOrganizations'
import { getOrganizations } from '../../../TablaOrganizaciones/Services/getOrganizations'
import { tpOptionsSelect } from '../../../../Types/CMP'



/** */
const FormularioProyectsUpdate: FC<tpFormularioUpdateProyects> = ({ data, id, setShowModal }) => {


    const [newData, setNewData] = useState<tpDataUpdateProyect>({ //objeto k permite mostrar los datos para modificarse
        id: data.id,
        nombre: data.nombre,
        identificador: data.identificador,
        nombreOrg: data.nombreOrg,
        estado: data.estado
    })
    const [dataSend, setDataSend] = useState<tpDataSendProyect>({ id: newData.id }) //objeto k recoge unicamente la propiedad modificada con su valor

    const [refreshDataSend, setRefreshDataSend] = useState<boolean>(false) //booleano k permite modificar el dataSend despues de cargado el componente
    const { token, actualizarTabla, setActualizarTabla } = useContext(GlobalContext)
    const [dataOrganizations, setDataOrganizations] = useState<tpDataOrganizations[]>([])
    const [elementsOrganizations, setElementsOrganizations] = useState<tpOptionsSelect[]>([])
    

    useMemo(() => { //recoge los datos a mostrar antes de renderizar el componente
        setNewData({
            ...newData,
            ['identificador']: data.identificador,
            ['nombreOrg']: data.nombreOrg
        })
        getOrganizations(token,setDataOrganizations)
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

    useEffect(() => {

        dataOrganizations.find(item=>item.nombre ===newData.nombreOrg)?.id
        setElementsOrganizations(dataOrganizations.map(item => {
            return {value:item.id,label:item.nombre}
        }))
        
    }, [dataOrganizations])
    
    
    const handlerInput = (type: 'organizacion'| '', arg: string) => {
        
        console.log(arg)
        console.log('candela')
        switch (type) {
            case 'organizacion':
                setDataSend({...dataSend,['organizacionId']: Number(arg)})
                
                break
        }
    }

    /**
     * 
     * @param arg 
     * @param type 
     */
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
        console.log(dataSend)
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
            <InputSelect data={elementsOrganizations} defaultValue="Organizacion" updateSize={(arg) => { handlerInput('organizacion',arg)}} />
            <InputSelect data={[]} defaultValue='Activo' updateSize={(arg) => { arg }} />
        </div>



        <InputForm tipo="submit" evento={() => guardarDatos} />
    </form>
}

export default FormularioProyectsUpdate
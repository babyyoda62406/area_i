import './FormularioProyectsUpdate.css'
import { FC, useContext, useEffect, useState } from "react"
import { tpFormularioUpdateProyects } from "../../types/FormularioProyects"
import InputForm from "../../../InputForm/InputForm"
import { typeDatosProyServer } from "../../../../Types/CMP"
import { RutaServer } from '../../../../Helpers/RutaServer'
import { ALerta } from '../../../../Services/Alerta'
import { FetchService } from '../../../../Services/FetchService'
import { GlobalContext } from '../../../../Contexts/GlobalContext'

const FormularioProyectsUpdate: FC<tpFormularioUpdateProyects> = ({ data,id,setShowModal }) => {
    
    
    const [newData, setNewData] = useState<typeDatosProyServer>({ ...data })
    const { token, actualizarTabla, setActualizarTabla } = useContext(GlobalContext)
    
    useEffect(()=>{setNewData(data)},[data])

    const guardarDatos = (arg: string, type: keyof typeDatosProyServer) => {

        switch (type) {
            case 'nombre':
                setNewData({ ...newData, [type]: arg })
                break;
            case 'uid':
                setNewData({ ...newData, [type]: arg })

                break;
            case 'organizacion':
                setNewData({ ...newData, [type]: arg })

                break;

        }

    }

    const enviarDatos = (event: any) => {
        event.preventDefault()
        

        const newObject = {}
        let claves:string[]= Object.keys(newData)
        
        for (let i of claves) {
            // @ts-ignore
            if (newData[i] !== data[i]) {
                // @ts-ignore
               newObject[i]=newData[i]
            }   
        }

        const newValue = {
            'id': id,
            
            ...newObject
        }
    
        let newUrl = ` ${RutaServer.getProyectos}/${id}`
        FetchService(newUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(newValue),
        })
            .then(async (res: Response) => {
                switch (res.status) {
    
                    case 200:
                        
                        const { message: mesSucces } = await res.json()
                        
                        setActualizarTabla({...actualizarTabla,['tablaProyectos']:!actualizarTabla.tablaProyectos})
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

    return <form className="FormularioProyectsUpdate" onSubmit={(event)=>enviarDatos(event)}>
        <InputForm tipo="text"
            evento={(arg) => guardarDatos(arg, 'nombre')}
            label='Modifique el nuevo nombre de su proyecto'
            value={newData.nombre} />
        <InputForm tipo="text" evento={(arg) => guardarDatos(arg, 'uid')}
            label='Modifique el nuevo uid de su proyecto'
            value={newData.uid} />
        <InputForm tipo="text" evento={(arg) => guardarDatos(arg, 'organizacion')}
            label='Modifique la organizacion de su proyecto '
            value={newData.organizacion} />
        <InputForm tipo="submit" evento={() => guardarDatos} />
    </form>
}

export default FormularioProyectsUpdate
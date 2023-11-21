import { FC, useContext } from 'react'
import { typeDatosProyServer, typeModalFormulario } from '../../Types/CMP'
import './ModalFormulario.css'
import { Modal } from 'antd'
import 'survey-core/defaultV2.css'
import { GlobalContext } from '../../Contexts/GlobalContext'
import { typeActualizarTabla, typeShowModal } from '../../Types/UseStates'
import { FormulariosTPModal } from '../../Helpers/FormulariosTPModal'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui';
// import Theme from '../../config/themes-survey-ts/borderless-light-panelless'
import Theme from '../../config/themes-survey-ts/borderless-light'
import { FetchService } from '../../Services/FetchService'
import { RutaServer } from '../../Helpers/RutaServer'

import { ALerta } from '../../Services/Alerta'


/**
 * 
 * @param param0 
 * @returns 
 */
const ModalFormulario: FC<typeModalFormulario> = ({ tipoModal }) => {
    
    const { token , showModal,actualizarTabla, setShowModal,setActualizarTabla } = useContext(GlobalContext)

    
    // array de string con las claves del nombre de cada input del formulario se rekieren para 
    // obtener los datos del formulario
    const guardarDatos = () => {
        const datos: typeDatosProyServer = {
            ownerId: 2,
            nombre: modeloForm.getQuestionByName('NombreProyecto').value,
            organizacion: modeloForm.getQuestionByName('IdProyecto').value,
            uid: modeloForm.getQuestionByName('NombreOrganizacion').value
        }

        const actualizarDatosTabla = (tabla:typeActualizarTabla):typeActualizarTabla => {
            return {
                ...tabla,
                ['tablaProyectos']:actualizarTabla.tablaProyectos + 1
            }
        }
        

        FetchService(RutaServer.setProyectos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'token': token
            },
            body: JSON.stringify(datos)
        })
            .then(async (res: Response) => {
                switch (res.status) {
                    case 201:
                        const { message } = await res.json()
                        ALerta({ title: message, icon: 'success' })
                        cerrarModal()
                        setActualizarTabla(actualizarDatosTabla(actualizarTabla))
                        break
                    
                    case 400:
                        //@ts-ignore
                        const {message: messageError } = await res.json()
                        ALerta({ title: messageError, icon: 'error' })
                        break
                    
                    case 409:
                        const { messageConflicto } = await res.json()
                        ALerta({ title: messageConflicto, icon: 'error' })
                        break
                    
                    default:
                        ALerta({ title: 'status desconocido', icon: 'warning' })
                        break
                }

            })
    
    }

    const cerrarModal = () => {

        setShowModal((prevShowModal: typeShowModal) => {
            return {
                ...prevShowModal,
                [tipoModal]: false
            }
        })

    }



    // crear el modelo para el formulario
    const modeloForm = new Model(FormulariosTPModal.agregarProyectos)
    modeloForm.applyTheme(Theme)
    modeloForm.onComplete.add(guardarDatos)

    return < Modal
        open={showModal.proyectos}
        onCancel={() => cerrarModal()}
        wrapClassName='ModalConten'
        style={{ top: 20 }}
    >

        <Survey model={modeloForm} className='FormularioModal' />

    </Modal>



}

export default ModalFormulario
import { FC, useContext } from 'react'
import { typeDatosProyServer, typeModalFormulario } from '../../Types/CMP'
import './ModalFormulario.css'
import { Modal } from 'antd'
import 'survey-core/defaultV2.css'
import { GlobalContext } from '../../Contexts/GlobalContext'
import { typeShowModal } from '../../Types/UseStates'
import { FormulariosTPModal } from '../../Helpers/FormulariosTPModal'
import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui';
// import Theme from '../../config/themes-survey-ts/borderless-light-panelless'
import Theme from '../../config/themes-survey-ts/borderless-light'
import { FetchService } from '../../Services/FetchService'
import { RutaServer } from '../../Helpers/RutaServer'
import { json } from 'react-router-dom'
import { ALerta } from '../../Services/Alerta'



const ModalFormulario: FC<typeModalFormulario> = ({ tipoModal }) => {
    const { showModal, setShowModal, token } = useContext(GlobalContext)



    const guardarDatos = () => {
        const datos: typeDatosProyServer[] = []

        modeloForm.getPlainData().map(elemento => {

            datos.push({ name: elemento.name, value: elemento.value })
        })

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

                        break
                    case 400:
                        //@ts-ignore
                        const messageError = await res.json().message[1]
                        console.log(messageError)
                        ALerta({ title: messageError, icon: 'error' })
                        break
                    case 409:
                        const { messageConflicto } = await res.json()
                        ALerta({ title: messageConflicto, icon: 'error' })
                        break
                    
                    default:
                        console.log('andas al verro')
                }

            })



        // cerrar el modal
        // cerrarModal()
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
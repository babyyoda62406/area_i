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



const ModalFormulario: FC<typeModalFormulario> = ({ tipoModal }) => {
    const { showModal, setShowModal } = useContext(GlobalContext)



    const guardarDatos = () => {
        const datos:typeDatosProyServer[] = []

        modeloForm.getPlainData().map(elemento => {
            
            datos.push({name:elemento.name,value:elemento.value})    
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
    console.log(modeloForm.data)

    return < Modal
        open={showModal.proyectos}
        onCancel={() => cerrarModal()}
        wrapClassName='ModalConten'
        style={{ top: 20 }}
        
        >

        <Survey model={modeloForm}  className='FormularioModal' />

    </Modal>



}

export default ModalFormulario
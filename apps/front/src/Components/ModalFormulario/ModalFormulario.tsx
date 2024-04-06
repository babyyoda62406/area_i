import { FC } from 'react'
import { typeModalFormulario } from '../../Types/CMP'
import './ModalFormulario.css'
import { Modal } from 'antd'
import 'survey-core/defaultV2.css'



/**
 * 
 * @param param0 
 * @returns 
 */
const ModalFormulario: FC<typeModalFormulario> = ({ Formulario,showModal,setShowModal }) => {
  


    return < Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        wrapClassName='ModalFormulario'
        style={{ top: 20 }}
        footer={[]}>
        
       {Formulario}


    </Modal>
}

export default ModalFormulario
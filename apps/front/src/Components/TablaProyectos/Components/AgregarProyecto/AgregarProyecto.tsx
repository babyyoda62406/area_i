import { GridToolbarContainer } from "@mui/x-data-grid"
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ModalFormulario from "../../../ModalFormulario/ModalFormulario";
import FormularioAddProyect from "../../../Sidebar/Components/FormularioAddProyect/FormularioAddProyect";
import { useState } from "react";

const BtnAddProyect = () => {

    const [showModal, setShowModal] = useState<boolean>(false)
    const mostrarAlgo = () => {
        setShowModal(true)
    }

    return <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={mostrarAlgo}>
            Agregar Proyecto
        </Button>
        <ModalFormulario showModal={showModal } setShowModal={()=>setShowModal(false)} Formulario = {<FormularioAddProyect setShowModal={()=>setShowModal(false)}/>} />
    </GridToolbarContainer>
}

export default BtnAddProyect



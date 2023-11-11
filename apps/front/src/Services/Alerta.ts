import Swal from "sweetalert2"
import { TPAlert } from "../Types/TpAlert"

export const ALerta = (arg: TPAlert) => {
    const { titulo, texto, icono, showConfirmButton, tiempo, position } = arg

    Swal.fire(
        {
            title: titulo,
            text: texto,
            icon: icono,
            showConfirmButton: showConfirmButton,
            timer: tiempo,
            position:position
            
        }
    )
}
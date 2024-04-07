import Swal from "sweetalert2"
import { TPAlert } from "../Types/TpAlert"

export const ALerta = (arg: TPAlert) => {
    

    Swal.fire(
        {
            title: arg.title,
            text:'',
            icon: 'success',            
            showConfirmButton: true,
            timer: 5000,
            position: 'center',
            ...arg
            
        }
    )
}
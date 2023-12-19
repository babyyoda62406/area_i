
import { ALerta } from "../../../Services/Alerta"
import { typeShowModal } from "../../../Types/UseStates"



export const HandlerSidebar = (arg: string, setShowModal: Function,showModal:typeShowModal,ruta:any) => {


  const mostrarModal = (arg: string) => {
    setShowModal((prevShowModal: typeShowModal) => {
      return {
        ...prevShowModal,
        [arg]: true,
      }
    })

  }

  

  switch (arg) {
    case 'gestionProyectos':
      ruta('gestiongeneral')
      
      break
      
      

      break

    case 'AgregarProyectos':
    
      if (false) {
        ALerta({title:'por favor abra la gestion de proyectos ',icon:'warning'})
      } else {
         mostrarModal('proyectos')
      }
    
      break
    
    case 'gestionUsuarios':
      
      console.log('candela')

      break



  }
}
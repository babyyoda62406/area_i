
import { ALerta } from "../../../Services/Alerta"
import { typeShowLayout, typeShowModal } from "../../../Types/UseStates"



export const HandlerSidebar = (arg: string, showLayout: typeShowLayout, setShowLayout: Function, setShowModal: Function,showModal:typeShowModal) => {


  const mostrarModal = (arg: string) => {
    setShowModal((prevShowModal: typeShowModal) => {
      return {
        ...prevShowModal,
        [arg]: true,
      }
    })

  }

  console.log(showLayout)

  switch (arg) {
    case 'gestionProyectos':
      
      setShowLayout({ ...showLayout, [arg]: !showLayout.gestionProyectos,['mostrarUsuarios']:false })
      break
      
      

      break

    case 'AgregarProyectos':
    
      if (!showLayout.gestionProyectos) {
        ALerta({title:'por favor abra la gestion de proyectos ',icon:'warning'})
      } else {
         mostrarModal('proyectos')
      }
    
      break
    
    case 'gestionUsuarios':
      
      setShowLayout({ ...showLayout, [arg]: !showLayout.gestionUsuarios,['gestionProyectos']:false})

      break



  }
}
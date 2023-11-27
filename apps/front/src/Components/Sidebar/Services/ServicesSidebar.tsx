
import { typeShowLayout, typeShowModal } from "../../../Types/UseStates"


export const HandlerSidebar = (arg: string, showLayout: typeShowLayout, setShowLayout: Function,setShowModal:Function) => {
    

    const mostrarModal = (arg:string) => {
        setShowModal((prevShowModal: typeShowModal) => {
          return{...prevShowModal,
          [arg]:true,}
        })
    
      } 
    
    
    switch (arg) {
        case 'GestionProyectos':
            setShowLayout({...showLayout,['gestionGeneral']:!showLayout.gestionGeneral})
            
            break
        
        case 'AgregarProyectos':
            mostrarModal('proyectos')

            break


    }
}
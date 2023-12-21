



export const HandlerSidebar = (arg: string,ruta:any,setShowModal:(arg:boolean)=>void) => {


  

  switch (arg) {
    case 'gestionProyectos':
      ruta('gestiongeneral')
      
      break
      
      

      break

    case 'AgregarProyectos':
      setShowModal(true)
      
    
      
    
      break
    
    case 'gestionUsuarios':
      
      console.log('candela')

      break



  }
}
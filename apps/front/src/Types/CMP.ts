

type typeLoginLayout = {

}

type typeBienvenida = {

}

type typeFormularioLogin = {
    
    
}
type typeFormModal = {
    name: string
    title: string
    type:string
    isRequired:boolean
}

type typeElementsFormMo = {
    elements:typeFormModal[]
}

type typeFormularioTPModal = {
    agregarProyectos:typeElementsFormMo
}

type typeModalFormulario = {
    tipoModal:string
    
}

type typeDatosProyServer = {
    ownerId: number
    nombre: string
    organizacion: string
    uid:string
    
}




export type {
    typeLoginLayout,
    typeFormularioLogin,
    typeBienvenida,
    typeModalFormulario,
    typeFormularioTPModal,
    typeDatosProyServer
    

}
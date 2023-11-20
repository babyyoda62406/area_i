

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
    name: string |number
    value:string
}




export type {
    typeLoginLayout,
    typeFormularioLogin,
    typeBienvenida,
    typeModalFormulario,
    typeFormularioTPModal,
    typeDatosProyServer
    

}
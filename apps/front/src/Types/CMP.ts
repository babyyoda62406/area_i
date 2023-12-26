


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
    Formulario: any
    showModal: boolean
    setShowModal:(arg:boolean)=>void
    
}

type typeDatosProyServer = {
    ownerId: number
    nombre: string
    organizacion: string
    uid:string
    
}

type tpInputForm = {
    label?: string
    tipo: 'text' | 'select' | 'number' | 'submit' 
    value?:string|number
    evento:(arg:string)=>void
}




export type {
    typeLoginLayout,
    typeFormularioLogin,
    typeBienvenida,
    typeModalFormulario,
    typeFormularioTPModal,
    typeDatosProyServer,
    tpInputForm
    

}
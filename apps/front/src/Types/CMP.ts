



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
    numElement:number
    id:number
    identificador: string
    nombre: string
    nombreOrg:string
    estado: 'Activo' | 'Inactivo'
    enUso:boolean
}

type tpInputForm = {
    label?: string
    classElement?:string
    tipo: 'text' | 'select' | 'number' | 'submit' 
    value?:string|number
    evento:(arg:string)=>void
}

type tpOptionsSelect = {
    value: number|string
    label:string
}

type tpInputSelect = {
    data:tpOptionsSelect[]
    updateSize:(arg:string)=>void
    defaultValue:string
}


export type {
    typeLoginLayout,
    typeFormularioLogin,
    typeBienvenida,
    typeModalFormulario,
    typeFormularioTPModal,
    typeDatosProyServer,
    tpInputForm,
    tpOptionsSelect,
    tpInputSelect
    

}
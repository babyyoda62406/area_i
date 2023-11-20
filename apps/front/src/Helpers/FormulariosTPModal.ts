import { typeFormularioTPModal } from "../Types/CMP";

export const FormulariosTPModal: typeFormularioTPModal = {
    agregarProyectos: {
        elements: [{
            name: 'Nombre del Proyecto',
            title: '',
            type: 'text',
            isRequired:true
            
        },
        {
            name: 'Identificador',
            title: '',
            type: 'text',
            isRequired:true
        },
        
        {
            name: 'Nombre de la Organizacion',
            title: '',
            type: 'text',
            isRequired:true
        }
        
        


        ]
    }

}


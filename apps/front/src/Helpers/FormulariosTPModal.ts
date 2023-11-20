import { typeFormularioTPModal } from "../Types/CMP";

export const FormulariosTPModal: typeFormularioTPModal = {
    agregarProyectos: {
        elements: [{
            name: 'NombreProyecto',
            title: 'Nombre del Proyecto',
            type: 'text',
            isRequired:true
            
        },
        {
            name: 'IdProyecto',
            title: 'Identificador del proyecto',
            type: 'text',
            isRequired:true
        },
        
        {
            name: 'NombreOrganizacion',
            title: 'Nombre de la Organizacion',
            type: 'text',
            isRequired:true
        }
        
        


        ]
    }

}


export declare enum estados_usuario {
    Activo = "Activo",
    Inactivo = "Inactivo",
    Eliminado = "Eliminado"
}
export declare class Usuario {
    id: number;
    correo: string;
    password: string;
    estado: estados_usuario;
}

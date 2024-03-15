export interface Usuario {
    correo : string,
    password : string
}

export interface Registrar_usuario{
    correo : string,
    nombre_completo : string,
    password : string
}

export interface New_password{
    password : string,
    confirm_password : string
}
import { Option } from "../types/options"

export interface ContentProfile {
    id: number,
    perfil: string
}

export interface IUsersTable {
    list: [
        IUsersTableInside
    ]
}

export interface IUsersTableInside {
    apellido: string
    dependencia: string
    estado: string
    fec_creacion: string
    id: number
    id_dependencia: number
    id_perfil: number
    mail: string
    nickname: string
    nombre: string
    perfil: string
}

export interface IUseFormUsers {
    name: string,
    lastname: string,
    user: string,
    mail: string,
    password: string,
    profile: Option | null | undefined,
    dependency: Option | null | undefined
}

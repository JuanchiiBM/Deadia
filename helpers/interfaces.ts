import { Option } from "@/utils/globals"
import { RangeValue, UseDisclosureProps } from "@nextui-org/react"


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

export interface IUseFormInscription {
    dni: string | undefined | null
    name: string | undefined | null
    lastname: string | undefined | null
    mail: string | undefined | null
    category: Option | undefined | null
    grade: Option | undefined | null
    classroom: Option | undefined | null
    curse: Option | undefined | null
    dependency: Option | undefined | null
    amount: string | undefined | null
    datePicker: RangeValue<any>
}


export interface IRegisters {
    list: [
        IRegister
    ]
}

export interface IRegister {
    aula: string
    curso: string
    dependencia: string
    dni_alumno: string
    fec_compra: string
    id: number
    mail: string
    monto: number
    nom_alumno: string
    usuario: string
}

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

export interface IUsersTable {
    sarasa: []
}

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_

export interface IProfileUser {
    perfil: string
    cant_users: number
}

export interface IModalUsers extends UseDisclosureProps {

}

export interface IModalFillUsers {
    isLoading: boolean
    selectOptions: {
        perfil: {}[];
        dependencia: {}[];
    }
}

export interface IModalResumenUsers {
    userForm: {
        nombre: string;
        apellido: string;
        usuario: string;
        mail: string;
        perfil: null;
        dependencia: null;
    }
}

export interface IUseSearchDNI {
    list: {
        pupil: [
            IUseSearchDNIData
        ]
    }
}

export interface IUseSearchDNIData {
    apellido: string,
    id_categoria: number,
    id_rango: number,
    mail: string,
    nombre: string
}
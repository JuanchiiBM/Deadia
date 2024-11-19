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

export interface IUseDTAInscription {
    tableData: any[] | undefined,
    setContentModal: React.Dispatch<React.SetStateAction<IRegister | any>>,
    onOpen: (() => void) | undefined
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


export interface IncomeRegisterOptions {
    classrooms: [
        IncomeRegisterOptionClassroom
    ],
    categories: [
        IncomeRegisterOptionCategory
    ],
    deps: [
        IncomeRegisterOptionDep
    ],
    grades: [
        IncomeRegisterOptionGrade
    ],
    ranks: [
        IncomeRegisterOptionRank
    ]
}

export interface IncomeRegisterOptionClassroom {
    curso: string
    dependencia: string
    fec_finalizacion: string
    fec_inicio: string
    codigo: string
    id: number
    id_curso: number
    id_dependencia: number
}

export interface IncomeRegisterOptionCategory {
    id: number
    categoria: string
}

export interface IncomeRegisterOptionDep {
    id: number
    dependencia: string
}

export interface IncomeRegisterOptionGrade {
    id: number
    curso: string
}

export interface IncomeRegisterOptionRank {
    id: number
    grado: string
    id_categoria: number
}

export interface IModalSelects2Inscription {
    studentInfo?: IUseFormInscription
    handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option | null) => void
    isOpen: boolean | undefined
    jsonData: IncomeRegisterOptions
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
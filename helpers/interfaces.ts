import { Option } from "@/utils/globals"
import { RangeValue, UseDisclosureProps } from "@nextui-org/react"


//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//Registrar Inscripcion

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

export interface IUseSelectHandleChangeInscription {
    handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option | null) => void
    jsonData: IncomeRegisterOptions
    chargueNewClassroom: (value: Option) => void
    contentModal: any
}

export interface IUseDTAInscription {
    tableData: any[] | undefined,
    setContentModal: React.Dispatch<React.SetStateAction<IRegister | any>>,
    onOpen: (() => void) | undefined
}

export interface IUseUpdateInscription {
    setStudentInfo: React.Dispatch<React.SetStateAction<IUseFormInscription>>,
    contentModal: any,
    isOpen: boolean | undefined
}

export interface IUsePostInscription {
    studentInfo: IUseFormInscription
    onClose: (() => void) | undefined
    oldRegister: any
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
    categoria: string
    grado: string
    id: number
    mail: string
    monto: number
    monto_acumulado: string
    nom_alumno: string
    usuario: string
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

export interface IModalSelectsRegistrarIngreso {
    contentModal: any
    jsonData: IncomeRegisterOptions
    studentInfo: IUseFormInscription
    handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option | null) => void
}

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//Ver Inscripcion

export interface ITableDataDeps {
    list: {
        deps: [
            ITableDataDepsInsideDeps
        ]
    }

    filter: {
        dependency: [
            ITableDataDepsInsideFilter
        ]
    }
}

export interface ITableDataDepsInsideDeps {
    dependencia: string
    cant_alumnos: number
    mes: string
    monto: number
}

export interface ITableDataDepsInsideFilter {
    id: number
    name: string
}

export interface ITableDataDep {
    filter: {
        classroom: [
            ITableDataDepInsideFilter
        ]
    }

    list: {
        grades: [
            ITableDataDepInsideGrades
        ]
    }
}

export interface ITableDataDepInsideFilter {
    id: number
    code: string
    grade: string
}

export interface ITableDataDepInsideGrades {
    curso: string
    aula: string
    cant_alumnos: number
    fec_inicio: string
    fec_finalizacion: string
    ingreso: number
}

export interface ITableDataClassrooms {
    list: {
        classrooms: [
            ITableDataClassroomsInside
        ]
    }
}

export interface ITableDataClassroomsInside {
    aula: string
    dni: string
    fec_compra: string
    ingreso: number
    mail: string
    nombre: string
}

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//Registrar Egreso

export interface ITableDataEgress {
    list: [
        ITableDataEgressInside
    ]
}

export interface ITableDataEgressInside {
    articulo: string
    cantidad: number
    categoria: string
    fec_compra: string
    id: number
    monto: number
    usuario: string
}

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//Usuarios

export interface IUsersTable {
    sarasa: []
}

//-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_
//Perfiles

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

import { useEffect } from "react"
import { createOption } from "@/utils/helpers/options"

interface IUseUpdate {
    setDataForm: React.Dispatch<React.SetStateAction<any>>,
    contentTable: any | undefined,
    isOpen: boolean | undefined
}

const useUpdate = ({ setDataForm, contentTable, isOpen }: IUseUpdate) => {
    useEffect(() => {
        setDataForm({
            name: contentTable?.nombre || '',
            lastname: contentTable?.apellido || '',
            user: contentTable?.nickname || '',
            mail: contentTable?.mail || '',
            profile: contentTable ? createOption(contentTable.perfil, contentTable.id_perfil.toString()) : null,
            dependency: contentTable ? createOption(contentTable.dependencia, contentTable.id_dependencia.toString()) : null,
            password: contentTable ? contentTable.password : '',
        })
        
    }, [isOpen])

    let oldRegister

    if (contentTable) {
        oldRegister = {
            id: contentTable.id,
            id_profile: contentTable.id_perfil,
            id_dependency: contentTable.id_dependencia,
            name: contentTable.nombre,
            lastname: contentTable.apellido,
            user: contentTable.nickname,
            mail: contentTable.mail,
            password: contentTable.password,
        }
    }

    return { oldRegister }
}

export default useUpdate
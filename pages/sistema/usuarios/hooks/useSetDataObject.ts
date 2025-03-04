import { useContextRegister } from "@/context/contextRegister"

const useSetDataObject = ({ dataForm }: any) => {

    const _dataObject = {
        name: dataForm.name,
        last_name: dataForm.lastname,
        password: dataForm.password,
        username: dataForm.user,
        mail: dataForm.mail,
        id_profile: dataForm.profile?.value && Number(dataForm.profile.value),
        id_dependency: dataForm.dependency?.value && Number(dataForm.dependency.value),
    }

    return { _dataObject }
}

export default useSetDataObject
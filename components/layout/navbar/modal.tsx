import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input } from "@nextui-org/react";
import { GETFunctionConfig, PUTFunctionConfig } from "@/utils/helpers/httpsFunctions";
import useJsonDataConfig from "@/hooks/useJsonDataConfig";
import { ErrorAlert, SuccessAlert } from "@/components/sweetAlert/SweetsAlerts";
import { useSidebarContext } from "../layout-context";

export default function ModalNavbar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [refreshData, setRefreshData] = useState(0)
    const {showSpinner, setShowSpinner} = useSidebarContext()
    const [newDataUser, setNewDataUser] = useState<{
        nickname: string,
        nombre: string,
        apellido: string,
        password: string
    }>({
        nickname: '',
        nombre: '',
        apellido: '',
        password: ''
    })

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        changueProfile()
    }

    const { jsonData: dataUser } = useJsonDataConfig({ url: `api/user/register?start_date=2024-01-01&end_date=2099-01-01`, refreshData, xconfig: 'true', xreactivate: 'false' })

    const changueProfile = async () => {
        setShowSpinner(true)
        const _dataObject = {
            newRecords: {
                username: newDataUser.nickname != '' ? newDataUser.nickname : dataUser.list[0].nickname,
                password: newDataUser.password != '' ? newDataUser.password : dataUser.list[0].password,
                name: newDataUser.nombre != '' ? newDataUser.nombre : dataUser.list[0].nombre,
                last_name: newDataUser.apellido != '' ? newDataUser.apellido : dataUser.list[0].apellido,
                mail: dataUser.list[0].mail,
                id_dependency: dataUser.list[0].id_dependencia,
                id_profile: dataUser.list[0].id_perfil,
            },
            oldRecords: {
                username: dataUser.list[0].nickname,
                password: dataUser.list[0].password,
                name: dataUser.list[0].nombre,
                last_name: dataUser.list[0].apellido,
                mail: dataUser.list[0].mail,
                id_dependency: dataUser.list[0].id_dependencia,
                id_profile: dataUser.list[0].id_perfil,
            }
        }
        const response: any = await PUTFunctionConfig(`api/user/register/form/${dataUser.list[0].id}`, _dataObject, 'true', 'false')
        if (response.status == 'ok') {
            setShowSpinner(false)
            SuccessAlert('Configuración finalizada', undefined, 'Cerrar', () => {setRefreshData((prev) => prev = prev + 1); onClose()})
        } else {
            ErrorAlert('Error', response.message, undefined, () => onClose())
        }
    }

    return createPortal(
        <Modal isDismissable={false} backdrop='blur' size='xl' className='bg-background-200' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Configuración de Perfil
                        </ModalHeader>
                        <ModalBody>
                            <form id='form-profile' className="flex flex-col gap-3" onSubmit={(e) => handleSave(e)}>
                                <Input defaultValue={dataUser.list[0].nickname} onChange={(e) => setNewDataUser((prev) => ({ ...prev, nickname: e.target.value }))} variant='bordered' label='Apodo' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                                <Input defaultValue={dataUser.list[0].nombre} onChange={(e) => setNewDataUser((prev) => ({ ...prev, nombre: e.target.value }))} variant='bordered' label='Nombre' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                                <Input defaultValue={dataUser.list[0].apellido} onChange={(e) => setNewDataUser((prev) => ({ ...prev, apellido: e.target.value }))} variant='bordered' label='Apellido' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                                <Input defaultValue={dataUser.list[0].password} onChange={(e) => setNewDataUser((prev) => ({ ...prev, password: e.target.value }))} variant='bordered' label='Contraseña' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                                <div className="flex gap-4">
                                    <Input defaultValue={dataUser.list[0].perfil} onChange={(e) => setNewDataUser((prev: any) => ({ ...prev, perfil: e.target.value }))} variant='bordered' label='Perfil' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} isDisabled required />
                                    <Input defaultValue={dataUser.list[0].dependencia} onChange={(e) => setNewDataUser((prev: any) => ({ ...prev, dependencia: e.target.value }))} variant='bordered' label='Dependencia' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} isDisabled required />
                                </div>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button type="submit" form="form-profile" color="primary">
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>, document.body
    );
}

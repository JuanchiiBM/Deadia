import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input } from "@nextui-org/react";
import { GETFunctionConfig } from "@/utils/helpers/httpsFunctions";
import useJsonDataConfig from "@/hooks/useJsonDataConfig";

export default function ModalNavbar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [refreshData, setRefreshData] = useState()

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose()
    }

    const { jsonData: dataUser } = useJsonDataConfig({ url: `api/user/register?start_date=2024-01-01&end_date=2099-01-01`, refreshData, xconfig: 'true' })

    useEffect(() => {
        console.log('ASDASDASD')
        console.log(dataUser)
    }, [dataUser])

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
                                <Input value={dataUser.list[0].nickname} variant='bordered' label='Apodo' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                                <Input value={dataUser.list[0].nombre} variant='bordered' label='Nombre' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                                <Input value={dataUser.list[0].apellido} variant='bordered' label='Apellido' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                                <Input value={dataUser.list[0].password} variant='bordered' label='Contraseña' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                                <div className="flex gap-4">
                                    <Input value={dataUser.list[0].perfil} variant='bordered' label='Perfil' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} isDisabled required />
                                    <Input value={dataUser.list[0].dependencia} variant='bordered' label='Dependencia' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} isDisabled required />
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

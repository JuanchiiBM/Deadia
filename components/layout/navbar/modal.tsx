import React from "react";
import { createPortal } from "react-dom";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input } from "@nextui-org/react";

export default function ModalNavbar({isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onClose()
    }

    return createPortal(
        <Modal isDismissable={false} backdrop='blur' size='xl' className='bg-background' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Configuración de Perfil
                        </ModalHeader>
                        <ModalBody>
                            <form id='form-profile' className="flex flex-col gap-2" onSubmit={(e) => handleSave(e)}>
                                <Input variant='bordered' label='Nombre' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                                <Input variant='bordered' label='Apellido' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                                <Input variant='bordered' label='Mail' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                                <div className="flex gap-4">
                                    <Input variant='bordered' label='Perfil' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} isDisabled required />
                                    <Input variant='bordered' label='Dependencia' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} isDisabled required />
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

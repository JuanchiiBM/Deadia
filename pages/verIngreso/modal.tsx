import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps } from "@nextui-org/react";

interface IModalVerIngreso extends UseDisclosureProps {
    contentModal: any
}

const ModalVerIngreso: React.FC<IModalVerIngreso> = ({ isOpen, onClose, onOpen, contentModal }) => {
    return (
        <Modal backdrop='blur' className='bg-background' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{contentModal.dependencia || contentModal.curso}</ModalHeader>
                        {
                            contentModal.dependencia ?
                                <ModalBody>
                                    <p>
                                        {contentModal.dependencia}-
                                        {contentModal.fecha}
                                    </p>
                                </ModalBody> :
                                <ModalBody>
                                    <p>
                                        {contentModal.curso}-
                                        {contentModal.aula}
                                    </p>
                                </ModalBody>
                        }

                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalVerIngreso
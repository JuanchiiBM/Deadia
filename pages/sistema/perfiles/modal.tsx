import React from 'react'
import ModalFillProfiles from './modalFill'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps } from '@nextui-org/react'
import { IModalUsers } from '@/helpers/interfaces'
import { useUserSelectOptions } from '@/hooks/sistema/usuariosOld/useSelectOptionsUser';
import { createPortal } from 'react-dom';

const ModalProfiles: React.FC<IModalUsers> = ({ isOpen, onClose }) => {
    const { options, isLoading } = useUserSelectOptions()

    return createPortal(
        <Modal isDismissable={false} backdrop='blur' size='4xl' className='bg-background sm:my-0' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            Registrar Perfil
                        </ModalHeader>
                        <ModalBody className='flex flex-row justify-center'>
                            <ModalFillProfiles selectOptions={options} isLoading={isLoading} />
                        </ModalBody>

                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="primary" type='submit' form='user-form'>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>, document.body
    )
}

export default ModalProfiles

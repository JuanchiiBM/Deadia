import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps } from '@nextui-org/react'


interface IModalUsers extends UseDisclosureProps {

}

const ModalUsers:React.FC<IModalUsers> = ({ isOpen, onClose}) => {
  return (
    <Modal isDismissable={false} backdrop='blur' size='4xl' className='bg-background' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1"></ModalHeader>
                        <ModalBody className='flex flex-row justify-center'>
            

                        </ModalBody>

                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="primary" type='submit' form='register-charge'>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
  )
}

export default ModalUsers

import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps } from '@nextui-org/react'
import ModalSelectsEgresos from './modalSelects'
import ModalInputsEgresos from './modalInputs'
import { SuccessAlert } from '@/components/sweetAlert/SweetsAlerts'
import { Option } from './modalSelects'

const ModalEgresos: React.FC<UseDisclosureProps> = ({ isOpen, onClose, onOpen }) => {
    const [valueType, setValueType] = useState<Option | null>();
    const [valueArticle, setValueArticle] = useState<Option | null>();
    const [isDisabled, setIsDisabled] = useState(true)

    const cargarEgreso = () => {
        SuccessAlert('Registro Cargado', '', 'Ok', () => {
            if (onClose)
                onClose()
        })
    }

    return (
        <Modal backdrop='blur' size='xl' className='bg-background' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Registrar Egreso</ModalHeader>
                        <ModalBody className='flex flex-row justify-center'>
                            <form action="" className='w-full'>
                                <ModalSelectsEgresos valueArticle={valueArticle} valueType={valueType} setValueArticle={setValueArticle} setValueType={setValueType} isDisabled={isDisabled} setIsDisabled={setIsDisabled}/>
                                <ModalInputsEgresos />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="primary" type='submit' form='register-charge' onPress={() => cargarEgreso()}>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalEgresos
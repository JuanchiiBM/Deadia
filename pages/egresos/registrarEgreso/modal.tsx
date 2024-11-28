import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps } from '@nextui-org/react'
import ModalSelectsEgresos from './modalSelects'
import ModalInputsEgresos from './modalInputs'
import { SuccessAlert } from '@/components/sweetAlert/SweetsAlerts'
import SpinnerC from '@/components/spinner/Spinner'
import { createPortal } from 'react-dom'
import { useForm } from '@/hooks/egresos/registrarEgreso/useForm'
import { useUpdate } from '@/hooks/egresos/registrarEgreso/useUpdate'
import { useEgressRegisterContext } from '@/hooks/egresos/registrarEgreso/useContext'
import { usePost } from '@/hooks/egresos/registrarEgreso/usePost'

const ModalEgresos: React.FC<UseDisclosureProps> = ({ isOpen, onClose, onOpen }) => {
    const { contentModal } = useEgressRegisterContext()
    const { dataForm, handleInputChange, setDataForm } = useForm()
    const { oldRegister } = useUpdate({ setDataForm, contentModal, isOpen })
    const { cargarIngreso, showSpinner } = usePost({ dataForm, oldRegister, onClose })

    return createPortal(
        <Modal isDismissable={false} backdrop='blur' size='xl' className='bg-background' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{ contentModal ? `Editar egreso cargado por ${contentModal.usuario}` : 'Registrar Egreso'}</ModalHeader>
                        <ModalBody className='flex flex-row justify-center'>
                            {showSpinner && <SpinnerC />}
                            <form id='register-egress-charge' onSubmit={(e) => cargarIngreso(e)} className='w-full'>
                                <ModalSelectsEgresos dataForm={dataForm} handleInputChange={handleInputChange} />
                                <ModalInputsEgresos dataForm={dataForm} handleInputChange={handleInputChange} />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="primary" type='submit' form='register-egress-charge'>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>, document.body
    )
}

export default ModalEgresos
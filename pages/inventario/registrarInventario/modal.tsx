import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps } from '@nextui-org/react'
import ModalSelects from './modalSelects'
import ModalInputs from './modalInputs'
import SpinnerC from '@/components/spinner/Spinner'
import { createPortal } from 'react-dom'
import { useForm } from '@/hooks/egresos/registrarEgreso/useForm'
import { useUpdate } from '@/hooks/egresos/registrarEgreso/useUpdate'
import { useContextRegister } from '@/hooks/useContextRegister'
import { usePost } from '@/hooks/egresos/registrarEgreso/usePost'
import { ITableDataEgressInside } from '@/helpers/interfaces'

const ModalView: React.FC<UseDisclosureProps> = ({ isOpen, onClose, onOpen }) => {
    const { contentModal }: { contentModal: ITableDataEgressInside} = useContextRegister()
    const { dataForm, handleInputChange, setDataForm } = useForm()
    const { oldRegister } = useUpdate({ setDataForm, contentModal, isOpen })
    const { cargarIngreso, showSpinner } = usePost({ dataForm, oldRegister, onClose })

    return createPortal(
        <Modal isDismissable={false} backdrop='blur' size='xl' className='bg-background' isOpen={isOpen} onClose={onClose}>
            {showSpinner && <SpinnerC />}
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{ contentModal ? `Editar egreso cargado por ${contentModal.usuario}` : 'Registrar Egreso'}</ModalHeader>
                        <ModalBody className='flex flex-row justify-center'>
                            <form id='register-egress-charge' onSubmit={(e) => cargarIngreso(e)} className='w-full'>
                                <ModalSelects dataForm={dataForm} handleInputChange={handleInputChange} />
                                <ModalInputs dataForm={dataForm} handleInputChange={handleInputChange} />
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

export default ModalView
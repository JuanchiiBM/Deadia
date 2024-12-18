import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps } from '@nextui-org/react'
import ModalFirstSection from './modalFirstSection'
import ModalResumen from './modalResumen'
import SpinnerC from '@/components/spinner/Spinner'
import { createPortal } from 'react-dom'
import { useForm } from '@/hooks/inventario/registrarInventario/useForm'
import { useUpdate } from '@/hooks/inventario/registrarInventario/useUpdate'
import { useContextRegister } from '@/hooks/useContextRegister'
import { usePost } from '@/hooks/inventario/registrarInventario/usePost'
import { ITableDataEgressInside } from '@/helpers/interfaces'

const ModalView: React.FC<UseDisclosureProps> = ({ isOpen, onClose, onOpen }) => {
    const { contentModal }: { contentModal: ITableDataEgressInside} = useContextRegister()
    const { dataForm, handleInputChange, setDataForm } = useForm()
    const { oldRegister } = useUpdate({ setDataForm, contentModal, isOpen })
    const { cargarIngreso, showSpinner } = usePost({ dataForm, oldRegister, onClose })

    return createPortal(
        <Modal isDismissable={false} backdrop='blur' size='3xl' className='bg-background' isOpen={isOpen} onClose={onClose}>
            {showSpinner && <SpinnerC />}
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{ contentModal ? `Editar nventario cargado por ${contentModal.usuario}` : 'Registrar Inventario'}</ModalHeader>
                        <ModalBody className='flex flex-row justify-center gap-0'>
                            <form id='register-charge' onSubmit={(e) => cargarIngreso(e)} className='w-full flex flex-col justify-evenly border-r-1 pr-6'>
                                <ModalFirstSection dataForm={dataForm} handleInputChange={handleInputChange} />
                            </form>
                            <ModalResumen dataForm={dataForm}/>
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
        </Modal>, document.body
    )
}

export default ModalView
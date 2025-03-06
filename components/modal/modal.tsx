import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react"
import SpinnerComponent from '@/components/spinner/Spinner'
import { createPortal } from 'react-dom'
import { useContextRegister } from '@/context/contextRegister'
import { usePost } from '@/hooks/usePost'

interface IModalView {
    children: React.ReactNode
    text: string
    isOpen: boolean
    onClose: () => void
    onOpen: () => void
    _dataObject: any
    urlPost: string
    oldRegister: any
    configHeader?: boolean
    size: "sm" | "md" | "lg" | "xl" | "2xl" | "xs" | "3xl" | "4xl" | "5xl" | "full" | undefined
}

const ModalView: React.FC<IModalView> = ({children, isOpen, onClose, onOpen, _dataObject, urlPost, oldRegister, text, size, configHeader }) => {
    const { contentTable }: { contentTable: any} = useContextRegister()
    const { cargarIngreso, showSpinner } = usePost({ oldRegister, onClose, _dataObject, urlPost, text, configHeader })

    return createPortal(
        <Modal isDismissable={false} backdrop='blur' size={size} className='bg-background-200' isOpen={isOpen} onClose={onClose}>
            {showSpinner && <SpinnerComponent />}
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{ contentTable && contentTable.usuario ? `Editar ${text} cargado por ${contentTable.usuario}` : contentTable ? `Editar ${text}` : `Cargar ${text}`}</ModalHeader>
                        <ModalBody className='flex flex-row justify-center gap-0'>
                            <form id='register-charge' onSubmit={(e) => cargarIngreso(e)} className='w-full flex flex-col justify-evenly'>
                                {children}
                            </form>
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
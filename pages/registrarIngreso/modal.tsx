import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps, Input, DateRangePicker } from '@nextui-org/react'
import { I18nProvider } from "@react-aria/i18n";
import ModalSelectsRegistrarIngreso from './modalSelects';
import ModalResumenRegistrarIngreso from './modalResumen';

const ModalRegistrarIngreso: React.FC<UseDisclosureProps> = ({ isOpen, onClose, onOpen }) => {
    const [valueDNI, setValueDNI] = useState<string | undefined>()
    const [valueNombre, setValueNombre] = useState<string | undefined>()
    const [valueApellido, setValueApellido] = useState<string | undefined>()

    return (
        <Modal backdrop='blur' size='3xl' className='bg-background' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Registrar Ingreso</ModalHeader>
                        <ModalBody className='flex flex-row justify-center'>
                            <form id='register-charge' className='flex flex-col justify-evenly w-[70%] border-r-1 pr-8'>
                                <div className='mb-[75px]'>
                                    <h3 className='w-full border-b-1 mb-2'>Datos del alumno:</h3>
                                    <div className='flex gap-2'>
                                        <Input value={valueDNI} onChange={(e) => setValueDNI(e.currentTarget.value)} variant='bordered' labelPlacement='outside' label='DNI' required type='number' />
                                        <Input value={valueNombre} onChange={(e) => setValueNombre(e.currentTarget.value)} variant='bordered' labelPlacement='outside' label='Nombre' required />
                                        <Input value={valueApellido} onChange={(e) => setValueApellido(e.currentTarget.value)} variant='bordered' labelPlacement='outside' label='Apellido' required />
                                    </div>
                                    <div className="mt-7">
                                        <Input variant='bordered' labelPlacement='outside' label='Mail' required />
                                    </div>
                                </div>

                                <div>
                                    <h3 className='w-full border-b-1 mb-2'>Datos del curso:</h3>
                                    <ModalSelectsRegistrarIngreso />
                                    <div className='flex gap-2'>
                                        <Input className='m-0' classNames={{ mainWrapper: 'flex justify-end' }} variant='bordered' labelPlacement='outside' placeholder='$' type='number' label='Monto' />
                                        <I18nProvider locale='es-ES'>
                                            <DateRangePicker id='datepicker' variant='bordered' label='Duración del Curso' labelPlacement='outside' className="max-w-xs transition-all" classNames={{
                                                input: 'bg-background hover:bg-background focus:bg-background',
                                                inputWrapper: 'bg-background hover:!bg-background focus:bg-background',
                                            }} calendarProps={{ classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200" } }} />
                                        </I18nProvider>
                                    </div>
                                </div>
                            </form>
                            <ModalResumenRegistrarIngreso valueDNI={valueDNI} valueNombre={valueNombre} valueApellido={valueApellido}/>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                            <Button color="primary" type='submit' form='register-charge' onPress={onClose}>
                                Guardar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ModalRegistrarIngreso
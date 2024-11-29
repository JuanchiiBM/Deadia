import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps, Input } from '@nextui-org/react'
import ModalSelectsRegistrarIngreso from './modalSelects';
import ModalResumenRegistrarIngreso from './modalResumen';
import ModalSelectsRegistrarIngreso2 from './modalSelects2';
import { useSearchDNI } from '@/hooks/inscripciones/registrarInscripcion/useSearchDNI';
import { useFormInscription } from '@/hooks/inscripciones/registrarInscripcion/useFormInscription';
import { IRegister } from '@/helpers/interfaces';
import { useUpdateInscription } from '@/hooks/inscripciones/registrarInscripcion/useUpdateInscription';
import { usePostInscription } from '@/hooks/inscripciones/registrarInscripcion/usePostInscription';
import { useSelectOptionsInscriptionModal } from '@/hooks/inscripciones/registrarInscripcion/useSelectOptionsInscription';
import SpinnerC from '@/components/spinner/Spinner';
import { createPortal } from 'react-dom';
import { useUpdateContext } from '@/hooks/inscripciones/registrarInscripcion/useUpdateContext';

interface IModalRegistrarIngreso extends UseDisclosureProps {
    setContentModal: React.Dispatch<React.SetStateAction<IRegister | any>>
    contentModal: any
    setOptionsCharged: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalRegistrarIngreso: React.FC<IModalRegistrarIngreso> = ({ setOptionsCharged, isOpen, onClose, contentModal }) => {
    const { studentInfo, handleInputChange, setStudentInfo } = useFormInscription()
    const { update } = useUpdateContext()

    const { oldRegister } = useUpdateInscription({ setStudentInfo, contentModal, isOpen })
    const { cargarIngreso, showSpinner } = usePostInscription({ studentInfo, oldRegister, onClose })
    const { jsonData } = useSelectOptionsInscriptionModal({ setOptionsCharged })
    const { isLoadingDni, setDni } = useSearchDNI({ handleInputChange, jsonData })


    return createPortal (
        <Modal isDismissable={false} backdrop='blur' size='4xl' className='bg-background sm:my-0' isOpen={isOpen} onClose={onClose}>
            {showSpinner && <SpinnerC />}
            <ModalContent>
                {(onClose: any) => (
                    <>                        
                        <ModalHeader className="flex flex-col gap-1">{contentModal ? `Editar inscripción cargada por ${contentModal.usuario}` : 'Registrar inscripción'}</ModalHeader>
                        <ModalBody className='flex flex-row justify-center'>
                            

                            <form id='register-charge' onSubmit={(e) => cargarIngreso(e)} className='flex flex-col justify-evenly w-[70%] border-r-1 pr-8'>
                                <div className='mb-[75px]'>
                                    <h3 className='w-full border-b-1 mb-2'>Datos del alumno:</h3>
                                    <div className='flex gap-2'>
                                        <Input maxLength={20} value={studentInfo.dni ? studentInfo.dni : ''} onChange={(e) => {setDni(e.currentTarget.value); handleInputChange('dni', e.currentTarget.value)}} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='DNI' required type="number" isDisabled={update}/>
                                        <Input maxLength={30} value={studentInfo.name ? studentInfo.name : ''} onChange={(e) => handleInputChange('name', e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Nombre' required isDisabled={isLoadingDni}/>
                                        <Input maxLength={30} value={studentInfo.lastname ? studentInfo.lastname : ''} onChange={(e) => handleInputChange('lastname', e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Apellido' required isDisabled={isLoadingDni}/>
                                    </div>
                                    <div className="mt-7">
                                        <Input value={studentInfo.mail ? studentInfo.mail : ''} onChange={(e) => handleInputChange('mail', e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Mail' required type='mail' isDisabled={isLoadingDni}/>
                                        <ModalSelectsRegistrarIngreso2 jsonData={jsonData} studentInfo={studentInfo} handleInputChange={handleInputChange} isOpen={isOpen} isLoadingDni={isLoadingDni} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className='w-full border-b-1 mb-2'>Datos del curso:</h3>
                                    <ModalSelectsRegistrarIngreso studentInfo={studentInfo} handleInputChange={handleInputChange} jsonData={jsonData} contentModal={contentModal} />
                                    
                                </div>
                            </form>
                            <ModalResumenRegistrarIngreso studentInfo={studentInfo} />
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

export default ModalRegistrarIngreso
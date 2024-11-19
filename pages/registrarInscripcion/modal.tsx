import React, { useEffect, useState, FormEvent } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps, Input, DateRangePicker } from '@nextui-org/react'
import { I18nProvider } from "@react-aria/i18n";
import ModalSelectsRegistrarIngreso from './modalSelects';
import ModalResumenRegistrarIngreso from './modalResumen';
import ModalSelectsRegistrarIngreso2 from './modalSelects2';
import { createOption, Option } from '@/utils/globals';
import { POSTFunction, formatDateFromDatePicker, GETFunction } from '@/utils/globals';
import { QuestionAlert, SuccessAlert } from '@/components/sweetAlert/SweetsAlerts';
import { getLocalTimeZone, today } from "@internationalized/date";
import { useSearchDNI } from '@/hooks/useSearchDNI';
import { useFormInscription } from '@/hooks/useFormInscription';
import { IRegister, IncomeRegisterOptions } from '@/helpers/interfaces';

interface IModalRegistrarIngreso extends UseDisclosureProps {
    setContentModal: React.Dispatch<React.SetStateAction<IRegister | any>>
    contentModal: any
    setOptionsCharged: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalRegistrarIngreso: React.FC<IModalRegistrarIngreso> = ({ setOptionsCharged, isOpen, onClose, contentModal }) => {
    const { studentInfo, handleInputChange, setStudentInfo } = useFormInscription()

    const [isDisabled, setIsDisabled] = useState(true)
    const [jsonData, setJsonData] = useState<any>(undefined)
    const [jsonIsCharged, setJsonIsCharged] = useState<boolean>(true)

    const { checkExistDNI, isLoading } = useSearchDNI({ handleInputChange })

    useEffect(() => {
        setStudentInfo({
            dni: contentModal ? contentModal.dni : '',
            name: contentModal ? contentModal.nombre.split(' ')[0] : '',
            lastname: contentModal ? contentModal.nombre.split(' ')[1] : '',
            mail: contentModal ? contentModal.mail : '',
            category: contentModal ? createOption(contentModal.categoriaSinGrado) : null,
            grade: contentModal && contentModal.grado != '' ? createOption(contentModal.grado) : null,
            classroom: contentModal ? createOption(contentModal.aula) : null,
            curse: null,
            dependency: null,
            amount: contentModal ? contentModal.monto : '',
            datePicker: {
                start: null,
                end: null
            }
        })
    }, [isOpen])

    const cargarIngreso = async (e: FormEvent<HTMLFormElement>, repetido?: number) => {
        e.preventDefault()
        const _dataObject = {
            id_classroom: parseInt(studentInfo?.classroom?.value || ''),
            id_dependency: parseInt(studentInfo?.dependency?.value || ''),
            amount: studentInfo.amount,
            date: formatDateFromDatePicker(today(getLocalTimeZone())),
            dni: studentInfo.dni,
            name: studentInfo.name,
            last_name: studentInfo.lastname,
            email: studentInfo.mail,
            id_category: parseInt(studentInfo?.category?.value || ''),
            status: repetido == undefined ? 0 : 1,

            code: studentInfo.classroom?.label,
            begin_date: formatDateFromDatePicker(studentInfo.datePicker.start),
            end_date: formatDateFromDatePicker(studentInfo.datePicker.end),
            id_grade_type: parseInt(studentInfo?.curse?.value || '')
        }
        const response = await POSTFunction(`api/income/register/form`, _dataObject)
        console.log(response)
        if (response.status = 'ok') {
            SuccessAlert('Registro Cargado', '', 'Ok', () => {
                if (onClose)
                    onClose()
            })
        } else {
            QuestionAlert('Registro Repetido', 'Este alumno fue cargado hace menos de 14 días, ¿Esta usted seguro de que desea cargarlo?', 'Cargar', () => {
                cargarIngreso(e, 1)
            })
        }
    }

    const initOptions = async () => {
        const jsonDataResponse = await GETFunction('api/income/register/form', setJsonIsCharged) as IncomeRegisterOptions
        setJsonData(jsonDataResponse)
        setOptionsCharged(true)
    }

    useEffect(() => {
        initOptions()
    }, [])

    return (
        <Modal isDismissable={false} backdrop='blur' size='4xl' className='bg-background sm:my-0' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{contentModal ? `Editar Ingreso (cargado por ${contentModal.usuario})` : 'Registrar Ingreso'}</ModalHeader>
                        <ModalBody className='flex flex-row justify-center'>
                            <form id='register-charge' onSubmit={(e) => cargarIngreso(e)} className='flex flex-col justify-evenly w-[70%] border-r-1 pr-8'>
                                <div className='mb-[75px]'>
                                    <h3 className='w-full border-b-1 mb-2'>Datos del alumno:</h3>
                                    <div className='flex gap-2'>
                                        <Input maxLength={20} value={studentInfo.dni ? studentInfo.dni : ''} onChange={(e) => checkExistDNI(e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='DNI' required type="number" />
                                        <Input maxLength={30} isDisabled={isLoading} value={studentInfo.name ? studentInfo.name : ''} onChange={(e) => handleInputChange('name', e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Nombre' required />
                                        <Input maxLength={30} isDisabled={isLoading} value={studentInfo.lastname ? studentInfo.lastname : ''} onChange={(e) => handleInputChange('lastname', e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Apellido' required />
                                    </div>
                                    <div className="mt-7">
                                        <Input isDisabled={isLoading} value={studentInfo.mail ? studentInfo.mail : ''} onChange={(e) => handleInputChange('mail', e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Mail' required type='mail' />
                                        <ModalSelectsRegistrarIngreso2 jsonData={jsonData} studentInfo={studentInfo} handleInputChange={handleInputChange} isOpen={isOpen} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className='w-full border-b-1 mb-2'>Datos del curso:</h3>
                                    <ModalSelectsRegistrarIngreso studentInfo={studentInfo} handleInputChange={handleInputChange} jsonData={jsonData} jsonIsCharged={jsonIsCharged} contentModal={contentModal} setIsDisabled={setIsDisabled} isDisabled={isDisabled} />
                                    <div className='flex gap-2'>
                                        <Input maxLength={20} value={studentInfo.amount ? studentInfo.amount : ''} onChange={(e) => handleInputChange('amount', e.currentTarget.value)} className='m-0' classNames={{ mainWrapper: 'flex justify-end' }} variant='bordered' labelPlacement='outside' placeholder='$' type="number" label='Monto' required />
                                        <I18nProvider locale='es-ES'>
                                            <DateRangePicker visibleMonths={2} value={studentInfo.datePicker} onChange={(e) => { handleInputChange('datePicker', e) }} isDisabled={isDisabled} id='datepicker' variant='bordered' label='Duración del Curso' labelPlacement='outside' className="max-w-xs transition-all" classNames={{
                                                input: 'bg-background hover:bg-background focus:bg-background disabled:!text-default-400',
                                                inputWrapper: 'bg-background hover:!bg-background focus:bg-background disabled:!text-default-400',
                                            }} />
                                        </I18nProvider>
                                    </div>
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
        </Modal>
    )
}

export default ModalRegistrarIngreso
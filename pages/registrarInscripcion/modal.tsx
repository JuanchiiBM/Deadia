import React, { useEffect, useState, FormEvent } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps, Input, DateRangePicker } from '@nextui-org/react'
import { I18nProvider } from "@react-aria/i18n";
import ModalSelectsRegistrarIngreso from './modalSelects';
import ModalResumenRegistrarIngreso from './modalResumen';
import ModalSelects2 from './modalSelects2';
import { RangeValue } from "@react-types/shared";
import { createOption, Option } from '@/utils/globals';
import { POSTFunction, formatDateFromDatePicker, GETFunction } from '@/utils/globals';
import { SuccessAlert } from '@/components/sweetAlert/SweetsAlerts';
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";

interface IModalRegistrarIngreso extends UseDisclosureProps {
    contentModal: any
    setOptionsCharged: React.Dispatch<React.SetStateAction<boolean>>
}

export interface IncomeRegisterOptions {
    classrooms: [
        IncomeRegisterOptionClassroom
    ],
    categories: [
        IncomeRegisterOptionCategory
    ],
    deps: [
        IncomeRegisterOptionDep
    ],
    grades: [
        IncomeRegisterOptionGrade
    ],
    ranks: [
        IncomeRegisterOptionRank
    ]
}

export interface IncomeRegisterOptionClassroom {
    curso: string
    dependencia: string
    fec_finalizacion: string
    fec_inicio: string
    codigo: string
    id: number
    id_curso: number
    id_dependencia: number
}

export interface IncomeRegisterOptionCategory {
    id: number
    categoria: string
}

export interface IncomeRegisterOptionDep {
    id: number
    dependencia: string
}

export interface IncomeRegisterOptionGrade {
    id: number
    curso: string
}

export interface IncomeRegisterOptionRank {
    id: number
    grado: string
    id_categoria: number
}

export type dataObjectIds = {
    id_classroom: number | null
    id_dependency: number | null
    id_grade: number | null
    id_category: number | null
}

const initDataObject: dataObjectIds = {
    id_classroom: null,
    id_dependency: null,
    id_grade: null,
    id_category: null
}


const ModalRegistrarIngreso: React.FC<IModalRegistrarIngreso> = ({ setOptionsCharged, isOpen, onClose, onOpen, contentModal }) => {
    const [valueDNI, setValueDNI] = useState<string | undefined>()
    const [valueNombre, setValueNombre] = useState<string | undefined>()
    const [valueApellido, setValueApellido] = useState<string | undefined>()
    const [valueCategory, setValueCategory] = useState<Option | null>()
    const [valueGrade, setValueGrade] = useState<Option | null>()
    const [valueMail, setValueMail] = useState<string | undefined>()
    const [valueClassroom, setValueClassroom] = useState<Option | null>();
    const [valueCurse, setValueCurse] = useState<Option | null>();
    const [valueDependency, setValueDependency] = useState<Option | null>();
    const [valueMonto, setValueMonto] = useState<string | undefined>();
    const [valueDatePicker, setValueDatePicker] = useState<RangeValue<any>>({
        start: null,
        end: null,
    });
    const [dataObject, setDataObject] = useState<dataObjectIds>(initDataObject)
    const [isDisabled, setIsDisabled] = useState(true)
    const [jsonData, setJsonData] = useState<any>(undefined)
    const [jsonIsCharged, setJsonIsCharged] = useState<boolean>(true)

    useEffect(() => {
        setValueDNI(contentModal ? contentModal.dni : '')
        setValueNombre(contentModal ? contentModal.nombre.split(' ')[0] : '')
        setValueApellido(contentModal ? contentModal.nombre.split(' ')[1] : '')
        setValueCategory(contentModal ? createOption(contentModal.categoriaSinGrado) : null)
        setValueGrade(contentModal && contentModal.grado != '' ? createOption(contentModal.grado) : null)
        setValueMail(contentModal ? contentModal.mail : '')
        setValueClassroom(contentModal ? createOption(contentModal.aula) : null)
        setValueCurse(undefined)
        setValueDependency(undefined)
        setValueMonto(contentModal ? contentModal.monto : '')
        setValueDatePicker({ start: undefined, end: undefined })
    }, [isOpen])

    const cargarIngreso = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const _dataObject = {
            id_classroom: dataObject?.id_classroom,
            id_dependency: dataObject?.id_dependency,
            amount: valueMonto,
            date: formatDateFromDatePicker(today(getLocalTimeZone())),
            dni: valueDNI,
            name: valueNombre,
            last_name: valueApellido,
            email: valueMail,
            id_category: dataObject?.id_category,
            status: true,

            code: valueClassroom,
            
        }
        console.log(_dataObject)
        
        const response = await POSTFunction(`api/income/register/form`, _dataObject)
        console.log(response)
        SuccessAlert('Registro Cargado', '', 'Ok', () => {
            if (onClose)
                onClose()
        })
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
        <Modal isDismissable={false} backdrop='blur' size='4xl' className='bg-background' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{contentModal ? `Editar Ingreso (cargado por ${contentModal.usuario})` : 'Registrar Ingreso'}</ModalHeader>
                        <ModalBody className='flex flex-row justify-center'>
                            <form id='register-charge' onSubmit={(e) => cargarIngreso(e)} className='flex flex-col justify-evenly w-[70%] border-r-1 pr-8'>
                                <div className='mb-[75px]'>
                                    <h3 className='w-full border-b-1 mb-2'>Datos del alumno:</h3>
                                    <div className='flex gap-2'>
                                        <Input maxLength={20} value={valueDNI} onChange={(e) => setValueDNI(e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='DNI' required type="number" />
                                        <Input maxLength={30} value={valueNombre} onChange={(e) => setValueNombre(e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Nombre' required />
                                        <Input maxLength={30} value={valueApellido} onChange={(e) => setValueApellido(e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Apellido' required />
                                    </div>
                                    <div className="mt-7">
                                        <Input value={valueMail} onChange={(e) => setValueMail(e.currentTarget.value)} variant='bordered' classNames={{ mainWrapper: 'flex justify-end mt-2' }} labelPlacement='outside' label='Mail' required type='mail' />
                                        <ModalSelects2 setDataObject={setDataObject} jsonData={jsonData} jsonIsCharged={jsonIsCharged} setValueCategory={setValueCategory} valueCategory={valueCategory} setValueGrade={setValueGrade} valueGrade={valueGrade} isOpen={isOpen} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className='w-full border-b-1 mb-2'>Datos del curso:</h3>
                                    <ModalSelectsRegistrarIngreso setDataObject={setDataObject} jsonData={jsonData} jsonIsCharged={jsonIsCharged} contentModal={contentModal} setValueClassroom={setValueClassroom} valueClassroom={valueClassroom} setIsDisabled={setIsDisabled} isDisabled={isDisabled}
                                        setValueCurse={setValueCurse} valueCurse={valueCurse} setValueDependency={setValueDependency} valueDependency={valueDependency} setValueDatePicker={setValueDatePicker} />
                                    <div className='flex gap-2'>
                                        <Input maxLength={20} value={valueMonto} onChange={(e) => setValueMonto(e.currentTarget.value)} className='m-0' classNames={{ mainWrapper: 'flex justify-end' }} variant='bordered' labelPlacement='outside' placeholder='$' type="number" label='Monto' required />
                                        <I18nProvider locale='es-ES'>
                                            <DateRangePicker visibleMonths={2} value={valueDatePicker} onChange={(e) => { setValueDatePicker(e) }} isDisabled={isDisabled} id='datepicker' variant='bordered' label='Duración del Curso' labelPlacement='outside' className="max-w-xs transition-all" classNames={{
                                                input: 'bg-background hover:bg-background focus:bg-background disabled:!text-default-400',
                                                inputWrapper: 'bg-background hover:!bg-background focus:bg-background disabled:!text-default-400',
                                            }} />
                                        </I18nProvider>
                                    </div>
                                </div>
                            </form>
                            <ModalResumenRegistrarIngreso valueDNI={valueDNI} valueNombre={valueNombre} valueApellido={valueApellido} valueClassroom={valueClassroom}
                                valueCurse={valueCurse} valueDependency={valueDependency} valueMonto={valueMonto} valueDatePicker={valueDatePicker}
                                valueCategory={valueCategory} valueGrade={valueGrade} valueMail={valueMail} />
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
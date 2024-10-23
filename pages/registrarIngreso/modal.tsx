import React, { useEffect, useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, UseDisclosureProps, Input, DateRangePicker } from '@nextui-org/react'
import { I18nProvider } from "@react-aria/i18n";
import ModalSelectsRegistrarIngreso from './modalSelects';
import ModalResumenRegistrarIngreso from './modalResumen';
import { Option } from './modalSelects';
import {RangeValue} from "@react-types/shared";
import {parseDate} from "@internationalized/date";

const ModalRegistrarIngreso: React.FC<UseDisclosureProps> = ({ isOpen, onClose, onOpen }) => {
    const [valueDNI, setValueDNI] = useState<string | undefined>()
    const [valueNombre, setValueNombre] = useState<string | undefined>()
    const [valueApellido, setValueApellido] = useState<string | undefined>()
    const [valueClassroom, setValueClassroom] = useState<Option | null>();
    const [valueCurse, setValueCurse] = useState<Option | null>();
    const [valueDependency, setValueDependency] = useState<Option | null>();
    const [valueMonto, setValueMonto] = useState<string | undefined>();
    const [valueDatePicker, setValueDatePicker] = useState<RangeValue<any>>({
        start: undefined,
        end: undefined,
      });
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        setValueDNI(undefined)
        setValueNombre(undefined)
        setValueApellido(undefined)
        setValueClassroom(undefined)
        setValueCurse(undefined)
        setValueDependency(undefined)
        setValueMonto(undefined)
        setValueDatePicker({ start: undefined, end: undefined})
    },[isOpen])

    return (
        <Modal backdrop='blur' size='4xl' className='bg-background' isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(onClose: any) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Registrar Ingreso</ModalHeader>
                        <ModalBody className='flex flex-row justify-center'>
                            <form id='register-charge' className='flex flex-col justify-evenly w-[70%] border-r-1 pr-8'>
                                <div className='mb-[75px]'>
                                    <h3 className='w-full border-b-1 mb-2'>Datos del alumno:</h3>
                                    <div className='flex gap-2'>
                                        <Input maxLength={20} value={valueDNI} onChange={(e) => setValueDNI(e.currentTarget.value)} variant='bordered' labelPlacement='outside' label='DNI' required type = "number" />
                                        <Input maxLength={30} value={valueNombre} onChange={(e) => setValueNombre(e.currentTarget.value)} variant='bordered' labelPlacement='outside' label='Nombre' required />
                                        <Input maxLength={30} value={valueApellido} onChange={(e) => setValueApellido(e.currentTarget.value)} variant='bordered' labelPlacement='outside' label='Apellido' required />
                                    </div>
                                    <div className="mt-7">
                                        <Input variant='bordered' labelPlacement='outside' label='Mail' required type='mail' />
                                    </div>
                                </div>

                                <div>
                                    <h3 className='w-full border-b-1 mb-2'>Datos del curso:</h3>
                                    <ModalSelectsRegistrarIngreso setValueClassroom={setValueClassroom} valueClassroom={valueClassroom} setIsDisabled={setIsDisabled} isDisabled={isDisabled}
                                    setValueCurse={setValueCurse} valueCurse={valueCurse} setValueDependency={setValueDependency} valueDependency={valueDependency} setValueDatePicker={setValueDatePicker}/>
                                    <div className='flex gap-2'>
                                        <Input maxLength={20} value={valueMonto} onChange={(e) => setValueMonto(e.currentTarget.value)} className='m-0' classNames={{ mainWrapper: 'flex justify-end' }} variant='bordered' labelPlacement='outside' placeholder='$' type="number" label='Monto' required/>
                                        <I18nProvider locale='es-ES'>
                                            <DateRangePicker visibleMonths={2} value={valueDatePicker} onChange={(e) => {setValueDatePicker(e)}} isDisabled={isDisabled} id='datepicker' variant='bordered' label='Duración del Curso' labelPlacement='outside' className="max-w-xs transition-all" classNames={{
                                                input: 'bg-background hover:bg-background focus:bg-background',
                                                inputWrapper: 'bg-background hover:!bg-background focus:bg-background',
                                            }} calendarProps={{ classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200" } }} />
                                        </I18nProvider>
                                    </div>
                                </div>
                            </form>
                            <ModalResumenRegistrarIngreso valueDNI={valueDNI} valueNombre={valueNombre} valueApellido={valueApellido} valueClassroom={valueClassroom}
                            valueCurse={valueCurse} valueDependency={valueDependency} valueMonto={valueMonto} valueDatePicker={valueDatePicker}/>
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
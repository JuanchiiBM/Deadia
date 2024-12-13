import React from 'react'
import { Input, DatePicker, RangeValue, DateValue } from '@nextui-org/react'
import { I18nProvider } from "@react-aria/i18n";
import { IUseFormEgressRegister } from '@/helpers/interfaces';
import { getLocalTimeZone, today } from "@internationalized/date";
import { Option } from '@/utils/globals';

interface IModalInputs {
    dataForm: IUseFormEgressRegister
    handleInputChange: (field: string, value: string | RangeValue<any> | DateValue | undefined | Option | null) => void
}

const ModalInputs: React.FC<IModalInputs> = ({ dataForm, handleInputChange }) => {
    return (
        <>
            <div className='w-full m-0 flex gap-2'>
                <I18nProvider locale='es-ES'>
                    <DatePicker label="Fecha de Compra" value={dataForm.datePicker} onChange={(e) => {handleInputChange('datePicker', e)}} maxValue={today(getLocalTimeZone())} showMonthAndYearPickers labelPlacement='outside' variant='bordered' classNames={{
                        input: 'bg-background hover:bg-background focus:bg-background disabled:!text-default-400',
                        inputWrapper: 'bg-background hover:!bg-background focus:bg-background disabled:!text-default-400',
                    }} />
                </I18nProvider>
                <I18nProvider locale='es-ES'>
                    <DatePicker label="Fecha de Vencimiento" value={dataForm.datePickerVencimiento} onChange={(e) => {handleInputChange('datePickerVencimiento', e)}} showMonthAndYearPickers labelPlacement='outside' variant='bordered' classNames={{
                        input: 'bg-background hover:bg-background focus:bg-background disabled:!text-default-400',
                        inputWrapper: 'bg-background hover:!bg-background focus:bg-background disabled:!text-default-400',
                    }} />
                </I18nProvider>
            </div>
            <div className='w-full mt-3 flex gap-2'>
                <Input variant='bordered' value={dataForm.amount ? dataForm.amount : ''} onChange={(e) => {handleInputChange('amount', e.currentTarget.value)}} placeholder='---' label='Cantidad' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                <Input variant='bordered' value={dataForm.price ? dataForm.price : ''} onChange={(e) => {handleInputChange('price', e.currentTarget.value)}} placeholder='$' label='Monto' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
            </div>
            <div className='w-full mt-3 flex gap-2'>
                <Input variant='bordered' value={dataForm.nro_proceso ? dataForm.nro_proceso : ''} onChange={(e) => {handleInputChange('nro_proceso', e.currentTarget.value)}} placeholder='---' label='Nro. Proceso' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
                <Input variant='bordered' value={dataForm.nro_renglon ? dataForm.nro_renglon : ''} onChange={(e) => {handleInputChange('nro_renglon', e.currentTarget.value)}} placeholder='---' label='Nro. Renglon' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
            </div>
            <div className='w-full mt-3 flex gap-2'>
                <Input variant='bordered' value={dataForm.description ? dataForm.description : ''} onChange={(e) => {handleInputChange('description', e.currentTarget.value)}} placeholder=' ' label='Descripción' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
            </div>
        </>
    )
}

export default ModalInputs
import React from 'react'
import { Input, DatePicker } from '@nextui-org/react'
import { I18nProvider } from "@react-aria/i18n";

const ModalInputsEgresos = () => {
    return (
        <div className='w-full m-0 flex gap-2'>
            <I18nProvider locale='es-ES'>
                <DatePicker label="Fecha de Compra" showMonthAndYearPickers labelPlacement='outside' variant='bordered' classNames={{
                    input: 'bg-background hover:bg-background focus:bg-background disabled:!text-default-400',
                    inputWrapper: 'bg-background hover:!bg-background focus:bg-background disabled:!text-default-400',
                }} />
            </I18nProvider>
            <Input variant='bordered' placeholder='---' label='Cantidad' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
            <Input variant='bordered' placeholder='$' label='Monto' labelPlacement='outside' classNames={{ mainWrapper: 'flex justify-end' }} required />
        </div>
    )
}

export default ModalInputsEgresos

/*<I18nProvider locale='es-ES'>
 <DateRangePicker visibleMonths={2} value={valueDatePicker} onChange={(e) => {setValueDatePicker(e)}} isDisabled={isDisabled} id='datepicker' variant='bordered' label='Duración del Curso' labelPlacement='outside' className="max-w-xs transition-all" classNames={{
    input: 'bg-background hover:bg-background focus:bg-background disabled:!text-default-400',
    inputWrapper: 'bg-background hover:!bg-background focus:bg-background disabled:!text-default-400',
}} calendarProps={{ classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200" } }} />
</I18nProvider>*/
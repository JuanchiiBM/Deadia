import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import { DateRangePicker } from "@nextui-org/react";
import { RangeValue } from "@react-types/shared";
import { colourStyles } from '@/helpers/selects';
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, parseDate, today, DateValue, startOfYear } from "@internationalized/date";
import { useDatePickerCharge } from '@/hooks/inscripciones/verInscripcion/useDatePickerCharge';

interface IOptionsVerInsc {
    dateRef: React.MutableRefObject<any>
    selectDateRange: () => Promise<void>
}

const Options: React.FC<IOptionsVerInsc> = ({ dateRef, selectDateRange }) => {
    const { dateInitial, handleDateInitial } = useDatePickerCharge({selectDateRange}) 
    
    return (
        <div className='w-full my-[50px] h-[110px] bg-background-200 flex justify-around p-5 rounded-lg shadow-md'>
            <div className='flex flex-col'>
                <label id='label-dependency' htmlFor="select-dependency">Dependencia:</label>
                <Select aria-labelledby='label-dependency' className='w-[170px]' placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStyles}></Select>
            </div>
            <div>
                <I18nProvider locale='es-ES'>
                    <label htmlFor="datepicker">Seleccionar Rango:</label>
                    <DateRangePicker visibleMonths={2} defaultValue={undefined} ref={dateRef} onChange={(e) => handleDateInitial(e)} value={dateInitial} id='datepicker' labelPlacement='outside' maxValue={today(getLocalTimeZone())} className="max-w-xs transition-all" classNames={{
                        input: 'bg-background hover:bg-background focus:bg-background',
                        inputWrapper: 'bg-background hover:!bg-background focus:bg-background rounded-md',
                    }} calendarProps={{ classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200" } }} />
                </I18nProvider>
            </div>
            <div className='flex flex-col'>
                <label id='label-curse' htmlFor="select-curso">Curso:</label>
                <Select aria-labelledby='label-curse' className='w-[170px]' placeholder='Cursos' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStyles}></Select>
            </div>
        </div>
    )
}

export default Options
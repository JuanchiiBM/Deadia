import React from 'react'
import Select from 'react-select';
import { DateRangePicker } from "@nextui-org/react";
import { colourStyles } from '@/styles/selects';
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useDatePickerCharge } from './hooks/useDatePickerCharge';
import { useChargeOptions } from './hooks/useChargeOptions';
import { useContextView } from '@/context/contextView';
import { useHandlerOptions } from './hooks/useHandlerOptions';
import { dateRangePickerStyles } from '@/styles/dateRangePickerStyles';

interface IOptions {
    setValueOption: React.Dispatch<React.SetStateAction<{
        value: string;
        type: string;
    }>>
    dateRef: React.MutableRefObject<any>
    selectDateRange: () => Promise<void>
}

const Options: React.FC<IOptions> = ({ setValueOption, dateRef, selectDateRange }) => {
    const { jsonIsLoading } = useContextView()
    const { valueSelects, handleValueSelect, disabledClassrooms } = useHandlerOptions()
    const { dateInitial, handleDateInitial } = useDatePickerCharge({selectDateRange}) 
    const { options } = useChargeOptions()
    
    return (
        <div className='w-full my-[50px] h-[110px] bg-background-200 flex justify-around p-5 rounded-lg shadow-md'>
            <div className='flex flex-col'>
                <label id='label-dependency' htmlFor="select-dependency">Categoría:</label>
                <Select maxMenuHeight={300} isDisabled={jsonIsLoading} aria-labelledby='label-dependency' value={valueSelects.dependencies} onChange={(e: any) => {setValueOption({value: e.value, type: 'Dependencies'}); handleValueSelect('dependencies', e)}} defaultValue={options.dependencies[0]} options={options.dependencies} className='w-[170px]' placeholder='Dependencias' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStyles}></Select>
            </div>
            <div>
                <I18nProvider locale='es-ES'>
                    <label htmlFor="datepicker">Seleccionar Rango:</label>
                    <DateRangePicker isDisabled={jsonIsLoading} visibleMonths={2} defaultValue={undefined} ref={dateRef} onChange={(e: any) => handleDateInitial(e)} value={dateInitial} id='datepicker' labelPlacement='outside' maxValue={today(getLocalTimeZone())} {...dateRangePickerStyles} />
                </I18nProvider>
            </div>
            <div className='flex flex-col'>
                <label id='label-curse' htmlFor="select-curso">Artículo:</label>
                <Select maxMenuHeight={300} isDisabled={jsonIsLoading || disabledClassrooms} aria-labelledby='label-curse' value={valueSelects.categories} onChange={(e: any) => {setValueOption({value: e.value, type: 'Categories'});  handleValueSelect('categories', e)}} options={options.categories} className='w-[170px]' placeholder='Categorías' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStyles}></Select>
            </div>
        </div>
    )
}

export default Options
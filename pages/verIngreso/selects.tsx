import React, { useEffect, useRef, useState } from 'react'
import Select, { SelectInstance } from 'react-select';
import { DateRangePicker, DateRangePickerReturnType } from "@nextui-org/react";
import {RangeValue} from "@react-types/shared";
import { colourStyles } from '@/helpers/selects';
import { I18nProvider } from "@react-aria/i18n";
import {getLocalTimeZone, parseDate, today, DateValue} from "@internationalized/date";

interface ISelects {
    changeJson: (value: string, ret?: boolean) => void
    changeJsonForCurse: (value: string) => void
    changeDependencyRange: (value: string) => void
}

const Selects: React.FC<ISelects> = ({ changeJson, changeJsonForCurse, changeDependencyRange }) => {
    const cursoSelect = useRef<SelectInstance<any> | null>(null);
    const depSelect = useRef<SelectInstance<any> | null>(null);
    const dateRef = useRef<any>()
    const [dateInitial, setDateInitial] = useState<RangeValue<any>>({
        start: undefined,
        end: undefined,
      });
    const [isDisabled, setIsDisabled] = useState(true)
    const [optCursos, setOptCursos] = useState([])
    let optionsCursos

    const disabledCursos = (val: string, data: any) => {
        if (cursoSelect.current && val != '0') {
            setIsDisabled(false)
            setDateInitial({
                start: undefined,
                end: undefined,
              });
            optionsCursos = data.map((opt: any, index: number) => {
                return {
                    value: index + 1,
                    type: 'curso',
                    label: `${opt.curso} | ${opt.aula}`
                };
            });
            cursoSelect.current.setValue('0', 'select-option')
            setOptCursos(optionsCursos)
        }
        else if (cursoSelect.current) {
            cursoSelect.current.setValue('0', 'select-option')
            setIsDisabled(true)
        }
    }

    const changeDependency = async (e: any) => {
        if (e.value != undefined) {
            const data = await changeJson(e.value, true)
            disabledCursos(e.value, data)
        }
    }


    const changeCurse = async (e: any) => {
        if (e.value != undefined) {
            const data = await changeJsonForCurse(e.value)
        }
    }

    const changeRange = () => {
        const datePicked = dateRef.current?.innerText.split('\n').filter((date: string) => {
            return date != '/'
        }).filter((date: string, index: number) => {
            if (index != 0 && index != 4) {
                return date
            }
        }).map((date: string, index: number) => {
            let newDate
            if (index == 0 || index == 3) {
                newDate = `${date}/`
                return newDate
            } else {
                return date
            }
        }).join('')

        changeDependencyRange(datePicked)
    }

    useEffect(() => {
        dateInitial.start != undefined && changeRange()
    }, [dateInitial])

    const optionsDependencias = [
        { value: '0', label: 'Todas' },
        { value: '1', label: 'Informatica' },
        { value: '2', label: 'Idiomas' },
    ]
    return (
        <div className='w-full my-[50px] bg-background-200 flex justify-around p-5 rounded-lg shadow-md'>
            <div className='flex flex-col'>
                <label htmlFor="select-dependency">Dependencia:</label>
                <Select className='w-[170px]' placeholder='Dependencias' ref={depSelect} noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} onChange={changeDependency} options={optionsDependencias} defaultValue={optionsDependencias[0]} isSearchable styles={colourStyles}></Select>
            </div>
            <div>
                <I18nProvider locale='es-ES'>
                    <label htmlFor="datepicker">Seleccionar Rango:</label>
                    <DateRangePicker ref={dateRef} defaultValue={undefined} onChange={setDateInitial} value={dateInitial} id='datepicker' isDisabled={!isDisabled} labelPlacement='outside' maxValue={today(getLocalTimeZone())} className="max-w-xs transition-all" classNames={{
                        input: 'bg-background hover:bg-background focus:bg-background',
                        inputWrapper: 'bg-background hover:!bg-background focus:bg-background rounded-md',
                    }} calendarProps={{classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200"}}} />
                </I18nProvider>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="select-curso">Curso:</label>
                <Select className='w-[170px]' isDisabled={isDisabled} ref={cursoSelect} placeholder='Cursos' noOptionsMessage={({ inputValue }) => !inputValue ? 'No existe esa opción' : 'No existe esa opción'} onChange={changeCurse} options={optCursos} defaultValue={optCursos[0]} isSearchable styles={colourStyles}></Select>
            </div>
        </div>
    )
}

export default Selects
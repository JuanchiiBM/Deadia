"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { RangeValue } from '@nextui-org/react'
import { DateRangePicker } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, parseDate, today, DateValue, startOfYear } from "@internationalized/date";

interface IOptionsRegistrarIngreso {
    onOpen: () => void
    setContentModal: React.Dispatch<React.SetStateAction<undefined>>
    dateRef: any
    optionsCharged: boolean
    selectDateRange: () => Promise<void>
}

const OptionsRegistrarIngreso: React.FC<IOptionsRegistrarIngreso> = ({ optionsCharged, onOpen, setContentModal, dateRef, selectDateRange }) => {
    const [dateInitial, setDateInitial] = useState<RangeValue<any>>({
        start: startOfYear(today(getLocalTimeZone())),
        end: today(getLocalTimeZone()),
    });

    const resetModal = () => {
        setContentModal(undefined)
        onOpen()
    }

    useEffect(() => {
        if (dateInitial && dateInitial.start != undefined) {
            console.log('entra1')
            selectDateRange()
        }
    }, [dateInitial])

    return (
        <div className='w-full my-[50px] bg-background-200 h-[80px] flex justify-between p-5 rounded-lg shadow-md'>
            <h2 className='content-center text-xl'>Registrar Ingresos</h2>
            <I18nProvider locale='es-ES'>
                <DateRangePicker ref={dateRef} visibleMonths={2} defaultValue={undefined} onChange={(e) => setDateInitial(e)} value={dateInitial} id='datepicker' labelPlacement='outside' maxValue={today(getLocalTimeZone())} className="max-w-xs transition-all" classNames={{
                    input: 'bg-background hover:bg-background focus:bg-background',
                    inputWrapper: 'bg-background hover:!bg-background focus:bg-background rounded-md',
                }} calendarProps={{ classNames: { headerWrapper: "bg-background-200", gridHeader: "bg-background-200" } }} />
            </I18nProvider>
            <Button isDisabled={!optionsCharged} onClick={resetModal} className='content-center h-full text-content2 text-md rounded-md' color='primary' startContent={
                <FontAwesomeIcon icon={faUserPlus} className='text-content2  text-xl' />
            }>Crear Registro</Button>
        </div>
    )
}

export default OptionsRegistrarIngreso
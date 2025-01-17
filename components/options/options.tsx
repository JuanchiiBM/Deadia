"use client"

import React from 'react'
import { Button, DateRangePicker } from '@nextui-org/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faFileExcel } from '@fortawesome/free-solid-svg-icons'
import { I18nProvider } from "@react-aria/i18n";
import { getLocalTimeZone, today } from "@internationalized/date";
import useInitDatePicker from '@/hooks/useInitDatePicker'
import { useContextRegister } from '@/context/contextRegister'
import useClickTrigger from '@/hooks/useClickTrigger'
import useResetModal from '@/hooks/useResetModal'
import { TMODULES } from '@/utils/types/permissions'
import { dateRangePickerStyles } from '@/styles/dateRangePickerStyles'
//import { useHandlerPermissions } from '@/hooks/useHandlerPermissions' DESCOMENTAR AL IMPLEMENTAR PERMISOS


interface IOptions {
    MODULE: TMODULES
    title: string
    buttonTitle: string
    altButtonTitle: string
    onOpen: () => void
    dateRef: any
    dateTime: boolean
    exportExcel: boolean
    selectDateRange: () => Promise<void>
}

const Options: React.FC<IOptions> = ({ title, buttonTitle, altButtonTitle, onOpen, selectDateRange, exportExcel, dateTime, dateRef }) => {
    const { setRefreshData, setContentTable, setUpdate, jsonIsLoading } = useContextRegister()
    const { handlerDateInitial, dateInitial } = useInitDatePicker({ selectDateRange, setRefreshData })
    const resetModal = useResetModal({ setContentTable, setUpdate, onOpen })
    const { triggerClick } = useClickTrigger()
    //const {hasPermission} = useHandlerPermissions() DESCOMENTAR AL IMPLEMENTAR PERMISOS

    return (
        <>
            <h2 className='content-center text-xl'>{title}</h2>
            { dateTime ?
                <I18nProvider locale='es-ES'>
                    <DateRangePicker ref={dateRef} isDisabled={jsonIsLoading} visibleMonths={2} defaultValue={undefined} onChange={(e) => handlerDateInitial(e)} value={dateInitial} id='datepicker' labelPlacement='outside' maxValue={today(getLocalTimeZone())} {...dateRangePickerStyles} />
                </I18nProvider> :
                <I18nProvider locale='es-ES'>
                    <DateRangePicker ref={dateRef} isDisabled={jsonIsLoading} visibleMonths={2} defaultValue={undefined} onChange={(e) => handlerDateInitial(e)} value={dateInitial} id='datepicker' labelPlacement='outside' maxValue={today(getLocalTimeZone())} className='hidden' />
                </I18nProvider>
            }

            <div className='flex justify-between gap-3'>
                {exportExcel &&
                    <Button isIconOnly title="Exportar a Excel" isDisabled={jsonIsLoading} onPress={() => { triggerClick('btn-excel-export') }} className="bg-success text-content2 px-2">
                        <FontAwesomeIcon icon={faFileExcel} className="text-xl" />
                    </Button>
                }
                <Button title={altButtonTitle} onPress={resetModal} isDisabled={jsonIsLoading} className='bg-primary-200 dark:bg-primary-700 content-center h-full text-content2 text-md' startContent={<FontAwesomeIcon icon={faUserPlus} className='text-content2  text-xl' />}>
                    {buttonTitle}
                </Button>
            </div>
        </>
    )
}
/*
{hasPermission(MODULE, ACTIONS.CREATE) &&
    <Button title={altButtonTitle} onPress={resetModal} isDisabled={jsonIsLoading} className='bg-primary-200 dark:bg-primary-700 content-center h-full text-content2 text-md' startContent={<FontAwesomeIcon icon={faUserPlus} className='text-content2  text-xl'/>}>
        {buttonTitle}
    </Button>
} DESCOMENTAR AL IMPLEMENTAR PERMISOS*/

export default Options
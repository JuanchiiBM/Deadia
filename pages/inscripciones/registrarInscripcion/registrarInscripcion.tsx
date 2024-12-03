"use client"

import React, { useState, useRef } from 'react'
import OptionsRegistrarIngreso from './options'
import DataTableRegistrarIngreso from './dataTable'
import ModalRegistrarIngreso from './modal'
import { useDisclosure } from '@nextui-org/react'
import { useDatePickerInscription } from '@/hooks/inscripciones/registrarInscripcion/useDatePickerInscription'
import { UpdateContext } from '@/hooks/inscripciones/registrarInscripcion/useUpdateContext'


const RegistrarIngreso = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isUpdate, setIsUpdate] = useState(false)
    const [refreshData, setRefreshData] = useState(2)
    const [contentModal, setContentModal] = useState()
    const [optionsCharged, setOptionsCharged] = useState<boolean>(false)
    const { dateSelected, dateRef, selectDateRange } = useDatePickerInscription()

    return (
        <>
            <UpdateContext.Provider value={{
                refreshData: refreshData,
                setRefreshData: setRefreshData,
                contentModal: contentModal,
                update: isUpdate,
                setUpdate: setIsUpdate
            }}>
                <h1 className='text-4xl'>Inscripciones</h1>
                <OptionsRegistrarIngreso optionsCharged={optionsCharged} onOpen={onOpen} setContentModal={setContentModal} dateRef={dateRef} selectDateRange={selectDateRange} />
                <DataTableRegistrarIngreso onOpen={onOpen} setContentModal={setContentModal} dateSelected={dateSelected} />
                <ModalRegistrarIngreso setContentModal={setContentModal} setOptionsCharged={setOptionsCharged} isOpen={isOpen} onClose={onClose} contentModal={contentModal} />
            </UpdateContext.Provider>
        </>
    )
}

export default RegistrarIngreso
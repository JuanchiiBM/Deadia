import React from 'react'
import { Input } from '@nextui-org/react'
import { colourStylesBordered } from '@/helpers/selects';
import { useActionForm } from '@/hooks/useActionForm';
import { useSubmit } from '@/hooks/useSubmit';
import { IModalFillUsers } from '@/helpers/interfaces';

const ModalFillActions: React.FC<IModalFillUsers> = ({ isLoading, selectOptions }) => {
    const { actionForm, handleInputChange } = useActionForm()
    const { handleSubmit } = useSubmit()

    return (
        <>
            <form id='user-form' onSubmit={(e) => handleSubmit(e, actionForm)} className='flex flex-col gap-[10px] w-[100%] mx-[5px]'>
                <div className='flex gap-[10px] w-full'>
                    <Input required variant='bordered' label='Nombre' labelPlacement='outside' value={actionForm.nombre} onChange={(e) => handleInputChange('nombre', e.target.value)} />
                    <Input required variant='bordered' label='Descripcion' labelPlacement='outside' value={actionForm.descripcion} onChange={(e) => handleInputChange('descripcion', e.target.value)} />
                </div>
                <div className='flex gap-[10px] w-full'>
                </div>
            </form>
        </>
    )
}

export default ModalFillActions

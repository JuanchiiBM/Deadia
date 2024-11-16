import React from 'react'
import { Input } from '@nextui-org/react'
import { colourStylesBordered } from '@/helpers/selects';
import { useProfileForm } from '@/hooks/useProfileForm';
import { useSubmit } from '@/hooks/useSubmit';
import { IModalFillUsers } from '@/helpers/interfaces';
import ModalTableProfiles from './modalDataTable';

const ModalFillProfiles: React.FC<IModalFillUsers> = ({ isLoading, selectOptions }) => {
    const { profileForm, handleInputChange } = useProfileForm()
    const { handleSubmit } = useSubmit()

    return (
        <>
            <form id='user-form' onSubmit={(e) => handleSubmit(e, profileForm)} className='flex flex-col gap-[10px] w-[100%] mx-[5px]'>
                <div className='flex gap-[10px] w-full'>
                    <Input required variant='bordered' label='Nombre' labelPlacement='outside' value={profileForm.nombre} onChange={(e) => handleInputChange('nombre', e.target.value)} />
                </div>
                <div className='flex gap-[10px] w-full'>
                    <Input required variant='bordered' label='Descripcion' labelPlacement='outside' value={profileForm.descripcion} onChange={(e) => handleInputChange('descripcion', e.target.value)} />
                </div>
                <div className='flex gap-[10px] mt-[24.5px] w-full border-2 border-default-200 rounded-xl'>
                    <ModalTableProfiles />
                </div>
            </form>
        </>
    )
}

export default ModalFillProfiles

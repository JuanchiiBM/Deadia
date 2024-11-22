import React from 'react'
import { Input } from '@nextui-org/react'
import Select from 'react-select';
import ModalResumenUsers from './modalResumen';
import { colourStylesBordered } from '@/helpers/selects';
import { useFormUser } from '@/hooks/sistema/usuarios/useFormUser';
import { useSubmit } from '@/hooks/useSubmit';
import { IModalFillUsers } from '@/helpers/interfaces';

const ModalFillUsers: React.FC<IModalFillUsers> = ({ isLoading, selectOptions }) => {
    const { userForm, handleInputChange } = useFormUser()
    const { handleSubmit } = useSubmit()

    return (
        <>
            <form id='user-form' onSubmit={(e) => handleSubmit(e, userForm)} className='flex flex-col gap-[10px] w-[70%] mx-[5px]'>
                <h3 className='w-full border-b-1'>Datos del usuario:</h3>
                <div className='flex gap-[10px] w-full'>
                    <Input required variant='bordered' label='Nombre' labelPlacement='outside' value={userForm.nombre} onChange={(e) => handleInputChange('nombre', e.target.value)} />
                    <Input required variant='bordered' label='Apellido' labelPlacement='outside' value={userForm.apellido} onChange={(e) => handleInputChange('apellido', e.target.value)} />
                </div>
                <div className='flex gap-[10px] w-full'>
                    <Input required variant='bordered' label='Usuario' labelPlacement='outside' value={userForm.usuario} onChange={(e) => handleInputChange('usuario', e.target.value)} />
                    <Input required variant='bordered' label='Mail' labelPlacement='outside' value={userForm.mail} onChange={(e) => handleInputChange('mail', e.target.value)} />
                </div>
                <div className='flex gap-[10px] mt-[24.5px] w-full'>
                    <Select styles={colourStylesBordered} className='w-[50%]' isClearable isSearchable maxMenuHeight={140} placeholder={'Perfil'} isDisabled={isLoading} options={selectOptions.perfil} noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} />
                    <Select styles={colourStylesBordered} className='w-[50%]' isClearable isSearchable maxMenuHeight={140} placeholder={'Dependencia'} isDisabled={isLoading} options={selectOptions.dependencia} noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} />
                </div>
            </form>
            <ModalResumenUsers userForm={userForm} />
        </>
    )
}

export default ModalFillUsers

import React from 'react'
import Select from 'react-select'
import { colourStylesBordered } from '@/helpers/selects';
import { IUseFormUsers } from '@/helpers/interfaces';
import { RangeValue, CalendarDate, Input } from '@nextui-org/react';
import { Option } from '@/utils/globals';
import { useSelectOptions } from '@/hooks/sistema/usuarios/useSelectOptions';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { useGeneratePassword } from '@/hooks/sistema/usuarios/useGeneratePassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat } from '@fortawesome/free-solid-svg-icons';

interface IModalFisrtSection {
    dataForm: IUseFormUsers
    handleInputChange: (field: string, value: string | RangeValue<any> | CalendarDate | undefined | Option | null) => void
}

const ModalFisrtSection: React.FC<IModalFisrtSection> = ({ dataForm, handleInputChange }) => {
    const { options, isLoading } = useSelectOptions()
    const { handlePasswordChange, validatePassword } = usePasswordValidation();
    const generatePassword = useGeneratePassword(handleInputChange);

    return (
        <>
            <h3 className='w-full border-b-1'>Datos del usuario:</h3>
            <div className='flex gap-[10px] mt-2 w-full'>
                <Input required variant='bordered' label='Nombre' labelPlacement='outside' value={dataForm.name} onChange={(e: any) => handleInputChange('name', e.target.value)} />
                <Input required variant='bordered' label='Apellido' labelPlacement='outside' value={dataForm.lastname} onChange={(e: any) => handleInputChange('lastname', e.target.value)} />
            </div>
            <div className='flex gap-[10px] mt-2 w-full'>
                <Input required variant='bordered' label='Usuario' labelPlacement='outside' value={dataForm.user} onChange={(e: any) => handleInputChange('user', e.target.value)} />
                <Input required variant='bordered' label='Contraseña' labelPlacement='outside' value={dataForm.password} onChange={(e: any) => handlePasswordChange(e, handleInputChange)} validate={validatePassword} endContent={
                    <button
                        className="focus:outline-none"
                        title='Generar contraseña'
                        type="button"
                        onClick={generatePassword}
                    ><FontAwesomeIcon icon={faRepeat} className="text-xl text-default-400" />
                    </button>
                } />
            </div>
            <div className='flex gap-[10px] mt-2 w-full'>
                <Input required variant='bordered' label='Mail' labelPlacement='outside' value={dataForm.mail} onChange={(e: any) => handleInputChange('mail', e.target.value)} />
            </div>
            <div className='flex gap-[10px] mt-8 w-full'>
                <Select menuPlacement="top" styles={colourStylesBordered} className='w-[50%]' value={dataForm.profile} onChange={(e: any) => handleInputChange('profile', e)} isClearable isSearchable maxMenuHeight={140} placeholder={'Perfil'} isDisabled={isLoading} options={options.profile} noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} required />
                <Select menuPlacement="top" styles={colourStylesBordered} className='w-[50%]' value={dataForm.dependency} onChange={(e: any) => handleInputChange('dependency', e)} isClearable isSearchable maxMenuHeight={140} placeholder={'Dependencia'} isDisabled={isLoading} options={options.deps} noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} required />
            </div>
        </>
    )
}

export default ModalFisrtSection
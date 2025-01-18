import React from 'react'
import { useContextRegister } from '@/context/contextRegister'
import Select from 'react-select'
import { colourStylesBordered } from '@/helpers/selects';
import { Input } from "@heroui/react";
import { useSelectOptions } from '../hooks/useSelectOptions';
import { usePasswordValidation } from '@/hooks/usePasswordValidation';
import { useGeneratePassword } from '../hooks/useGeneratePassword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faRepeat, faUser, faLock, faEnvelope, faIdCardClip } from '@fortawesome/free-solid-svg-icons'


const ModalContent = () => {
    const { dataForm, handleInputChange } = useContextRegister()
    const { options, isLoading } = useSelectOptions()
    const { handlePasswordChange, validatePassword } = usePasswordValidation();
    const generatePassword = useGeneratePassword(handleInputChange);

    return (
        <div className='flex flex-row'>
            <section id="interaction-site" className='pr-6 border-r-1'>
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
            </section>
            <section id="resume-site" className='flex flex-col justify-around gap-2 w-[33%] h-auto m-0 pl-6'>
                <p className='text-sm truncate'><FontAwesomeIcon icon={faAddressCard} className='text-xs mr-1 w-4'/> {dataForm.name} {dataForm.lastname}</p>           
                <p className='text-sm truncate'><FontAwesomeIcon icon={faUser} className='text-xs mr-1 w-4'/> {dataForm.user}</p>
                <p className='text-sm truncate'><FontAwesomeIcon icon={faLock} className='text-xs mr-1 w-4'/> {dataForm.password}</p>
                <p className='text-sm truncate'><FontAwesomeIcon icon={faEnvelope} className='text-xs mr-1 w-4'/> {dataForm.mail}</p>
                <p className='text-sm truncate'><FontAwesomeIcon icon={faIdCardClip} className='text-xs mr-1 w-4'/> {dataForm.dependency && dataForm.profile ? `${dataForm.profile.label} de ${dataForm.dependency.label}` : ''}</p>
            </section>
        </div>
    )
}

export default ModalContent

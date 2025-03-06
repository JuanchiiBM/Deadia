import React from 'react'
import Select from 'react-select';
import { Input } from "@nextui-org/react";
import { useContextRegister } from '@/context/contextRegister'
import { colourStylesBordered } from '@/styles/selects';
import { useArtcilesOfSection } from '../hooks/useArticlesOfSection';
import { useSelectOptions, useSelectHandleChange } from '../hooks/useSelectOptions';
import { useResetData } from '../hooks/useResetData';
import { IUseFormInventoryRegister } from '@/helpers/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate, faBoxOpen, faBoxArchive, faClock } from '@fortawesome/free-solid-svg-icons'


const ModalContent = () => {
    const { dataForm, handleInputChange }: { dataForm: IUseFormInventoryRegister, handleInputChange: any } = useContextRegister()

    const { finalData: jsonDataArticles, isLoading: isLoadingArticles, setFinalData } = useArtcilesOfSection(dataForm)
    useResetData(setFinalData)
    const { options, jsonData, isLoading, chargueOptionsArticle } = useSelectOptions()
    const { selectOptionOfCategory, isDisabled } = useSelectHandleChange({ jsonData, handleInputChange, chargueOptionsArticle })

    return (
        <div className='flex flex-row gap-2 w-full h-auto m-0'>
            <section className='pr-4 flex flex-col justify-around w-[60%]'>
                <div className='flex gap-2 mb-2'>
                    <Select maxMenuHeight={140} value={dataForm.category} onChange={(newValue: any) => selectOptionOfCategory(newValue)} options={options.category} isDisabled={isLoading} className='w-[50%]' placeholder='Categoría' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
                    <Select maxMenuHeight={140} value={dataForm.article} onChange={(newValue: any) => handleInputChange('article', newValue)} options={options.article} isDisabled={isDisabled} className='w-[50%]' placeholder='Articulo' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable styles={colourStylesBordered} required></Select>
                </div>
                <div className='flex justify-end gap-2 my-2 w-full'>
                    <Select maxMenuHeight={140} value={dataForm.section} onChange={(newValue: any) => handleInputChange('section', newValue)} options={options.deps} isDisabled={isLoading} styles={colourStylesBordered} className='w-[50%] self-end' placeholder='Sector' noOptionsMessage={({ inputValue }) => !inputValue ? 'Sin opción' : 'Sin opción'} isSearchable required></Select>
                    <Input type='number' value={dataForm.action || ''} onChange={(newValue: any) => handleInputChange('action', newValue.currentTarget.value)} max={jsonDataArticles && jsonDataArticles.saldo_restante} min={jsonDataArticles && `-${jsonDataArticles.saldo}`} variant='bordered' label='Acción' isDisabled={(jsonDataArticles && !isLoadingArticles) ? false : true} labelPlacement='outside' className='w-[50%]' classNames={{ mainWrapper: 'flex justify-end', helperWrapper: 'absolute bottom-[-23px]' }} required />
                </div>
            </section>
            <section className='flex flex-col gap-2 w-[40%] h-auto m-0 pl-6 border-l-2 border-default-200'>
                <div className='rounded-xl p-2 border-2 border-default-200 w-full h-full'>
                    <h3 className='text-lg text-center w-full border-b-2 border-default-200 px-2 mb-1'>{(jsonDataArticles && !isLoadingArticles) ? jsonDataArticles.articulo : isLoadingArticles ? 'Cargando...' : '-'}</h3>
                    <div className='text-sm'>
                        <p className='text-sm truncate'><FontAwesomeIcon icon={faBoxArchive} className='text-xs mr-1 w-4' />{jsonDataArticles ? `${jsonDataArticles.dependencia}: ${jsonDataArticles.saldo}` : 'Sector: Cantidad'}</p>
                        <p className='text-sm truncate'><FontAwesomeIcon icon={faBoxOpen} className='text-xs mr-1 w-4' />{jsonDataArticles ? `Sin Asignar: ${jsonDataArticles.saldo_restante}` : 'Sin Asignar: Disponible'}</p>
                    </div>
                </div>
                <div className='rounded-xl p-2 border-2 border-default-200 w-full h-[95px]'>
                    <h3 className='text-lg text-center w-full border-b-2 border-default-200 px-2 mb-1'>Nuevo Inventario</h3>
                    <div className='text-sm'>
                        <p className='text-sm truncate'><FontAwesomeIcon icon={faClock} className='text-xs mr-1 w-4' />{jsonDataArticles ? `Ult. mov ${jsonDataArticles.fecha_ultimo_movimiento ? jsonDataArticles.fecha_ultimo_movimiento : 'inexistente'}` : 'Ultimo Movimiento'}</p>
                        <p className='text-sm truncate'><FontAwesomeIcon icon={faRotate} className='text-xs mr-1 w-4' /> {jsonDataArticles ? jsonDataArticles.saldo : 'actual'} -{'>'} {jsonDataArticles ? `${Number(jsonDataArticles.saldo) + Number(dataForm.action ? dataForm.action : 0)}` : 'nuevo'}</p>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default ModalContent

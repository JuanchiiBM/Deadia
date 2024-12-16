import React from 'react'
import { IUseFormInventoryRegister } from '@/helpers/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate, faWarehouse } from '@fortawesome/free-solid-svg-icons'
import { useArtcilesOfSection } from '@/hooks/inventario/registrarInventario/useArticlesOfSection'

const ModalResumen: React.FC<{dataForm: IUseFormInventoryRegister}> = ({ dataForm }) => {
    const {jsonData: jsonDataArticles, isLoading: isLoadingArticles} = useArtcilesOfSection(dataForm)

    return (
        <section className='flex flex-col gap-2 w-[50%] h-auto m-0 pl-6'>
            <div className='rounded-xl p-2 border-2 border-default-200 w-full h-full'>
                <h3 className='text-lg text-center w-full border-b-2 border-default-200 px-2 mb-1'>Articulo</h3>
                <div className='text-sm'>
                    <p>Fecha, Cantidad, Sector o s/a</p>
                    <p>Fecha, Cantidad, Sector o s/a</p>
                </div>
            </div>
            <div className='rounded-xl p-2 border-2 border-default-200 w-full h-[95px]'>
                <h3 className='text-lg text-center w-full border-b-2 border-default-200 px-2 mb-1'>Nuevo Inventario</h3>
                <div className='text-sm'>
                    <p><FontAwesomeIcon icon={faWarehouse} className='text-xs mr-1 w-4'/> sect. articulo</p>
                    <p><FontAwesomeIcon icon={faRotate} className='text-xs mr-1 w-4'/> c_act -{'>'} c_nuev</p>
                </div>
            </div>
        </section>
    )
}

export default ModalResumen
import React from 'react'
import { IUseFormInventoryRegister } from '@/helpers/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate, faWarehouse, faHouseLaptop, faClock } from '@fortawesome/free-solid-svg-icons'
import { useArtcilesOfSection } from '@/hooks/inventario/registrarInventario/useArticlesOfSection'

const ModalResumen: React.FC<{dataForm: IUseFormInventoryRegister}> = ({ dataForm }) => {
    const {finalData: jsonDataArticles, isLoading: isLoadingArticles} = useArtcilesOfSection(dataForm)

    return (
        <section className='flex flex-col gap-2 w-[50%] h-auto m-0 pl-6'>
            <div className='rounded-xl p-2 border-2 border-default-200 w-full h-full'>
                <h3 className='text-lg text-center w-full border-b-2 border-default-200 px-2 mb-1'>{(jsonDataArticles && !isLoadingArticles) ? jsonDataArticles.articulo : isLoadingArticles ? 'Cargando...' : '-'}</h3>
                <div className='text-sm'>
                    <p className='text-sm truncate'><FontAwesomeIcon icon={faHouseLaptop} className='text-xs mr-1 w-4'/>{jsonDataArticles ? `${jsonDataArticles.dependencia}: ${jsonDataArticles.saldo}` : 'Sector: Cantidad'}</p>
                    <p className='text-sm truncate'><FontAwesomeIcon icon={faWarehouse} className='text-xs mr-1 w-4'/>{jsonDataArticles ? `Sin Asignar: ${jsonDataArticles.saldo_restante}` : 'Sin Asignar: Disponible'}</p>
                </div>
            </div>
            <div className='rounded-xl p-2 border-2 border-default-200 w-full h-[95px]'>
                <h3 className='text-lg text-center w-full border-b-2 border-default-200 px-2 mb-1'>Nuevo Inventario</h3>
                <div className='text-sm'>
                    <p className='text-sm truncate'><FontAwesomeIcon icon={faClock} className='text-xs mr-1 w-4'/>{jsonDataArticles ? `Ult. mov ${jsonDataArticles.fecha_ultimo_movimiento}` : 'Ultimo Movimiento'}</p>
                    <p className='text-sm truncate'><FontAwesomeIcon icon={faRotate} className='text-xs mr-1 w-4'/> {jsonDataArticles ? jsonDataArticles.saldo : 'actual'} -{'>'} {jsonDataArticles ? `${Number(jsonDataArticles.saldo)+Number(dataForm.action)}` : 'nuevo'}</p>
                </div>
            </div>
        </section>
    )
}

export default ModalResumen
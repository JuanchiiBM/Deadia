import React from 'react'
import { Input, RangeValue, DateValue } from '@nextui-org/react'
import Select from 'react-select/creatable';
import { colourStylesBordered } from '@/helpers/selects';
import { IUseFormInventoryRegister } from '@/helpers/interfaces';
import { Option } from '@/utils/globals';

interface IModalSecondSection {
    dataForm: IUseFormInventoryRegister
    handleInputChange: (field: string, value: string | RangeValue<any> | DateValue | undefined | Option | null) => void
}

const ModalSecondSection: React.FC<IModalSecondSection> = ({ dataForm, handleInputChange }) => {
    return (
        <>
            <div className='flex justify-end gap-2 my-2 w-full'>
                <Input variant='bordered' label='Cant. Actual' labelPlacement='outside' className='w-[50%]' classNames={{ mainWrapper: 'flex justify-end' }} required isDisabled={true} />            
                <Input variant='bordered' label='Cant. Nueva' labelPlacement='outside' className='w-[50%]' classNames={{ mainWrapper: 'flex justify-end' }} required isDisabled={true} />            
            </div>
        </>
    )
}

export default ModalSecondSection
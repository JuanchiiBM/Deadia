import { useState, useEffect } from "react"
import { IDataInventoryRegister, IDataEgressViewCatFilter, IUseFormEgressRegister } from "@/helpers/interfaces"
import { GETFunction, Option, createOption, formatDate } from "@/utils/globals"
import { parseDate } from "@internationalized/date";
import useJsonData from "@/hooks/useJsonData";
import { RangeValue } from "@heroui/react";
import { useContextRegister } from "@/context/contextRegister";

export const useSelectOptions = () => {
    const {jsonData, isLoading}: {jsonData: IDataInventoryRegister, isLoading: boolean} = useJsonData({url: 'api/inventory/register/form'})
    const [options, setOptions] = useState<{
        category: Option[] | undefined,
        article: Option[] | undefined,
        deps: Option[] | undefined,
    }>({category: undefined, article: undefined, deps: undefined})

    const chargueOptionsCategory = async () => {
        const optionsCategories = jsonData.categories.map((opt) => ({
            value: opt.id.toString(),
            label: opt.categoria
        })) as Option[]
        
        setOptions(prev => ({
            ...prev,
            category: optionsCategories,
            //article: optionsDeps,
        })) 
    }

    const chargueOptionsArticle = async (optArticles: IDataInventoryRegister | null) => {
        if (optArticles) {
            const optionsArticles = optArticles.list.article.map((opt) => ({
                value: opt.id.toString(),
                label: opt.name
            })) as Option[]
            
            setOptions(prev => ({
                ...prev,
                article: optionsArticles,
            })) 
        } else {
            setOptions(prev => ({
                ...prev,
                article: undefined,
            })) 
        }
    }

    const chargueOptionsDeps = async () => {
        const optionsDeps = jsonData.deps.map((opt) => ({
            value: opt.id.toString(),
            label: opt.dependencia
        })) as Option[]
        
        setOptions(prev => ({
            ...prev,
            deps: optionsDeps,
        })) 
    }

    useEffect(() => {
        if (jsonData) {
            chargueOptionsCategory()
            chargueOptionsDeps()
        }
    }, [jsonData])

    return {options, jsonData, isLoading, chargueOptionsArticle}
}

interface IUseSelectHandleChange{
    handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option | null) => void
    jsonData: IDataInventoryRegister
    chargueOptionsArticle: (optArticles: any) => Promise<void>
}


export const useSelectHandleChange = ({jsonData, handleInputChange, chargueOptionsArticle}: IUseSelectHandleChange) => {
    const { contentModal }: {contentModal: IUseFormEgressRegister} = useContextRegister()
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const selectOptionOfCategory = async (newValue: Option) => {
        handleInputChange('category', newValue)
        handleInputChange('article', null)
        setIsDisabled(true)

        if (jsonData?.categories.some((opt: IDataEgressViewCatFilter) => opt.id.toString() == newValue.value)) {
            const response = await GETFunction(`api/article?id_category=${newValue.value}`)
            setIsDisabled(false)
            chargueOptionsArticle(response)
        } else {
            setIsDisabled(false)
            chargueOptionsArticle(null)
            handleInputChange('article', null)
        }
    }

    useEffect(() => {
        if (jsonData && contentModal && contentModal.category) {
            const jsonCategoryFiltedes = jsonData.categories.find((category) => { return category.categoria == contentModal.category?.label })
            console.log(jsonCategoryFiltedes)
            const option: Option = {
                value: jsonCategoryFiltedes?.id.toString(),
                label: jsonCategoryFiltedes?.categoria
            }
            selectOptionOfCategory(option)
        }
    }, [jsonData])

    useEffect(() => {
        setIsDisabled(true)
    }, [])

    return {selectOptionOfCategory, isDisabled}
}
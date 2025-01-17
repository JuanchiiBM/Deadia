import { useState, useEffect } from "react"
import { IDataEgressRegister, IDataEgressViewArtFilter, IDataEgressViewCatFilter, IUseFormEgressRegister } from "@/helpers/interfaces"
import { GETFunction, Option, createOption, formatDate } from "@/utils/globals"
import { parseDate } from "@internationalized/date";
import useJsonData from "@/hooks/useJsonData";
import { RangeValue } from "@nextui-org/react";
import { useContextRegister } from "@/context/contextRegister";

export const useSelectOptions = () => {
    const { jsonData, isLoading }: { jsonData: IDataEgressRegister, isLoading: boolean } = useJsonData({ url: 'api/loss/register/form' })
    const [options, setOptions] = useState<{
        category: Option[] | undefined,
        article: Option[] | undefined,
        bidding: Option[] | undefined
    }>({ category: undefined, article: undefined, bidding: undefined })

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

    const chargueOptionsArticle = async (optArticles: IDataEgressRegister | null) => {
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

    const chargueOptionsLicitation = async () => {
        const optionsLicitation = jsonData.biddings.map((opt) => ({
            value: opt.id.toString(),
            label: opt.numero,
            date: opt.fecha
        })) as Option[]

        setOptions(prev => ({
            ...prev,
            bidding: optionsLicitation,
        }))
    }

    const chargueNewCategory = (newOption: Option) => {
        const prevClassrooms = options.category ? [...options.category] : []
        setOptions(prev => ({
            ...prev,
            category: [...prevClassrooms, newOption]
        }))
        chargueOptionsArticle(null)
    }

    const chargueNewArticle = (newOption: Option) => {
        const prevClassrooms = options.article ? [...options.article] : []
        setOptions(prev => ({
            ...prev,
            article: [...prevClassrooms, newOption]
        }))
    }

    const chargueNewLicitation = (newOption: Option) => {
        const prevClassrooms = options.bidding ? [...options.bidding] : []
        setOptions(prev => ({
            ...prev,
            bidding: [...prevClassrooms, newOption]
        }))
    }

    useEffect(() => {
        if (jsonData) {
            chargueOptionsCategory()
            chargueOptionsLicitation()
        }
    }, [jsonData])

    return { options, jsonData, isLoading, chargueNewCategory, chargueNewArticle, chargueOptionsArticle, chargueNewLicitation }
}

interface IUseSelectHandleChange {
    handleInputChange: (field: string, value: string | RangeValue<any> | undefined | Option | null) => void
    jsonData: IDataEgressRegister
    chargueNewCategory: (value: Option) => void
    chargueNewArticle: (value: Option) => void
    chargueNewLicitation: (value: Option) => void
    chargueOptionsArticle: (optArticles: any) => Promise<void>
}


export const useSelectHandleChange = ({ jsonData, handleInputChange, chargueNewCategory, chargueNewArticle, chargueOptionsArticle, chargueNewLicitation }: IUseSelectHandleChange) => {
    const { contentTable }: { contentTable: IUseFormEgressRegister } = useContextRegister()
    const [isDisabled, setIsDisabled] = useState<boolean>(true)

    const categoryCreated = (inputValue: string) => {
        const newOption = createOption(inputValue)
        chargueNewCategory(newOption)
        handleInputChange('category', newOption)
        handleInputChange('article', null)
        setIsDisabled(false)
    }

    const articleCreated = (inputValue: string) => {
        const newOption = createOption(inputValue)
        chargueNewArticle(newOption)
        handleInputChange('article', newOption)
        setIsDisabled(false)
    }

    const licitationCreated = (inputValue: string) => {
        const newOption = createOption(inputValue)
        chargueNewLicitation(newOption)
        handleInputChange('licitation', newOption)
        setIsDisabled(false)
    }

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
        if (jsonData && contentTable && contentTable.category) {
            const jsonCategoryFiltedes = jsonData.categories.find((category) => { return category.categoria == contentTable.category?.label })
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

    return { selectOptionOfCategory, categoryCreated, articleCreated, licitationCreated, isDisabled }
}
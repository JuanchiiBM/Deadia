import { Option } from "../types/options"

export const createOption = (label: string | null | undefined, value?: string) => ({
    label: label,
    value: value ? value : label?.toLowerCase().replace(/\W/g, ''),
}) as Option

export const createLicitationOption = (label: string | null | undefined, value?: string, date?: string) => ({
    label: label,
    value: value ? value : label?.toLowerCase().replace(/\W/g, ''),
    date: date
}) as Option
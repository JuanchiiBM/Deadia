import { StylesConfig } from 'react-select';
export const colourStyles: StylesConfig = {
    control: (baseStyles, state) => ({
        background: state.isFocused ? 'hsl(var(--nextui-background-100))' : state.isDisabled ? 'hsl(var(--nextui-background-100))' : 'hsl(var(--nextui-background))',
        border: state.isFocused ? 'none' : 'none',
        borderRadius: '5px',
        display: 'flex',
        outline: 'none',
        color: 'hsl(var(--nextui-content1))'
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        color: 'hsl(var(--nextui-content1))'
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        color: state.isDisabled ? 'hsl(var(--nextui-default-400))' : 'hsl(var(--nextui-content1))'
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        background: 'hsl(var(--nextui-background-100))'
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        background: state.isFocused ? 'hsl(var(--nextui-background-200))' : state.isSelected ? 'hsl(var(--nextui-background-300))' : 'hsl(var(--nextui-background))',
        ':active': {
            ...baseStyles[':active'],
            background: 'hsl(var(--nextui-background-300))'
        },
    })
};
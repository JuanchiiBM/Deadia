import { StylesConfig } from 'react-select';
export const colourStyles: StylesConfig = {
    control: (baseStyles, state) => ({
        background: state.isFocused ? 'hsl(var(--nextui-background-100))' : state.isDisabled ? 'hsl(var(--nextui-background-100))' : 'hsl(var(--nextui-background))',
        opacity: state.isDisabled ? '0.5' : '1',
        transition: 'all 0.15s ease',
        border: state.isFocused ? 'none' : 'none',
        borderRadius: '5px',
        display: 'flex',
        outline: 'none',
        color: 'hsl(var(--nextui-content1))'
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        cursor: 'text',
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
        color: state.isSelected ? 'hsl(var(--nextui-content1))' : 'hsl(var(--nextui-content1))',
        ':active': {
            ...baseStyles[':active'],
            background: 'hsl(var(--nextui-background-300))'
        },
    })
};

export const colourStylesBordered: StylesConfig = {
    control: (baseStyles, state) => ({
        background: state.isFocused ? 'transparent' : state.isDisabled ? 'transparent' : 'transparent',
        opacity: state.isDisabled ? '0.5' : '1',
        transition: 'all 0.15s ease',
        border: state.isFocused ? '2px solid hsl(var(--nextui-default-800))' : '2px solid hsl(var(--nextui-default-200))',
        borderRadius: '10px',
        display: 'flex',
        outline: 'none',
        color: 'hsl(var(--nextui-content1))'
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        cursor: 'text',
        color: 'hsl(var(--nextui-content1))'
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        color: state.isDisabled ? 'hsl(var(--nextui-default-400))' : 'hsl(var(--nextui-content1))'
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        zIndex: '21',
        background: 'hsl(var(--nextui-background-100))'
    }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        background: state.isFocused ? 'hsl(var(--nextui-background-200))' : state.isSelected ? 'hsl(var(--nextui-background-300))' : 'hsl(var(--nextui-background))',
        color: state.isSelected ? 'hsl(var(--nextui-content1))' : 'hsl(var(--nextui-content1))',
        ':active': {
            ...baseStyles[':active'],
            background: 'hsl(var(--nextui-background-300))'
        },
    })
};
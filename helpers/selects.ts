import { StylesConfig } from 'react-select';
export const colourStyles: StylesConfig = {
    control: (baseStyles, state) => ({
        background: state.isFocused ? 'hsl(var(--heroui-background-100))' : state.isDisabled ? 'hsl(var(--heroui-background-100))' : 'hsl(var(--heroui-background))',
        opacity: state.isDisabled ? '0.5' : '1',
        transition: 'all 0.15s ease',
        border: state.isFocused ? 'none' : 'none',
        borderRadius: '5px',
        display: 'flex',
        outline: 'none',
        color: 'hsl(var(--heroui-content1))'
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        cursor: 'text',
        color: 'hsl(var(--heroui-content1))'
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        color: state.isDisabled ? 'hsl(var(--heroui-default-400))' : 'hsl(var(--heroui-content1))'
    }),
    menuList: (provided) => ({
        ...provided,
        "::-webkit-scrollbar": {
          width: "8px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "hsl(var(--heroui-default-500))",
          borderRadius: "4px",
          transition: '0.5s ease all'
        },
        "::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "hsl(var(--heroui-default-400))",
        },
      }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        background: state.isFocused ? 'hsl(var(--heroui-background-200))' : state.isSelected ? 'hsl(var(--heroui-background-300))' : 'hsl(var(--heroui-background))',
        color: state.isSelected ? 'hsl(var(--heroui-content1))' : 'hsl(var(--heroui-content1))',
        ':active': {
            ...baseStyles[':active'],
            background: 'hsl(var(--heroui-background-300))'
        },
    })
};

export const colourStylesBordered: StylesConfig = {
    control: (baseStyles, state) => ({
        background: 'transparent',
        opacity: state.isDisabled ? '0.5' : '1',
        transition: 'all 0.15s ease',
        border: state.isFocused ? '2px solid hsl(var(--heroui-default-800))' : '2px solid hsl(var(--heroui-default-800))',
        borderRadius: '12px',
        fontSize: '0.875rem',
        height: '40px',
        display: 'flex',
        outline: 'none',
        color: 'hsl(var(--heroui-content1))'
    }),
    input: (baseStyles, state) => ({
        ...baseStyles,
        cursor: 'text',
        fontSize: '0.875rem',
        color: 'hsl(var(--heroui-content1))'
    }),
    singleValue: (baseStyles, state) => ({
        ...baseStyles,
        color: state.isDisabled ? 'hsl(var(--heroui-default-400))' : 'hsl(var(--heroui-content1))'
    }),
    menu: (baseStyles, state) => ({
        ...baseStyles,
        zIndex: '21',
        fontSize: '0.875rem',
        background: 'hsl(var(--heroui-background-100))'
    }),
    menuList: (provided) => ({
        ...provided,
        "::-webkit-scrollbar": {
          width: "8px",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundColor: "hsl(var(--heroui-default-500))",
          borderRadius: "4px",
          transition: '0.5s ease all'
        },
        "::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "hsl(var(--heroui-default-400))",
        },
      }),
    option: (baseStyles, state) => ({
        ...baseStyles,
        background: state.isFocused ? 'hsl(var(--heroui-background-200))' : state.isSelected ? 'hsl(var(--heroui-background-300))' : 'hsl(var(--heroui-background))',
        color: state.isSelected ? 'hsl(var(--heroui-content1))' : 'hsl(var(--heroui-content1))',
        ':active': {
            ...baseStyles[':active'],
            background: 'hsl(var(--heroui-background-300))'
        },
    })
};
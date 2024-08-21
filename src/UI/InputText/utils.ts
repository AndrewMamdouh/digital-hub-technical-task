export const getSizeClassNames = (size: string) => {
    switch (size) {
        case 'sm':
            return /*tw*/ 'p-inputtext-sm py-1 px-2 text-sm';
        case 'md':
            return /*tw*/ 'py-1.5 px-3 text-base';
        case 'lg':
            return /*tw*/ 'p-inputtext-lg py-2 px-4 text-lg';
        default:
            return /*tw*/ 'py-1.5 px-3 text-base';
    }
};

export const getThemeClassNames = () =>
    /*tw*/ 'text-secondary hover:border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/40';

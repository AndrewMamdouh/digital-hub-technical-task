export const getSizeClassNames = (size: string, iconOnly: boolean) => {
    switch (size) {
        case 'sm':
            return /*tw*/ `${iconOnly ? 'p-1' : 'py-1 px-2'} text-sm`;
        case 'md':
            return /*tw*/ `${iconOnly ? 'p-1.5' : 'py-1.5 px-3'} text-base`;
        case 'lg':
            return /*tw*/ `${iconOnly ? 'p-2' : 'py-2 px-4'} text-lg`;
        default:
            return /*tw*/ `${iconOnly ? 'p-1.5' : 'py-1.5 px-3'} text-base`;
    }
};

export const getVariantClassNames = (variant: string) => {
    switch (variant) {
        case 'filled':
            return /*tw*/ 'bg-primary border border-primary hover:bg-primary/80 focus:ring-2 focus:ring-primary/50';
        case 'outlined':
            return /*tw*/ 'bg-transparent border border-secondary-light hover:bg-secondary hover:border-secondary hover:text-white focus:ring-2 focus:ring-secondary/50';
        case 'ghost':
            return /*tw*/ 'bg-transparent border border-transparent hover:bg-secondary hover:text-white focus:ring-2 focus:ring-secondary/50';
        default:
            return /*tw*/ 'bg-primary border border-primary hover:bg-primary/80 focus:ring-2 focus:ring-primary/50';
    }
};

export const getBaseClassNames = (fullWidth = false) =>
    /*tw*/ `${fullWidth ? 'flex grow w-full' : 'inline-flex grow-0 w-auto'} justify-center items-center gap-x-2 text-secondary font-medium rounded-md`;

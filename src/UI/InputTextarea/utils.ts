export const getSizeClassNames = (size: string) => {
    switch (size) {
        case 'sm':
            return /*tw*/ 'py-1 px-2 text-sm min-h-20';
        case 'md':
            return /*tw*/ 'py-1.5 px-3 text-base min-h-24';
        case 'lg':
            return /*tw*/ 'py-2 px-4 text-lg min-h-28';
        default:
            return /*tw*/ 'py-1.5 px-3 text-base min-h-24';
    }
};

export const getThemeClassNames = () =>
    /*tw*/ 'hover:border-secondary focus:border-secondary focus:ring-2 focus:ring-secondary/40 scrollbar-thin';

export const getResizeClassNames = (
    resizableX: boolean,
    resizableY: boolean
) =>
    resizableX && resizableY
        ? /*tw*/ 'resize'
        : resizableX
          ? /*tw*/ 'resize-x'
          : resizableY
            ? /*tw*/ 'resize-y'
            : /*tw*/ 'resize-none';

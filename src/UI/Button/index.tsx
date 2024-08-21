import {
    Button as PrimeButton,
    ButtonProps as PrimeButtonProps,
} from 'primereact/button';
import { MenuItem } from 'primereact/menuitem';
import { forwardRef, MouseEventHandler, Ref, useId, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { Menu, MenuProps } from 'primereact/menu';

import {
    getBaseClassNames,
    getSizeClassNames,
    getVariantClassNames,
} from './utils';

export type ButtonProps = Omit<PrimeButtonProps, 'size'> & {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'filled' | 'outlined' | 'ghost';
    fullWidth?: boolean;
    iconOnly?: boolean;
    menu?: MenuItem[];
    menuProps?: MenuProps;
};

const Button = forwardRef(function Button(
    {
        children,
        size = 'md',
        variant = 'filled',
        fullWidth = false,
        iconOnly = false,
        menu,
        menuProps = {},
        className,
        onClick,
        ...rest
    }: ButtonProps,
    ref: Ref<PrimeButton>
) {
    const menuRef = useRef<Menu>(null);
    const menuId = useId();
    const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
        menuRef.current?.toggle(e);
        onClick?.(e);
    };
    const classNames = twMerge(
        getBaseClassNames(fullWidth),
        getSizeClassNames(size, iconOnly),
        getVariantClassNames(variant),
        className
    );

    return (
        <>
            {menu?.length && (
                <Menu
                    ref={menuRef}
                    id={menuId}
                    model={menu}
                    popup
                    closeOnEscape
                    {...menuProps}
                />
            )}
            <PrimeButton
                ref={ref}
                className={classNames}
                onClick={clickHandler}
                {...(menu?.length && {
                    'aria-controls': menuId,
                    'aria-haspopup': true,
                })}
                {...rest}
            >
                {children}
            </PrimeButton>
        </>
    );
});

export default Button;

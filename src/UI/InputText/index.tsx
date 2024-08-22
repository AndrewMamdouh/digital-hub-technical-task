import {
    InputText as PrimeInputText,
    InputTextProps as PrimeInputTextProps,
} from 'primereact/inputtext';
import { ChangeEventHandler, forwardRef, Ref } from 'react';
import { twMerge } from 'tailwind-merge';

import { getSizeClassNames, getThemeClassNames } from './utils';
import { FormikProps } from '../common';

export type InputTextProps = Omit<PrimeInputTextProps, 'children' | 'type'> &
    FormikProps & {
        type?: 'text' | 'password' | 'email' | 'hidden';
        size?: 'sm' | 'md' | 'lg';
    };

const InputText = forwardRef(function InputText(
    {
        type = 'text',
        size = 'md',
        name,
        value,
        values = {},
        setFieldValue,
        onChange,
        className,
        ...rest
    }: InputTextProps,
    ref: Ref<HTMLInputElement>
) {
    const inputValue: string | undefined = value || (name && values[name]);
    const inputOnChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        onChange?.(e);
        if (name) setFieldValue?.(name, e.target.value);
    };
    const classNames = twMerge(
        getSizeClassNames(size),
        getThemeClassNames(),
        className
    );

    return (
        <PrimeInputText
            ref={ref}
            type={type}
            name={name}
            value={inputValue}
            onChange={inputOnChange}
            className={classNames}
            {...rest}
        />
    );
});

export default InputText;

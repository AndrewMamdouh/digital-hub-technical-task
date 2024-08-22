import {
    InputTextarea as PrimeInputTextarea,
    InputTextareaProps as PrimeInputTextareaProps,
} from 'primereact/inputtextarea';
import { ChangeEventHandler, forwardRef, Ref } from 'react';
import { twMerge } from 'tailwind-merge';

import {
    getResizeClassNames,
    getSizeClassNames,
    getThemeClassNames,
} from './utils';
import { FormikProps } from '../common';

export type InputTextareaProps = PrimeInputTextareaProps &
    FormikProps & {
        size?: 'sm' | 'md' | 'lg';
        resizableX?: boolean;
        resizableY?: boolean;
    };

const InputTextarea = forwardRef(function InputTextarea(
    {
        size = 'md',
        resizableX = false,
        resizableY = false,
        name,
        value,
        values = {},
        setFieldValue,
        onChange,
        className,
        ...rest
    }: InputTextareaProps,
    ref: Ref<HTMLTextAreaElement>
) {
    const textareaValue: string | undefined = value || (name && values[name]);
    const textareaOnChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        onChange?.(e);
        if (name) setFieldValue?.(name, e.target.value);
    };
    const classNames = twMerge(
        getThemeClassNames(),
        getSizeClassNames(size),
        getResizeClassNames(resizableX, resizableY),
        className
    );

    return (
        <PrimeInputTextarea
            ref={ref}
            name={name}
            value={textareaValue}
            onChange={textareaOnChange}
            className={classNames}
            {...rest}
        />
    );
});

export default InputTextarea;

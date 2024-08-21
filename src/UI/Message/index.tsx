import { Property } from 'csstype';
import {
    Message as PrimeMessage,
    MessageProps as PrimeMessageProps,
} from 'primereact/message';
import { twMerge } from 'tailwind-merge';

export type MessageProps = PrimeMessageProps & {
    align?: Property.AlignItems;
    justify?: Property.JustifyContent;
    iconClassName?: string;
    contentClassName?: string;
};

const Message = ({
    align = 'center',
    justify = 'flex-start',
    iconClassName = '',
    contentClassName = '',
    className,
    ...rest
}: MessageProps) => (
    <PrimeMessage
        pt={{
            root: {
                className: twMerge('p-2.5', className),
                style: { alignItems: align, justifyContent: justify },
            },
            icon: { className: iconClassName },
            text: { className: twMerge('text-sm', contentClassName) },
        }}
        {...rest}
    />
);

export default Message;

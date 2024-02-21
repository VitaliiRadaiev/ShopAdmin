import { TextareaHTMLAttributes, useEffect, useRef } from "react";
import cn from 'classnames';
import css from './fields.module.scss';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    setValue: (value: string) => void;
    className?: string;
}

export function TextareaAutoHeight({ value, setValue, children, className, ...props }: TextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const sizeLayoutRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            const { scrollHeight } = textareaRef.current;

            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${scrollHeight}px`;
        }
    }, [value]);

    return (
        <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            {...props}
            className={cn(css.textarea, className)}
        >{children}</textarea>
    );
}
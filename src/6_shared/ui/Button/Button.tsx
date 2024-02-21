import React, { ButtonHTMLAttributes, CSSProperties, JSX } from 'react';
import css from './Button.module.scss';
import cn from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    size?: number;
    variant?: 'primary' | 'transparent' | 'danger';
}

export function Button( { onClick, children, size = 1, variant,  ...props }: ButtonProps ): JSX.Element {
    const style = { "--size": size } as CSSProperties;
    return (
        <button style={style} onClick={onClick} {...props} className={cn(css.btn, variant && css[variant])}>
            {children}
        </button>
    );
}
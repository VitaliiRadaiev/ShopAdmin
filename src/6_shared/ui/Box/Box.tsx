import React, { CSSProperties, HtmlHTMLAttributes, JSX, ReactElement, ReactNode } from 'react';
import css from './Box.module.scss';
import cn from 'classnames';

interface BoxProps extends HtmlHTMLAttributes<ReactElement | ReactNode> {
    padding?: number;
    className?: string;
}

export function Box( { children, padding = 1, className }: BoxProps ): JSX.Element {
    const styleBox = { "--padding": padding } as CSSProperties;
    return (
        <div className={cn(css.box, className)} >
            <div className={css.box__inner} style={styleBox}>
                {children}
            </div>
        </div>
    );
}
import React, { JSX, HtmlHTMLAttributes, CSSProperties } from 'react';
import css from './Spiner.module.scss';
import cn from 'classnames';


interface SpinerProps extends HtmlHTMLAttributes<HTMLDivElement> {
    size?: number;
    zIndex?: number;
}

export function Spiner({ size = 1, zIndex = 5, ...props }: SpinerProps): JSX.Element {
    const style = { "--size": size, zIndex } as CSSProperties;
    return (
        <div className={css.lds_ring} style={style} {...props}><div></div><div></div><div></div><div></div></div>
    );
}

export function SpinerOverlay({ size = 1, zIndex = 5, ...props }: SpinerProps): JSX.Element {
    const style = { "--size": size } as CSSProperties;
    return (
        <div className={css.overlay_wrap} style={{zIndex}}>
            <div className={css.lds_ring} style={style} {...props}><div></div><div></div><div></div><div></div></div>
        </div>
    );
}
export function SpinerOverlayAbsolute({ size = 1, zIndex = 5, ...props }: SpinerProps): JSX.Element {
    const style = { "--size": size } as CSSProperties;
    return (
        <div className={css.overlay_wrap_absolute} style={{zIndex}}>
            <div className={css.lds_ring} style={style} {...props}><div></div><div></div><div></div><div></div></div>
        </div>
    );
}


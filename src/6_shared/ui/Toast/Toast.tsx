import React, { JSX, PropsWithChildren } from 'react';
import css from './Toast.module.scss';
import cn from 'classnames';

interface ToastProps {
    isShow: boolean;
}

export function Toast({ children, isShow }: PropsWithChildren<ToastProps>): JSX.Element {
    return (
        <div className={cn("toast position-fixed", css.toast, { [css.show]: isShow })}>
            {children}
        </div>
    );
}

Toast.Header = function ({ children }: PropsWithChildren) {
    return (
        <div className="toast-header">
            <strong className="me-auto text-success">{children}</strong>
        </div>
    )
}

Toast.Body = function ({ children }: PropsWithChildren) {
    return (
        <div className="toast-body">
            {children}
        </div>
    )
}
import React, { Ref } from 'react';
import css from './fields.module.scss';
import cn from 'classnames';
import { InputProps } from './fields.types';

export const Input = React.forwardRef(({ defaultValue, errorState = false, ...props }:InputProps , ref: Ref<HTMLInputElement>) => {
    const classname = cn(
        css.input,
        { [css.error]: errorState }
    );

    return <input
        defaultValue={defaultValue}
        className={classname}
        {...props}
        ref={ref}
    />
})
import React, { Ref, useState } from 'react';
import css from './fields.module.scss';
import cn from 'classnames';
import { InputProps } from './fields.types';
import { ReactComponent as SvgIconEye } from './eye.svg';
import { ReactComponent as SvgIconEyeOff } from './eye-off.svg';
import { Input } from './Input';

export const InputPassword = React.forwardRef(({ defaultValue, errorState = false, ...props }:InputProps , ref: Ref<HTMLInputElement>) => {
    const [type, setType] = useState<'password' | 'text'>('password');
    
    return (
        <div className={css.input_password}>
            <Input type={type} defaultValue={defaultValue} errorState={errorState} ref={ref} {...props}/>
            <div className={css.input_password_icon} onClick={() => setType(type => type === 'password' ? 'text' : 'password')}>
                {type === 'password' ? <SvgIconEyeOff /> : <SvgIconEye />}
            </div>
        </div>
    );
})
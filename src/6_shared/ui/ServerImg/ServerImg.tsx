import React, { HtmlHTMLAttributes, ImgHTMLAttributes, JSX } from 'react';
import cn from 'classnames';
import { addDomainNameToPath } from '6_shared/utils/addDomainNameToPath';

interface ServerImgProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
}

export function ServerImg( { src, ...rest }: ServerImgProps ): JSX.Element {
    return (
        <img src={addDomainNameToPath(src)} {...rest} alt="" />
    );
}

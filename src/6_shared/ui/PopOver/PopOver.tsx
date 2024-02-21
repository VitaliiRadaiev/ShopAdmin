import React, { CSSProperties, JSX, ReactElement, ReactNode, useRef, useState, MouseEvent } from 'react';
import css from './PopOver.module.scss';
import { createPortal } from 'react-dom';
import cn from 'classnames';
import { ReactComponent as SvgIconCLose } from './close.svg';

interface PopOverProps {
    title: ReactElement | ReactNode;
    content?: ReactElement | ReactNode;
    children: ReactElement | ReactNode;
    mode: 'block' | 'inline';
}

interface ICords {
    top: number;
    left: number;
    bottom: number;
}

export function PopOver({ children, title, content, mode }: PopOverProps): JSX.Element {
    const parent = useRef<HTMLDivElement>(null);
    const [isBoxShow, setIsBoxShow] = useState<boolean>(false);
    const [rectCords, setRectCords] = useState<ICords>({ top: 0, left: 0, bottom: 0 });

    const onBoxShowHandler = (e: MouseEvent<HTMLDivElement>) => {
        setIsBoxShow(true);
        if (parent.current) {
            const clientRect = parent.current.getBoundingClientRect();
            const left = clientRect.left + clientRect.width / 2;

            const cords: ICords = {
                top: clientRect.top,
                left: clientRect.left + clientRect.width / 2,
                bottom: clientRect.bottom,
            }
            setRectCords(cords);
        }
    }
    const style: CSSProperties = { top: rectCords?.top, left: rectCords?.left }

    const boxDidMount = (el: HTMLDivElement | null) => {
        if (el) {
            const halfOfwinwodHeight = document.documentElement.clientHeight / 2;
            const position: 'over' | 'under' = rectCords.top > halfOfwinwodHeight
                ? 'over' : 'under';
            if (rectCords) {
                const left = rectCords.left - (el.clientWidth / 2);
                el.style.top = position === 'over' ? rectCords.top - el.clientHeight - 12 + 'px' : rectCords.bottom + 12 + 'px';
                el.style.left = left <= 0 ? '16px': left + 'px';
            }
        }
    }

    return (
        <div ref={parent} className={cn(css.popover, css[mode])} onClick={onBoxShowHandler}>
            {
                createPortal(
                    <>
                        {isBoxShow &&
                            <div ref={boxDidMount} className={css.popover__box} style={style} onClick={(e) => e.stopPropagation()}>
                                <div className={css.popover__head}>
                                    <button className={css.popover__close} onClick={() => setIsBoxShow(false)}>
                                        <SvgIconCLose />
                                    </button>
                                    {title}
                                </div>
                                {content &&
                                    <div className={css.popover__content}>
                                        {content}
                                    </div>
                                }
                            </div>
                        }
                    </>,
                    document.body
                )
            }
            {children}
        </div>
    );
}
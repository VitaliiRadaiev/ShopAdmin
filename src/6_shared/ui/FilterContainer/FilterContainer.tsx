import React, { JSX, PropsWithChildren, useState } from 'react';
import css from './FilterContainer.module.scss';
import cn from 'classnames';


export function FilterContainer({ children }: PropsWithChildren): JSX.Element {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const toggleMobileFilterOpen = (state: boolean) => {
        if (state) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        setIsMobileFilterOpen(state);
    }

    return (
        <div className={css.filter}>
            <div className="d-lg-none">
                <button
                    className='btn btn-secondary w-100'
                    onClick={() => toggleMobileFilterOpen(true)}
                >
                    Фильтр
                    <i className='bi bi-filter-right ms-1'></i>
                </button>
            </div>
            <div className={cn(css.filter__body, { [css.show]: isMobileFilterOpen })}>
                <div className={css.filter__body_head}>
                    <h3 className='mb-0'>Фильтр</h3>
                    <button
                        className='btn'
                        onClick={() => toggleMobileFilterOpen(false)}
                    >
                        <i className='bi bi-x-lg'></i>
                    </button>
                </div>
                <div className={css.filter__body_scroll_content}>
                    {children}
                </div>
            </div>
        </div>
    );
}
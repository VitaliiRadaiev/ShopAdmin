import React, { JSX, Dispatch, SetStateAction } from 'react';
import cn from 'classnames';
import { IGetProductsBody } from '5_entities/productCards';

interface DefaultProductFiltersProps {
    setProductCardsQueries: Dispatch<SetStateAction<IGetProductsBody>>
}

export function DefaultProductFilters({ setProductCardsQueries }: DefaultProductFiltersProps): JSX.Element {

    const setDefaultQueries = <T extends keyof IGetProductsBody>(checked: boolean, key: T) => {
        if (checked) {
            setProductCardsQueries((queries => {
                return {
                    ...queries,
                    [key]: true
                }
            }))
        } else {
            setProductCardsQueries((queries => {
                const updatedQueries = { ...queries };
                delete updatedQueries[key];
                return updatedQueries
            }))
        }
    }
    
    return (
        <>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="isNew" onChange={(e) => setDefaultQueries(e.target.checked, 'isNew')} />
                <label className="form-check-label" htmlFor="isNew">
                    Новинка
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="isBestseller" onChange={(e) => setDefaultQueries(e.target.checked, 'isBestseller')} />
                <label className="form-check-label" htmlFor="isBestseller">
                    Хит
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="isRecommended" onChange={(e) => setDefaultQueries(e.target.checked, 'isRecommended')} />
                <label className="form-check-label" htmlFor="isRecommended">
                    Рекомендуем
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="isPromotion" onChange={(e) => setDefaultQueries(e.target.checked, 'isPromotion')} />
                <label className="form-check-label" htmlFor="isPromotion">
                    Акция
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="inStock" onChange={(e) => setDefaultQueries(e.target.checked, 'inStock')} />
                <label className="form-check-label" htmlFor="inStock">
                    В наличии
                </label>
            </div>
        </>
    );
}
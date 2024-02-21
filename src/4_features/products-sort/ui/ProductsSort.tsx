import React, { JSX, Dispatch, SetStateAction, ChangeEvent } from 'react';
import { IGetProductsBody } from '5_entities/productCards';

interface ProductsSortProps {
    setProductCardsQueries: Dispatch<SetStateAction<IGetProductsBody>>;
    sortBy: string;
}

export function ProductsSort({ sortBy, setProductCardsQueries }: ProductsSortProps): JSX.Element {
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setProductCardsQueries(queries => {
            type SortBy = typeof queries['sortBy']
            return {
                ...queries,
                sortBy: e.target.value as SortBy
            }
        })
    }
    return (
        <div className="d-flex align-items-center gap-3 text-nowrap">
            <h5 className='mb-0'>Сортировать по: </h5>
            <select value={sortBy} className="form-select" onChange={onChangeHandler}>
                <option value="recently-created">последние созданные</option>
                <option value="long-created">первые созданные</option>
                <option value="rank">по рейтингу</option>
                <option value="expensive">от дорогих к дешевым</option>
                <option value="cheap">от дешевых к дорогим</option>
            </select>
        </div>
    );
}
import React, { JSX, Dispatch, SetStateAction, useState } from 'react';
import css from './ProductsSearch.module.scss';
import cn from 'classnames';
import { IGetProductsBody } from '5_entities/productCards';

interface ProductsSearchProps {
    setProductCardsQueries: Dispatch<SetStateAction<IGetProductsBody>>;
}

export function ProductsSearch({ setProductCardsQueries }: ProductsSearchProps): JSX.Element {
    const [inputValue, setInputValue] = useState('');
    const isMode = inputValue.length >= 1;

    const searchHandler = (value: string) => {
        setProductCardsQueries(queries => {
            return {
                ...queries,
                term: value
            }
        })
    }

    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                placeholder="Искать"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            {isMode &&
                <button onClick={() => {
                    setInputValue('');
                    searchHandler('');
                }} className="btn btn-outline-secondary" type="button">
                    <i className='bi bi-x'></i>
                </button>
            }
            <button onClick={() => searchHandler(inputValue)} className="btn btn-outline-primary" type="button">
                <i className='bi bi-search'></i>
            </button>
        </div>
    );
}
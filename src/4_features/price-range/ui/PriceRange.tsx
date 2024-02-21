import React, { JSX, Dispatch, SetStateAction, useState, useRef, useEffect } from 'react';
import Nouislider, { Formatter } from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import { IGetProductsBody } from '5_entities/productCards';
import wNumb from 'wnumb';

interface PriceRangeProps {
    setProductCardsQueries: Dispatch<SetStateAction<IGetProductsBody>>;
    min: number;
    max: number;
}

export function PriceRange({ min, max, setProductCardsQueries }: PriceRangeProps): JSX.Element {
    const [inputStartValue, setInputStartValue] = useState(min);
    const [inputEndValue, setInputEndValue] = useState(max);

    const setPriceQuery = () => {
        setProductCardsQueries(queries => {
            return {
                ...queries,
                priceRange: {
                    from: inputStartValue,
                    to: inputEndValue
                }
            }
        })
    }

    return (
        <>
            <div className="d-flex mb-3 gap-3">
                <div className='d-flex gap-2'>
                    <input
                        type="text"
                        className='form-control'
                        value={inputStartValue}
                        onChange={(e) => setInputStartValue(Number(e.target.value))}
                    />
                    <input
                        type="text"
                        className='form-control'
                        value={inputEndValue}
                        onChange={(e) => setInputEndValue(Number(e.target.value))}
                    />
                </div>
                <button onClick={setPriceQuery} className='btn btn-light'>OK</button>
            </div> 
            <Nouislider
                range={{ min, max: (min === max ? max + 1 : max) }}
                start={[min, (min === max ? max + 1 : max)]}
                step={100}
                connect
                onSlide={([start, end]) => {
                    setInputStartValue(Number(start));
                    setInputEndValue(Number(end));
                }}
                onChange={() => console.log('test')}
                format={wNumb({
                    decimals: 0
                })}
            />
        </>
    );
}

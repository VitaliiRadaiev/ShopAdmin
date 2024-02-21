import React, { JSX, Dispatch, SetStateAction } from 'react';
import css from './DefaultOrdersFilter.module.scss';
import cn from 'classnames';
import { IGetOrdersBody, OrderStatuses } from '5_entities/orders';

interface DefaultOrdersFilterProps {
    status?: OrderStatuses;
    setOrdersQueries: Dispatch<SetStateAction<IGetOrdersBody>>
}

export function DefaultOrdersFilter({ status, setOrdersQueries }: DefaultOrdersFilterProps): JSX.Element {

    const reset = () => {
        setOrdersQueries(queries => {
            const { status, ...reQueries } = queries;
            return {
                ...reQueries
            }
        })
    }

    const setDefaultQueries = <T extends OrderStatuses>(checked: boolean, key: T) => {
        if (checked) {
            setOrdersQueries(queries => {
                return {
                    ...queries,
                    status: key
                }
            })
        } else {
            reset();
        }
    }


    return (
        <>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="processed"
                    onChange={(e) => setDefaultQueries(e.target.checked, 'processed')}
                    checked={status === 'processed'}
                />
                <label className="form-check-label" htmlFor="processed">
                    В обработке
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="delivering"
                    onChange={(e) => setDefaultQueries(e.target.checked, 'delivering')}
                    checked={status === 'delivering'}
                />
                <label className="form-check-label" htmlFor="delivering">
                    В дороге
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="done"
                    onChange={(e) => setDefaultQueries(e.target.checked, 'done')}
                    checked={status === 'done'}
                />
                <label className="form-check-label" htmlFor="done">
                    Выполненные
                </label>
            </div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="canceled"
                    onChange={(e) => setDefaultQueries(e.target.checked, 'canceled')}
                    checked={status === 'canceled'}
                />
                <label className="form-check-label" htmlFor="canceled">
                    Отмененные
                </label>
            </div>
            <button onClick={reset} className='btn btn-sm btn-primary w-100 mt-3'>Сбросить</button>
        </>
    );
}
import React, { JSX, Dispatch, SetStateAction, useState, ChangeEvent } from 'react';
import css from './ProductsFilter.module.scss';
import cn from 'classnames';
import { IFilterBlock, IFilterItem, useDeleteFilterBlockMutation, useDeleteFilterItemMutation, useUpdateFilterBlockMutation, useUpdateFilterItemMutation } from '5_entities/filter';
import { IGetProductsBody } from '5_entities/productCards';
import { PopOver } from '6_shared/ui/PopOver/PopOver';
import { CreateFilterItem } from '../CreateProductFilter/CreateProductFilter';

interface ProductFilterBlockProps {
    filterBlock: IFilterBlock;
    setProductCardsQueries: Dispatch<SetStateAction<IGetProductsBody>>
}

export function ProductFilterBlock({ filterBlock, setProductCardsQueries }: ProductFilterBlockProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const [inputValue, setInputValue] = useState(filterBlock.title);
    const [updateFilterBlock, { isLoading: isUpdating }] = useUpdateFilterBlockMutation();
    const [deleteFilterBlock, { isLoading: isDeleting }] = useDeleteFilterBlockMutation();

    const deleteHandler = async () => {
        await deleteFilterBlock({ id: filterBlock.id });
        setIsMode(false);
    }

    const updateHandler = async () => {
        await updateFilterBlock({ id: filterBlock.id, title: inputValue });
        setIsMode(false);
    }

    const setQueries = (e: ChangeEvent<HTMLInputElement>, id: string) => {
        setProductCardsQueries(queries => {
            const isFilterBlockExists = queries.filters.find(fb => fb.id === filterBlock.id);

            const updatedFilters = isFilterBlockExists
                ? queries.filters.map(fb => {
                    if (fb.id === filterBlock.id) {
                        return {
                            ...fb,
                            items: e.target.checked ? [...fb.items, id] : fb.items.filter(i => i !== id)
                        }
                    }
                    return fb;
                })
                : [...queries.filters, { id: filterBlock.id, items: [id] }]

            return {
                ...queries,
                filters: updatedFilters.filter(fb => fb.items.length)
            }
        })
    }

    return (
        <>
            <hr />
            {isMode
                ? <div className="input-group input-group-sm mb-2">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        className='form-control'
                        placeholder='Имя фильтра'
                        onBlur={updateHandler}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                updateHandler();
                            }
                        }}
                    />
                    <button disabled={isUpdating} onClick={updateHandler} className="btn btn-outline-primary" type="button" id="button-addon2">
                        {isUpdating
                            ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            : <i className='bi bi-check-lg'></i>
                        }
                    </button>
                </div>
                : <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className='mb-0'>{filterBlock.title}</h5>
                    <div className='d-flex gap-1'>
                        <button className='btn btn-sm p-1 bg-light' onClick={(e) => {
                            e.preventDefault();
                            setIsMode(true);
                        }}>
                            <i className='bi bi-pencil'></i>
                        </button>
                        <PopOver
                            mode='inline'
                            title={<h4>Удаление фильтра</h4>}
                            content={
                                <>
                                    <p>Вы уверены что хотите удалить фильтр?</p>
                                    <button
                                        disabled={isDeleting}
                                        className='btn btn-danger w-100'
                                        onClick={deleteHandler}
                                    >
                                        {isDeleting
                                            ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            : 'Удалить фильтр'
                                        }
                                    </button>
                                </>
                            }
                        >
                            <button className='btn btn-sm p-1 bg-light' onClick={(e) => e.preventDefault()}>
                                <i className='bi bi-trash'></i>
                            </button>
                        </PopOver>

                    </div>
                </div>
            }
            <div>
                {filterBlock.items.map(filterItem =>
                    <ProductFilterItem key={filterItem.id} filterItem={filterItem} onChange={(e) => setQueries(e, filterItem.id)} />
                )}

                <CreateFilterItem filterBlockId={filterBlock.id} />
            </div>
        </>
    );
}

interface ProductFilterItemProps {
    filterItem: IFilterItem;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function ProductFilterItem({ filterItem, onChange }: ProductFilterItemProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const [inputValue, setInputValue] = useState(filterItem.title);
    const [updateFilterItem, { isLoading: isUpdating }] = useUpdateFilterItemMutation();
    const [deleteFilterItem, { isLoading: isDeleting }] = useDeleteFilterItemMutation();

    const deleteHandler = async () => {
        await deleteFilterItem({ id: filterItem.id });
        setIsMode(false);
    }

    const updateHandler = async () => {
        await updateFilterItem({ id: filterItem.id, title: inputValue });
        setIsMode(false);
    }

    return (
        <>
            {isMode
                ? <div className="input-group input-group-sm mb-1">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        className='form-control'
                        placeholder='Имя фильтра'
                        onBlur={updateHandler}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                updateHandler();
                            }
                        }}
                    />
                    <button disabled={isUpdating} onClick={updateHandler} className="btn btn-outline-primary" type="button" id="button-addon2">
                        {isUpdating
                            ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            : <i className='bi bi-check-lg'></i>
                        }
                    </button>
                </div>
                : <div className="d-flex align-items-center justify-content-between mb-1">
                    <div className="form-check mb-0">
                        <input className="form-check-input" type="checkbox" id={filterItem.id} onChange={onChange} />
                        <label className="form-check-label" htmlFor={filterItem.id}>
                            {filterItem.title}
                        </label>
                    </div>
                    <div className='d-flex gap-1'>
                        <button className='btn btn-sm p-1 bg-light' onClick={(e) => {
                            e.preventDefault();
                            setIsMode(true);
                        }}>
                            <i className='bi bi-pencil'></i>
                        </button>
                        <PopOver
                            mode='inline'
                            title={<h4>Удаление фильтра</h4>}
                            content={
                                <>
                                    <p>Вы уверены что хотите удалить фильтр?</p>
                                    <button
                                        disabled={isDeleting}
                                        className='btn btn-danger w-100'
                                        onClick={deleteHandler}
                                    >
                                        {isDeleting
                                            ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            : 'Удалить фильтр'
                                        }
                                    </button>
                                </>
                            }
                        >
                            <button className='btn btn-sm p-1 bg-light' onClick={(e) => e.preventDefault()}>
                                <i className='bi bi-trash'></i>
                            </button>
                        </PopOver>

                    </div>
                </div>
            }
        </>
    );
}
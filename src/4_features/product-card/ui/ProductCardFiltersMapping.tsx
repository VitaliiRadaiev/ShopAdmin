import React, { ChangeEvent, Fragment, JSX } from 'react';
import css from './ProductCardFiltersMapping.module.scss';
import cn from 'classnames';
import { IProductCard, useConnectFiltersMutation, useDisconnectFiltersMutation } from '5_entities/productCards';
import { ICategory } from '5_entities/categories';

interface ProductCardFiltersMappingProps {
    product: IProductCard;
    category: ICategory;
}

export function ProductCardFiltersMapping({ category, product }: ProductCardFiltersMappingProps): JSX.Element {
    const [connectFilters] = useConnectFiltersMutation();
    const [disconnectFilters] = useDisconnectFiltersMutation();

    const connectFilter = async (e: ChangeEvent<HTMLInputElement>, filterBlock: ICategory['filters'][0], filterItemId: string) => {
        if(e.target.checked) {
            await disconnectFilters({ 
                productId: product.id, 
                filters: filterBlock.items.filter(i => i.id !== filterItemId).map(i => i.id)
            })
            await connectFilters({ productId: product.id, filters: [filterItemId] })

        }
    }

    return (
        <>
            <h4>Фильтра категории: {category.title}</h4>
            <div className="alert alert-primary">
                {category.filters.map(filter =>
                    <Fragment key={filter.id}>
                        <h5>{filter.title}</h5>
                        <ul className='list-group mb-2'>
                            {filter.items.map(filterItem => {
                                const isProductUseFIlter =
                                    product.filterItems.find(item => item.id === filterItem.id);

                                return (
                                    <li key={filterItem.id} className={cn('list-group-item d-flex justify-content-between align-items-center', { ['list-group-item-info']: !!isProductUseFIlter })}>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name={filterItem.id}
                                                id={filterItem.id}
                                                checked={!!isProductUseFIlter}
                                                onChange={(e) => connectFilter(e, filter, filterItem.id)}
                                            />
                                            <label className="form-check-label" htmlFor={filterItem.id}>
                                                {filterItem.title}
                                            </label>
                                        </div>
                                        {isProductUseFIlter &&
                                            <span className="badge bg-primary rounded-pill">Используется</span>
                                        }
                                    </li>
                                );
                            })}
                        </ul>
                    </Fragment>
                )}
            </div>
        </>
    );
}
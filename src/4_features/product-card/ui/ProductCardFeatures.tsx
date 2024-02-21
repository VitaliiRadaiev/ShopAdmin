import React, { JSX, useState } from 'react';
import cn from 'classnames';
import { IProductCard, useCreateProductFeatureMutation, useDeleteProductFeatureMutation, useUpdateProductFeatureMutation } from '5_entities/productCards';
import { PopOver } from '6_shared/ui/PopOver/PopOver';

interface ProductCardFeaturesProps {
    product: IProductCard
}

export function ProductCardFeatures({ product }: ProductCardFeaturesProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const [inputValue, setInputValue] = useState<{ title: string, value: string }>({ title: '', value: '' });
    const [createFeature, { isLoading: isCreating }] = useCreateProductFeatureMutation();

    const createHandler = async () => {
        await createFeature({ productId: product.id, body: inputValue });
        setIsMode(false);
        setInputValue({ title: '', value: '' });
    }

    return (
        <>
            <h4>Характеристики</h4>
            <div className="alert alert-primary">
                <table className="table mb-0">
                    <thead>
                        <tr>
                            <th>Имя</th>
                            <th>Значение</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {product.features.map(feature =>
                            <Feature key={feature.id} feature={feature}/>
                        )}
                        <tr>
                            <td colSpan={3}>
                                {isMode
                                    ? <div className={"input-group"}>
                                        <input
                                            value={inputValue.title}
                                            onChange={(e) => setInputValue(prevValue => ({ ...prevValue, title: e.target.value }))}
                                            type="text"
                                            className='form-control'
                                            placeholder='Имя'
                                            autoFocus
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    createHandler();
                                                }
                                            }}
                                        />
                                        <input
                                            value={inputValue.value}
                                            onChange={(e) => setInputValue(prevValue => ({ ...prevValue, value: e.target.value }))}
                                            type="text"
                                            className='form-control'
                                            placeholder='Значение'
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    createHandler();
                                                }
                                            }}
                                        />
                                        <button onClick={createHandler} className={"btn btn-outline-primary"} type="button">
                                            {isCreating
                                                ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                : <i className='bi bi-check-lg'></i>
                                            }
                                        </button>
                                        <button onClick={() => setIsMode(false)} className={"btn btn-outline-secondary"} type="button">
                                            <i className='bi bi-x'></i>
                                        </button>
                                    </div>
                                    : <button onClick={() => setIsMode(true)} className={'btn btn-primary'}>Создать</button>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

interface FeatureProps {
    feature: IProductCard['features'][0];
}

function Feature({ feature }: FeatureProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const [inputValue, setInputValue] = useState<{ title: string, value: string }>({ title: feature.title, value: feature.value });
    const [updateFeature, { isLoading: isUpdating }] = useUpdateProductFeatureMutation();
    const [deleteFeature, { isLoading: isDeleting }] = useDeleteProductFeatureMutation();

    const updateHandler = async () => {
        await updateFeature({ id: feature.id, body: inputValue });
        setIsMode(false);
    }

    const deleteHandler = async () => {
        deleteFeature({ id: feature.id });
    }

    return (
        <tr>
            {isMode
                ? <td colSpan={3}>
                    <div className={"input-group"}>
                        <input
                            value={inputValue.title}
                            onChange={(e) => setInputValue(prevValue => ({ ...prevValue, title: e.target.value }))}
                            type="text"
                            className='form-control'
                            placeholder='Имя'
                            autoFocus
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    updateHandler();
                                }
                            }}
                        />
                        <input
                            value={inputValue.value}
                            onChange={(e) => setInputValue(prevValue => ({ ...prevValue, value: e.target.value }))}
                            type="text"
                            className='form-control'
                            placeholder='Значение'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    updateHandler();
                                }
                            }}
                        />
                        <button onClick={updateHandler} className={"btn btn-outline-primary"} type="button">
                            {isUpdating
                                ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                : <i className='bi bi-check-lg'></i>
                            }
                        </button>
                        <button onClick={() => setIsMode(false)} className={"btn btn-outline-secondary"} type="button">
                            <i className='bi bi-x'></i>
                        </button>
                    </div>
                </td>
                : <>
                    <td className='w-50'>
                        {feature.title}
                    </td>
                    <td className='w-50'>
                        {feature.value}
                    </td>
                    <td>
                        <div className='d-flex gap-1'>
                            <button className='btn btn-sm p-1 bg-light' onClick={(e) => {
                                e.preventDefault();
                                setIsMode(true);
                            }}>
                                <i className='bi bi-pencil'></i>
                            </button>
                            <PopOver
                                mode='inline'
                                title={<h4>Удаление особенности</h4>}
                                content={
                                    <>
                                        <p>Вы уверены что хотите удалить особенность?</p>
                                        <button
                                            disabled={isDeleting}
                                            className='btn btn-danger w-100'
                                            onClick={deleteHandler}
                                        >
                                            {isDeleting
                                                ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                : 'Удалить'
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
                    </td></>
            }
        </tr >
    );
}
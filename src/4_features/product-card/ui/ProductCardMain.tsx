import React, { JSX, useReducer, useState } from 'react';
import css from './ProductCardMain.module.scss';
import cn from 'classnames';
import { IProductCard, useUpdateProductMutation } from '5_entities/productCards';
import { createPortal } from 'react-dom';
import { Toast } from '6_shared/ui/Toast/Toast';
import { TextEditor } from '6_shared/ui/TextEditor/TextEditor';

interface ProductCardMainProps {
    product: IProductCard
}

type State = {
    title: string;
    price: number;
    oldPrice: number;
    isNew: boolean;
    inStock: boolean;
    isPromotion: boolean;
    isBestseller: boolean;
    isRecommended: boolean;
    shortDescription: string;
    description: string;
}

type Action =
    | { type: 'setTitle', payload: string }
    | { type: 'setPrice', payload: number }
    | { type: 'setOldPrice', payload: number }
    | { type: 'setIsNew', payload: boolean }
    | { type: 'setInStock', payload: boolean }
    | { type: 'setIsPromotion', payload: boolean }
    | { type: 'setIsBestseller', payload: boolean }
    | { type: 'setIsRecommended', payload: boolean }
    | { type: 'setShortDescription', payload: string }
    | { type: 'setDescription', payload: string }

export function ProductCardMain({ product }: ProductCardMainProps): JSX.Element {
    const initialState: State = {
        title: product.title,
        price: product.price,
        oldPrice: product.oldPrice,
        isNew: product.isNew,
        inStock: product.inStock,
        isPromotion: product.isPromotion,
        isBestseller: product.isBestseller,
        isRecommended: product.isRecommended,
        shortDescription: product.shortDescription,
        description: product.description
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const [updateProduct, { isLoading }] = useUpdateProductMutation();
    const [isToastShow, setIsToastShow] = useState(false);

    const updateHandler = async () => {
        await updateProduct({ productId: product.id, body: state });
        setIsToastShow(true);

        setTimeout(() => {
            setIsToastShow(false);
        }, 3000)
    }

    return (
        <>
            <h4>Основная информация</h4>
            <div className="alert alert-primary">
                <table className="table mb-0">
                    <tbody>
                        <tr>
                            <th scope="row">Имя</th>
                            <td className='w-100'>
                                <textarea
                                    className='form-control'
                                    value={state.title}
                                    onChange={(e) => dispatch({ type: 'setTitle', payload: e.target.value })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Краткое описание</th>
                            <td className='w-100'>
                                <textarea
                                    className='form-control'
                                    value={state.shortDescription}
                                    onChange={(e) => dispatch({ type: 'setShortDescription', payload: e.target.value })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Цена</th>
                            <td className='w-100'>
                                <input
                                    type='number'
                                    className='form-control'
                                    value={state.price}
                                    onChange={(e) => dispatch({ type: 'setPrice', payload: Number(e.target.value) })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Старая цена</th>
                            <td className='w-100'>
                                <input
                                    type='number'
                                    className='form-control'
                                    value={state.oldPrice}
                                    onChange={(e) => dispatch({ type: 'setOldPrice', payload: Number(e.target.value) })}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Новый</th>
                            <td className='w-100'>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={state.isNew}
                                        onChange={(e) => dispatch({ type: 'setIsNew', payload: e.target.checked })}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">В наличии</th>
                            <td className='w-100'>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={state.inStock}
                                        onChange={(e) => dispatch({ type: 'setInStock', payload: e.target.checked })}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Акция</th>
                            <td className='w-100'>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={state.isPromotion}
                                        onChange={(e) => dispatch({ type: 'setIsPromotion', payload: e.target.checked })}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Бестселлер</th>
                            <td className='w-100'>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={state.isBestseller}
                                        onChange={(e) => dispatch({ type: 'setIsBestseller', payload: e.target.checked })}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Рекомендуемый</th>
                            <td className='w-100'>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={state.isRecommended}
                                        onChange={(e) => dispatch({ type: 'setIsRecommended', payload: e.target.checked })}
                                    />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">Основное описание</th>
                            <td className='w-100'>
                                <TextEditor
                                    initData={state.description}
                                    onChange={(value: string) => dispatch({ type: 'setDescription', payload: value })}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="d-flex">
                <button disabled={isLoading} onClick={updateHandler} className='btn btn-primary ms-auto'>
                    {isLoading &&
                        <span className="spinner-border spinner-border-sm me-1"></span>
                    }
                    Обновить
                </button>
            </div>
            {createPortal(
                <Toast isShow={isToastShow}>
                    <Toast.Header>
                        Страница товара
                    </Toast.Header>
                    <Toast.Body>
                        <strong>Основная информация:</strong> обновлена.
                    </Toast.Body>
                </Toast>,
                document.body
            )}
        </>
    );
}

function reducer(state: State, action: Action) {
    switch (action.type) {
        case 'setTitle': {
            return {
                ...state,
                title: action.payload
            }
        }
        case 'setPrice': {
            return {
                ...state,
                price: action.payload
            }
        }
        case 'setOldPrice': {
            return {
                ...state,
                oldPrice: action.payload
            }
        }
        case 'setIsNew': {
            return {
                ...state,
                isNew: action.payload
            }
        }
        case 'setInStock': {
            return {
                ...state,
                inStock: action.payload
            }
        }
        case 'setIsPromotion': {
            return {
                ...state,
                isPromotion: action.payload
            }
        }
        case 'setIsBestseller': {
            return {
                ...state,
                isBestseller: action.payload
            }
        }
        case 'setIsRecommended': {
            return {
                ...state,
                isRecommended: action.payload
            }
        }
        case 'setShortDescription': {
            return {
                ...state,
                shortDescription: action.payload
            }
        }
        case 'setDescription': {
            return {
                ...state,
                description: action.payload
            }
        }
        default: {
            return state
        }
    }
}
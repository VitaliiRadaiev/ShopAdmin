import React, { JSX } from 'react';
import css from './PreviewProductCard.module.scss';
import cn from 'classnames';
import { IProductCard } from '5_entities/productCards/types/types';
import { ServerImg } from '6_shared/ui/ServerImg/ServerImg';
import { Link } from 'react-router-dom';

interface PreviewProductCardProps {
    product: IProductCard;
}

export function PreviewProductCard({ product }: PreviewProductCardProps): JSX.Element {
    type Image = typeof product.images[0];
    const image: Image | null = product.images.filter(img => img.isMain)[0] || product.images[0] || null;

    return (
        <div className={css.product}>
            <div className="row align-items-center">
                <div className="col-12 col-md-2">
                    <div className={css.product__img}>
                        {image
                            ? <ServerImg src={image.url} />
                            : 'Без фото'
                        }

                    </div>
                </div>
                <div className="col-12 col-md-8">
                    <table className="table table-sm mb-0 border-white">
                        <tbody>
                            <tr>
                                <th scope='row'>Название:</th>
                                <td className='w-100'>{product.title}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Описание:</th>
                                <td className='w-100'>{product.shortDescription}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Цена:</th>
                                <td className='w-100'>
                                    <span className='me-1'>{product.price}</span> <span className='text-decoration-line-through'>{product.oldPrice}</span>
                                </td>
                            </tr>
                            <tr>
                                <th scope='row'>Рейтинг:</th>
                                <td className='w-100'>{product.rating}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-12 col-md-2">
                    <Link className='btn btn-primary' to={'/product/' + product.id}>Открыть</Link>
                </div>
            </div>
        </div>
    );
}
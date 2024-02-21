import React, { JSX } from 'react';
import cn from 'classnames';
import { IOrder } from '../types/types';
import { ServerImg } from '6_shared/ui/ServerImg/ServerImg';
import { Link } from 'react-router-dom';
import { OrderStatus } from './OrderStatus';

interface OrderProps {
    order: IOrder
}

export function Order({ order }: OrderProps): JSX.Element {

    return (
        <div className=''>
            <div className="d-flex justify-content-between">
                <div className='fs-5'><strong>Номер заказа:</strong> {order.id}</div>
                <OrderStatus status={order.status} />
            </div>
            <hr />
            <h5>Пользователь</h5>
            {order.user.isIdentified
                ? <table className="table table-sm mb-0 border-white">
                    <tbody>
                        <tr>
                            <th scope='row'>Имя</th>
                            <td className='w-75'>{order.user.firstName} {order.user.lastName}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Э-Почта</th>
                            <td className='w-75'>{order.user.email}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Телефон</th>
                            <td className='w-75'>
                                {order.user.phone}
                            </td>
                        </tr>
                    </tbody>
                </table>
                : <div className='text-danger'>Пользователь не идентифицирован</div>
            }
            <hr />
            <h5>Получаетль</h5>
            <table className="table table-sm mb-0 border-white">
                <tbody>
                    <tr>
                        <th scope='row'>Имя</th>
                        <td className='w-75'>{order.recipient.firstName} {order.recipient.lastName}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Э-Почта</th>
                        <td className='w-75'>{order.recipient.email}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Телефон</th>
                        <td className='w-75'>
                            {order.recipient.phone}
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <h5>Данные заказа</h5>
            <table className="table table-sm mb-0 border-white">
                <tbody>
                    <tr>
                        <th scope='row'>Дата создания</th>
                        <td className='w-75'>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Способ доставки</th>
                        <td className='w-75'>{order.delivery}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Адрес доставки</th>
                        <td className='w-75'>{order.deliveryFullAddress}</td>
                    </tr>
                    <tr>
                        <th scope='row'>Метод оплаты</th>
                        <td className='w-75'>{order.paymentMethod}</td>
                    </tr>
                </tbody>
            </table>
            <hr />
            <h5>Товары</h5>
            <table className="table mb-0">
                <tbody>
                    {order.products.map(orderProduct => {
                        type Image = typeof orderProduct.product.images[0];
                        const image: Image | null = orderProduct.product.images.filter(img => img.isMain)[0] || orderProduct.product.images[0] || null;

                        return (
                            <tr key={orderProduct.id}>
                                <td className=''>
                                    <div className="row">
                                        <div className="col-2">
                                            {image
                                                ? <ServerImg
                                                    src={image.url}
                                                    style={{
                                                        width: '4rem',
                                                        height: '4rem',
                                                        objectFit: 'cover'
                                                    }}
                                                />
                                                : 'Без фото'
                                            }
                                        </div>
                                        <div className="col-4">
                                            <Link className='fw-bold fs-5' to={'/product/' + orderProduct.product.id}>
                                                {orderProduct.product.title}
                                            </Link>
                                        </div>
                                        <div className="col-2 text-center">
                                            <div className=''>Цена</div>
                                            <div className='fs-6 fw-bold'>{orderProduct.product.price} ₴</div>
                                        </div>
                                        <div className="col-2 text-center">
                                            <div className=''>Количество</div>
                                            <div className='fs-6 fw-bold'>{orderProduct.count}</div>
                                        </div>
                                        <div className="col-2 text-end">
                                            <div className=''>Сумма</div>
                                            <div className='fs-6 fw-bold'>{orderProduct.count * orderProduct.product.price} ₴</div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td className='fs-5 d-flex justify-content-between'>И того: <strong>{order.totalPrice} ₴</strong></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
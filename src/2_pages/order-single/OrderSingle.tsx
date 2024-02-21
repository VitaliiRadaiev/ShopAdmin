import React, { JSX } from 'react';
import cn from 'classnames';
import { Header } from '3_widgets/header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Order, useDeleteOrderMutation, useGetOrderQuery } from '5_entities/orders';
import { number } from 'yup';
import { OrderStatus } from '5_entities/orders/ui/OrderStatus';
import { ChangeOrderStatus } from '4_features/change-order-status';
import { ServerImg } from '6_shared/ui/ServerImg/ServerImg';
import { PopOver } from '6_shared/ui/PopOver/PopOver';

interface OrderSingleProps {

}

export function OrderSingle({ }: OrderSingleProps): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const { data: order } = useGetOrderQuery({ id: Number(id) });
    const navigation = useNavigate();
    const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

    const deleteHandler = async () => {
        if (order?.id) {
            await deleteOrder({ id: order.id });
            navigation('/orders', { replace: true });
        }
    }


    return (
        <div className='min-vh-100'>
            <Header />

            <div className="container py-4">
                <button className='btn btn-primary mb-3'
                    onClick={() => navigation(-1)}
                >Назад</button>
                {order &&
                    <>
                        <div className="">
                            <div className="row">
                                <div className="col-12 col-lg-8">
                                    <div className='fs-5 text-nowrap'><strong>Номер заказа:</strong> {order.id}</div>
                                </div>
                                <div className="col-12 col-lg-4 d-flex justify-content-lg-end">
                                    <ChangeOrderStatus id={order.id} status={order.status} />
                                </div>
                            </div>
                        </div>
                        <hr />
                        <h5>Пользователь</h5>
                        <div className="alert alert-primary">
                            {order.user.isIdentified
                                ? <table className="table mb-0 border-white">
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
                        </div>
                        <hr />
                        <h5>Получаетль</h5>
                        <div className="alert alert-primary">
                            <table className="table mb-0 border-white">
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
                        </div>
                        <hr />
                        <h5>Данные заказа</h5>
                        <div className="alert alert-primary">
                            <table className="table mb-0 border-white">
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
                        </div>
                        <hr />
                        <h5>Товары</h5>
                        <div className="alert alert-primary">
                            <table className="table mb-0">
                                <tbody>
                                    {order.products.map(orderProduct => {
                                        type Image = typeof orderProduct.product.images[0];
                                        const image: Image | null = orderProduct.product.images.filter(img => img.isMain)[0] || orderProduct.product.images[0] || null;

                                        return (
                                            <tr key={orderProduct.id}>
                                                <td className=''>
                                                    <div className="alert alert-light mb-0">
                                                        <div className="row align-items-center">
                                                            <div className="col-12 col-md-2">
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
                                                            <div className="col-12 col-md-4">
                                                                <Link className='fw-bold fs-5' to={'/product/' + orderProduct.product.id}>
                                                                    {orderProduct.product.title}
                                                                </Link>
                                                            </div>
                                                            <div className="col-4 col-md-2 text-md-center">
                                                                <div className=''>Цена</div>
                                                                <div className='fs-6 fw-bold'>{orderProduct.product.price} ₴</div>
                                                            </div>
                                                            <div className="col-4 col-md-2 text-md-center">
                                                                <div className=''>Количество</div>
                                                                <div className='fs-6 fw-bold'>{orderProduct.count}</div>
                                                            </div>
                                                            <div className="col-4 col-md-2 text-md-end">
                                                                <div className=''>Сумма</div>
                                                                <div className='fs-6 fw-bold'>{orderProduct.count * orderProduct.product.price} ₴</div>
                                                            </div>
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
                        <div className="mt-2">
                            <PopOver
                                mode='inline'
                                title={<h4>Удаление заказа</h4>}
                                content={
                                    <>
                                        <p>Вы уверены что хотите удалить заказ?</p>
                                        <button
                                            disabled={isDeleting}
                                            className='btn btn-danger w-100'
                                            onClick={deleteHandler}
                                        >
                                            {isDeleting
                                                ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                : 'Удалить заказ'
                                            }
                                        </button>
                                    </>
                                }
                            >
                                <button className='btn btn-danger'>Удалить заказ</button>
                            </PopOver>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
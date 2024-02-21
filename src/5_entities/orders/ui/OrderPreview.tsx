import React, { JSX } from 'react';
import cn from 'classnames';
import { IOrder } from '../types/types';
import { OrderStatus } from './OrderStatus';
import { Link } from 'react-router-dom';

interface OrderPreviewProps {
    order: IOrder;
}

export function OrderPreview({ order }: OrderPreviewProps): JSX.Element {
    return (
        <div className='row gy-2'>
            <div className="col-12 col-lg-3">
                <OrderStatus status={order.status} />
            </div>
            <div className="col-12 col-md-6 col-lg-4">
                <div><strong>Номер заказа:</strong> {order.id}</div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
                <div><strong>Дата:</strong> {new Date(order.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="col-12 col-lg-2">
                <Link className='btn btn-primary' to={'/order/' + order.id}>Открыть</Link>
            </div>
        </div>
    );
}
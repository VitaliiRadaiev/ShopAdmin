import React, { JSX } from 'react';
import cn from 'classnames';
import { OrderStatuses } from '../types/types';

interface OrderStatusProps {
    status: OrderStatuses;
}

export function OrderStatus({ status }: OrderStatusProps): JSX.Element {

    const content =
        status === 'processed'
            ? <span className='text-secondary'>В обработке <i className='bi bi-stopwatch-fill'></i></span> :
            status === 'delivering'
                ? <span className='text-primary'>В дороге <i className='bi bi-rocket-takeoff-fill'></i></span> :
                status === 'done'
                    ? <span className='text-success'>Выполнен <i className='bi bi-check-circle-fill'></i></span>
                    : <span className='text-danger'>Отменен <i className='bi bi-x-circle-fill'></i></span>

    return (<div>Статус: {content}</div>);
}
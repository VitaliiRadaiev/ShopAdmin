import React, { JSX, useState } from 'react';
import cn from 'classnames';
import { OrderStatuses, useUpdateOrderMutation } from '5_entities/orders';
import { OrderStatus } from '5_entities/orders/ui/OrderStatus';

interface ChangeOrderStatusProps {
    id: number;
    status: OrderStatuses;
}

export function ChangeOrderStatus({ id, status }: ChangeOrderStatusProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const [statusValue, setStatusValue] = useState(status);
    const [updateStatus, { isLoading: isUpdating }] = useUpdateOrderMutation();

    const updateHandler = async () => {
        await updateStatus({ id, status: statusValue });
        setIsMode(false);
    }

    return (
        <>
            {isMode
                ? <div className="input-group input-group-sm">
                    <select
                        value={statusValue}
                        className="form-select form-select-sm"
                        onChange={(e) => setStatusValue(e.target.value as OrderStatuses)}
                    >
                        <option value="processed">В обработке</option>
                        <option value="delivering">В дороге</option>
                        <option value="done">Выполнен</option>
                        <option value="Выполнен">Отменен</option>
                    </select>
                    <button onClick={updateHandler} className={"btn btn-sm btn-outline-primary"} type="button">
                        {isUpdating
                            ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            : <i className='bi bi-check-lg'></i>
                        }
                    </button>
                    <button onClick={() => setIsMode(false)} className={"btn btn-sm btn-outline-secondary"} type="button">
                        <i className='bi bi-x'></i>
                    </button>
                </div>
                : <div className='d-flex gap-3 align-items-center'>
                    <OrderStatus status={status} />
                    <button className='btn btn-sm p-1 bg-light' onClick={(e) => {
                        e.preventDefault();
                        setIsMode(true);
                    }}>
                        <i className='bi bi-pencil'></i>
                    </button>
                </div>
            }
        </>
    );
}
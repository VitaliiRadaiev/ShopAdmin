import React, { JSX, useState } from 'react';
import cn from 'classnames';
import { Header } from '3_widgets/header';
import { IGetOrdersBody, OrderPreview, useGetOrdersQuery } from '5_entities/orders';
import { Order } from '5_entities/orders/ui/Order';
import { log } from 'console';
import { FilterContainer } from '6_shared/ui/FilterContainer/FilterContainer';
import { List } from '6_shared/ui/List/List';
import { Pagination } from '4_features/pagination';
import { DefaultOrdersFilter } from '4_features/default-orders-filter';


export function OrdersPage(): JSX.Element {
    const [ordersQueries, setOrdersQueries] = useState<IGetOrdersBody>({
        count: 30,
        page: 1
    })
    const { data: orders } = useGetOrdersQuery(ordersQueries);

    return (
        <div className='min-vh-100'>
            <Header />
            <div className="container py-4">
                <h2>Заказы</h2>
                <div className="row">
                    <div className="col-12 col-lg-3">
                        <FilterContainer>
                            <DefaultOrdersFilter status={ordersQueries.status} setOrdersQueries={setOrdersQueries}/>
                        </FilterContainer>
                    </div>
                    <div className="col-12 col-lg-9">
                        {orders && !!orders.items.length &&
                            <>
                                <div className='mt-2 mt-lg-0'>
                                    <List items={orders.items} renderItem={(item) => <OrderPreview order={item}/>} />
                                </div>
                                <div className="mt-2">
                                    <Pagination
                                        productsCount={orders.count}
                                        count={ordersQueries.count}
                                        page={ordersQueries.page}
                                        onClick={(newPage: number) => { 
                                            setOrdersQueries(queries => ({ ...queries, page: newPage }));
                                        }}
                                    />
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
import React, { JSX } from 'react';
import cn from 'classnames';

interface ListProps<T> {
    items: T[],
    renderItem: (item: T) => JSX.Element
}

export function List<T extends { id: string | number }>({ items, renderItem }: ListProps<T>): JSX.Element {
    return (
        <div className='list-group'>
            {items.map(item => 
                <div key={item.id} className='list-group-item'>
                    {renderItem(item)}
                </div>
            )}
        </div>
    );
}
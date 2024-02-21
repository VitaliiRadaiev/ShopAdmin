import React, { JSX, Dispatch, SetStateAction, useState } from 'react';
import cn from 'classnames';
import { IGetProductsBody } from '5_entities/productCards';

interface PaginationProps {
    productsCount: number;
    count: number;
    page: number;
    onClick: (newPage: number) => void;
}

export function Pagination({ productsCount, count, page, onClick }: PaginationProps): JSX.Element {
    const countOfPages = Array.from({ length: Math.ceil(productsCount / count) }, (_, index) => index + 1);
    const isFirstPage = page === 1;
    const isLastPage = page === countOfPages.length;

    return (
        <ul className="pagination">
            {!isFirstPage &&
                <li className="page-item">
                    <button
                        className="page-link"
                        aria-label="Previous"
                        onClick={() => onClick(page - 1)}
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
            }
            {countOfPages.map(pageNumber =>
                <li key={pageNumber} className={cn("page-item", { ['active']: pageNumber === page })}>
                    <button
                        className="page-link"
                        onClick={() => onClick(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                </li>
            )}
            {!isLastPage &&
                <li className="page-item">
                    <button 
                    className="page-link d-flex align-items-center" 
                    aria-label="Next"
                    onClick={() => onClick(page + 1)}
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            }
        </ul>
    );
}
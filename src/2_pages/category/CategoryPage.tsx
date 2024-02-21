import React, { ChangeEvent, FormEvent, JSX, ReactNode, useState } from 'react';
import cn from 'classnames';
import { Header } from '3_widgets/header';
import { useParams } from 'react-router-dom';
import { useGetCategoryQuery } from '5_entities/categories';
import { IGetProductsBody, PreviewProductCard, useGetProductsQuery } from '5_entities/productCards';
import { DefaultProductFilters } from '4_features/default-product-filters';
import { CreateFilterBlock, ProductFilterBlock } from '4_features/products-filter';
import { List } from '6_shared/ui/List/List';
import { Pagination } from '4_features/pagination';
import { CreateProduct } from '4_features/create-product';
import { ProductsSort } from '4_features/products-sort';
import { PriceRange } from '4_features/price-range/ui/PriceRange';
import { ProductsSearch } from '4_features/products-search';
import { FilterContainer } from '6_shared/ui/FilterContainer/FilterContainer';


interface CategoryPageProps {

}

export function CategoryPage({ }: CategoryPageProps): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const { data: category } = useGetCategoryQuery(id as string);
    const [
        productCardsQueries,
        setProductCardsQueries
    ] = useState<IGetProductsBody>({
        categoryId: id,
        filters: [],
        count: 30,
        page: 1,
        sortBy: 'recently-created'
    });
    const { data: products, isLoading } = useGetProductsQuery(productCardsQueries);

    return (
        <div className='min-vh-100'>
            <Header />

            <div className="container py-4">
                <h2>Категория: {category?.title}</h2>
                <div className="row">
                    <div className="col-12 col-lg-3">
                        <FilterContainer>
                            {products &&
                                <PriceRange min={products.lowestPrice} max={products.highestPrice} setProductCardsQueries={setProductCardsQueries}/>
                            }
                            <hr />
                            <DefaultProductFilters setProductCardsQueries={setProductCardsQueries} />

                            {category && category.filters.map(filter =>
                                <ProductFilterBlock key={filter.id} filterBlock={filter} setProductCardsQueries={setProductCardsQueries} />
                            )}

                            <hr />
                            <CreateFilterBlock categoryId={id as string} />

                        </FilterContainer>

                    </div>
                    <div className="col-12 col-lg-9">
                        {category &&
                            <div className='mt-2 mt-lg-0'>
                                <CreateProduct categoryId={category.id} />
                            </div>

                        }
                        {products && !!products.items.length &&
                            <>
                                <div className="mt-2">
                                    <ProductsSearch setProductCardsQueries={setProductCardsQueries}/>
                                </div>
                                {productCardsQueries.sortBy &&
                                    <div className="mt-2">
                                        <ProductsSort sortBy={productCardsQueries.sortBy} setProductCardsQueries={setProductCardsQueries} />
                                    </div>
                                }
                                <div className='mt-2'>
                                    <List items={products.items} renderItem={(item) => <PreviewProductCard product={item} />} />
                                </div>
                                <div className="mt-2">
                                    <Pagination
                                        productsCount={products.count}
                                        count={productCardsQueries.count}
                                        page={productCardsQueries.page}
                                        onClick={(newPage: number) => { 
                                            setProductCardsQueries(queries => ({ ...queries, page: newPage }));
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
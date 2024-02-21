import React, { JSX, useEffect } from 'react';
import cn from 'classnames';
import { Header } from '3_widgets/header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeleteProductMutation, useGetProductQuery } from '5_entities/productCards';
import { useGetCategoryQuery } from '5_entities/categories';
import {
    ProductCardComments,
    ProductCardFeatures,
    ProductCardFiltersMapping,
    ProductCardImages,
    ProductCardMain
} from '4_features/product-card';
import { PopOver } from '6_shared/ui/PopOver/PopOver';

interface ProductSinglePageProps {

}

export function ProductSinglePage({ }: ProductSinglePageProps): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const { data: product,  } = useGetProductQuery({ id: id as string });
    const { data: category } = useGetCategoryQuery(String(product?.categoryId));
    const [deleteProductCard, { isLoading: isDeleting }] = useDeleteProductMutation();
    const navigation = useNavigate();

    const deleteHandler = async () => {
        if (id) {
            await deleteProductCard({ productId: id });
            navigation('/category/' + category?.id, { replace: true });
        }
    }

    return (
        <div className='min-vh-100'>
            <Header />

            <div className="container py-4">
            <button className='btn btn-primary mb-3'
                    onClick={() => navigation(-1)}
                >Назад</button>
                {!product
                    ? <div>
                        <span className='me-2 fs-4'>Продукт не найдет</span>
                        <Link to="/categories" className='btn btn-primary'>Перейти на страницу категорий</Link>
                    </div>
                    : <h2>Категория: {category?.title}</h2>
                }
                {product &&
                    <>
                        <ProductCardMain product={product} />
                        <hr />
                        <ProductCardFeatures product={product} />
                        <hr />
                        <ProductCardImages product={product} />
                        <hr />
                        {category &&
                            <ProductCardFiltersMapping category={category} product={product} />
                        }
                        <hr />
                        <ProductCardComments product={product} />
                        <div className="mt-2">
                            <PopOver
                                mode='inline'
                                title={<h4>Удаление продукта</h4>}
                                content={
                                    <>
                                        <p>Вы уверены что хотите удалить карточку продукта?</p>
                                        <button
                                            disabled={isDeleting}
                                            className='btn btn-danger w-100'
                                            onClick={deleteHandler}
                                        >
                                            {isDeleting
                                                ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                : 'Удалить карточку'
                                            }
                                        </button>
                                    </>
                                }
                            >
                                <button className='btn btn-danger'>Удалить карточку продукта</button>
                            </PopOver>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}
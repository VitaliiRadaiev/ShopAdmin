import React, { JSX } from 'react';
import css from './CreateProduct.module.scss';
import cn from 'classnames';
import { useCreateProductMutation } from '5_entities/productCards';
import { useNavigate } from 'react-router-dom';

interface CreateProductProps {
    categoryId: string
}

export function CreateProduct({ categoryId }: CreateProductProps): JSX.Element {
    const [createProduct, { isLoading }] = useCreateProductMutation();
    const navigate = useNavigate();

    const createProductHandler = async () => {
        try {
            const product = await createProduct({ categoryId }).unwrap();
            navigate('/product/'+product.id);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button
        disabled={isLoading}
            className='btn btn-primary w-100'
            onClick={createProductHandler}
        >
            {isLoading
                ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                : 'Создать новый продукт'
            }
        </button>
    );
}
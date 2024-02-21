import React, { JSX } from 'react';
//import css from './HomePage.module.scss';
import cn from 'classnames';
import { Header } from '3_widgets/header';
import { useGetCategoriesQuery } from '5_entities/categories';
import { CategoryCard } from '4_features/category-card';
import { CreateCategory } from '4_features/create-category';

export function CategoriesPage(): JSX.Element {
    const { data: categories } = useGetCategoriesQuery(null);

    return (
        <div className='min-vh-100'>
            <Header />
            <div className="container py-5">
                <div className="row g-3">
                    {categories && categories.map(category =>
                        <div key={category.id} className="col-12 col-md-4">
                            <CategoryCard category={category} />
                        </div>
                    )}
                </div>
                <div className="row mt-3">
                    <div className="col-12 col-md-4">
                        <CreateCategory />
                    </div>
                </div>
            </div>
        </div>
    );
}
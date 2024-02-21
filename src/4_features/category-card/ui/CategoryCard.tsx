import React, { JSX, useState } from 'react';
import css from './CategoryCard.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { ICategory, useDeleteCategoryMutation, useUpdateCategoryMutation } from '5_entities/categories';
import { PopOver } from '6_shared/ui/PopOver/PopOver';

interface CategoryCardProps {
    category: ICategory;
}

export function CategoryCard({ category }: CategoryCardProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const [inputValue, setInputValue] = useState(category.title);
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const updateHandler = () => {
        setIsMode(false);
        updateCategory({ id: category.id, title: inputValue });
    }

    const deleteHandler = () => {
        deleteCategory({ id: category.id });
    }

    return (
        <div className={css.category}>
            <Link to={'/category/' + category.id}
                className="d-flex fs-4 py-5 p-4 justify-content-center lign-items-center font-bold text-decoration-none text-dark bg-white border rounded-3"
            >
                <div className={css.category__options}>
                    <button className={css.option_item} onClick={(e) => {
                        e.preventDefault();
                        setIsMode(true);
                    }}>
                        <i className='bi bi-pencil'></i>
                    </button>
                    <PopOver
                        mode='inline'
                        title={<h4>Удаление категории</h4>}
                        content={
                            <>
                                <p>Вы уверены что хотите удалить категорию?</p>
                                <button
                                    className='btn btn-danger w-100'
                                    onClick={deleteHandler}
                                >Удалить категорию</button>
                            </>
                        }
                    >
                        <button className={css.option_item} onClick={(e) => e.preventDefault()}>
                            <i className='bi bi-trash'></i>
                        </button>
                    </PopOver>

                </div>
                {isMode
                    ? <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        className='form-control text-center'
                        autoFocus
                        onBlur={updateHandler}
                        onClick={(e) => e.preventDefault()}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') updateHandler();
                        }}
                    />
                    : category.title
                }

            </Link>
        </div>
    );
}
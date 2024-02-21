import React, { JSX, useState } from 'react';
import css from './CreateCategory.module.scss';
import cn from 'classnames';
import { useCreateCategoryMutation } from '5_entities/categories';

interface CreateCategoryProps {

}

export function CreateCategory({ }: CreateCategoryProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const [createCategory] = useCreateCategoryMutation();
    const [inputValue, setInputValue] = useState('');

    const createCategoryHandler = () => {
        createCategory({ title: inputValue })
        setIsMode(false);
        setInputValue('');
    }

    return (
        <>
            {isMode
                ? <div className="input-group">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        className='form-control'
                        placeholder='Имя категории'
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                createCategoryHandler();
                            }
                        }}
                    />
                    <button onClick={createCategoryHandler} className="btn btn-outline-primary" type="button" id="button-addon2">Создать</button>
                    <button onClick={() => setIsMode(false)} className="btn btn-outline-secondary" type="button" id="button-addon2">
                        <i className='bi bi-x'></i>
                    </button>
                </div>
                : <button onClick={() => setIsMode(true)} className='btn btn-primary'>Создать Категорию</button>
            }
        </>
    );
}
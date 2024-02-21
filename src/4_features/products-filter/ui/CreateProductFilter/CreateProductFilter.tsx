import React, { JSX, useState } from 'react';
import cn from 'classnames';
import { useCreateFilterBlockMutation, useCreateFilterItemMutation } from '5_entities/filter';

interface CreateProductFilterBlockProps {
    categoryId: string;
}

export function CreateFilterBlock({ categoryId }: CreateProductFilterBlockProps): JSX.Element {
    const [createFilterBlock] = useCreateFilterBlockMutation();
    const create = ({ title }: { title: string }) => {
        return createFilterBlock({ categoryId, title });
    }
    return (
        <CreateFilter buttonText='Создать Фильтр Блок' create={create} />
    );
}

interface CreateProductFilterItemProps {
    filterBlockId: string;
}

export function CreateFilterItem({ filterBlockId }: CreateProductFilterItemProps): JSX.Element {
    const [createFilterItem] = useCreateFilterItemMutation();
    const create = ({ title }: { title: string }) => {
        return createFilterItem({ filterBlockId, title });
    }
    return (
        <CreateFilter buttonText='Создать Фильтр' create={create} isSmall={true} />
    );
}

interface CreateFilterProps {
    buttonText: string;
    create: ({ title }: { title: string }) => Promise<any>;
    isSmall?: boolean;
}

function CreateFilter({ buttonText, create, isSmall }: CreateFilterProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const createHandler = async () => {
        setIsCreating(true);
        await create({ title: inputValue });
        setIsCreating(false);
        setIsMode(false);
        setInputValue('');
    }

    return (
        <>
            {isMode
                ? <div className={cn("input-group", { ['input-group-sm']: isSmall })}>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                        className='form-control'
                        placeholder='Имя фильтра'
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                createHandler();
                            }
                        }}
                    />
                    <button onClick={createHandler} className={cn("btn btn-outline-primary", { ['btn-sm']: isSmall })} type="button" id="button-addon2">
                        {isCreating
                            ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            : <i className='bi bi-check-lg'></i>
                        }
                    </button>
                    <button onClick={() => setIsMode(false)} className={cn("btn btn-outline-secondary", { ['btn-sm']: isSmall })} type="button" id="button-addon2">
                        <i className='bi bi-x'></i>
                    </button>
                </div>
                : <button onClick={() => setIsMode(true)} className={cn('btn btn-primary w-100', { ['btn-sm']: isSmall })}>{buttonText}</button>
            }
        </>
    );
}
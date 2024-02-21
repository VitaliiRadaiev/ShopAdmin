import React, { JSX, useState } from 'react';
import cn from 'classnames';
import { IProductCard } from '5_entities/productCards';
import { useCreateSubcommentMutation, useDeleteSubcommentMutation, useDeleteUsersCommentMutation, useUpdateSubcommentMutation } from '5_entities/comments';
import { PopOver } from '6_shared/ui/PopOver/PopOver';

interface ProductCardCommentsProps {
    product: IProductCard;
}

export function ProductCardComments({ product }: ProductCardCommentsProps): JSX.Element {

    return (
        <>
            <h4>Комментарии</h4>
            <div className="alert alert-primary">
                <ul className="list-group gap-3">
                    {product.comments.map(comment => {
                        return (
                            <li key={comment.id} className="list-group-item ">
                                <Comment comment={comment} />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

interface CommentProps {
    comment: IProductCard['comments'][0]
}

function Comment({ comment }: CommentProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [createSubcomment, { isLoading: isCreating }] = useCreateSubcommentMutation();
    const [deleteComment, { isLoading: isDeleting }] = useDeleteUsersCommentMutation();

    const createSubcommentHandler = async () => {
        await createSubcomment({ commentId: comment.id, text: textValue });
        setIsMode(false);
        setTextValue('');
    }

    const deleteCommentHandler = async () => {
        deleteComment({ id: comment.id })
    }

    return (
        <>
            <h6>{comment.author.firstName} <small className='text-black-50'>{new Date(comment.createdAt).toLocaleString()}</small></h6>
            <div className="text-content mb-2">{comment.text}</div>
            <div className="d-flex align-items-center gap-4 mb-2">
                <div>
                    {Array.from({ length: 5 }, (_, index) => {
                        if (index < comment.stars) {
                            return <i key={index} className='bi bi-star-fill me-1'></i>
                        }
                        return <i key={index} className='bi bi-star me-1'></i>
                    })}
                </div>
                <div>
                    <span className='me-2'>
                        <i className='bi bi-hand-thumbs-up'></i> {comment.likes.items.length}
                    </span>
                    <span className='me-2'>
                        <i className='bi bi-hand-thumbs-down'></i> {comment.dislikes.items.length}
                    </span>
                </div>
            </div>
            {!!comment.subcomments.length
                ? <>
                    <hr />
                    <Subcomment subcomment={comment.subcomments[0]} />
                    <hr />
                    <PopOver
                        mode='inline'
                        title={<h4>Удаление комментария</h4>}
                        content={
                            <>
                                <p>Вы уверены что хотите удалить комментарий?</p>
                                <button
                                    disabled={isDeleting}
                                    className='btn btn-danger w-100'
                                    onClick={deleteCommentHandler}
                                >
                                    {isDeleting
                                        ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                        : 'Удалить'
                                    }
                                </button>
                            </>
                        }
                    >
                        <button className='btn btn-danger' onClick={(e) => e.preventDefault()}>
                            Удалить все
                        </button>
                    </PopOver>
                </>
                : <>
                    {isMode
                        ? <>
                            <textarea
                                className='form-control mb-2'
                                autoFocus
                                placeholder='Ответ на коментарий'
                                value={textValue}
                                onChange={(e) => setTextValue(e.target.value)}
                            ></textarea>
                            <div className="d-flex gap-3">
                                <button onClick={createSubcommentHandler} className='btn btn-primary'>Ответить</button>
                                <button onClick={() => setIsMode(false)} className='btn btn-secondary'>Закрыть</button>
                            </div>
                        </>
                        : <div className="d-flex gap-3">
                            <button onClick={() => setIsMode(true)} className='btn btn-primary'>Ответить</button>
                            <PopOver
                                mode='inline'
                                title={<h4>Удаление комментария</h4>}
                                content={
                                    <>
                                        <p>Вы уверены что хотите удалить комментарий?</p>
                                        <button
                                            disabled={isDeleting}
                                            className='btn btn-danger w-100'
                                            onClick={deleteCommentHandler}
                                        >
                                            {isDeleting
                                                ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                                : 'Удалить'
                                            }
                                        </button>
                                    </>
                                }
                            >
                                <button className='btn btn-danger' onClick={(e) => e.preventDefault()}>
                                    Удалить
                                </button>
                            </PopOver>
                        </div>
                    }
                </>
            }
        </>
    );
}

interface SubcommentProps {
    subcomment: IProductCard['comments'][0]['subcomments'][0]
}
function Subcomment({ subcomment }: SubcommentProps): JSX.Element {
    const [isMode, setIsMode] = useState(false);
    const [textValue, setTextValue] = useState(subcomment.text);
    const [updateSubcomment, { isLoading: isUpdating }] = useUpdateSubcommentMutation();
    const [deleteSubcomment, { isLoading: isDeleting }] = useDeleteSubcommentMutation();

    const updateSubcommentHandler = async () => {
        await updateSubcomment({ id: subcomment.id, text: textValue });
        setIsMode(false);
    }

    const deleteSubcommentHandler = async () => {
        await deleteSubcomment({ id: subcomment.id });
        setTextValue('');
    }

    return (
        <div className="ps-3">
            <h6>Администрация</h6>
            {isMode
                ? <>
                    <textarea
                        className='form-control mb-2'
                        autoFocus
                        placeholder='Ответ на коментарий'
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                    ></textarea>
                    <div className="d-flex gap-3">
                        <button
                            disabled={isUpdating}
                            onClick={updateSubcommentHandler}
                            className='btn btn-primary'
                        >
                            {isUpdating && <span className="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>}
                            Сохранить
                        </button>
                        <button onClick={() => setIsMode(false)} className='btn btn-secondary'>Отмена</button>
                    </div>
                </>
                : <>
                    <div className='mb-2'>
                        {subcomment.text}
                    </div>
                    <div className="d-flex gap-3">
                        <button onClick={() => setIsMode(true)} className='btn btn-primary'>Редактировать</button>
                        <PopOver
                            mode='inline'
                            title={<h4>Удаление ответа</h4>}
                            content={
                                <>
                                    <p>Вы уверены что хотите удалить ответ на комментарий?</p>
                                    <button
                                        disabled={isDeleting}
                                        className='btn btn-danger w-100'
                                        onClick={deleteSubcommentHandler}
                                    >
                                        {isDeleting
                                            ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                            : 'Удалить'
                                        }
                                    </button>
                                </>
                            }
                        >
                            <button className='btn btn-danger' onClick={(e) => e.preventDefault()}>
                                Удалить
                            </button>
                        </PopOver>
                    </div>
                </>
            }

        </div>
    );
}
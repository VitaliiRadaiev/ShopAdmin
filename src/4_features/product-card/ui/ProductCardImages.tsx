import React, { ChangeEvent, JSX, useState } from 'react';
import css from './ProductCardImages.module.scss';
import cn from 'classnames';
import { useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';
import ImageViewer from 'react-simple-image-viewer';

import { IProductCard, useDeletProductImageMutation, useSetProductImageAsMainMutation, useUploadProductImagesMutation } from '5_entities/productCards';
import { useAppDropzone } from '6_shared/ui/Dropzone/useDropzone';
import { ServerImg } from '6_shared/ui/ServerImg/ServerImg';
import { addDomainNameToPath } from '6_shared/utils/addDomainNameToPath';

interface ProductCardImagesProps {
    product: IProductCard;
}

interface FormData {
    images?: File[];
}

export function ProductCardImages({ product }: ProductCardImagesProps): JSX.Element {
    const [uploadImages, { isLoading }] = useUploadProductImagesMutation();
    const { DropzoneContainer, resetDropzone } = useAppDropzone();

    const { handleSubmit, formState: { errors, isDirty }, control, resetField } = useForm<FormData>({
        mode: 'onSubmit',
        defaultValues: {
            images: undefined
        },
    });

    const onSubmit = async (data: FormData) => {
        if (!data.images) return;

        try {
            await uploadImages({ productId: product.id, images: data.images }).unwrap();
            resetForm();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h4>Фотографии</h4>
            <div className="alert alert-primary">
                {!!product.images.length &&
                    <div className="row g-3 mb-3">
                        {product.images.map(img =>
                            <div key={img.id} className="col-6 col-md-3">
                                <Image image={img} />
                            </div>
                        )}
                    </div>
                }

                <form onSubmit={handleSubmit(onSubmit)}>
                    <DropzoneContainer control={control} name={'images'} multiple={true} />
                    <div className="mt-2">
                        <button
                            disabled={isLoading}
                            className='btn btn-primary'
                        >
                            {isLoading &&
                                <span className="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
                            }
                            Загрузить
                        </button>
                    </div>
                </form>
            </div>
        </>
    );

    function resetForm() {
        resetField('images');
        resetDropzone();
    }
}

interface ImageProps {
    image: IProductCard['images'][0];
}

function Image({ image }: ImageProps): JSX.Element {
    const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
    const [deleteImage, { isLoading }] = useDeletProductImageMutation();
    const [setImageAsMain] = useSetProductImageAsMainMutation();

    const onDeleteImageHandler = () => {
        deleteImage({ id: image.id });
    }

    const onSetImageAsMainHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked) {
            setImageAsMain({ id: image.id });
        }
    }

    return (
        <>
            <div className={css.image}>
                <div
                    className={css.image__container}
                    onClick={() => setIsViewerOpen(true)}
                >
                    <ServerImg src={image.url} />
                </div>
                <div className={css.image__btn}>
                    <button onClick={onDeleteImageHandler} className='btn btn-sm btn-primary'>
                        <i className='bi bi-trash'></i>
                    </button>
                </div>
                <div className={css.image__footer}>
                    <div className="form-check">
                        <input className="form-check-input" type="radio"
                            name={image.id}
                            id={image.id}
                            checked={image.isMain}
                            onChange={onSetImageAsMainHandler}
                        />
                            <label className="form-check-label" htmlFor={image.id}>
                                Основная
                            </label>
                    </div>

                </div>
            </div>
            {createPortal(
                <>
                    {isViewerOpen &&
                        <ImageViewer
                            src={[addDomainNameToPath(image.url)]}
                            backgroundStyle={{ zIndex: 10 }}
                            onClose={() => setIsViewerOpen(false)}
                        />
                    }
                </>,
                document.body
            )}
        </>
    );
}
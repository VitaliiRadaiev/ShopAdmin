import React, { useState } from 'react';
import css from './Dropzone.module.scss';
import cn from 'classnames';
import { useDropzone } from 'react-dropzone'
import { Control, useController, Path } from 'react-hook-form';
import { ReactComponent as SvgIconCLose } from './close.svg';


interface DropzoneProps<T extends object> {
    control: Control<T>;
    name: Path<T>;
    multiple: boolean;
}

export interface Thumb extends File {
    preview: string;
}

export function Dropzone<T extends object>({ control, name, multiple }: DropzoneProps<T>): JSX.Element {
    const controller = useController({ control, name });
    const [dropzoneStatus, setDropzoneStatus] = useState<'initial' | 'dragEnter'>('initial');
    const [files, setFiles] = useState<Thumb[]>([]);

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.png', '.jpeg', '.jpg']
        },
        multiple,
        onDrop: (acceptedFiles: File[]) => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
            controller.field.onChange(acceptedFiles);
            setDropzoneStatus('initial');
        },
        onDragEnter: () => {
            setDropzoneStatus('dragEnter');
        },
        onDragLeave: () => {
            setDropzoneStatus('initial');
        }
    });

    const removeFileHandler = (file: File) => {
        const filteredFiles = files.filter(f => f !== file);
        setFiles(filteredFiles);
        controller.field.onChange(filteredFiles);
    }

    return (
        <div className={cn(css.dropzone, { [css.dropzone_dragEnter]: dropzoneStatus === 'dragEnter' })}>
            <div {...getRootProps({ className: css.fileField })}>
                <input {...getInputProps()} />
                Drag \'n\' drop some photo here, or click to select photo
            </div>
            <div className={css.preview}>
                {files.map((file, i) =>
                    <div key={i} className={css.preview__item}>
                        <button
                            onClick={() => removeFileHandler(file)}
                            className={css.preview__remove}
                        >
                            <SvgIconCLose />
                        </button>
                        <img src={file.preview} alt="" />
                        {file.name}
                    </div>
                )}
            </div>
        </div>
    );
}
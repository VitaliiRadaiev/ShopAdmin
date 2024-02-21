import React, { FormEvent, JSX, useState } from 'react';
import cn from 'classnames';

import { useLoginMutation } from '5_entities/auth';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


const schema = yup.object().shape({
    name:
        yup.string()
            .min(6, "Name must have at least 6 characters")
            .required('Email is a required field'),
    password:
        yup.string()
            .min(8, "Password must have at least 8 characters")
            .required('Password is a required field'),
}).required();

interface LoginPageProps {

}

interface LoginFormData {
    name: string;
    password: string;
}

export function LoginPage({ }: LoginPageProps): JSX.Element {
    const [login, { isLoading }] = useLoginMutation();
    const [unauthorized, setUnauthorized] = useState<boolean>(false)

    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
        mode: 'onSubmit'
    });

    const onSubmitHandler = async (data: LoginFormData) => {
        try {
            const res = await login(data).unwrap();
        } catch (error) {
            setError('name', {});
            setError('password', {});
            setUnauthorized(true);
        }
    }

    return (
        <div className='container min-vh-100 p-3'>
            <form onSubmit={handleSubmit(onSubmitHandler)} className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Watch store login</h5>
                        {unauthorized &&
                            <h6 className='mt-1 text-danger'>Name or Password are wrong.</h6>
                        }
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className={cn("form-control", { ["is-invalid"]: !!errors.name })}
                                id="name"
                                placeholder="name@example.com"
                                {...register('name')}
                                defaultValue={'admins'}
                            />
                            {errors.name &&
                                <p className='mt-1 text-danger'>{errors.name.message}</p>
                            }
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className={cn("form-control", { ["is-invalid"]: !!errors.password })}
                                id="password"
                                placeholder="..."
                                {...register('password')}
                                defaultValue={'12345678'}
                            />
                            {errors.password &&
                                <p className='mt-1 text-danger'>{errors.password.message}</p>
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        {isLoading
                            ? <button disabled className="btn btn-primary">
                                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                Login
                            </button>
                            : <button  className="btn btn-primary">
                                Login
                            </button>
                        }
                    </div>
                </div>
            </form>
        </div>
    );
}
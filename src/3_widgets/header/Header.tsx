import React, { JSX } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';
import { log } from 'console';
import { useAppDispatch } from '6_shared/store/hooks';
import { setAuth } from '5_entities/auth';

interface HeaderProps {

}

export function Header({ }: HeaderProps): JSX.Element {
    const dispatch = useAppDispatch();

    const logOut = () => {
        localStorage.removeItem('X-JWTAdmin');
        dispatch(setAuth(false));
    }
    return (
        <header>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to={'/categories'} className='nav-link'>Категории</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/orders'} className='nav-link'>Заказы</NavLink>
                        </li>
                    </ul>
                    <button className='btn btn-primary' onClick={logOut}>Log Out</button>
                </div>
            </nav>
        </header>
    );
}
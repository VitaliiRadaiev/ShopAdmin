import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import { privateRoutes, publicRoutes } from './routes/routes';

import { useAppDispatch, useAppSelector } from '6_shared/store/hooks';
import { SpinerOverlay } from '6_shared/ui/Spiner/Spiner';
import { setAuth } from '5_entities/auth';

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const isAuth = useAppSelector(select => select.auth.isAuth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(localStorage.getItem('X-JWTAdmin')) {
            dispatch(setAuth(true));
        }
        setIsLoading(false);
    })

    if (isLoading) {
        return <SpinerOverlay size={1.5} />
    } else {
        return (
            <div className="App">
                <BrowserRouter>
                    {isAuth
                        ? <Routes>
                            {privateRoutes.map(route =>
                                <Route key={route.path} {...route} />
                            )}
                        </Routes>
                        : <Routes>
                            {publicRoutes.map(route =>
                                <Route key={route.path} {...route} />
                            )}
                        </Routes>
                    }
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
import React, { Suspense } from "react";
import { Navigate, RouteProps } from "react-router-dom";

import { 
    CategoriesPage, 
    LoginPage, 
    OrdersPage, 
    CategoryPage, 
    ProductSinglePage,
    OrderSingle 
} from "2_pages";
import { SpinerOverlay } from "6_shared/ui/Spiner/Spiner";

// const BoardsPage = React.lazy(() => import("2_pages").then((module) => ({ default: module.BoardsPage })));
// const BoardPage = React.lazy(() => import("2_pages").then((module) => ({ default: module.BoardPage })));


export const privateRoutes: RouteProps[] = [
    {
        path: '/categories',
        element: <CategoriesPage />
    },
    {
        path: '/orders',
        element: <OrdersPage />
    },
    {
        path: '/order/:id',
        element: <OrderSingle />
    },
    {
        path: '/category/:id',
        element: <CategoryPage />
    },
    {
        path: '/product/:id',
        element: <ProductSinglePage />
    },
    // {
    //     path: '/board/:id',
    //     element:
    //         <Suspense fallback={<SpinerOverlay size={1.5} />}>
    //             <BoardPage />
    //         </Suspense>
    // },
    { path: '*', element: <Navigate to="/categories" replace /> },
];

export const publicRoutes: RouteProps[] = [
    {
        path: '/login',
        element: <LoginPage />
    },
    // { path: '/register', element: <RegisterPage /> },
    { path: '*', element: <Navigate to="/login" replace /> },
];
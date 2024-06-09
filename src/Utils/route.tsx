import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Header from "../modules/components/Header";

const Home = lazy(() => import("../modules/pajes/Home"));
const Catalog = lazy(() => import("../modules/pajes/catalog"));
const About = lazy(() => import("../modules/pajes/about"));
const Cart = lazy(() => import("../modules/pajes/Cart"));
const ProductPage = lazy(() => import("../modules/pajes/ProductPage"));

export const baseRouter = createBrowserRouter([
    {
        path: "/",
        element: <Header />,
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Home />
                    </Suspense>
                ),
            },
            {
                path: "/catalog",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Catalog />
                    </Suspense>
                ),
            },
            {
                path: "/About",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: "/Cart",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <Cart />
                    </Suspense>
                ),
            },
            {
                path: "/catalog/:id",
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <ProductPage />
                    </Suspense>
                ),
            },
        ],
    },
]);

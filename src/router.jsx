import GuestLayout from "./layout/GuestLayout"
import DefaultLayout from "./layout/DefaultLayout"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import { createBrowserRouter, Navigate } from "react-router-dom"
import Transaction from "./pages/Transaction"
import Customer from "./pages/Customer"
import Product from "./pages/Product"
import Admin from "./pages/Admin"
import { TransactionDetail } from "./pages/TransactionDetail"
import { CustomerDetail } from "./pages/CustomerDetail"
import { ProductDetail } from "./pages/ProductDetail"
import { AdminDetail } from "./pages/AdminDetail"
import Register from "./pages/Register"
import LandingPageLayout from "./layout/LandingPageLayout"
import Home from "./pages/Home"
import Terms from "./pages/Terms"
import Services from "./pages/Services"


const routerConfig = [
    {
        path: '/',
        element: <LandingPageLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/terms',
                element: <Terms />
            },
            {
                path: '/services',
                element: <Services />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <DefaultLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to="transaction" />,
            },
            {
                path: 'transaction',
                element: <Transaction />,
            },
            {
                path: 'transaction/:id',
                element: <TransactionDetail />
            },
            {
                path: 'customer',
                element: <Customer />
            },
             {
                path: 'customer/:customerId',
                element: <CustomerDetail />
            },
            {
                path: 'product',
                element: <Product />
            },
            {
                path: 'product/:productId',
                element: <ProductDetail />
            },
            {
                path: 'user',
                element: <Admin />
            },
            {
                path: 'user/:id',
                element: <AdminDetail />
            },
        ]
    },
    {
        path: '/guest',
        element: <GuestLayout />,
        children: [
            {
                path: '/guest',
                element: <Navigate to="login" />,
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]

const router = createBrowserRouter(routerConfig)

export default router
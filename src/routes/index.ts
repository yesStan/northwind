import { createRouter, createWebHistory } from 'vue-router';
import { ROUTE_NAMES } from '../constants/route-names-constants';

import TheHome from '../components/common/the-home';
import TheDashboard from '../components/common/the-dashboard';
import TheSuppliers from '../components/common/the-suppliers';
import TheProducts from '../components/common/the-products';
import TheOrders from '../components/common/the-orders';
import TheEmployees from '../components/common/the-employees';
import TheCustomers from '../components/common/the-customers';
import TheSearch from '../components/common/the-search';
import TheSupplier from '../components/common/the-supplier';
import TheProduct from '../components/common/the-product';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            children: [
                {
                    path: '/home',
                    name: ROUTE_NAMES.HOME,
                    component: TheHome
                },
                {
                    path: '/dashboard',
                    name: ROUTE_NAMES.DASHBOARD,
                    component: TheDashboard
                },
                {
                    path: '/suppliers',
                    name: ROUTE_NAMES.SUPPLIERS,
                    component: TheSuppliers
                },
                // supplier id
                {
                    path: '/supplier/:id',
                    name: ROUTE_NAMES.SUPPLIER_PROFILE,
                    component: TheSupplier,
                },
                {
                    path: '/products',
                    name: ROUTE_NAMES.PRODUCTS,
                    component: TheProducts
                },
                // product id
                {
                    path: '/products/:id',
                    name: ROUTE_NAMES.PRODUCT_PROFILE,
                    component: TheProduct
                },
                {
                    path: '/supplier/:id',
                    name: ROUTE_NAMES.SUPPLIER_PROFILE,
                    component: TheSupplier,
                    props: true
                },
                {
                    path: '/orders',
                    name: ROUTE_NAMES.ORDERS,
                    component: TheOrders
                },
                {
                    path: '/employees',
                    name: ROUTE_NAMES.EMPLOYEES,
                    component: TheEmployees
                },
                {
                    path: '/customers',
                    name: ROUTE_NAMES.CUSTOMERS,
                    component: TheCustomers
                },
                {
                    path: '/search',
                    name: ROUTE_NAMES.SEARCH,
                    component: TheSearch
                }
            ]
        }
    ]
})

export default router;
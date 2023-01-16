import { createStore } from 'vuex';
import { getCustomersData, getOrdersData, getProductsData } from '../api/interfaces';

export const store = createStore({
    // modules: {
    // },
    state() {
        return {
            products: [],
            customers: [],
            orders: [],
            // filteredValues: {
            //     products: [],
            //     customers: []
            // },
        };
    },
    getters: {
        allProducts: state => state.products,
        allCustomers: state => state.customers,
        allOrders: state => state.orders,

    },
    actions: {
        async fetchProducts({commit}) {
            try {
                const response = await getProductsData();
                commit('setProducts', response.data)
            } catch (error) {
                console.log(error);
            }
        } ,
        async fetchCustomers({commit}) {
            try {
                const response = await getCustomersData();
                commit('setCustomers', response.data)
                
            } catch (error) {
                console.log(error);
            }
        } ,
        async fetchOrders({commit}) {
            try {
                const response = await getOrdersData();
                commit('setOrders', response.data)
                
            } catch (error) {
                console.log(error);
            }
        },

        // async filteredProducts({commit}) {
        //     try {
        //         const response = await getOrdersData();
        //         commit('filteredValues', )

                
        //     } catch (error) {
        //         console.log(error);
        //     }
        // } 
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload
        },
        setCustomers(state, payload) {
            state.customers = payload
        },
        setOrders(state, payload) {
            state.orders = payload
        }
    }
});
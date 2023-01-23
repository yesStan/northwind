import { createStore } from 'vuex';
import { getCustomersData, getOrdersData, getProductsData } from '../api/interfaces';

export const store = createStore({
    // modules: {
    // },
    state() {
        return {
            // products: [],
            // customers: [],
            // orders: [],
            queryInfo: [{
                queryExecutionTime: '',
                queryString: '',
                queryTS: ''
            }]
        };
    },
    getters: {
        allQueryInfo: state => state.queryInfo
        // allCustomers: state => state.customers,
        // allOrders: state => state.orders,

    },
    actions: {
        // async fetchProducts({commit}) {
        //     try {
        //         const response = await getProductsData();
        //         commit('setProducts', response.data)
        //     } catch (error) {
        //         console.log(error);
        //     }
        // } 
    },
    mutations: {
        addQueryInfo (state, queryInfo) {
            // mutate state
            state.queryInfo.push(queryInfo)
          }
        // setQueryInfo(state, payload) {
        //     state.queryInfo = payload
        // }
    }
});
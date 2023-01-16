import { createStore } from 'vuex';
import { getCustomersData, getProductsData } from '../api/interfaces';
// import { getAlbumsData, getClientsData } from '../api/album';



export const store = createStore({
    // modules: {
    // },
    state() {
        return {
            products: [],
            customers: [],
        };
    },
    getters: {
        allProducts: state => state.products,
        allCustomers: state => state.customers,

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
        } 
    },
    mutations: {
        setProducts(state, payload) {
            state.products = payload
        },
        setCustomers(state, payload) {
            state.customers = payload
        }
    }
});
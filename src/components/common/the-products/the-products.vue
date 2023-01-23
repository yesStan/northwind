<template>
    <div
        :at-the-products="atAttribute"
        class="the-products"
    >

        <div class="title">
            <p class="main__title">Products</p>
            <Vue3EasyDataTable
                :headers="headers"
                :items="items"
            alternating
            buttons-pagination

            >
                <template #item-indicator.productName="item">
                    <router-link :to="{ name: ROUTE_NAMES.PRODUCT_PROFILE, params: { id: item.categoryID } }">
                        {{ item.productName }}
                    </router-link>
                </template>
                <template #item-indicator.unitPrice="item">
                    $ {{ item.unitPrice }}
                </template>
            </Vue3EasyDataTable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { mapGetters } from 'vuex';
import { getProductsData, TProductsList } from '../../../api/interfaces';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';

import Vue3EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item } from "vue3-easy-data-table";

export default defineComponent({
    name: 'TheProducts',
    components: {
        Vue3EasyDataTable
    },
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            products: [],
            ROUTE_NAMES,
            headers: [
                { text: "Name", value: "indicator.productName",  },
                { text: "Qt per unit", value: 'quantityPerUnit', },
                { text: "Price", value: "indicator.unitPrice" },
                { text: "Stock", value: "unitsInStock" },
                { text: "Orders", value: "unitsOnOrder" },
            ],
            items: [] as TProductsList
        }
    },
    created() {
        this.getProducts()
    },
    methods: {
        async getProducts() {
            try {
                const response = await getProductsData();
                this.items = response.data

                const query  = response.queryInfo                
                this.$store.commit('addQueryInfo', query)
                
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>


<style lang="scss" src="./the-products.scss" />

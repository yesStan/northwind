<template>
    <div
        :at-the-orders="atAttribute"
        class="the-orders"
    >

    <div class="title">
            <p>Orders</p>
            <Vue3EasyDataTable
                :headers="headers"
                :items="items"
            alternating
            buttons-pagination

            >
                <template #item-indicator.OrderID="item">
                    <router-link :to="{ name: ROUTE_NAMES.ORDER_PROFILE, params: { id: item.OrderID } }">

                        {{ item.OrderID }}
                    </router-link>
                </template>
                <template #item-indicator.total_products_price="item">
                    ${{ item.total_products_price }}
                </template>
            </Vue3EasyDataTable>
        </div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { mapGetters } from 'vuex';
import { getOrdersData, TOrderList } from '../../../api/interfaces'
import { ROUTE_NAMES } from '../../../constants/route-names-constants';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item } from "vue3-easy-data-table";

export default defineComponent({
    name: 'TheOrders',
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
            orders: [],
            ROUTE_NAMES,
            headers: [
                { text: "Id", value: "indicator.OrderID" },
                { text: "Total Price", value: 'indicator.total_products_price' },
                { text: "Products", value: "total_products_quantity" },
                { text: "Quantity", value: "total_products_items" },
                { text: "Shipped", value: "ShippedDate" },
                { text: "Ship Name", value: "ShipName" },
                { text: "City", value: "ShipCity" },
                { text: "Country", value: "ShipCountry" },
            ],
            items: [] as TOrderList
        }
    },
    created() {
        this.fetchOrders()
    },
    computed: {
        // ...mapGetters(['allOrders']), 
    },
    methods: {
        async fetchOrders() {
            try {
                const response = await getOrdersData();
                this.items = response.data
                //@ts-ignore
                const query  = response.queryInfo                
                this.$store.commit('addQueryInfo', query)

            } catch (error) {
                console.log(error);
            }
        }, 
    }
});
</script>

<style lang="scss" src="./the-orders.scss" />

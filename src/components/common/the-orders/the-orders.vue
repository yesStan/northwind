<template>
    <div
        :at-the-orders="atAttribute"
        class="the-orders"
    >
        <div class="title">
            <p class="main__title">Orders
                <TheIcon
                    class="links-color"
                    icon="redo"
                />
            </p>

            <Vue3EasyDataTable
                :headers="headers"
                :items="items"
                buttons-pagination
                hide-rows-per-page
            >
                <template #item-indicator.OrderID="item">
                    <router-link :to="{ name: ROUTE_NAMES.ORDER_PROFILE, params: { id: item.OrderID } }">

                        {{ item.OrderID }}
                    </router-link>
                </template>
                <template #item-indicator.total_products_price="item">
                    ${{ parseInt(item.total_products_price).toFixed(2) }}
                </template>

                <template #pagination>
                    <div class="pagination_c">
                        <div class="pages-quantity">
                            <button
                                class="pagination-button"
                                v-for="page in restPagesList"
                                @click="fetchOrders(page)"
                            >

                                {{ page }}
                            </button>
                        </div>
                        <div class="current-of-total">
                            Page: {{ currentPage }} of {{ totalPages }}
                        </div>
                    </div>
                </template>
            </Vue3EasyDataTable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { mapGetters } from 'vuex';
import { getOrdersData, TOrderList } from '../../../api/interfaces'
import { ROUTE_NAMES } from '../../../constants/route-names-constants';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item } from "vue3-easy-data-table";
import TheIcon from '../the-icon';
import { prepareQueryInfoCommitPayload } from '../../../services/store-helper-service';



export default defineComponent({
    name: 'TheOrders',
    components: {
        Vue3EasyDataTable, TheIcon
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
            items: [] as TOrderList,
            totalPages: 0,
            currentPage: 1,
        }
    },
    created() {
        this.fetchOrders(1)
    },
    computed: {
        //     // ...mapGetters(['allOrders']), 
        restPagesList() {
            if (this.totalPages <= 8) {
                return this.createIncrementedArray(this.totalPages);
            } else {
                const offset = 2;
                // const dynamicQuantity = (offset * 2) + 1

                if (this.currentPage < 5) {
                    return [
                        ...this.createIncrementedArray(6),
                        '...',
                        this.totalPages
                    ]
                } else if (this.currentPage + 5 - offset >= this.totalPages) {
                    return [
                        1,
                        '...',
                        ...this.createIncrementedArray(6, this.totalPages - 6),
                    ]
                } else {
                    return [
                        1,
                        '...',
                        ...this.createIncrementedArray(5, this.currentPage - 1 - offset),
                        '...',
                        this.totalPages
                    ]
                }
            }
        }
    },
    methods: {
        createIncrementedArray(arrLength: number, countFrom: number = 0) {
            return Array.from(Array(arrLength), (_, index) => {
                return countFrom + index + 1
            })
        },
        async fetchOrders(page: number) {
            this.currentPage = page;
            try {
                const response = await getOrdersData({ params: { page } });
                const perPage = 20
                const totalPage = response.count / perPage;

                this.totalPages = parseFloat(totalPage.toFixed())
                this.items = response.data
                this.items.forEach((i) => i.ShippedDate = i.ShippedDate.split(" ")[0])

                this.$store.commit('addMultipleQueryInfo', prepareQueryInfoCommitPayload(response.data.length, response.queryInfo, response.workerId))
            } catch (error) {
                console.log(error);
            }
        },
    }
});
</script>

<style lang="scss" src="./the-orders.scss" />

<template>
    <div
        :at-the-products="atAttribute"
        class="the-products"
    >

        <div class="title">
            <p class="main__title">Products
                <TheIcon
                    class="links-color"
                    icon="redo"
                />
            </p>
            <Vue3EasyDataTable
                :headers="headers"
                :items="items"
                alternating
                buttons-pagination
                hide-rows-per-page
            >
                <template #item-indicator.productName="item">
                    <router-link :to="{ name: ROUTE_NAMES.PRODUCT_PROFILE, params: { id: item.categoryID } }">
                        {{ item.productName }}
                    </router-link>
                </template>
                <template #item-indicator.unitPrice="item">
                    $ {{ item.unitPrice }}
                </template>

                <template #pagination>
                    <div class="pagination_c">
                        <div class="pages-quantity">
                            <button
                                class="pagination-button"
                                v-for="page, index in totalPages"
                                @click="getProducts(page)"
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
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { mapGetters } from 'vuex';
import { getProductsData, TProductsList } from '../../../api/interfaces';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';

import Vue3EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item } from "vue3-easy-data-table";
import TheIcon from '../the-icon';
import { prepareQueryInfoCommitPayload } from '../../../services/store-helper-service';

export default defineComponent({
    name: 'TheProducts',
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
            products: [],
            ROUTE_NAMES,
            headers: [
                { text: "Name", value: "indicator.productName", },
                { text: "Qt per unit", value: 'quantityPerUnit', },
                { text: "Price", value: "indicator.unitPrice" },
                { text: "Stock", value: "unitsInStock" },
                { text: "Orders", value: "unitsOnOrder" },
            ],
            items: [] as TProductsList,
            totalPages: 0,
            currentPage: 0
        }
    },
    created() {
        this.getProducts(1)

    },
    methods: {
        async getProducts(page: number) {
            this.currentPage = page;
            try {
                const response = await getProductsData({ params: { page } });
                this.items = response.data

                const perPage = 20
                const totalPage = response.count / perPage;
                this.totalPages = Math.ceil(totalPage)

                this.$store.commit('addMultipleQueryInfo', prepareQueryInfoCommitPayload(response.data.length, response.queryInfo, response.workerId))
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>








<style lang="scss" src="./the-products.scss" />

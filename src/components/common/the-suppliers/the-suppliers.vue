<template>
    <div
        :at-the-suppliers="atAttribute"
        class="the-suppliers"
    >

    <dice/>


        <div class="title">
            <p class="main__title">Suppliers
                <TheIcon
                    class="links-color"
                    icon="redo"
                />
            </p>
            <Vue3EasyDataTable
                :headers="headers"
                :items="items"
                hide-rows-per-page
                buttons-pagination
            >
                <template #item-indicator.companyName="item">
                    <router-link :to="{ name: ROUTE_NAMES.SUPPLIER_PROFILE, params: { id: item.supplierID } }">
                        {{ item.companyName }}
                    </router-link>
                </template>
                <template #item-indicator="item">
                    <TheAvatar :fullName="item.contactName" />
                </template>

                <template #pagination>
                    <div class="pagination_c">

                        <div class="pages-quantity">
                            <button
                                class="pagination-button"
                                v-for="page, index in totalPages"
                                @click="getSuppliers(page)"
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
import { api } from '../../../services/api';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';
import { getSuppliersData, TSuppliersList } from '../../../api/interfaces'
import TheAvatar from '../the-avatar';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item } from "vue3-easy-data-table";
import TheIcon from '../the-icon';
import { prepareQueryInfoCommitPayload } from '../../../services/store-helper-service';
import dice from '../the-dice';



export default defineComponent({
    name: 'TheSuppliers',
    components: {
        Vue3EasyDataTable,
        TheAvatar,
        TheIcon,
        dice
    },
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            // suppliers: [] as TSuppliersList,
            supplierID: Number(),
            ROUTE_NAMES,
            headers: [
                { text: "", value: "indicator" },
                { text: "Company", value: 'indicator.companyName' },
                { text: "Contact", value: "contactName" },
                { text: "Title", value: "contactTitle" },
                { text: "City", value: "city" },
                { text: "Country", value: "country", sortable: true },
            ],
            items: [] as TSuppliersList,
            totalPages: 0,
            currentPage: 0,
            page: 1
        }
    },
    created() {
        this.getSuppliers(1);
    },
    methods: {
        async getSuppliers(page: number) {
            this.currentPage = page;
            try {
                const response = await getSuppliersData({ params: { page } });
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



<style lang="scss" src="./the-suppliers.scss" />



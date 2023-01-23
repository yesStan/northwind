<template>
    <div
        :at-the-suppliers="atAttribute"
        class="the-suppliers"
    >

        <div class="title">
            <p>Suppliers</p>
            <Vue3EasyDataTable
                :headers="headers"
                :items="items"
                alternating
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

export default defineComponent({
    name: 'TheSuppliers',
    components: {
        Vue3EasyDataTable, TheAvatar
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
        }
    },
    created() {
        this.getSuppliers();
    },
    methods: {
        async getSuppliers() {
            try {
                const response = await getSuppliersData();
                this.items = response.data

                const query = response.queryInfo
                this.$store.commit('addQueryInfo', query)
            } catch (error) {
                console.log(error);
            }
        }
    }
});

</script>



<style lang="scss" src="./the-suppliers.scss" />



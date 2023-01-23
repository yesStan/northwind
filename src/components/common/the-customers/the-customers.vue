<template>
    <div
        :at-the-customers="atAttribute"
        class="the-customers"
    >
        <div class="title">
            <p>Customers</p>
            <Vue3EasyDataTable
                :headers="headers"
                :items="items"
                buttons-pagination
            alternating

            >
                <template #item-indicator.companyName="item">
                    <router-link :to="{ name: ROUTE_NAMES.CUSTOMER_PROFILE, params: { id: item.customerID } }">
                        {{ item.companyName }}
                    </router-link>
                </template>
                <template #item-indicator="item">
                <TheAvatar
                :fullName="item.contactName"
                />
            </template>
            </Vue3EasyDataTable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { getCustomersData, TCustomersList } from '../../../api/interfaces';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item } from "vue3-easy-data-table";
import TheAvatar from '../the-avatar';

export default defineComponent({
    name: 'TheCustomers',
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
            customers: [],
            ROUTE_NAMES,
            headers: [
                { text: "", value: "indicator" },
                { text: "Company", value: 'indicator.companyName' },
                { text: "Contact", value: "contactName" },
                { text: "Title", value: "contactTitle" },
                { text: "City", value: "city" },
                { text: "Country", value: "country" },
            ],
            items: [] as TCustomersList
        }
    },
    created() {
        this.fetchCustomers()
    },
    methods: {
        async fetchCustomers() {
            try {
                const response = await getCustomersData();
                this.items = response.data

                const query  = response.queryInfo
                this.$store.commit('addQueryInfo', query)
                // {queryExecutionTime: query.queryExecutionTime, queryString: query.queryString, queryTS: query.queryTS}

            } catch (error) {
                console.log(error);
            }
        },
    }
});
</script>

<style lang="scss" src="./the-customers.scss" />

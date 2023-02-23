<template>
    <div
        :at-the-customers="atAttribute"
        class="the-customers"
    >
        <div class="title">
            <p class="main__title">Customers
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
                <template #item-indicator.companyName="item">
                    <router-link :to="{ name: ROUTE_NAMES.CUSTOMER_PROFILE, params: { id: item.customerID } }">
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
                                v-for="page in totalPages"
                                @click="fetchCustomers(page)"
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
import { mapGetters } from 'vuex';
import { getCustomersData, TCustomersList } from '../../../api/interfaces';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item } from "vue3-easy-data-table";
import TheAvatar from '../the-avatar';
import TheIcon from '../the-icon';
import { RouterLink } from 'vue-router';
import { prepareQueryInfoCommitPayload } from '../../../services/store-helper-service';

export default defineComponent({
    name: 'TheCustomers',
    components: {
        Vue3EasyDataTable, TheAvatar, TheIcon
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
            items: [] as TCustomersList,
            totalPages: 0,
            currentPage: 0
        }
    },
    created() {
        this.fetchCustomers(1)
    },
    methods: {
        async fetchCustomers(page:number) {
            this.currentPage = page;
            try {
                const response = await getCustomersData({ params: { page } });
                this.items = response.data
                const perPage = 20
                const totalPage = response.count / perPage;
                this.totalPages = Math.ceil(totalPage)
                
                this.$store.commit('addMultipleQueryInfo', prepareQueryInfoCommitPayload(response.data.length, response.queryInfo, response.workerId))
            } catch (error) {
                console.log(error);
            }
        },
    }
});
</script>

<style lang="scss" src="./the-customers.scss" />

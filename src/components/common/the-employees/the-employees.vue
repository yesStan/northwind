<template>
    <div
        :at-the-employees="atAttribute"
        class="the-employees"
    >

        <div class="title">
            <p class="main__title">Employees
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
                <template #item-indicator.name="item">
                    <router-link :to="{ name: ROUTE_NAMES.EMPLOYEE_PROFILE, params: { id: item.employeeID } }">
                        {{ item.firstName }} {{ item.lastName }}
                    </router-link>
                </template>
                <template #item-indicator="item">
                    <TheAvatar
                        :firstName="item.firstName"
                        :lastName="item.lastName"
                    />
                </template>

                <template #pagination>
                    <div class="pagination_c">

                        <div class="pages-quantity">
                            <button
                                class="pagination-button"
                                v-for="page in totalPages"
                                @click="getEmployees(page)"
                            >
                                {{ page }}
                            </button>
                        </div>
                        <div class="current-of-total">
                            Page: {{ currentPage }} of {{ totalPages +1 }}
                        </div>
                    </div>
                </template>
            </Vue3EasyDataTable>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getEmployeesData, TEmployeesList } from '../../../api/interfaces'
import { ROUTE_NAMES } from '../../../constants/route-names-constants';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import type { Header, Item } from "vue3-easy-data-table";
import TheAvatar from '../the-avatar';
import TheIcon from '../the-icon';
import { RouterLink } from 'vue-router';
import { prepareQueryInfoCommitPayload } from '../../../services/store-helper-service';

export default defineComponent({
    name: 'TheEmployees',
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
            employees: [],
            ROUTE_NAMES,
            name: '',
            headers: [
                { text: "", value: "indicator" },
                { text: "Name", value: 'indicator.name' },
                { text: "Title", value: "title" },
                { text: "City", value: "city" },
                { text: "Phone", value: "homePhone" },
                { text: "Country", value: "country" },
            ],
            items: [] as TEmployeesList,
            totalPages: 0,
            currentPage: 0
        }
    },
    created() {
        this.getEmployees(1)
    },
    methods: {
        async getEmployees(page: number) {
            this.currentPage = page;
            try {
                const response = await getEmployeesData({ params: { page } });
                const [concatNames] = response.data
                const name = this.name = concatNames.firstName + concatNames.lastName;
                this.items = response.data

                this.$store.commit('addMultipleQueryInfo', prepareQueryInfoCommitPayload(response.data.length, response.queryInfo, response.workerId))
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>

















<style lang="scss" src="./the-employees.scss" />

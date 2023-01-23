<template>
    <div
        :at-the-employees="atAttribute"
        class="the-employees"
    >

        <div class="title">
            <p>Products</p>
            <Vue3EasyDataTable
                :headers="headers"
                :items="items"
                alternating
                buttons-pagination
            >
                <template #item-indicator.name="item">
                    <router-link :to="{ name: ROUTE_NAMES.EMPLOYEE_PROFILE, params: { id: item.employeeID } }"
                    >
                        {{ item.firstName }} {{ item.lastName }}
                    </router-link>
                </template>
                <template #item-indicator="item">
                    <TheAvatar
                        :firstName="item.firstName"
                        :lastName="item.lastName"
                    />
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

export default defineComponent({
    name: 'TheEmployees',
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
            items: [] as TEmployeesList
        }
    },
    created() {
        this.getEmployees()
    },
    methods: {
        async getEmployees() {
            try {
                const response = await getEmployeesData();
                const [concatNames] = response.data
                const name = this.name = concatNames.firstName + concatNames.lastName;
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















<style lang="scss" src="./the-employees.scss" />

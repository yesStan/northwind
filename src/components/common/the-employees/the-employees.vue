<template>
    <div
        :at-the-employees="atAttribute"
        class="the-employees"
    >
        <div
            class="table-wrapper"
            v-if="employees.length"
        >
            <table class="customTable">
                <thead>
                    <tr>
                        <th>Employees</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>img</td>
                        <td>Name</td>
                        <td>Title</td>
                        <td>City</td>
                        <td>Phone</td>
                        <td>Country</td>
                    </tr>
                    <tr v-for="item in employees">
                        <td>{{}}</td>
                        <td>
                            <router-link
                                :to="{ name: ROUTE_NAMES.EMPLOYEE_PROFILE, params: { id: item.employeeID } }"
                                props:
                                true
                            >
                                {{ item.firstName }} {{ item.lastName }}
                            </router-link>
                        </td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.city }}</td>
                        <td>{{ item.homePhone }}</td>
                        <td>{{ item.country }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>Loading....</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getEmployeesData, TEmployeesList } from '../../../api/interfaces'
import { ROUTE_NAMES } from '../../../constants/route-names-constants';

export default defineComponent({
    name: 'TheEmployees',
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            employees: [] as TEmployeesList,
            ROUTE_NAMES
        }
    },
    mounted() {
        this.getEmployees()
    },
    methods: {
        async getEmployees() {
            try {
                const response = await getEmployeesData();
                
                this.employees = response.data
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>









<style lang="scss" src="./the-employees.scss" />

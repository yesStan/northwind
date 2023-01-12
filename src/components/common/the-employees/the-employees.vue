<template>
    <div
        :at-the-employees="atAttribute"
        class="the-employees"
    >
        <div class="table-wrapper" v-if="employees">
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
                        <td>{{  }}</td>
                        <td>{{ item.firstName }} {{ item.lastName }}</td>
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
import { getEmployeesData } from '../../../api/interfaces'

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
            employees: {}
        }
    },
    mounted() {
        this.getEmployees()
    },
    methods: {
        async getEmployees() {
            this.employees = false
            try {
                const response = await getEmployeesData();
                console.log(response);
                this.employees = response.data
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>



<style lang="scss" src="./the-employees.scss" />

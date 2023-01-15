<template>
    <div
        :at-the-customers="atAttribute"
        class="the-customers"
    >
        <div
            class="table-wrapper"
            v-if="customers.length"
        >
            <table class="customTable">
                <thead>
                    <tr>
                        <th>Customers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Company</td>
                        <td>Contact</td>
                        <td>Title</td>
                        <td>City</td>
                        <td>Country</td>
                    </tr>
                    <tr v-for="item in customers">
                        <td>{{ item.companyName }}</td>
                        <td>{{ item.contactName }}</td>
                        <td>{{ item.contactTitle }}</td>
                        <td>{{ item.city }}</td>
                        <td>{{ item.country }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>loading...</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCustomersData, TCustomersList } from '../../../api/interfaces';

export default defineComponent({
    name: 'TheCustomers',
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            customers: [] as TCustomersList
        }
    },
    created() {
        this.getCustomers()
    },
    computed: {
        customerId() {
            return Number(this.$route.params.id)
        }
    },
    methods: {
        async getCustomers() {
            try {
                const response = await getCustomersData();
                this.customers = response.data
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>





<style lang="scss" src="./the-customers.scss" />

<template>
    <div
        :at-the-customers="atAttribute"
        class="the-customers"
    >
        <div
            class="table-wrapper"
            v-if="allCustomers.length"
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
                    <tr v-for="item in allCustomers">
                        <td>
                            <router-link
                                :to="{ name: ROUTE_NAMES.CUSTOMER_PROFILE, params: { id: item.customerID }}"
                                props:
                                true
                            >
                            {{ item.companyName }}
                            </router-link>
                        </td>
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
import { mapGetters } from 'vuex';
import { TCustomersList } from '../../../api/interfaces';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';

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
            customers: [] as TCustomersList,
            ROUTE_NAMES
        }
    },
    computed: {
        ...mapGetters(['allCustomers']),
        // customerId() {
        //     return Number(this.$route.params.id)
        // }
    },
    // methods: {
    //     async getCustomers() {
    //         try {
    //             const response = await getCustomersData();
    //             this.customers = response.data
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }
});
</script>





<style lang="scss" src="./the-customers.scss" />

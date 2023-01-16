<template>
    <div class="the-customer">
        <div class="table-wrapper">
            <table class="customTable">
                <thead>
                    <tr>
                        <th>Customer information</th>
                    </tr>
                </thead>
                <tbody>
                    <td class="product-block">
                        <div class="product-info">
                            <div class="title">
                                <h2 class="bold">Customer information</h2>
                            </div>
                            <div class="title">
                                <h2 class="bold">Company Name</h2>
                                <p>{{ customer.companyName }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Contact Name</h2>
                                <p>{{ customer.contactName }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Contact Title</h2>
                                <p>{{ customer.contactTitle }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Address</h2>
                                <p>{{ customer.address }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">City</h2>
                                <p>{{ customer.city }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Postal Code</h2>
                                <p>{{ customer.postalCode }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Region</h2>
                                <p>{{ customer.region }}</p>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="title">
                                <h2 class="bold">Country</h2>
                                <p>{{ customer.country }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Phone</h2>
                                <p>{{ customer.phone }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Fax</h2>
                                <p>{{ customer.fax }}</p>
                            </div>
                        </div>
                    </td>
                    <tr>
                        <td><button>Go back</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getCustomerData, ICustomer } from '../../../api/interfaces';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';


export default defineComponent({
    name: 'TheCustomer',
    data() {
        return {
            customer: {
                customerID: '',
                companyName: '',
                contactName: '',
                contactTitle: '',
                address: '',
                city: '',
                region: '',
                postalCode: '',
                country: '',
                phone: '',
                fax: '',
            } as ICustomer,
            
            ROUTE_NAMES
        }
    },
    created() {
        this.getCustomer()
    },
    computed: {
        customerId() {
            return this.$route.params.id.toString()
        }
    },
    methods: {
        async getCustomer() {
            try {
                const response = await getCustomerData(this.customerId);
                console.log(response.data);

                const [ customers ] = response.data;
                this.customer = customers

            } catch (error) {
                console.log(error);
            }
        },
    }
});
</script>

<style lang="scss" src="./the-customer.scss" />

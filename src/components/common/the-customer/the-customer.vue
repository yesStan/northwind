<template>
    <div class="the-customer">
        <div class="table-wrapper">
            <table class="customTable">
                <thead>
                    <tr>
                        <th>
                            <TheIcon
                                class="single-color"
                                icon="ballot"
                            />Customer information
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <td class="product-block">
                        <div class="product-info">
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
                        </div>
                        <div class="product-info">
                            <div class="title">
                                <h2 class="bold">Postal Code</h2>
                                <p>{{ customer.postalCode }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Region</h2>
                                <p>{{ customer.region }}</p>
                            </div>
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
                        <TheBbuton />
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
import { prepareQueryInfoCommitPayload } from '../../../services/store-helper-service';
import TheBbuton from '../the-bbuton';
import TheIcon from '../the-icon';


export default defineComponent({
    name: 'TheCustomer',
    components: {
        TheBbuton, TheIcon
    },
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
            return this.$route.params.id || '';
        }
    },
    methods: {
        async getCustomer() {
            try {
                const response = await getCustomerData(this.customerId);
                console.log(response);

                const [customers] = response.data;
                this.customer = customers

                this.$store.commit('addSingleQueryInfo', prepareQueryInfoCommitPayload(response.data.length, response.queryInfo, response.queryInfo.workerId))
            } catch (error) {
                console.log(error);
            }
        },
    }
});
</script>

<style lang="scss" src="./the-customer.scss" />

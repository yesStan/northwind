<template>
    <div
        :at-the-supplier="atAttribute"
        class="the-supplier"
    >
        <div class="table-wrapper">
            <table class="customTable">
                <thead>
                    <tr>
                        <th>
                            <TheIcon icon="ballot" />Supplier information
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <td
                        class="supplier-block"
                        v-for="supplier in     suppliers"
                    >
                        <div class="supplier-info">
                            <div class="title">
                                <h2 class="bold">Company Name</h2>
                                <p>{{ supplier.companyName }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Contact Name</h2>
                                <p>{{ supplier.contactName }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Contact Title</h2>
                                <p>{{ supplier.contactTitle }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Address</h2>
                                <p>{{ supplier.address }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">City</h2>
                                <p>{{ supplier.city }}</p>
                            </div>
                        </div>
                        <div class="supplier-info-two">
                            <div class="title">
                                <h2 class="bold">Region</h2>
                                <p>{{ supplier.region }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Postal Code</h2>
                                <p>{{ supplier.postalCode }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Country</h2>
                                <p>{{ supplier.country }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Phone</h2>
                                <p>{{ supplier.phone }}</p>
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
import { getSuppliersIdData, TSuppliersIdList, } from '../../../api/interfaces';
import TheIcon from '../the-icon';
import TheBbuton from '../the-bbuton';

export default defineComponent({
    name: 'TheSupplier',
    components: {
        TheIcon, TheBbuton
    },
    props: {
        atAttribute: {
            type: String,
            default: ''
        },
        supplierInfo: {
            type: Array,
            default: ''
        }
    },
    data() {
        return {
            suppliers: [] as TSuppliersIdList
        }
    },
    computed: {
        supplierId() {
            return Number(this.$route.params.id)
        }
    },
    mounted() {
        this.getSuppliers();
    },
    methods: {
        async getSuppliers() {
            try {
                const response = await getSuppliersIdData(this.supplierId);
                this.suppliers = response.data

                const query = response.queryInfo
                this.$store.commit('addQueryInfo', query)

            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>

<style lang="scss" src="./the-supplier.scss" />

<template>
    <div
        :at-the-suppliers="atAttribute"
        class="the-suppliers"
    >
        <div
            class="table-wrapper"
            v-if="suppliers.length"
        >
            <table class="customTable">
                <thead>
                    <tr>
                        <th>Suppliers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>Company</td>
                        <td>Contact</td>
                        <td>Title</td>
                        <td>City</td>
                        <td>Country</td>
                    </tr>
                    <tr
                        v-for="supplier in suppliers"
                        :key="supplier.supplierID"
                    >
                        <td>img</td>
                        <td>
                            <router-link
                                :to="{ name: ROUTE_NAMES.SUPPLIER_PROFILE, params: { id: supplier.supplierID } }"
                            >
                                {{ supplier.companyName }}
                            </router-link>
                        </td>
                        <td>{{ supplier.contactName }}</td>
                        <td>{{ supplier.contactTitle }}</td>
                        <td>{{ supplier.city }}</td>
                        <td>{{ supplier.country }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>loading...</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { api } from '../../../services/api';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';
import { getSuppliersData, TSuppliersList } from '../../../api/interfaces'

export default defineComponent({
    name: 'TheSuppliers',
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            suppliers: [] as TSuppliersList,
            supplierID: Number(),
            ROUTE_NAMES
        }
    },
    mounted() {
        this.getSuppliers();
    },
    methods: {
        async getSuppliers() {
            try {
                const response = await getSuppliersData();
                this.suppliers = response.data
            } catch (error) {
                console.log(error);
            }
        }
    }
});

</script>
















<style lang="scss" src="./the-suppliers.scss" />

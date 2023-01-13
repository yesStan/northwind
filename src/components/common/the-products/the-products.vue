<template>
    <div
        :at-the-products="atAttribute"
        class="the-products"
    >

        <div
            class="table-wrapper"
            v-if="products.length"
        >
            <table class="customTable">
                <thead>
                    <tr>
                        <th>Products</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Qt per unit</td>
                        <td>Price</td>
                        <td>Stock</td>
                        <td>Orders</td>
                    </tr>
                    <tr v-for="item in products">
                        <td>
                            <router-link
                                :to="{ name: ROUTE_NAMES.PRODUCT_PROFILE, params: { id: item.categoryID }}"
                                props: true
                            >
                                {{ item.productName }}
                            </router-link>
                        </td>
                        <td>{{ item.productName }}</td>
                        <td>{{ item.quantityPerUnit }}</td>
                        <td>{{ item.unitPrice }}</td>
                        <td>{{ item.unitsInStock }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>loading...</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getProductsData, TProductsList } from '../../../api/interfaces';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';

export default defineComponent({
    name: 'TheProducts',
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            products: [] as TProductsList,
            ROUTE_NAMES
        }
    },
    mounted() {
        this.getProducts()
    },
    methods: {
        async getProducts() {
            try {
                const response = await getProductsData();
                this.products = response.data
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>









<style lang="scss" src="./the-products.scss" />

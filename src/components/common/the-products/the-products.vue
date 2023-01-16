<template>
    <div
        :at-the-products="atAttribute"
        class="the-products"
    >

        <div
            class="table-wrapper"
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
                    <tr v-for="item in allProducts">
                        <td>
                            <router-link
                                :to="{ name: ROUTE_NAMES.PRODUCT_PROFILE, params: { id: item.categoryID } }"
                                props:
                                true
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
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { mapGetters } from 'vuex';
import { TProductsList } from '../../../api/interfaces';
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
    computed: {
        ...mapGetters(['allProducts'])
    }
});
</script>















<style lang="scss" src="./the-products.scss" />

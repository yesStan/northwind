<template>
    <div
        :at-the-orders="atAttribute"
        class="the-orders"
    >
        <div
            class="table-wrapper"
            v-if="orders.length"
        >
            <table class="customTable">
                <thead>
                    <tr>
                        <th>Orders</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Id</td>
                        <td>Total Price</td>
                        <td>Products</td>
                        <td>Quantity</td>
                        <td>Shipped</td>
                        <td>Ship Name</td>
                        <td>City</td>
                        <td>Country</td>
                    </tr>
                    <tr v-for="item in orders">
                        <td>
                            <router-link
                                :to="{ name: ROUTE_NAMES.ORDER_PROFILE, params: { id: item.OrderID } }"
                                props:
                                true
                            >
                                {{ item.OrderID }}
                            </router-link>
                        </td>
                        <td>{{ item.total_products_price }}</td>
                        <td>{{ item.total_products_items }}</td>
                        <td>{{ item.total_products_quantity }}</td>
                        <td>{{ item.ShippedDate }}</td>
                        <td>{{ item.ShipName }}</td>
                        <td>{{ item.ShipCity }}</td>
                        <td>{{ item.ShipCountry }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>Loading....</div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getOrdersData, TOrderList } from '../../../api/interfaces'
import { ROUTE_NAMES } from '../../../constants/route-names-constants';

export default defineComponent({
    name: 'TheOrders',
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            orders: [] as TOrderList,
            ROUTE_NAMES
        }
    },
    mounted() {
        this.getOrders()
    },
    methods: {
        async getOrders() {
            try {
                const response = await getOrdersData();
                console.log(response);

                this.orders = response.data
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>





<style lang="scss" src="./the-orders.scss" />

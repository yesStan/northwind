<template>
    <div
        :at-the-order="atAttribute"
        class="the-order"
    >
        <div class="table-wrapper">
            <table class="customTable">
                <thead>
                    <tr>
                        <th>
                            <TheIcon icon="ballot" />Order information
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <td class="product-block">
                        <div class="product-info">
                            <div class="title">
                                <h2 class="bold">Customer Id</h2>

                                <router-link v-if="orders.CustomerID"
                                    :to="{ name: ROUTE_NAMES.CUSTOMER_PROFILE, params: { id: orders.CustomerID } }"
                                >
                                    {{ orders.CustomerID }}
                                </router-link>

                            </div>
                            <div class="title">
                                <h2 class="bold">Ship Name</h2>
                                <p>{{ orders.ShipName }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Total Products</h2>
                                <p>{{ orders.total_products }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Total Quantity</h2>
                                <p>{{ orders.total_products_items }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Total Price</h2>
                                <p>{{ orders.total_products_price }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Total Discount</h2>
                                <p>{{ orders.total_products_discount }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Ship Via</h2>
                                <p>{{ orders.CompanyName }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Freight</h2>
                                <p>{{ orders.Freight }}</p>
                            </div>
                        </div>
                        <div class="product-info">
                            <div class="title">
                                <h2 class="bold">Order Date</h2>
                                <p>{{ orders.OrderDate }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Required Date</h2>
                                <p>{{ orders.RequiredDate }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Shipped Date</h2>
                                <p>{{ orders.ShippedDate }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Ship City</h2>
                                <p>{{ orders.ShipCity }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Ship Region</h2>
                                <p>{{ orders.ShipRegion }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Ship Postal Code</h2>
                                <p>{{ orders.ShipPostalCode }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Ship Country</h2>
                                <p>{{ orders.ShipCountry }}</p>
                            </div>
                        </div>
                    </td>
                </tbody>
            </table>
            <table class="customTable-two">
                <thead>
                    <tr>
                        <th>Products in Order</th>
                    </tr>
                </thead>
                <tbody class="order-inf">
                    <tr>
                        <td>Product</td>
                        <td>Quantity</td>
                        <td>Order Price</td>
                        <td>Total Price</td>
                        <td>Discount</td>
                    </tr>
                    <tr v-for="item in productsOrder">
                        <td>
                            <router-link
                                :to="{ name: ROUTE_NAMES.PRODUCT_PROFILE, params: { id: item.ProductID } }"
                            >
                                {{ item.ProductName }}
                            </router-link>
                        </td>
                        <td>{{ item.Quantity }}</td>
                        <td>{{ item.UnitPrice }}</td>
                        <td>{{ item.total_products_price }}</td>
                        <td>{{ item.Discount }}</td>
                    </tr>
                </tbody>
                <tr>
                    <TheBbuton />
                </tr>
            </table>

        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getOrderData, IOrder, IProductInOrder } from '../../../api/interfaces';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';
import TheIcon from '../the-icon';
import TheBbuton from '../the-bbuton';
import { RouterLink } from 'vue-router';
import { prepareQueryInfoCommitPayload } from '../../../services/store-helper-service';


export default defineComponent({
    name: 'TheOrder',
    components: {
        TheIcon, TheBbuton
    },
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            orders: {
                total_products_discount: "",
                total_products_price: "",
                total_products_items: "",
                total_products: "",
                CustomerID: "",
                OrderID: 0,
                ShippedDate: "",
                ShipName: "",
                ShipCity: "",
                CompanyName: "",
                ShipCountry: "",
                Freight: "",
                OrderDate: "",
                RequiredDate: "",
                ShipRegion: "",
                ShipPostalCode: ""
            } as IOrder,
            productsOrder: [] as Array<IProductInOrder>,
            ROUTE_NAMES
        }
    },
    created() {
        this.getOrder();
    },

    computed: {
        orderId() {
            return this.$route.params.id
        }
    },
    methods: {
        async getOrder() {
            try {
                const response = await getOrderData(this.orderId);
                const { orderInfo, productsInOrder } = response.data;
                const [localOrderInfo] = orderInfo
                
                this.orders = localOrderInfo;
                this.productsOrder = productsInOrder;
                console.log('rsp:',response);
                
                this.$store.commit('addSingleQueryInfo', prepareQueryInfoCommitPayload(response.data.productsInOrder.length+1, response.queryInfo.orderInfo, response.queryInfo.orderInfo.workerId))

            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>


<style lang="scss" src="./the-order.scss" />

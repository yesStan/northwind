<template>
    <div
        :at-the-product="atAttribute"
        class="the-product"
    >
        <div class="table-wrapper">
            <table class="customTable">
                <thead>
                    <tr>
                        <th>
                            <TheIcon icon="ballot" />Product information
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <td class="product-block">
                        <div class="product-info">
                            <div class="title">
                                <h2 class="bold">Product Name</h2>
                                <p>{{ product.productName }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Supplier</h2>
                                <router-link
                                    :to="{ name: ROUTE_NAMES.SUPPLIER_PROFILE, params: { id: product.supplierID } }"
                                >
                                    {{ supplier.companyName }}
                                </router-link>
                                <p>{{}}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Quantity Per Unit</h2>
                                <p>{{ product.quantityPerUnit }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Unit Price</h2>
                                <p>{{ product.unitPrice }}</p>
                            </div>
                        </div>
                        <div class="product-info-two">
                            <div class="title">
                                <h2 class="bold">Units In Stock</h2>
                                <p>{{ product.unitsInStock }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Units On Order</h2>
                                <p>{{ product.unitsOnOrder }}</p>
                            </div>
                            <div class="title">
                                <h2 class="bold">Discontinued</h2>
                                <p>{{ product.discontinued }}</p>
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
import { ROUTE_NAMES } from '../../../constants/route-names-constants';
import { getProductData, IProduct } from '../../../api/interfaces';
import TheBbuton from '../the-bbuton';
import TheIcon from '../the-icon';

export default defineComponent({
    name: 'TheProduct',
    components: {
        TheBbuton, TheIcon
    },
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            product: {
                productID: 0,
                productName: "",
                supplierID: 0,
                categoryID: 0,
                quantityPerUnit: "",
                unitPrice: "",
                unitsInStock: "",
                unitsOnOrder: "",
                reorderLevel: "",
                discontinued: false,

            } as IProduct,
            supplier: {
                companyName: ''
            },
            ROUTE_NAMES
        }
    },
    created() {
        this.getProduct();
    },
    computed: {
        productId() {
            return Number(this.$route.params.id);
        }
    },
    methods: {
        async getProduct() {
            try {
                const response = await getProductData(this.productId);
                const [{ products, suppliers }] = response.data;
                this.supplier = suppliers;
                this.product = products;

                const query  = response.queryInfo
                this.$store.commit('addQueryInfo', query)

            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>

























<style lang="scss" src="./the-product.scss" />

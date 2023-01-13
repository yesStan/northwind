<template>
    <div
        :at-the-product="atAttribute"
        class="the-product"
    >
        <div class="table-wrapper">
            <table class="customTable">
                <thead>
                    <tr>
                        <th>Product information</th>
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
                                <p>{{ product.supplierID }}</p>
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
                        <div class="product-info">
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
                        <td><button>Go back</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getProductIdData, TProductID, IProduct } from '../../../api/interfaces';

export default defineComponent({
    name: 'TheProduct',
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
            productID: [] as TProductID
        }
    },
    created() {
        this.getProduct();
    },
    methods: {
        async getProduct() {
            this.productID = this.$route.params.id

            try {
                const response = await getProductIdData(this.productID);
                console.log(response.data);

                const [{ products, suppliers }] = response.data;
                this.product = products;
            } catch (error) {
                console.log(error);
            }
        }
    }
});
</script>



















<style lang="scss" src="./the-product.scss" />

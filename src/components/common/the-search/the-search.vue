<template>
    <div
        :at-the-search="atAttribute"
        class="the-search"
    >
        <div class="search-card">
            <div class="search-card-wrapper">
                <p class="text">Search Database</p>
                <div class="search-wrapper">
                    <input
                        type="text"
                        v-model="search"
                        placeholder="Enter keyword..."
                        @keyup.enter="filter"
                    />
                </div>
                <div class="tables-radio">
                    <p class="text">Tables</p>
                    <input
                        type="radio"
                        id="product"
                        value="products"
                        v-model="picked"
                        @change="filter"
                    />
                    <label for="one">Product</label>
                    <input
                        type="radio"
                        id="customer"
                        value="customers"
                        v-model="picked"
                        @change="filter"
                    />
                    <label for="two">Customer</label>
                </div>

                <div class="search">
                    <p class="text">Search results</p>
                    <div class="product" v-if="picked === 'products'">
                        <div
                            class="search-result"
                            v-for="item in filtered"
                        >
                            <router-link
                                :to="{ name: ROUTE_NAMES.PRODUCT_PROFILE, params: { id: item.categoryID } }"
                                props:
                                true
                            >
                                {{ item.productName }}
                            </router-link>
                            <p class="search-details">#{{ item.productID }} Quantity Per Unit: {{
                                item.quantityPerUnit
                            }},
                                Price: {{ item.unitPrice }}, Stock: {{ item.unitsInStock }} </p>
                        </div>

                    </div>

                    <div class="customer" v-if="picked === 'customers'" >
                        <div
                            class="search-result"
                            v-for="item in filtered"
                        >
                            <router-link
                                :to="{ name: ROUTE_NAMES.CUSTOMER_PROFILE, params: { id: item.customerID } }"
                                props:
                                true
                            >
                                {{ item.companyName }}
                            </router-link>
                            <p class="search-details">#{{ item.customerID }} Contact: {{
                                item.contactName
                            }},
                                Title: {{ item.contactTitle }}, Phone: {{ item.phone }} </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { mapGetters } from 'vuex';
import { search, TSearchTable } from '../../../api/interfaces';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';


export default defineComponent({
    name: 'TheSearch',
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            search: '',
            picked: 'products' as TSearchTable,
            products: [] as any,
            customers: [],
            filtered: [] as any,
            ROUTE_NAMES
        }
    },
    computed: {
        ...mapGetters(['allProducts', 'allCustomers']),

    },
    methods: {
        async filter() {
            try {
                const { data } = await search({
                    table: this.picked,
                    search: this.search
                })
                this.filtered = data
                console.log(this.filtered);

            } catch (error) {
                console.log(error);

            }
        }
        // filter() {
        //     const filterValue = this.allProducts.filter(({ productName }: any) =>
        //         (productName).toLowerCase().includes(this.search.toLowerCase()));
        //     this.filtered = filterValue
        // }
    }
});
</script>



















































<style lang="scss" src="./the-search.scss" />

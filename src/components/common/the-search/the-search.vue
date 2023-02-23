<template>
    <div
        :at-the-search="atAttribute"
        class="the-search"
    >
        <div class="search-card">
            <div class="search-card__wrapper">
                <p class="search-title font-medium">Search Database</p>

                <!-- <TheIcon icon="search" /> -->
                <input
                    class="card-input"
                    type="text"
                    v-model="search"
                    placeholder="Enter keyword..."
                    @keyup.enter="filter"
                />
            </div>

            <div class="radio">
                <p class="font-medium">Tables</p>
                <div class="radio-wrapper">
                    <label class="custom__radio">Products
                        <input
                            id="product"
                            type="radio"
                            name="radio"
                            value="products"
                            v-model="picked"
                        >
                        <span class="checkmark"></span>
                    </label>
                    <label class="custom__radio">Customers
                        <input
                            id="customer"
                            type="radio"
                            name="radio"
                            value="customers"
                            v-model="picked"
                        >
                        <span class="checkmark"></span>
                    </label>
                </div>
                
                <!-- <label class="radio-label" for="custom_radio">Product
                    <input
                        type="radio"
                        id="product"
                        checked
                        name="radio"                    
                        value="products"
                        v-model="picked"
                    />
                    <span class="checkmark"></span>
                </label>

                <label class="radio-label" for="custom_radio">Customer
                    <input
                        type="radio"
                        id="customer"
                        name="radio"                            
                        value="customers"
                        v-model="picked"
                    />
                    <span class="checkmark"></span>
                </label> -->
            </div>

            <div class="search">
                <p class="font-bold">Search results</p>
                <p v-if="result">No results</p>

                <div
                    class="product"
                    v-if="picked === 'products'"
                >
                    <div
                        class="search-result"
                        v-for="item in filtered"
                    >
                        <router-link class="link-style" :to="{ name: ROUTE_NAMES.PRODUCT_PROFILE, params: { id: item.categoryID } }">
                            {{ item.productName }}
                        </router-link>
                        <p class="search-details">#{{ item.productID }} Quantity Per Unit: {{
                            item.quantityPerUnit
                        }},
                            Price: {{ item.unitPrice }}, Stock: {{ item.unitsInStock }} </p>
                    </div>

                </div>

                <div
                    class="customer"
                    v-if="picked === 'customers'"
                >
                    <div
                        class="search-result"
                        v-for="item in filtered"
                    >
                        <router-link :to="{ name: ROUTE_NAMES.CUSTOMER_PROFILE, params: { id: item.customerID } }">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { mapGetters } from 'vuex';
import { search, TSearchTable } from '../../../api/interfaces';
import { ROUTE_NAMES } from '../../../constants/route-names-constants';
import TheIcon from '../the-icon';


export default defineComponent({
    name: 'TheSearch',
    components: {
        TheIcon
    },
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            result: true,
            search: '',
            picked: 'products' as TSearchTable,
            products: [] as any,
            customers: [],
            filtered: [] as any,
            ROUTE_NAMES
        }
    },
    watch: {
        picked() {
            this.filtered = [];
            this.filter()
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
                this.result = false
                this.filtered = data
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

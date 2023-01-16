<template>
    <div
        :at-the-search="atAttribute"
        class="the-search"
    >
        Search Database
        <div class="search-wrapper">
            <input
                type="text"
                v-model="search"
                placeholder="Enter keyword..."
            />
            <button
                type="submit"
                @click="filter()"
            >click</button>
        </div>

        <input
            type="radio"
            id="product"
            value="product"
            v-model="picked"
        />
        <label for="one">Product</label>
        <input
            type="radio"
            id="customer"
            value="customer"
            v-model="picked"
        />
        <label for="two">Customer</label>


        <div class="tables">
            <div class="product">
                <div
                    class="search-result"
                    v-for="item in filtered"
                >
                    {{ item.productName }}
                </div>
            </div>
            <!-- <div class="customer">
                <p>customer</p>
                <div
                    class="search-result"
                    v-for="item in  allCustomers "
                >
                    {{ item.customerID }}
                </div>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

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
            picked: '',
            products: [] as any,
            customers: [],
            filtered: []
        }
    },
    computed: {
        ...mapGetters(['allProducts', 'allCustomers']),
    },
    methods: {
        filter() {
            if (this.allProducts) {
                const filterValue = this.allProducts.filter(({ productName }: any) =>
                    (productName).toLowerCase().includes(this.search.toLowerCase()));
                this.filtered = filterValue
            }
        },
    }
});
</script>

































<style lang="scss" src="./the-search.scss" />

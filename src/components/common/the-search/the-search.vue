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
        </div>
        <div class="tables">
            <div class="product">product</div>
            <div class="customer">customer</div>
        </div>
        <div class="wrapper">
            <div
                class="search-result"
                v-for="item in productList"
            >
                <a
                    v-bind:href="item"
                    target="_blank"
                >
                    <!-- <img v-bind:src="item.img" /> -->
                    <small>posted by: {{ item }}</small>
                    {{ item }}
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
            productList: []
        }
    },
    methods: {
        
    }
});
</script>





<style lang="scss" src="./the-search.scss" />

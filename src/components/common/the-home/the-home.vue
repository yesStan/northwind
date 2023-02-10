<template>
    <div
        :at-the-home="atAttribute"
        class="the-home"
    >
        <div class="home-wrapper">
            <div class="main-title">
                <p class="title">Welcome to Northwind Traders</p>
                <h2 class="desc">Running on Cloudflare's D1</h2>
            </div>
            <div class="home">
                <div class="welcome">
                    <img
                        class="fl"
                        src="./../../../assets/img/base.jpg"
                        alt="bd-img"
                    >
                    <p class="text-base">This is a demo of the Northwind dataset, running on <a
                            href="#"
                            class="link"
                        >Cloudflare Workers</a>, and D1 -
                        Cloudflare's newest SQL database, running on SQLite.</p>
                    <p class="text-base">Read our <a
                            href="#"
                            class="link"
                        >D1 announcement</a> to learn more about D1.</p>
                    <p class="text-base">This dataset was sourced from <a
                            href="#"
                            class="link"
                        >northwind-SQLite3</a>.</p>

                </div>
            </div>
            <div class="text-bottom">
                <p class="text-base">You can use the UI to explore Supplies, Orders, Customers, Employees and Products,
                    or you can use search if you know what you're looking for.</p>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TheHome',
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    }
});
</script>





















<style lang="scss" src="./the-home.scss" />

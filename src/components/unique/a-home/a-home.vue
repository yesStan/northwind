<template>
    <div class="a-home">
        <div class="nav">nav</div>
        <div class="aside">
            <div class="side-logo">LOGO</div>
            <div class="side-tools">
                <div class="tools-label">
                    <div class="label-general--inactive">General-dis</div>
                    <div class="label-home">Home</div>
                    <div class="label-dashboard">Dashboard</div>
                    <div class="label-backoffice--inactive">Backoffice-dis</div>
                    <div class="label-suppliers">Suppliers</div>
                    <div class="label-products">Products</div>
                    <div class="label-orders">Orders</div>
                    <div class="label-employees">Employees</div>
                    <div class="label-customers">Customers</div>
                    <div class="label-search">Search</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AHome'
});
</script>



<style lang="scss" src="./a-home.scss" />

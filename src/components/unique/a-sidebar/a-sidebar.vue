<template>
    <div
        :at-a-sidebar="atAttribute"
        class="a-sidebar"
    >
        <ul class="sidebar__list">
            <li class="logo"><span class="logo_ttl">Northwind</span> Traders</li>
            <li class="disabled">GENERAL</li>
            <li class="list"><router-link
                    class="router-link"
                    to="/home"
                >
                    <TheIcon icon="home" />
                    <span class="text">Home</span>
                </router-link>
            </li>
            <li class="list"><router-link
                    class="router-link"
                    to="/dashboard"
                >
                    <TheIcon icon="display_settings" />
                    <span class="text">Dashboard</span>
                </router-link>
            </li>
            <li class="disabled">BACKOFFICE</li>
            <li class="list"><router-link
                    class="router-link"
                    to="/suppliers"
                >
                    <TheIcon icon="inventory" />
                    <span class="text">Suppliers</span>
                </router-link>
            </li>
            <li class="list"><router-link
                    class="router-link"
                    to="/products"
                >
                    <TheIcon icon="production_quantity_limits" />
                    <span class="text">Products</span>
                </router-link>
            </li>
            <li class="list"><router-link
                    class="router-link"
                    to="/orders"
                >
                    <TheIcon icon="shopping_cart" />
                    <span class="text">Orders</span>
                </router-link></li>
            <li class="list"><router-link
                    class="router-link"
                    to="/employees"
                >
                    <TheIcon icon="badge" />
                    <span class="text">Employees</span>
                </router-link>
            </li>
            <li class="list"><router-link
                    class="router-link"
                    to="/customers"
                >
                    <TheIcon icon="group" />
                    <span class="text">Customers</span>
                </router-link></li>
            <li class="list"><router-link
                    class="router-link"
                    to="/search"
                >
                    <TheIcon icon="search" />
                    <span class="text">Search</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheIcon from '../../common/the-icon'

export default defineComponent({
    name: 'ASidebar',
    components: {
        TheIcon
    },
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    }
});

</script>













<style lang="scss" src="./a-sidebar.scss" />

<template>
    <body>
        <div class="app-inner-wrap">
            <div class="header ">
                <AHeader/>
            </div>
            <div class="sidebar">
                <ASidebar />
                
            </div>
            <router-view class="view" />
        </div>
    </body>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import ASidebar from './../src/components/unique/a-sidebar'
import AHeader from './../src/components/unique/a-header'

export default defineComponent({
    name: 'App',
    components: {
        ASidebar, AHeader
    },
    async mounted() {
        this.$store.dispatch('fetchProducts');
        this.$store.dispatch('fetchCustomers');
        this.$store.dispatch('fetchOrders');
    },
})

</script>

<style lang="scss" src="./assets/scss/main.scss" />

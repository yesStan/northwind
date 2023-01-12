<template>
    <div
        :at-the-dashboard="atAttribute"
        class="the-dashboard"
    >
        This is TheDashboard
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TheDashboard',
    props: {
        /**
         * AQA attribute
         */
        atAttribute: {
            type: String,
            default: ''
        }
    }
});
</script>

<style lang="scss" src="./the-dashboard.scss" />

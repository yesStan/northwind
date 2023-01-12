<template>
    <div
        :at-the-home="atAttribute"
        class="the-home"
    >
        This is TheHome
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TheHome',
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

<style lang="scss" src="./the-home.scss" />

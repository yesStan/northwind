<template>
    <div
        :at-the-search="atAttribute"
        class="the-search"
    >
        This is TheSearch
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TheSearch',
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

<style lang="scss" src="./the-search.scss" />

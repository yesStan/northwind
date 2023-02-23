<template>
    <span
        :at-the-icon="atAttribute"
        class="material-icons the-icon"
    >
        {{ icon }}
    </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TheIcon',
    props: {
        atAttribute: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            required: true
        }
    }
});
</script>

<style lang="scss" src="./the-icon.scss" />

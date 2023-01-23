<template>
    <div
        :at-the-bbuton="atAttribute"
        class="the-bbuton"
    >
        <button
            class="button"
            type="button"
            @click="goBack"
        >Go Back</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'TheBbuton',
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    methods: {
        goBack() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
        }
    }
});
</script>





<style lang="scss" src="./the-bbuton.scss" />

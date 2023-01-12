<template>
    <div
        :at-a-header="atAttribute"
        class="a-header"
    >
        <div class="header-wrapper">
            <div class="time">{{ time }}</div>
            <div class="links">SQLite Links</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AHeader',
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            interval: Number(),
            time: '',
        }
    },
    beforeDestroy() {
        clearInterval(this.interval)
    },
    created() {
        this.interval = window.setInterval(() => {
            this.time = Intl.DateTimeFormat(navigator.language, {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            }).format()
        }, 1000)
    }
});
</script>



<style lang="scss" src="./a-header.scss" />

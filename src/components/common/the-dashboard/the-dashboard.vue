<template>
    <div
        :at-the-dashboard="atAttribute"
        class="the-dashboard"
    >
        <h1 class="text-rendering__title">Activity log</h1>
        <p class="metrics-title">Explore the app and see metrics here</p>
        <div
            class="query-items"
            v-for="items in allQueryInfo"
        >
            <div class="query-logs">
                <span class="text-rendering">SELECT: </span> {{ items.queryString }}<br>
                <span class="text-rendering">EXECUTIN TIME time: </span> {{ items.queryExecutionTime }} <br>
                <span class="text-rendering">TS: </span> {{ items.queryTS }}<br>
            </div> <br>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    name: 'TheDashboard',
    props: {
        atAttribute: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapGetters(['allQueryInfo']),
    }
});
</script>

<style lang="scss" src="./the-dashboard.scss" />

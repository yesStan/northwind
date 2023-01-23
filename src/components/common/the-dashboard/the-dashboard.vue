<template>
    <div
        :at-the-dashboard="atAttribute"
        class="the-dashboard"
    >
        <h1 class="text-rendering">Activity log</h1>
        <div
            class="query-items"
            v-for="items in allQueryInfo"
        >
            <div class="query-logs">
                <span class="text-rendering">string:</span> {{ items.queryString }}<br>
                <span class="text-rendering">ex time:</span> {{ items.queryExecutionTime }} <br>
                <span class="text-rendering">ts:</span> {{ items.queryTS }}<br>
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

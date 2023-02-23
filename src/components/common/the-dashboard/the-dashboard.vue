<template>
    <div
        :at-the-dashboard="atAttribute"
        class="the-dashboard"
    >
        <div class="metrics-wrapper">
            <div class="worker">
                <p class=" metrics-titles">Worker</p>
                <p class="metric-text">Colo: {{ colo }}</p>
                <div class="location">
                    <p class="metric-text">Country: {{ location }}</p>
                </div>
            </div>
            <div class="sql ">
                <p class=" metrics-titles">SQL Metrics</p>
                <p class="metric-text">Query count: {{ select + selectWhere + selectLeftJoin }}</p>
                <p class="metric-text">Results count: {{ count }}</p>
                <p class="metric-text"># SELECT: {{ select }}</p>
                <p class="metric-text"># SELECT WHERE:{{ selectWhere }}</p>
                <p class="metric-text"># SELECT LEFT JOIN: {{ selectLeftJoin }}</p>
            </div>
        </div>

        <h1 class="text-rendering__title">Activity log</h1>
        <p class="metrics-title">Explore the app and see metrics here</p>
        <div
            class="query-items"
            v-for="queryInfo in allQueryInfo"
        >
            <div class="query-logs">
                <template v-for="log in queryInfo.logs">
                    <div class="text-rendering">{{ log.queryTS }} {{ queryInfo.workerId }} {{ log.queryExecutionTime }}
                    </div>
                    <div class="text-render">{{ log.queryString }}</div> <br>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { airport } from '../../../services/airports';
import { api } from '../../../services/api';

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
            location: '',
            colo: ''
        }
    },
    async created() {
        await this.getGeo()
        await this.airport()
    },
    computed: {
        ...mapGetters(['allQueryInfo', 'count', 'selectLeftJoin', 'selectWhere', 'select']),
    },
    methods: {
        async getGeo() {
            const MY_KEY = 'b37c0ea307fa4016961cb192ed866d3c';

            try {
                const response = await axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${MY_KEY}`);
                this.location = response.data.country_name
            } catch (error) {
                console.log(error);
            }
        },

        async airport() {
            // const data = Object.entries(airport).reduce((acc, key, value) => {
            //     console.log(key);
            //     console.log(value);
            //     return {
            //         ...acc,
            //         [key]: [
            //             ...acc?.[key] || [],
            //             `${country},${city}, ${key} `
            //         ]
            //     }
            // }, 0);

            let shortCode = await Object.keys(airport).reduce((acc, key) => {
                let country = airport[key].country;
                let city = airport[key].city;

                return {
                    ...acc,
                    [country]: [{ city, key }] || []
                }
            }, []);

            if (shortCode[this.location]) {
                const shortKey = shortCode[this.location][0].key
                this.colo = shortKey
            } else {
                console.log('err', "location didnt found");
            }
        }
    }
});
</script>

<style lang="scss" src="./the-dashboard.scss" />

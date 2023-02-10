<template>
    <div
        :at-the-dashboard="atAttribute"
        class="the-dashboard"
    >
        <div class="metrics-wrapper">
            <div class="worker">
                <p class=" metrics-titles">Worker</p>
                <!-- //from backend -->
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
            <!-- <div class="query-logs">
                <span class="text-rendering"></span>  {{ items.queryInfo[0].queryTS }} {{ items.workerId }} {{ items.queryInfo[0].queryExecutionTime }} <br> 
                <span class="text-render">SELECT {{ items.queryInfo[0].queryString }} </span> <br><br>

                <span class="text-rendering"></span>  {{ items.queryInfo[0].queryTS }} {{ items.workerId }} {{ items.queryInfo[1].queryExecutionTime }}  <br>
                <span class="text-render">SELECT {{ items.queryInfo[1].queryString }} </span> <br><br>
            </div> <br> -->
        </div>
    </div>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { airport } from '../../../services/airports';


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

        // const location = navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => { this.location = position }, err => { console.log(err) });
    },
    computed: {
        ...mapGetters(['allQueryInfo', 'count', 'selectLeftJoin', 'selectWhere', 'select']),
    },
    methods: {
        async getGeo() {
            try {
                const response = await axios.get("https://ipinfo.io");
                this.location = response.data.country
                console.log(response);
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

            console.log('short', shortCode);
            console.log('location', this.location);
            console.log('founded', shortCode[this.location]);

            if (shortCode[this.location]) {
                const shortKey = shortCode[this.location][0].key
                this.colo = shortKey
            } else {
                console.log('err', "location didnt found");
            }
            // console.log('find', shortCode[this.location].find(item => item.key === this.location));
        }

        // reverseGeocode(coordinates) {
        //     const that = this;
        //     axios
        //         .get(`https://maps.google.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`)
        //         .then(response => {
        //             console.log(response.data)
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        //         .finally(() => this.loading = false)
        // }

        // decodeLatLong(position) {
        //     this.$gmapApiPromiseLazy().then(() => {
        //         // eslint-disable-next-line no-undef
        //         const geocoder = new google.maps.Geocoder()

        //         geocoder.geocode({ location: { lat: position.coords.latitude, lng: position.coords.longitude } }, (results, status) => {
        //             if (status === 'OK') {
        //                 this.getFromAutocomplete(results[0])
        //             }
        //         })
        //     })
        // }

    }
});
</script>








<style lang="scss" src="./the-dashboard.scss" />

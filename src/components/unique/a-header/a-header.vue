<template>
    <div
        :at-a-header="atAttribute"
        id="media"
        class="a-header"
    >
        <div class="header-wrapper">
            <div class="time">{{ time }}</div>
            <div class="links">
                <div class="dropdown-wrapper">
                    <button
                        v-on:click="show = !show"
                        class="text-white"
                    >
                        <TheIcon class="links-color" icon="menu" /> <span class="sql-lite__linqs">SQLite Links</span>
                        <TheIcon class="links-color" icon="keyboard_arrow_down" />
                    </button>

                    <div
                        class="dropdown-menu"
                        v-if="show"
                    >
                        <ul>
                            <li v-for="item in links">
                                <a class="header-links"
                                    href=""
                                ><TheIcon class="links-color" style="margin-right: 8px;" icon="link"/> {{ item }}</a>
                            </li>
                        </ul>
                    </div>
                    <div class="more-vert">
                        <TheIcon class="links-color" icon="more_vert" />
                    </div>

                </div>
            </div>
        </div>


    </div>
</template>

<script lang="ts">
import { right } from '@popperjs/core';
import { defineComponent } from 'vue';
import TheIcon from '../../common/the-icon';


export default defineComponent({
    name: "AHeader",
    props: {
        atAttribute: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            interval: Number(),
            time: "",
            show: false,
            links: [
                "Introducing D1",
                "SQLite SQL Flavour",
                "Durable Objects",
            ]
        };
    },
    beforeDestroy() {
        clearInterval(this.interval);
    },
    created() {
        this.interval = window.setInterval(() => {
            const date = new Date();
            const unformatedHours = String(date.getHours());
            const unformatedMinutes = String(date.getMinutes());
            const unformatedSeconds = String(date.getSeconds());
            
            const hours = unformatedHours.length === 1 ? `0${unformatedHours}` : unformatedHours;
            const minutes = unformatedMinutes.length === 1 ? `0${date.getMinutes()}` : date.getMinutes();
            const seconds = unformatedSeconds.length === 1 ? `0${date.getSeconds()}` : date.getSeconds();
            
            this.time = `${hours}:${minutes}:${seconds}`
        }, 1000);
    },
    components: { TheIcon }
});
</script>

<style lang="scss" src="./a-header.scss" />

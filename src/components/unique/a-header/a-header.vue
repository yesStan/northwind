<template>
    <div
        :at-a-header="atAttribute"
        class="a-header"
    >
        <div class="header-wrapper">
            <div class="time">{{ time }}</div>
            <div class="links">
                <div class="dropdown-wrapper">
                    <button
                        v-on:click="show = !show"
                        class="text-white"
                    >SQLite Links <i></i></button>

                    <div
                        class="dropdown-menu"
                        v-if="show"
                    >
                        <ul>
                            <li v-for="item in links">
                                <a
                                    href=""
                                    class=""
                                >{{ item }}</a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
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
            show: false,
            links: [
                'Introducing D1',
                'SQLite SQL Flavour',
                'Durable Objects',
            ]
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

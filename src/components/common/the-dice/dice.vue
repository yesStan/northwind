
<template>
    <img
        :src="avatar"
        alt="Avatar"
    />
</template>


<script lang="ts">

import { defineComponent, onMounted, ref } from 'vue';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';


export default defineComponent({
    name: 'dice',
    props: {
        seed: {
            type: String,
            default: ''
        }
    },
    setup(props) {

        const avatar = createAvatar(initials, {
            seed: props.seed,
            scale: 50,
            radius: 50,
            size: 25,
            fontSize: 100

        }).toDataUriSync();

        return {
            avatar
        }
    }
}
) 
</script>















<!-- <template>
    <div
        :at-the-avatar="atAttribute"
        class="the-avatar"
    >
        <div
            id="profileImage"
            class="extra-margin"
            :style="{ 'background': stringToHslColor(lastName || fullName) }"
        >

            {{ initials }}
            {{ separateCredentials }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'dice',
    props: {
        atAttribute: {
            type: String,
            default: ''
        },
        fullName: {
            type: String,
            default: ''
        },
        firstName: {
            type: String,
            default: ''
        },
        lastName: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            initials: '',
            separateCredentials: '',
        }
    },
    created() {
        this.getText();
        this.getFullName();
    },

    methods: {
        getText() {
            return this.separateCredentials = this.firstName.charAt(0) + this.lastName.charAt(0)
        },

        getFullName() {
            const preparedFullName = this.fullName.trim();
            const findFisrtName = preparedFullName.charAt(0)?.trim() || '';
            const findLastName = preparedFullName.split(' ')
            const findLastSymbol = findLastName[findLastName.length - 1]?.trim() || '';

            return this.initials = findFisrtName.charAt(0) + findLastSymbol.charAt(0)
        },

        stringToHslColor(str: any) {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);

            return `rgb(${r},${g},${b})`
        }

        // make permanent color based on letters
        // stringToHslColor(str:any) {
        //     let hash = 0;
        //     for (let i = 0; i < str.length; i++) {
        //         hash = str.charCodeAt(i) + ((hash << 10 ) - hash);
        //     }
        //     let h = hash % 360;
        //     return 'hsl(' + h + ', ' + 100 + '%, ' + 80 + '%)';
        // }
    }
});
</script>

<style lang="scss" src="./the-avatar.scss" /> -->

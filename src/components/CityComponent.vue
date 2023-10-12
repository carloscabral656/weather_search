<template>
    <div>
        <span>City: {{ city.name }}</span>
        <span>Country: {{ city.country }}</span>
        <span>State: {{ city.state }}</span>
    </div>
</template>


<style scoped>
</style>

<script lang="ts">
import City from '@/entites/City';
import { PropType, defineComponent } from 'vue';

export  default defineComponent({
    name: "CityComponent",
    props:{
        city: {
            type: Object as PropType<City>,
            required: true
        }
    }
})
</script>
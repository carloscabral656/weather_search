<template>
    <div class="city">
        <div><strong>City:</strong> {{ city.name }}</div>
        <div><strong>Country:</strong> <country-flag :country="city.country" size='small'/></div>
        <div><strong>State:</strong> {{ city.state }}</div>
    </div>
</template>


<style>
.city{
    padding: 1rem;
    border-radius: 20px;
    cursor: pointer;
}

.city:hover{
    background-color: rgb(206, 206, 206);
}

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
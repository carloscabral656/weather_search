<template>
    <div id="search-card">
        <font-awesome-icon id="location" :icon="['fas', 'location-dot']" size="xl" />
        <input type="text" id="search-input" placeholder="Search for a place">
        <font-awesome-icon id="glass" :icon="['fas', 'magnifying-glass']" />
    </div>
</template>



<style scoped>

#search-card{
    width: 60vw;
    height: 20vh;
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr 8fr 1fr;
    align-items: center;
}

    #search-input{
        padding: 10px;
        border-radius: 20px;
        border: 1px solid grey;
    }

    #search-input:focus{
        border: 1px solid grey;
    }

    #location{
        justify-self: center;
    }

    #glass{
        justify-self: center;
    }

#search-input{
    display: block;
}

</style>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "SearchComponent",
    components: {
    }
})
</script>
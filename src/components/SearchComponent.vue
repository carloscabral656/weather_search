<template>
    <div id="search-card">
        <font-awesome-icon id="location" :icon="['fas', 'location-dot']" size="xl" />
        <input type="text" id="search-input" placeholder="Search for a place" v-model="placeName">
        <font-awesome-icon id="glass" :icon="['fas', 'magnifying-glass']" @click="validatePlace"/>
    </div>
</template>



<style scoped>

#search-card{
    width: 30vw;
    height: 10vh;
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
        border: none;
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
import { useStore } from 'vuex';

export default defineComponent({
    name: "SearchComponent",
    data(){
        return {
            placeName: ''
        }
    },
    components: {
    },
    methods:{
        validatePlace(){
            if(this.placeName.trim().length === 0){
                alert("Input a place name.")
            }else{
                this.findPlace()
            }
        },
        findPlace(){
            this.store.dispatch('requestPlace', this.placeName)
        }
    },
    setup(){
        const store = useStore()
        return {
            store
        }
    }
})
</script>
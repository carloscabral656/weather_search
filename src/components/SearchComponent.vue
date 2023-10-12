<template>
    <div id="search-card">
        <font-awesome-icon id="location" :icon="['fas', 'location-dot']" size="xl" />
        <input type="text" id="search-input" placeholder="Search for a place" v-model="cityName">
        <font-awesome-icon id="glass" :icon="['fas', 'magnifying-glass']" @click="validatePlace"/>
    
        <div class="citys" v-if="citys">
            <CityComponent v-for="(city, index) in citys" :key="index" :city="city"/>
        </div>
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
import City from '@/entites/City';
import CityComponent from '@/components/CityComponent.vue'

export default defineComponent({
    name: "SearchComponent",
    data(){
        return {
            cityName: ''
        }
    },
    computed: {
        citys(): Array<City>{
            return this.store.getters.allCitys
        }
    },
    components: {
        CityComponent
    },
    methods:{
        validatePlace(){
            if(this.cityName.trim().length === 0){
                alert("Input a place name.")
            }else{
                this.findCity()
            }
        },
        findCity(){
            this.store.dispatch('requestCity', this.cityName)
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
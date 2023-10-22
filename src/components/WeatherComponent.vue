<template>
    <div id="weather"> 
        <div id="close">
            <ButtonComponent shape="CIRCLE" @click="clear">
                <strong>x</strong>
            </ButtonComponent>
        </div>
        <div id="scale">
            <ScaleComponent />
        </div>
        <div id="city">
            {{ chosenCity.name }}
        </div>
        <div id="weather_icon">
            <img :src=icon id="weather_img">
        </div>
        <div id="temperature"> {{ currentWeather.temperature.value }} <span id="scale">{{ currentWeather.temperature.scale.simbol }}</span> </div>
        <div id="weather_description">{{ currentWeather.main.toUpperCase() }}</div>
        <div id="other_informations">
            <div class="information">
                <div class="title">Wind</div>
                <div>{{ currentWeather.wind }} fps</div>
            </div>
            <div class="information">
                <div class="title">Humity</div>
                <div>{{ currentWeather.humidity }}%</div>
            </div>
            <div class="information">
                <div class="title">Feels Like</div>
                <div>{{ currentWeather.feelsLike }} K</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#weather{
    width: 400px;
    height: 70vh;
    background-color: aliceblue;
    border-radius: 20px;
    padding: 40px;
}

#close{
    display: flex;
    justify-content: right;
}

#city{
    height: 10%;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
}

#scale{
    padding: 5px;
    height: 10%;
    display: flex;
    justify-content: center;
}

#weather_icon{
    height: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#weather_img{
    width: 100px;
    height: 100px;
}

#temperature{
    height: 10%;
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
    display: flex;
    justify-content: center;
}

    #scale{
        font-size: 1.5rem;
    }

#weather_description{
    height: 10%;
    font-size: 2rem;
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
}

#other_informations{
    height: 10%;
    width: 100%;
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    text-align: center;
}

.information{
    padding: 20px;
}
    .title{
        font-weight: 700;
    }
</style>

<script lang="ts">
import City from '@/entites/City';
import ButtonComponent from './ButtonComponent.vue';
import ScaleComponent from '@/components/ScaleComponent.vue';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Weather from '@/entites/Weather';

export default defineComponent({
    name: "WeatherComponent",
    computed: {
        currentWeather(): Weather{
            return this.store.getters.currentWeather
        },

        chosenCity() : City{
            return this.store.getters.chosenCity
        },

        icon() : string{ 
            let t = this.store.getters.currentWeather.icon
            return `https://openweathermap.org/img/wn/${t}@2x.png`
        }
    },
    components: {
        ButtonComponent,
        ScaleComponent
    },
    methods: {
        clear(){
            this.store.dispatch('clearWeather')
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
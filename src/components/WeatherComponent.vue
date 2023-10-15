<template>
    <div id="weather"> 
        <div id="close">
            <ButtonComponent shape="CIRCLE" @click="clear">
                <strong>x</strong>
            </ButtonComponent>
        </div>
        <div id="scale">
            <select 
                name="" 
                id="" 
                v-model="nextScale" 
                @change="convertScale"
            >
                <option 
                    v-for="(scale, index) in scales" 
                    :key="index" 
                    :value="scale.id"
                >
                    {{ scale.name }}
                </option>
            </select>
        </div>
        <div id="city">
            {{ chosenCity.name }}
        </div>
        <div id="weather_icon">
            <img :src=icon id="weather_img">
        </div>
        <div id="temperature"> {{ currentWeather.temperature }} <span id="scale">K</span> </div>
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

#scale{
    padding: 5px;
    height: 10%;
    display: flex;
    justify-content: center;
}

    #scale select {
        height: 40px;
        width: 50%;
        padding: 10px;
        border-radius: 10px;
        border: none;
        outline: none;
    }

#city{
    height: 10%;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
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
import Weather from '@/entites/Weather';
import ButtonComponent from './ButtonComponent.vue';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Scale from '@/entites/Scale';
import { convertScale } from '@/mixins/Scales';

export default defineComponent({
    name: "WeatherComponent",
    data(){
        return {
            currentScale: 0,
            nextScale: 0
        }
    },
    computed: {
        chosenCity() : City{
            return this.store.getters.chosenCity
        },

        currentWeather(): Weather{
            return this.store.getters.currentWeather
        },

        icon() : string{ 
            let t = this.store.getters.currentWeather.icon
            return `https://openweathermap.org/img/wn/${t}@2x.png`
        },

        scales(): Array<Scale>{
            return this.store.getters.scales
        },

        getCurrentScale(): Scale{
            let scale = this.scales.find((s) => {
                return s.id === this.currentScale
            });
            if(!scale) scale = this.scales[0];
            return scale;
        },

        getNextScale(): Scale{
            let scale = this.scales.find((s) => {
                return s.id === this.nextScale
            });
            if(!scale) scale = this.scales[0];
            return scale;
        },
    },
    components: {
        ButtonComponent
    },
    mixins: [
        convertScale
    ],
    methods: {
        clear(){
            this.store.dispatch('clearWeather')
        },

        convertScale(){
            const currentScale: Scale = this.getCurrentScale;
            const nextScale: Scale = this.getNextScale;
            console.log(currentScale, nextScale);
            let newTemperature = 0;
            if(currentScale.simbol === 'K' && nextScale.simbol === 'F'){
                newTemperature = convertScale.kelvinToFahrenheit(this.currentWeather.temperature)
            }else if(currentScale.simbol === 'K' && nextScale.simbol === 'C'){
                newTemperature = convertScale.kelvinToCelsius(this.currentWeather.temperature)
            }
            this.store.dispatch('updateTemperature', newTemperature)
            this.currentScale = nextScale.id;
            this.nextScale = 0;
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
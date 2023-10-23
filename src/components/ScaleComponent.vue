<template>
    <select
        v-model="nextScaleId"
        @change="convertTemperature"
    >
        <option 
            v-for="(scale, index) in scales" 
            :key="index" 
            :value="scale.id"
            >
            {{ scale.name }}
        </option>
    </select>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import Scale from '@/entites/Scale';
import { convertScale } from '@/mixins/Scales';
import Temperature from '@/entites/Temperature';
import Weather from '@/entites/Weather';

export default defineComponent({
    name: "ScaleComponent",
    data(){
        return {
            nextScaleId: 1
        }
    },
    mixins: [
        convertScale
    ],
    computed: {
        currentWeather(): Weather{
            return this.store.getters.currentWeather
        },

        scales(): Array<Scale>{
            return this.store.getters.scales
        },

        getCurrentScale(): Scale{
            return this.store.getters.currentWeather.temperature.scale;
        },

        getNextScale(): Scale{
            let scale = this.scales.find((s) => {
                return s.id === this.nextScaleId
            });
            if(!scale) scale = this.scales[0];
            return scale;
        },
    },
    methods: {
        convertTemperature(){
            // Take the current scale in Temperature in Weather vuex attribute
            const currentScale: Scale = this.getCurrentScale;
            
            // Take the next scale in vuex attribute
            const nextScale   : Scale = this.getNextScale;
            
            // Here we convert the main temperature and the feels like temperature
            let newMainTemperatureValue = 0;
            let newFeelsLikeTemperatureValue = 0;
            if(currentScale.simbol === 'K' && nextScale.simbol === 'F'){
                newMainTemperatureValue = convertScale.kelvinToFahrenheit(this.currentWeather.temperature.value);
                newFeelsLikeTemperatureValue = convertScale.kelvinToFahrenheit(this.currentWeather.feelsLike.value);
            }else if(currentScale.simbol === 'K' && nextScale.simbol === 'C'){
                newMainTemperatureValue = convertScale.kelvinToCelsius(this.currentWeather.temperature.value);
                newFeelsLikeTemperatureValue = convertScale.kelvinToCelsius(this.currentWeather.feelsLike.value);
            }else if(currentScale.simbol === 'F' && nextScale.simbol === 'K'){
                newMainTemperatureValue = convertScale.fahrenheitToKelvin(this.currentWeather.temperature.value);
                newFeelsLikeTemperatureValue = convertScale.fahrenheitToKelvin(this.currentWeather.feelsLike.value);
            }else if(currentScale.simbol === 'F' && nextScale.simbol === 'C'){
                newMainTemperatureValue = convertScale.fahrenheitToCelsius(this.currentWeather.temperature.value);
                newFeelsLikeTemperatureValue = convertScale.fahrenheitToCelsius(this.currentWeather.feelsLike.value);
            }else if(currentScale.simbol === 'C' && nextScale.simbol === 'K'){
                newMainTemperatureValue = convertScale.celsiusToKelvin(this.currentWeather.temperature.value);
                newFeelsLikeTemperatureValue = convertScale.celsiusToKelvin(this.currentWeather.feelsLike.value);
            }else if(currentScale.simbol === 'C' && nextScale.simbol === 'F'){
                newMainTemperatureValue = convertScale.celsiusToFahrenheit(this.currentWeather.temperature.value);
                newFeelsLikeTemperatureValue = convertScale.celsiusToFahrenheit(this.currentWeather.feelsLike.value);
            }else{
                newMainTemperatureValue = this.currentWeather.temperature.value
                newFeelsLikeTemperatureValue = this.currentWeather.feelsLike.value
            }

            let newMaintemperature = new Temperature(newMainTemperatureValue, nextScale);
            let newFeelsLikeTemperature = new Temperature(newFeelsLikeTemperatureValue, nextScale);
            this.store.dispatch('updateMainTemperature', newMaintemperature);
            this.store.dispatch('updateFeelsLikeTemperature', newFeelsLikeTemperature);
        }   
    },
    setup(){
        const store = useStore();
        return {
            store
        }
    }
});
</script>


<style scoped>
    #scale select{
        height: 40px;
        width: 50%;
        padding: 10px;
        border-radius: 5px;
        border: none;
        outline: none;
        background-color: rgb(207, 207, 207);
    }

    #scale select option{
        background-color: rgb(207, 207, 207);
    }
</style>
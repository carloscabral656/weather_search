<template>
    <select 
        id="scale"
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

            let newTemperature = 0;
            if(currentScale.simbol === 'K' && nextScale.simbol === 'F'){
                newTemperature = convertScale.kelvinToFahrenheit(this.currentWeather.temperature.value)
            }else if(currentScale.simbol === 'K' && nextScale.simbol === 'C'){
                newTemperature = convertScale.kelvinToCelsius(this.currentWeather.temperature.value)
            }else if(currentScale.simbol === 'F' && nextScale.simbol === 'K'){
                newTemperature = convertScale.fahrenheitToKelvin(this.currentWeather.temperature.value)
            }else if(currentScale.simbol === 'F' && nextScale.simbol === 'C'){
                newTemperature = convertScale.fahrenheitToCelsius(this.currentWeather.temperature.value)
            }else if(currentScale.simbol === 'C' && nextScale.simbol === 'K'){
                newTemperature = convertScale.celsiusToKelvin(this.currentWeather.temperature.value)
            }else if(currentScale.simbol === 'C' && nextScale.simbol === 'F'){
                newTemperature = convertScale.celsiusToFahrenheit(this.currentWeather.temperature.value)
            }else{
                newTemperature = this.currentWeather.temperature.value
            }
            let temperature = new Temperature(newTemperature, nextScale);
            this.store.dispatch('updateTemperature', temperature)
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


<style>
#scale{
    font-size: 1rem;
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

    #scale select option{
        
    }
</style>
<template>
    <div id="weather" :style="style"> 
        <div id="close">
            <ButtonComponent shape="CIRCLE" @click="clear">
                <font-awesome-icon :icon="['fas', 'x']" />
            </ButtonComponent>
        </div>
        <div id="country">
            <font-awesome-icon :icon="['fas', 'location-dot']"/><span class="" style="margin-left: 5px;">{{ chosenCity.country }}</span>
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
        <div id="temperature"> {{ currentWeather.temperature.value }} <span id="scale">{{ currentWeather.temperature.scale.simbol }} </span></div>
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
                <div>{{ currentWeather.feelsLike.value }} {{ currentWeather.feelsLike.scale.simbol }}</div>
            </div>
        </div>
        <div id="part_of_day">
            {{ currentTimeZone }}
            <div>{{ new Date(chosenCity.timeZone!.formatted).toISOString().split('T')[0].replaceAll('-', '/') }}</div>
        </div>
    </div>
</template>

<style scoped>
#weather{
    width: 400px;
    height: 80vh;
    background-color: aliceblue;
    border-radius: 20px;
    padding: 40px;
}

#country {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
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

#city{
    height: 10%;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
}

#weather_icon{
    height: 35%;
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

#part_of_day{
    height: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
import { PartsOfDay } from '@/enums/PartsOfDay'
import { Colors } from '@/enums/Colors'

export default defineComponent({
    name: "WeatherComponent",
    computed: {
        currentWeather() : Weather {
            return this.store.getters.currentWeather
        },

        chosenCity() : City {
            return this.store.getters.chosenCity
        },

        icon() : string { 
            let t = this.store.getters.currentWeather.icon
            return `https://openweathermap.org/img/wn/${t}@2x.png`
        },

        currentTimeZone(){
            let hours = 0
            if(this.chosenCity.timeZone){
                hours = new Date(this.chosenCity.timeZone!.formatted).getHours(); 
            }
            if(hours >= 6 && hours <= 12){
                return PartsOfDay.MORNING
            }else if(hours <= 17){
                return PartsOfDay.AFTERNOON
            }else if(hours <= 19){
                return PartsOfDay.EVENING
            }else {
                return PartsOfDay.NIGHT
            }
        },

        style(){
            let backgroundColor = '';
            if(this.currentTimeZone === PartsOfDay.MORNING){
                backgroundColor = Colors.MORNING_COLOR
            }else if(this.currentTimeZone === PartsOfDay.AFTERNOON){
                backgroundColor = Colors.AFTERNOON_COLOR
            }else if(this.currentTimeZone === PartsOfDay.EVENING){
                backgroundColor = Colors.EVENING_COLOR
            }else if(this.currentTimeZone === PartsOfDay.NIGHT){
                backgroundColor = Colors.NIGHT_COLOR
            }
            return `background-color: ${backgroundColor}`;
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
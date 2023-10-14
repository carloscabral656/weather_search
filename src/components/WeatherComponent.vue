<template>
    <div id="weather">
        <div id="city">{{ chosenCity.name }}</div>
        <div id="weather_icon">
            <svg height="300px" width="400px"  viewBox="0 0 57.587 57.587" xmlns="http://www.w3.org/2000/svg"><title/><circle cx="28.398" cy="28.696" fill="#f5ce42" r="16.948"/>
            </svg>
        </div>
        <div id="temperature"> {{ currentWeather.temperature }} <span id="scale">K</span> </div>
        <div id="weather_description">{{ currentWeather.description.toUpperCase() }}</div>
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
    width: 500px;
    height: 70vh;
    background-color: aliceblue;
    border-radius: 20px;
    padding: 20px;
}

#city{
    height: 10%;
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
}

#weather_icon{
    height: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
}

#weather_img{
    justify-content: center;
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
import { capitalize, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
    name: "WeatherComponent",
    computed: {
        chosenCity() : City{
            return this.store.getters.chosenCity
        },

        currentWeather(): Weather{
            return this.store.getters.currentWeather
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
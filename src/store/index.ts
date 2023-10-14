import City from '@/entites/City';
import Weather from '@/entites/Weather';
import clientHtttp from '@/http/ClientHttp'
import { PropType } from 'vue';
import { createStore } from 'vuex'

export default createStore({
  state: {
    citys: [] as Array<City>,
    chosenCity: {} as City,
    weather: {} as Weather
  },
  getters: {
    allCitys: state => {
      return state.citys
    },

    chosenCity: (state) => {
      return state.chosenCity
    },

    currentWeather: (state) => {
      return state.weather
    }
  },
  mutations: {

    storeCitys(store, data){
      const citys = [] as City[];
      data.forEach((c: any, _: any) => {
        console.log(c)
        const city = new City(c.name, c.lat, c.lon, c.country, c.state);
        citys.push(city)
      });
      store.citys = citys
    },

    addChosenCity(store, city){
      store.chosenCity = city
    },

    storeWeather(store, weather){
      const w = weather.weather[0];
      const t = weather.main.temp;
      const wind = weather.wind.speed;
      const humidity = weather.main.humidity;
      const feelsLike = weather.main.feels_like;
      store.weather = new Weather(
        w.id,
        w.main,
        w.description,
        w.icon,
        t,
        wind,
        humidity,
        feelsLike
      )
    }

  },
  actions: {
    requestCity({commit}, cityName){
      clientHtttp
      .get(`geo/1.0/direct?q=${cityName}&limit=5&appid=bb4059789b4600a1149933bb891ee09b`)
      .then((response) => {
        commit('storeCitys', response.data)
      });
    },

    requestWeather({commit}){
      if(this.getters.chosenCity instanceof City){
        clientHtttp
        .get(`/data/2.5/weather?lat=${this.getters.chosenCity.lat}&lon=${this.getters.chosenCity.long}&appid=bb4059789b4600a1149933bb891ee09b`)
        .then((response) => {
          commit('storeWeather', response.data)
        });
      }
    },

    chosenCity({commit}, city){
      commit('addChosenCity', city)
    }
  },
  modules: {
  }
})

import City from '@/entites/City';
import Scale from '@/entites/Scale';
import Temperature from '@/entites/Temperature';
import TimeZone from '@/entites/TimeZone';
import Weather from '@/entites/Weather';
import clientCountryHttp from '@/http/ClientCountryHttp';
import clientHtttp from '@/http/ClientHttp'
import clientTimeHttp from '@/http/ClientTimeHttp';
import { createStore } from 'vuex'

export default createStore({

  
  state: {
    citys: [] as Array<City>,
    chosenCity: {} as City,
    weather: {} as Weather,
    scales: [
      new Scale(1, 'Kelvin', 'K'),
      new Scale(2, 'Fahrenheit', 'F'),
      new Scale(3, 'Celsius', 'C')
    ] as Array<Scale>
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
    },

    scales: (state) : Array<Scale> => {
      return state.scales
    },

    getScaleBySimbol: (state, simbol) => {
      return state.scales.find((s) => {
        return s.simbol === simbol;
      });
    }
  },


  mutations: {

    storeCitys(store, data){
      const citys = [] as City[];
      data.forEach((c: any, _: any) => {
        const city = new City(c.name, c.lat, c.lon, c.country, c.state);
        citys.push(city)
      });
      store.citys = citys
    },

    storeWeather(store, weather){
      const w = weather.weather[0];
      const t = new Temperature(
        Math.ceil(Number(weather.main.temp)),
        new Scale(1, 'Kelvin', 'K')
      );
      const feelsLike = new Temperature(
        Math.ceil(weather.main.feels_like), 
        new Scale(1, 'Kelvin', 'K')
      );
      const wind = weather.wind.speed;
      const humidity = weather.main.humidity;
  
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
    },

    storeCountry(store, country){
      console.log(country)
      store.chosenCity.country = country.name.common
    },

    addChosenCity(store, city){
      store.chosenCity = city
    },

    addTimeZone(store, timeZone){
      const time = new TimeZone(timeZone.timestamp, timeZone.formatted);
      store.chosenCity.timeZone = time;
    },

    clearWeather(store){
      store.weather = {} as Weather
      store.chosenCity = {} as City
    },

    updateMainTemperature(store, newTemperature: Temperature){
      store.weather.temperature = newTemperature;
    },

    updateFeelsLikeTemperature(store, newTemperature: Temperature){
      store.weather.feelsLike = newTemperature;
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

    requestCountry({commit}, acronym){
        clientCountryHttp
        .get(`/alpha/${acronym}`)
        .then(response => {
          commit('storeCountry', response.data[0])
        });
    },

    requestTimeZone({commit}){
      clientTimeHttp
      .get(`/v2.1/get-time-zone?key=JG65R86GXSK3&format=json&by=position&lat=${this.getters.chosenCity.lat}&lng=${this.getters.chosenCity.long}`)
      .then(response => {
        console.log(response.data)
        commit('addTimeZone', response.data)
      });
    },

    chosenCity({commit}, city){
      commit('addChosenCity', city)
      this.dispatch('requestCountry', city.country)
      this.dispatch('requestTimeZone')
    },

    clearWeather({commit}){
      commit('clearWeather')
    },

    updateMainTemperature({commit}, newValue){
      commit('updateMainTemperature', newValue)
    },

    updateFeelsLikeTemperature({commit}, newValue){
      commit('updateFeelsLikeTemperature', newValue)
    }

  },


  modules: {
  }
})

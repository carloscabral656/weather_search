import City from '@/entites/City';
import clientHtttp from '@/http/ClientHttp'
import { createStore, storeKey } from 'vuex'

export default createStore({
  state: {
    citys: [] as Array<City>
  },
  getters: {
    allCitys: state => {
      return state.citys
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
    }
  },
  actions: {
    requestCity({commit}, cityName){
      clientHtttp
      .get(`geo/1.0/direct?q=${cityName}&limit=5&appid=bb4059789b4600a1149933bb891ee09b`)
      .then((response) => {
        commit('storeCitys', response.data)
      });
    }
  },
  modules: {
  }
})

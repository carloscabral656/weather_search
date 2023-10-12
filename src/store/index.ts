import clientHtttp from '@/http/ClientHttp'
import { createStore } from 'vuex'

export default createStore({
  state: {
    place: {}
  },
  getters: {
  },
  mutations: {
    findPlace(store, place){
      store.place = place
    }
  },
  actions: {
    requestPlace({commit}, placeName){
      clientHtttp
      .get(`geo/1.0/direct?q=${placeName},BR-MG,BR&limit=1&appid=bb4059789b4600a1149933bb891ee09b`)
      .then((response) => {
        console.log(response.data[0])
        commit('findPlace', response.data[0])
      });
    }
  },
  modules: {
  }
})

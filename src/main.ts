import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import CountryFlag from 'vue-country-flag-next'


/* add icons to the library */
library.add(faLocationDot)
library.add(faMagnifyingGlass)
library.add(faX)

createApp(App)
.component('fa-location-dot', faLocationDot)
.component('fa-x', faX)
.component('font-awesome-icon', FontAwesomeIcon)
.component('country-flag', CountryFlag)
.use(store)
.use(router)
.mount('#app')

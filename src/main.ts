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
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faLocationDot)
library.add(faMagnifyingGlass)

import CountryFlag from 'vue-country-flag-next'

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.component('country-flag', CountryFlag)
.use(store)
.use(router)
.mount('#app')

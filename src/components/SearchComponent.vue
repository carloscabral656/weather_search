<template>
    <div id="search-component" :class="citys.length > 0 ? 'slide-top' : 'slide-center'">
        <div id="search">
            <font-awesome-icon id="location" :icon="['fas', 'location-dot']" size="xl" />
            <input type="text" id="search-input" placeholder="Search for a place" v-model="cityName">
            <ButtonComponent shape="CIRCLE" @click="validatePlace">
                <font-awesome-icon id="glass" :icon="['fas', 'magnifying-glass']" />
            </ButtonComponent>
        </div>
        <div id="citys" v-if="citys.length > 0" class="fade-in-bck">
            <CityComponent v-for="(city, index) in citys" :key="index" :city="city"/>
        </div>
    </div>
</template>



<style>

#search-component{
    background-color: white;
    width: 30vw;
    border-radius: 20px;
}

    #search{
        padding: 4%;
        display: grid;
        grid-template-columns: 1fr 8fr 1fr;
        align-items: center;
    }

    #search-input{
        max-width: 100%;
        padding: 10px;
        border-radius: 20px;
        border: none;
    }

    #search-input:focus{
        outline: none;
    }

    #location{
        justify-self: center;
    }

    #glass{
        justify-self: end;
    }

    #citys{
        padding: 4%;
    }


.slide-top {
	-webkit-animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@-webkit-keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-50vh);
            transform: translateY(-50vh);
  }
}

@keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-100px);
            transform: translateY(-100px);
  }
}

.slide-center {
	-webkit-animation: slide-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

 @-webkit-keyframes slide-center {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(50vh);
            transform: translateY(50vh);
  }
}
@keyframes slide-center {
  0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(100px);
            transform: translateY(100px);
  }
}



.fade-in-bck {
	-webkit-animation: fade-in-bck 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
    animation: fade-in-bck 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes fade-in-bck {
  0% {
    -webkit-transform: translateZ(80px);
            transform: translateZ(80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes fade-in-bck {
  0% {
    -webkit-transform: translateZ(80px);
            transform: translateZ(80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}


.fade-out {
	-webkit-animation: fade-out 1s ease-out both;
	animation: fade-out 1s ease-out both;
}

 @-webkit-keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}



</style>


<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import City from '@/entites/City';
import CityComponent from '@/components/CityComponent.vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

export default defineComponent({
    name: "SearchComponent",
    data(){
        return {
            cityName: ''
        }
    },
    computed: {
        citys(): Array<City>{
            return this.store.getters.allCitys
        }
    },
    components: {
        CityComponent,
        ButtonComponent
    },
    methods:{
        validatePlace(){
            if(this.cityName.trim().length === 0){
                alert("Input a place name.")
            }else{
                this.findCity()
            }
        },
        findCity(){
            this.store.dispatch('requestCity', this.cityName)
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
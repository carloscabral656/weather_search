<template>
  <main>
    <SearchComponent />
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,300;0,400;0,500;1,100;1,600&display=swap');

:root{
  --bk-main: rgb(11, 9, 32);
  --bk-search: white;
}

body{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

#app{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bk-main);
}

</style>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchComponent from '@/components/SearchComponent.vue';

export default defineComponent({
  name: "App",
  components: {
    SearchComponent
  }
})
</script>

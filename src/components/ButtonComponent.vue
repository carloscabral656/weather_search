<template>
    <div :style="style">
        <slot></slot>
    </div>
</template>

<style scoped>
</style>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "ButtonComponent",
    props: {
        shape: String
    },
    computed: {
        style(){
            let style = ""
            if(this.shape == "CIRCLE"){
                style += ' border-radius: 50%;'
            }
            style += ' background-color: rgb(206, 206, 206);';
            style += ' width: 30px;';
            style += ' height: 30px;';
            style += ' display: flex;';
            style += ' align-items: center;';
            style += ' justify-content: center;';
            style += ' cursor: pointer;';
            return style;
        }
    }
});
</script>
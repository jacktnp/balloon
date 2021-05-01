<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from "@/store/index";

export default {
  store,
  name: 'App'
}
</script>

<style>
#app {
  
}

.container {
  max-width: 480px !important;
}
</style>

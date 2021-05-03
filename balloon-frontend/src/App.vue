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
  min-height: 100vh;
  background: #F1F1F1;
}

.container {
  /* max-width: 480px !important; */
}

.bg-success, .btn-success {
  background: #4E9C81 !important;
  border-color: transparent !important;
}

.bg-primary, .btn-primary {
  background: #72A3BC !important;
  border-color: transparent !important;
}
</style>

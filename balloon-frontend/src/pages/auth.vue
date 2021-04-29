<template>
  <b-container class="d-flex align-items-center justify-content-center" style="height: 100vh;">
    <b-form class="w-75" @click="authLogin">
      <b-form-group>
        <b-form-input
          v-model="username"
          type="text"
          placeholder="User name"
          
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="password"
          type="password"
          placeholder="Password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button class="w-100" type="submit" variant="success">Login</b-button>
    </b-form>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
      authLogin() {

      }
  }
};
</script>

<style scoped>
input::placeholder {
    text-align: center;
}
</style>
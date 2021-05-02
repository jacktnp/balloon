<template>
  <b-container
    class="d-flex align-items-center justify-content-center"
    style="height: 100vh;"
  >
    <b-form class="w-75" @submit.prevent="authLogin">
      <p class="text-center">
        <img src="../assets/logo2.png" class="w-75 mb-3" />
      </p>
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
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" class="w-100" variant="success">Login</b-button>
    </b-form>
  </b-container>
</template>

<script>
import axios from "@/store/api";

export default {
  data() {
    return {
      username: "it60070046",
      password: "OXOlhm86"
    };
  },
  methods: {
    authLogin() {
      axios
        .post("login", {
          email: this.username
          // password: this.password
        })
        .then(
          response => {
            // Store & Redirect
            this.$store.commit("setUser", response.data);

            if (response.data.data.user.role == "support") {
              this.$router.push({ name: "adminindex" });
            } else {
              this.$router.push({ name: "userindex" });
            }
          },
          error => {
            alert("error");
          }
        );
    },
    checkAuth() {
      if (localStorage.getItem("balloon") != null) {
        if (this.$store.getters.info.user.role == "student") {
          this.$router.push({ name: "userindex" });
        } else if (this.$store.getters.info.user.role == "support") {
          this.$router.push({ name: "adminindex" });
        }
      }
    }
  },
  mounted() {
    this.checkAuth();
  }
};
</script>

<style scoped>
input {
  text-align: center;
}

input::placeholder {
  text-align: center;
}
</style>

<template>
  <div
    class="h-screen md:w-1/5 w-full container mx-auto p-5 flex flex-col items-center"
  >
    <input
      class="form-input block border w-full rounded-md shadow-sm mt-6"
      type="text"
      placeholder="User name"
      v-model="username"
    />
    <input
      class="form-input block border w-full rounded-md shadow-sm mt-4"
      type="password"
      placeholder="Password"
      v-model="password"
    />
    <button
      class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-4"
      @click="login"
    >
      Login
    </button>
  </div>
</template>
<script>
export default {
  layout: 'session',
  data() {
    return {
      username: "sp1",
      password: "",
    };
  },
  methods: {
    async login() {

      const payload = {
        email: this.username,
        // password: this.password
      };

      try {
        await this.$auth.loginWith("local", {
          data: payload,
        });
        console.log("Login success with", this.username)
        this.$router.push({ path: '/support' })
      } catch (e) {
        console.log(e)
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
input {
  text-align: center;
}

::-webkit-input-placeholder {
  text-align: center;
}

:-moz-placeholder {
  /* Firefox 18- */
  text-align: center;
}

::-moz-placeholder {
  /* Firefox 19+ */
  text-align: center;
}

:-ms-input-placeholder {
  text-align: center;
}
</style>

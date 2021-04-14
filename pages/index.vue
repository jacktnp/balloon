<template>
  <div>
    หน้าแรก
    <!-- <p>{{ user }}</p> -->
    <p>Login : {{ loggedIn }}</p>
    <button @click="logout" class="button--grey">Logout</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>
<style lang=""></style>

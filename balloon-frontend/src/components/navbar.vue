<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand :to="{ name: 'index' }">
      <img src="../assets/logo3.png" style="width: 100px" v-if="locals.role == 'support'" />
      <img src="../assets/logo2.png" style="width: 100px" v-if="locals.role == 'student'" />
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Student -->
      <b-navbar-nav class="ml-auto" v-if="locals.role == 'student'">
        <b-nav-item :to="{ name: 'userindex' }">Home</b-nav-item>
        <b-nav-item :to="{ name: 'userbrowse' }">Browse</b-nav-item>
        <b-nav-item :to="{ name: 'userstatus' }">Status</b-nav-item>
        <b-nav-item :to="{ name: 'supporterActive' }">Supporter</b-nav-item>
        <b-nav-item :to="{ name: 'userprofile' }">Profile</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto" v-else-if="locals.role == 'support'">
        <b-nav-item :to="{ name: 'adminindex' }">Home</b-nav-item>
        <b-nav-item :to="{ name: 'adminmanagement' }">Management</b-nav-item>
        <b-nav-item :to="{ name: 'adminstatus' }">Status</b-nav-item>
        <b-nav-item :to="{ name: 'adminhistory' }">History</b-nav-item>
        <b-nav-item :to="{ name: 'adminprofile' }">Profile</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import axios from "@/store/api";

export default {
  data() {
    return {
      locals: ""
    };
  },
  methods: {
    checkToken() {
      setTimeout(() => {
        this.locals = this.$store.getters.info.user;
      }, 500);
    }
  },
  mounted() {
    this.checkToken();
  }
};
</script>

<style scoped>
.navbar-light .navbar-toggler {
  border: 0px !important;
}

.bg-light {
  background: #fff !important;
}
</style>

<template>
  <b-navbar toggleable="lg" type="light" variant="light">
    <b-navbar-brand :to="{ name: 'index' }">
      <img src="../assets/logo2.png" style="width: 100px" />
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Student -->
      <b-navbar-nav
        class="ml-auto"
        v-if="$store.getters.info.user.role == 'student'"
      >
        <b-nav-item :to="{ name: 'userindex' }">Home</b-nav-item>
        <b-nav-item :to="{ name: 'userbrowse' }">Browse</b-nav-item>
        <b-nav-item>History</b-nav-item>
        <b-nav-item :to="{ name: 'userprofile' }">Profile</b-nav-item>
        <b-nav-item :to="{ name: 'supporterActive' }">Supporter</b-nav-item>
        <b-button class="btn-sm" variant="primary" :to="{ name: 'logout' }"
          >{{ username }} ({{ role }})</b-button
        >
      </b-navbar-nav>

      <b-navbar-nav
        class="ml-auto"
        v-else-if="$store.getters.info.user.role == 'support'"
      >
        <b-nav-item :to="{ name: 'adminindex' }">Home</b-nav-item>
        <b-nav-item :to="{ name: 'adminmanagement' }">Management</b-nav-item>
        <b-nav-item>Status</b-nav-item>
        <b-nav-item :to="{ name: 'adminhistory' }">History</b-nav-item>
        <b-nav-item :to="{ name: 'adminprofile' }">Profile</b-nav-item>

        <b-button class="btn-sm" variant="primary" :to="{ name: 'logout' }"
          >{{ username }} ({{ role }})</b-button
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      role: ""
    };
  },
  methods: {
    checkToken(){
      
    }
  },
  mounted() {
    this.checkToken();
    this.username = this.$store.getters.info.user.email;
    this.role = this.$store.getters.info.user.role;
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

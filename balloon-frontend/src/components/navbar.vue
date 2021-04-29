<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand :to="{ name: 'index'}">LOGO</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <!-- Student -->
          <b-nav-item :to="{ name : 'userindex' }">Home</b-nav-item>
          <b-nav-item :to="{ name : 'userbrowse' }">Browse</b-nav-item>
          <!-- <b-nav-item :to="{ name : 'userhistory' }">History</b-nav-item> -->
          <b-nav-item :to="{ name : 'userprofile' }">Profile</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

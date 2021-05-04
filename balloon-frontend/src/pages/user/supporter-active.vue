<template>
  <div>
    <navbar />
    <b-container class="w-75 p-0">
      <h5 class="mt-4 font-weight-light">Supporter Active</h5>
      <hr class="mb-4" />

      <div class="row mt-3" id="headingrow" v-for="(support, index) in support" :key="index">
        <div class="col-4 col-md-2">
          <img :src="support.img[0].url" class="w-100 rounded-pill" v-if="support.img.length > 0" />
        </div>
        <div class="col-8 col-md-10">
          <h6 class="mt-2 mb-0">{{ support.fullname || support.email }}</h6>
          <small>{{ support.contract }}</small>
          <br>
          <small class="text-danger" v-if="support.status == 'inactive'">Inactive</small>
          <small class="text-success" v-if="support.status == 'active'">Active</small>
        </div>
      </div>

    </b-container>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import axios from "@/store/api";

export default {
  components: { navbar },
  data() {
    return {
      support: []
    };
  },
  methods: {
    getSupportAvalible() {
      axios
        .get("user/support/check", {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            this.support = res.data.user;
          },
          err => {
            this.$router.push({ name: 'logout'});
            console.log(err);
          }
        );
    }
  },
  mounted() {
      this.getSupportAvalible();
  }
};
</script>

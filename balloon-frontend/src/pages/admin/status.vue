<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h5 class="mt-4 font-weight-light">Status</h5>
      <hr class="mb-4" />
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="uncomplete" active>
            <b-card-text>
                <div class="row">
                    <img src="https://portfolio.suphakitnch.com/ProjectImg/pro_img.JPG" alt="" class="col-3">
                    <div class="col-9">
                     p
                    </div>
                </div>
            </b-card-text>
            <b-card-text>Tab contents 1</b-card-text>
            <b-card-text>Tab contents 1</b-card-text>
            <b-card-text>Tab contents 1</b-card-text>
          </b-tab>
          <b-tab title="late"><b-card-text>Tab contents 2</b-card-text></b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import axios from "@/store/api";
export default {
  components: { navbar },
  methods: {
    getstatus() {
      axios
        .get("borrow", {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token,
          },
        })
        .then(
          (res) => {
            console.log(res.data);
          },
          (err) => {
            console.log(err);
          }
        );
    },
  },
  mounted() {
    // this.getstatus();
    const a = new Date("Mon Apr 14 2021 17:34:30 GMT+0700 (เวลาอินโดจีน)");
    const b = new Date("Mon Apr 12 2021 17:34:30 GMT+0700 (เวลาอินโดจีน)");
    console.log(a);
    console.log(a.getTime() > b.getTime());
  },
};
</script>
<style>
.nav-link {
  background-color: #cbd2da69;
}
.nav-link.active {
  background-color: #ff0505ec !important;
}
</style>
<template>
  <div>
    <navbar />
    <b-container class="w-75 p-0">
      <h5 class="mt-4 font-weight-light">History</h5>
      <hr class="mb-4" />

      <div
        class="card mb-3 border-0"
        style="background: transparent"
        v-for="(data, index) in history"
        :key="index"
        @click="openModal(data)"
      >
        <div class="row" id="headingrow">
          <div class="col-12">
            <p class="mb-0"><i class="far fa-clock"></i> {{ convertDate(data.date_return) }}</p>
            <small><b>Count : </b> {{ data.device.length }} ชิ้น</small>
          </div>
        </div>
        <hr />
      </div>
    </b-container>

    <b-modal id="modal-history" centered hide-footer v-if="historySelect != null">
      <b-row>
        <b-col cols="4">
          <img :src="historySelect.user[0].img[0].url" class="w-100 rounded-pill" />
        </b-col>
        <b-col cols="8" class="d-flex flex-column justify-content-center">
          <p class="mb-0">{{ historySelect.user[0].fullname }}</p>
          <small><b>User ID : </b>{{ historySelect.email }}</small>
          <small><b>Contact : </b> {{ historySelect.user[0].contract }}</small>
        </b-col>
      </b-row>
      <br>
      <div
        class="card px-3 border-0"
        v-for="(device, index) in historySelect.device"
        :key="index"
      >
        <p class="mb-0">{{ device.name_type }}</p>
        <small>Device ID : {{ device.code_device }}</small>
        <hr>
      </div>
    </b-modal>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import axios from "@/store/api";

export default {
  components: {
    navbar
  },
  data() {
    return {
      history: [],
      historySelect: null
    };
  },
  methods: {
    getHistory() {
      axios
        .get("borrow/device/history-user-borrow/" + this.$store.getters.info.user.email, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            this.history = res.data.borrow.sort((a,b) => (a.date_return < b.date_return)-(a.date_return > b.date_return));
          },
          err => {
            console.log(err);
          }
        );
    },
    openModal(data) {
      this.$bvModal.show("modal-history");
      this.historySelect = data;
    },
    convertDate(date) {
      var today = new Date(date);
      var dd = today.getDate();

      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = "0" + dd;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }
      today = dd + "/" + mm + "/" + yyyy;
      return today;
    },
    sortedArray(data) {
      function compare(a, b) {
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;
      }

      return this.arrays.sort(compare);
    }
  },
  mounted() {
    this.getHistory();
  }
};
</script>

<style scoped>
.modal-header  {
    border-bottom: 0px solid #fff !important;
}
</style>
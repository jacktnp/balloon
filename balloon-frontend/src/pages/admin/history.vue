<template>
  <div>
    <navbar />
    <b-container class="w-75 p-0">
      <h5 class="mt-4 font-weight-light">History</h5>
      <hr class="mb-4" />

      <div
        class="card mb-3 border-0 pointer"
        style="background: transparent"
        v-for="(data, index) in history"
        :key="index"
        @click="openModal(index)"
      >
        <div class="row" id="headingrow">
          <div class="col-4">
            <img :src="data.user[0].img[0].url" class="w-100 rounded-pill" />
          </div>
          <div class="col-8 p-0">
            <p class="mb-0">{{ data.user[0].fullname }}</p>
            <small>{{ data.email }}</small>
            <br />
            <small
                ><i class="far fa-box-open"></i> x{{ data.device.length }}  
                <i class="far fa-clock ml-3"></i> {{ convertDate(data.date_return) }}
              </small>
          </div>
        </div>
        <hr />
      </div>
    </b-container>

    <b-modal id="modal-history" class="pt-0" centered hide-footer v-if="index != null">
      <b-row>
        <b-col cols="4">
          <img :src="history[index].user[0].img[0].url" class="w-100 rounded-pill" />
        </b-col>
        <b-col cols="8" class="d-flex flex-column justify-content-center">
          <p class="mb-0">{{ history[index].user[0].fullname }}</p>
          <small><b>User ID : </b>{{ history[index].email }}</small>
          <small><b>Contact : </b> {{ history[index].user[0].contract }}</small>
        </b-col>
      </b-row>
      <hr />
      
      <div
        class="card border-0 px-3"
        v-for="(device, index) in history[index].device"
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
      index: null
    };
  },
  methods: {
    getHistory() {
      axios
        .get("borrow/support/history-all-borrow", {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            this.history = res.data.borrow;
          },
          err => {
            this.$router.push({ name: 'logout'});
            console.log(err);
          }
        );
    },
    openModal(index) {
      this.$bvModal.show("modal-history");
      this.index = index;
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

<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h5 class="mt-4 font-weight-light">History</h5>
      <hr class="mb-4" />

      <b-row>
        <b-col md="12" v-for="(i, index) in history" :key="index">
          <div class="card mb-3" @click="openModal(index)">
            <div class="card-body">
              <h6 class="card-title">{{ i.email }}</h6>
              <small class="card-text"
                >จำนวนอุปกรณ์ที่ยืม {{ i.device.length }} ชิ้น</small
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>

    <b-modal id="modal-history" centered hide-footer>
      <b-row>
        <b-col cols="4">
          <img src="../../assets/qrcode-demo.png" class="w-100" />
        </b-col>
        <b-col cols="8">
          <h6 class="mb-0">
            {{ history[index].fullname || history[index].email }}
          </h6>
          <p>
            <small><b>User ID </b>: {{ history[index].email }}</small>
          </p>
        </b-col>
      </b-row>
      <hr />
      <!--  -->
      <div v-for="(device, index) in history[index].device" :key="index">
        <h6 class="mb-0">{{ device.name_type }}</h6>
        <p>
          <small><b>Code </b>: {{ device.code_device }}</small>
        </p>
      </div>
      <!--  -->
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
      index: 0
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
            console.log(err);
          }
        );
    },
    openModal(index) {
      this.$bvModal.show("modal-history");
      this.index = index;
    }
  },
  mounted() {
    this.getHistory();
  }
};
</script>

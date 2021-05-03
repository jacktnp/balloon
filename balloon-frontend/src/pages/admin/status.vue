<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h5 class="mt-4 font-weight-light">Status</h5>
      <hr class="mb-4" />

      <div
        class="container rounded-pill text-center mb-4"
        style="background: #e2e2e2;"
      >
        <div class="row">
          <div
            class="col p-1 rounded-pill status"
            :class="{ active: status == 'In Process' }"
            @click.prevent="status = 'In Process'"
          >
            In Process
          </div>
          <div
            class="col p-1 rounded-pill status"
            :class="{ active: status == 'Late' }"
            @click.prevent="status = 'Late'"
          >
            Late
          </div>
        </div>
      </div>

      <div v-if="status == 'In Process'">
        <div
          class="card mb-2 border-0"
          style="background: transparent"
          v-for="(data, index) in incomplete"
          :key="index"
          @click="selectData = data"
          v-b-modal.select-data
        >
          <div class="row">
            <div class="col-4">
              <img :src="data.user[0].img[0].url" class="w-100 rounded-pill" />
            </div>
            <div class="col-8 p-0">
              <p class="mb-0">{{ data.user[0].fullname }}</p>
              <small>{{ data.email }}</small>
              <br />
              <small
                ><b>COUNT : </b> {{ data.device.length }} ชิ้น 
                <i class="far fa-clock"></i> {{ convertDate(data.date_return) }}
              </small>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="status == 'Late'">
        <div
          class="card mb-2 border-0"
          style="background: transparent"
          v-for="(data, index) in late"
          :key="index"
          @click="selectData = data"
          v-b-modal.select-data
        >
          <div class="row">
            <div class="col-4">
              <img :src="data.user[0].img[0].url" class="w-100 rounded-pill" />
            </div>
            <div class="col-8 p-0">
              <p class="mb-0">{{ data.user[0].fullname }}</p>
              <small>{{ data.email }}</small>
              <br />
              <small
                ><b>COUNT : </b> {{ data.device.length }} ชิ้น 
                <i class="far fa-clock"></i> {{ convertDate(data.date_return) }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </b-container>

    <b-modal id="select-data" hide-footer centered>
      <div v-if="selectData != null">
        <div class="row">
          <div class="col-4">
            <img
              :src="selectData.user[0].img[0].url"
              class="w-100 rounded-pill"
            />
          </div>
          <div class="col-8 d-flex flex-column justify-content-center">
            <p class="mb-0">{{ selectData.user[0].fullname }}</p>
            <small><b>USER ID : </b>{{ selectData.email }}</small>
            <small><b>CONTACT : </b> {{ selectData.user[0].contract }}</small>
          </div>
        </div>
        <hr />
        <div
          class="card p-3 m-2"
          v-for="(device, index) in selectData.device"
          :key="index"
        >
          <div class="row">
            <div class="col-8">
              <p class="mb-0">{{ device.name_type }}</p>
              <small>{{ device.code_device }}</small>
            </div>
            <div class="col-4 d-flex flex-column justify-content-center">
              <b-button
                variant="primary"
                size="sm"
                v-if="device.status == 'borrow'"
                @click="returnOnce(device._id)"
                >RETURN</b-button
              >
              <b-button variant="success" size="sm" disabled v-else
                >DONE</b-button
              >
            </div>
          </div>
        </div>

        <b-button
          class="w-100 mt-4"
          variant="primary"
          size="sm"
          @click="returnAll()"
          >RETURN ALL</b-button
        >
        <!-- <pre>{{ selectData }}</pre> -->
      </div>
    </b-modal>
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import axios from "@/store/api";
export default {
  components: { navbar },
  data() {
    return {
      status: "In Process",
      incomplete: [],
      late: [],
      selectData: null
    };
  },
  methods: {
    getStatus() {
      axios
        .get("borrow", {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            var today = new Date();
            res.data.borrow.map(value => {
              if (value.status == "borrow") {
                if (today.getTime < new Date(value.date_return).getTime) {
                  this.incomplete.push(value);
                } else {
                  this.late.push(value);
                }
              }
            });

            // const a = res.data.borrow.filter(data => data.status == "borrow")
            // console.log(a)
          },
          err => {
            console.log(err);
          }
        );
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
    returnOnce(id) {
      axios
        .post(
          "borrow/device/return-one-device",
          {
            borrow_id: this.selectData._id,
            device_id: id
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.info.token
            }
          }
        )
        .then(
          res => {
            location.reload();
          },
          err => {
            console.log(err);
          }
        );
    },
    returnAll() {
      axios
        .post(
          "borrow/device/return-all-device",
          {
            borrow_id: this.selectData._id
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.info.token
            }
          }
        )
        .then(
          res => {
            location.reload();
          },
          err => {
            console.log(err);
          }
        );
    }
  },
  mounted() {
    this.getStatus();
  }
};
</script>
<style>
.status {
  transition: 0.15s;
}

.active {
  color: #fff;
  background-color: rgb(116, 116, 116);
}

.card:focus {
    outline: none;
}
/* .nav-link {
  background-color: #cbd2da69;
}
.nav-link.active {
  background-color: #ff0505ec !important;
} */
</style>

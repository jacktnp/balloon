<template>
  <div>
    <navbar />
    <b-container class="w-75 p-0" v-if="step == 1">
      <h5 class="mt-4 font-weight-light">Enter Equipment ID</h5>
      <hr class="mb-4" />
      <div class="row" id="headingrow">
        <div class="col-10 p-1">
          <b-form-group>
            <b-form-input
              class="w-100"
              type="text"
              placeholder="Enter Device ID"
              v-model="item"
              v-on:keyup.enter="addItem"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-2 p-1">
          <b-button
            class="w-100"
            variant="danger"
            @click.prevent="openQRModal()"
          >
            <i class="fas fa-qrcode"></i>
          </b-button>
        </div>
      </div>

      <b-list-group class="mt-2" style="height: 52vh;overflow-y: auto;">
        <b-list-group-item
          class="d-flex justify-content-between align-items-center border-0"
          v-for="(item, index) in items"
          :key="index"
        >
          {{ item.name_type }}

          <small @click.prevent="delItem(index)">
            <i class="fas fa-trash-alt"></i>
          </small>
        </b-list-group-item>
      </b-list-group>

      <!-- <div class="position-fixed next-step w-100" style="bottom: 2em;">
        <b-button
          class="w-100"
          variant="primary"
          @click="nextStep(1)"
          :disabled="items.length <= 0"
          >Next</b-button
        >
      </div> -->
      
    </b-container>

    <div
      class="position-fixed d-flex flex-column justify-content-center align-items-center w-100"
      style="background: #F1F1F1;bottom: 0px;height: 10vh;"
      v-if="step == 1"
    >
      <b-button class="btn-width-fixed mb-2" variant="primary" @click="nextStep(1)" :disabled="items.length <= 0"
        >Next</b-button
      >
    </div>

    <b-container class="w-75 p-0" v-if="step == 2">
      <h4 class="mt-4 font-weight-light">Enter User ID</h4>
      <hr class="mb-4" />

      <div class="row" id="headingrow">
        <div class="col-10 p-1">
          <b-form-group>
            <b-form-input
              class="w-100"
              type="text"
              placeholder="Enter User ID"
              v-model="userid"
              v-on:keyup.enter="addUser"
              :disabled="userShow"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-2 p-1">
          <b-button
            class="w-100"
            variant="danger"
            :disabled="userShow"
            @click.prevent="openQRModal()"
          >
            <i class="fas fa-qrcode"></i>
          </b-button>
        </div>
      </div>

      <div
        class="card p-2 border-0"
        style="background: transparent"
        v-show="userShow"
      >
        <div class="row">
          <div class="col-4">
            <img
              :src="userinfo.img[0].url"
              class="w-100 rounded-pill"
              v-if="userinfo.img.length > 0"
            />
          </div>
          <div class="col-8 p-0">
            <p class="mb-0">{{ userinfo.fullname }}</p>
            <small>{{ userid }}</small>
            <br />
            <b-button size="sm" variant="danger" @click="delUser"
              ><small>Change</small></b-button
            >
            <br />
          </div>
        </div>
      </div>

      <!-- <div class="position-fixed" style="width: 60%; left: 20%; bottom: 2em;">
        <b-button
          class="w-100"
          variant="primary"
          @click="nextStep(2)"
          :disabled="!userShow"
          >Next</b-button
        >
      </div> -->
    </b-container>

    <div
      class="position-fixed d-flex flex-column justify-content-center align-items-center w-100"
      style="background: #F1F1F1;bottom: 0px;height: 10vh;"
      v-if="step == 2"
    >
      <b-button class="btn-width-fixed mb-2" variant="primary" @click="nextStep(2)" :disabled="!userShow"
        >Next</b-button
      >
    </div>

    <b-container class="w-75 p-0" v-if="step == 3">
      <h4 class="mt-4 font-weight-light">Confirm</h4>
      <hr class="mb-4" />

      <div style="overflow-y: auto;overflow-x: hidden;max-height: 40vh;">
        <div class="row" v-for="(item, index) in items" :key="index">
          <div class="col-4 col-md-2 p-2">
            <img :src="item.img[0].url" class="w-100 rounded" />
          </div>
          <div class="col-8 col-md-10 p-2">
            <h6 class="mb-0">{{ item.name_type }}</h6>
            <small>ID : {{ item.code_device }}</small>
          </div>
        </div>
      </div>

      <hr />

      <h6 class="mb-0">{{ userinfo.fullname }}</h6>
      <p>
        <small><b>User ID </b>: {{ userinfo.email }}</small>
      </p>
      <label for="datepicker-sm">Due date:</label>
      <b-form-datepicker
        :min="new Date()"
        size="sm"
        v-model="deadline"
      ></b-form-datepicker>

      <!-- <div class="position-fixed" style="width: 60%; left: 20%; bottom: 2em;">
        <b-button class="w-100" variant="success" @click.prevent="borrow"
          >Confirm</b-button
        >
      </div> -->
    </b-container>

    <div
      class="position-fixed d-flex flex-column justify-content-center align-items-center w-100"
      style="background: #F1F1F1;bottom: 0px;height: 10vh;"
      v-if="step == 3"
    >
      <b-button class="btn-width-fixed mb-2" variant="success" @click.prevent="borrow"
        >Confirm</b-button
      >
    </div>

    <!-- Modal -->
    <b-modal id="modal-qrcode" centered hide-footer title="QR SCANNER">
      <qrcode-stream @decode="addItembyQR" v-if="step == 1"></qrcode-stream>
      <qrcode-stream
        @decode="addUserbyQR"
        v-else-if="step == 2"
      ></qrcode-stream>
    </b-modal>

    <b-modal
      id="modal-status"
      no-close-on-backdrop
      centered
      hide-header
      hide-footer
    >
      <div class="d-flex flex-column align-items-center my-5">
        <img
          v-if="status == 'success'"
          src="../../assets/alert/success.png"
          class="w-25"
        />
        <img v-else src="../../assets/alert/ban.png" class="w-25" />
        <small class="mt-3 mb-4" v-if="status == 'success'"
          >Transaction complete</small
        >
        <small class="mt-3 mb-4" v-else>Transaction failed</small>
        <b-button
          class="mt-3 w-25"
          variant="secondary"
          @click="closeStatusModal"
          >OK</b-button
        >
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
      step: 1,
      item: "",
      items: [],
      userid: "",
      userinfo: {
        fullname: "",
        email: "",
        img: [{ url: null }]
      },
      userShow: false,
      deadline: null,
      deadline_day: 0,
      status: null
    };
  },
  methods: {
    openQRModal() {
      this.$bvModal.show("modal-qrcode");
    },
    closeQRModal() {
      this.$bvModal.hide("modal-qrcode");
    },
    async addItem() {
      var checkDuplicate = false;
      await this.items.map(value => {
        if(value.code_device == this.item){
          checkDuplicate = true;
        }
      });

      if (checkDuplicate == true) {
        alert("มีข้อมูลนี้แล้วในระบบ ไม่สามารถเพิ่มตัวที่ซ้ำกันได้");
      }
      else if (this.item.length > 0) {
        this.$isLoading(true);
        // get Item detail
        await axios
          .get("device/code/" + this.item, {
            headers: {
              Authorization: "Bearer " + this.$store.getters.info.token
            }
          })
          .then(
            res => {
              this.$isLoading(false);
              if (res.data.device.length == 0) {
                alert("ไม่มีรหัสนี้อยู่ในระบบ โปรดตรวจสอบอีกครั้ง");
              } 
              else {
                if (res.data.device[0].status_device == "Active") {
                  var arr = {};
                  arr["_id"] = res.data.device[0]._id;
                  arr["code_device"] = res.data.device[0].code_device;
                  arr["name_type"] = res.data.device[0].name_type;
                  arr["img"] = res.data.device[0].img;
                  this.items.push(arr);
                } else if (res.data.device[0].status_device == "borrow") {
                  alert("This item didn't return to admin.");
                }
              }
            },
            err => {
              this.$isLoading(false);
              console.log(err);
              alert("ไม่มีรหัสนี้อยู่ในระบบ โปรดตรวจสอบอีกครั้ง");
            }
          );
        this.item = "";
      } else {
        this.$isLoading(false);
        alert("กรุณาระบุข้อมูลให้ครบ");
      }
    },
    async addItembyQR(decode) {
      var checkDuplicate = false;
      await this.items.map(value => {
        if(value._id == decode){
          checkDuplicate = true;
        }
      });
      
      if (checkDuplicate == true) {
        alert("มีข้อมูลนี้แล้วในระบบ ไม่สามารถเพิ่มตัวที่ซ้ำกันได้");
      }
      else {
        await axios
          .get("device/id/" + decode, {
            headers: {
              Authorization: "Bearer " + this.$store.getters.info.token
            }
          })
          .then(
            res => {
              if (res.data.device[0].status_device == "Active") {
                var arr = {};
                arr["_id"] = res.data.device[0]._id;
                arr["code_device"] = res.data.device[0].code_device;
                arr["name_type"] = res.data.device[0].name_type;
                arr["img"] = res.data.device[0].img;
                this.items.push(arr);
              } else if (res.data.device[0].status_device == "borrow") {
                alert("This item didn't return to admin.");
              }
            },
            err => {
              alert("Undefined");
            }
          );
        }
      this.item = "";
      this.closeQRModal();
    },
    delItem(index) {
      this.items.splice(index);
    },
    addUser() {
      if (this.userid.length == 10) {
        axios
          .get("user/email/" + this.userid, {
            headers: {
              Authorization: "Bearer " + this.$store.getters.info.token
            }
          })
          .then(
            res => {
              if (res.data.user.length == 0) {
                this.delUser();
                alert("Username Undefined");
              } else {
                this.userinfo = res.data.user;
              }
            },
            err => {
              this.delUser();
              alert("Username Undefined");
            }
          );
        this.userShow = true;
      } else {
        alert("Username Undefined");
      }
    },
    async addUserbyQR(decode) {
      this.userid = decode;
      await axios
        .get("user/email/" + decode, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            this.userinfo = res.data.user;
          },
          err => {
            this.delUser();
            alert("Username Undefined");
          }
        );
      this.userShow = true;
      this.closeQRModal();
    },
    delUser() {
      this.userid = "";
      this.userinfo.fullname = "";
      this.userinfo.email = "";
      this.userinfo.img = [];
      this.userShow = false;
    },
    nextStep(step) {
      this.step = step + 1;
    },
    calDeadlineday() {
      var oneDay = 24 * 60 * 60 * 1000;
      var today = new Date();
      var deadline = new Date(this.deadline);

      // console.log("today : ", today);
      // console.log("dl : ", deadline);

      this.deadline_day = Math.round(Math.abs((deadline - today) / oneDay));
      console.log("between: ", this.deadline_day);
    },
    async borrow() {
      await this.calDeadlineday();
      await axios
        .post("borrow", {
          email: this.userid,
          date_return: this.deadline_day,
          device: this.items
        })
        .then(
          res => {
            this.openStatusModal("success");
            // this.$router.push({ name: "index" });
          },
          err => {
            this.openStatusModal("fail");
            // alert(`${userinfo.email} ยังไม่ได้คืนของล่าสุด`);
            console.log(err);
          }
        );
    },
    openStatusModal(status) {
      this.$bvModal.show("modal-status");
      this.status = status;
    },
    closeStatusModal() {
      this.$bvModal.hide("modal-status");
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style scoped>
.next-step {
  width: 480px;
  left: 37%;
}

@media screen and (max-width: 480px) {
  .next-step {
    width: 60%;
    left: 20%;
  }
}
</style>
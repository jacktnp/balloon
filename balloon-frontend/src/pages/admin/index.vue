<template>
  <div>
    <navbar />
    <b-container class="w-75" v-if="step == 1">
      <h4 class="mt-4 font-weight-light">Enter Equipment ID</h4>
      <hr class="mb-4" />

      <div class="row">
        <div class="col-10 col-md-11 p-1">
          <b-form-group>
            <b-form-input
              class="w-100"
              type="text"
              placeholder="ระบุ ทส และกด ENTER หรือแสกน QR Code"
              v-model="item"
              v-on:keyup.enter="addItem"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-2 col-md-1 p-1">
          <b-button class="w-100" variant="danger" @click.prevent="openQRModal()">
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

      <div class="position-fixed" style="width: 60%; left: 20%; bottom: 2em;">
        <b-button
          class="w-100"
          variant="success"
          @click="nextStep(1)"
          :disabled="items.length <= 0"
          >Next</b-button
        >
      </div>
    </b-container>

    <b-container class="w-75" v-else-if="step == 2">
      <h4 class="mt-4 font-weight-light">Enter User ID</h4>
      <hr class="mb-4" />

      <div class="row">
        <div class="col-10 col-md-11 p-1">
          <b-form-group>
            <b-form-input
              class="w-100"
              type="text"
              placeholder="ระบุรหัสนักศึกษาและกด ENTER"
              v-model="userid"
              v-on:keyup.enter="addUser"
              :disabled="userShow"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-2 col-md-1 p-1">
          <b-button class="w-100" variant="danger" :disabled="userShow" @click.prevent="openQRModal()">
            <i class="fas fa-qrcode"></i>
          </b-button>
        </div>
      </div>

      <h3 class="mt-5 text-center" v-show="userShow">{{ userid }}</h3>
      <h6 class="mt-2 text-center" v-show="userShow">
        {{ userinfo.fullname }}
      </h6>
      <!-- <h6 class="mt-2 text-center" v-show="userShow">{{ userinfo.contract }}</h6> -->
      <div class="text-center" v-show="userShow">
        <b-button class="btn-sm" variant="danger" @click="delUser"
          ><small>CHANGE USER</small></b-button
        >
      </div>

      <div class="position-fixed" style="width: 60%; left: 20%; bottom: 2em;">
        <b-button
          class="w-100"
          variant="success"
          @click="nextStep(2)"
          :disabled="!userShow"
          >Next</b-button
        >
      </div>
    </b-container>

    <b-container class="w-75" v-else-if="step == 3">
      <h4 class="mt-4 font-weight-light">Confirm</h4>
      <hr class="mb-4" />

      <div style="overflow-y: auto;max-height: 40vh;">
        <div class="row" v-for="(item, index) in items" :key="index">
          <div class="col-4 col-md-2 p-2">
            <img src="../../assets/qrcode-demo.png" class="w-100" />
          </div>
          <div class="col-8 col-md-10 p-2">
            <h6 class="mb-0">{{ item.name_type }}</h6>
            <small>Equipment ID : {{ item.code_device }}</small>
          </div>
        </div>
      </div>

      <hr />

      <h6 class="mb-0">{{ userinfo.fullname }}</h6>
      <p>
        <small><b>User ID </b>: {{ userinfo.email }}</small>
      </p>
      <label for="datepicker-sm">ระบุวันคืน:</label>
      <b-form-datepicker
        size="sm"
        locale="th"
        v-model="deadline"
      ></b-form-datepicker>

      <div class="position-fixed" style="width: 60%; left: 20%; bottom: 2em;">
        <b-button class="w-100" variant="success">Confirm</b-button>
      </div>
    </b-container>

    <!-- Modal -->
    <b-modal id="modal-qrcode" centered hide-footer title="QR SCANNER">
      ...
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
        email: ""
      },
      userShow: false,
      deadline: null
    };
  },
  methods: {
    openQRModal() {
      this.$bvModal.show("modal-qrcode");
    },
    async addItem() {
      if (this.item.length > 0) {
        // get Item detail
        await axios
          .get("device/id/" + this.item, {
            headers: {
              Authorization: "Bearer " + this.$store.getters.info.token
            }
          })
          .then(
            res => {
              var arr = {};
              arr["_id"] = res.data.device[0]._id;
              arr["code_device"] = res.data.device[0].code_device;
              arr["name_type"] = res.data.device[0].name_type;
              this.items.push(arr);
            },
            err => {
              console.log(err);
            }
          );
        this.item = "";
      } else {
        alert("กรุณาระบุข้อมูลให้ครบ");
      }
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
              this.userinfo = res.data.user[0];
            },
            err => {
              this.delUser();
              alert("ชื่อผู้ใช้ไม่ถูกต้อง");
            }
          );
        this.userShow = true;
      } else {
        alert("กรุณาระบุรหัสนักศึกษาให้ถูกต้อง");
      }
    },
    delUser() {
      this.userid = "";
      this.userShow = false;
    },
    nextStep(step) {
      this.step = step + 1;
    },
    borrow() {
      axios
        .post("borrow", {
          email: this.userid,
          date_return: 5,
          device: this.items
        })
        .then(
          res => {
            alert("ยืมสำเร็จ");
            this.$router.push({ name: "adminindex" })
          },
          err => {
            console.log(err);
          }
        );
    }
  }
};
</script>

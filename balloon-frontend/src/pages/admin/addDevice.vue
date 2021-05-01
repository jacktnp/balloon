<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h4 class="mt-4 font-weight-light">Add Device</h4>
      <hr class="mb-4" />

      <img :src="checkImage(equipment.img)" class="w-100" />
      <h5 class="mt-3">{{ equipment.name_type }}</h5>
      <p class="mb-0"><b>Description : </b> {{ equipment.detail_type }}</p>
      <!-- <p><b>Category : </b> {{ equipment.category }}</p> -->

      <div class="row mt-4">
        <div class="col-9 col-md-11 p-1">
          <b-form-group>
            <b-form-input
              class="w-100"
              type="text"
              placeholder="ระบุเลข ทส"
              v-model="item"
              v-on:keyup.enter="addItem"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-3 col-md-1 p-1">
          <b-button class="w-100" variant="primary" @click="addItem">
            Add
          </b-button>
        </div>
      </div>

      <b-list-group class="mt-2" style="height: 18vh;overflow-y: auto;">
        <b-list-group-item
          class="d-flex justify-content-between align-items-center border-0"
          v-for="(item, index) in device"
          :key="index"
        >
          {{ item.code_device }}

          <small @click.prevent="delItem(item._id)">
            <i class="fas fa-trash-alt"></i>
          </small>
        </b-list-group-item>
      </b-list-group>

      <div class="position-fixed" style="width: 60%; left: 20%; bottom: 2em;">
        <b-button class="w-100" variant="success">SAVE</b-button>
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
      equipment: {},
      device: [],
      item: "",
      items: []
    };
  },
  methods: {
    getEquipment() {
      axios
        .get("type/id/" + this.$route.params.id, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            this.equipment = res.data.type[0];
            this.getDevice(res.data.type[0].name_type);
          },
          err => {
            console.log(err);
          }
        );
    },
    async getDevice(name_type) {
      await axios
        .get("device/type/" + name_type, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            this.device = res.data.device;
          },
          err => {
            console.log(err);
          }
        );
    },
    addItem() {
      if (this.item != "") {
        axios
          .post("device", {
            name_type: this.equipment.name_type,
            code_device: this.item
          })
          .then(
            res => {
              this.device = [];
              this.getDevice(this.equipment.name_type);
            },
            err => {
              console.log(err);
            }
          );
        this.item = "";
      } else {
        alert("กรุณากรอกข้อมูล");
      }
    },
    delItem(index) {
      // this.items.splice(index);
      axios.delete("device/id/" + index).then(
        res => {
          this.equipment = {};
          this.device = [];
          this.getEquipment();
        },
        err => {
          console.log(err);
        }
      );
    },
    checkImage(url) {
      if (url.length <= 0) {
        return "https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg";
      } else {
        return url[0].url;
      }
    }
  },
  mounted() {
    this.getEquipment();
  }
};
</script>

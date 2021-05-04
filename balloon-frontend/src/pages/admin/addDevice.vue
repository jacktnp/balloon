<template>
  <div>
    <navbar />
    <b-container class="w-75 p-0">
      <h5 class="mt-4 font-weight-light">
        <router-link :to="{ name: 'adminmanagement' }"
          ><i class="fal fa-chevron-left mr-3"></i
        ></router-link>
        Add Device
      </h5>
      <hr class="mb-4" />

      <img :src="checkImage(equipment.img)" class="w-100" />
      <p class="mt-3 mb-1">{{ equipment.name_type }}</p>
      <small class="mb-0"
        ><b>Description : </b> {{ equipment.detail_type }}</small
      >
      <hr />
      <small><b>Status : </b>
        <span class="text-success text-capitalize" v-if="equipment.have_device > 0">Avaliable</span>
        <span class="text-danger text-capitalize" v-else>Unavaliable</span>
      </small>
      <br />
      <small><b>Category : </b> {{ equipment.category }}</small>

      <div class="row mt-4" id="headingrow">
        <div class="col-9 col-md-10 p-1">
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
        <div class="col-3 col-md-2 p-1">
          <b-button class="w-100" variant="primary" @click="addItem">
            Add
          </b-button>
        </div>
      </div>

      <b-list-group class="mt-2 mb-5" style="height: 18vh; overflow-y: auto">
        <b-list-group-item
          class="border-0"
          v-for="(item, index) in device"
          :key="index"
        >
          {{ item.code_device }}

          <div class="float-right">
            <small
              @click.prevent="
                downloadItem(item.name_type, item._id, item.code_device)
              "
            >
              <i class="fas fa-download"></i>
            </small>

            <small class="pl-2" @click.prevent="delItem(item._id)">
              <i class="fas fa-trash-alt"></i>
            </small>
          </div>
        </b-list-group-item>
      </b-list-group>
      <br />
      <br /><br />
    </b-container>

    <div
      class="position-fixed d-flex flex-column justify-content-center align-items-center w-100"
      style="background: #F1F1F1;bottom: 0px;height: 15vh;"
    >
      <b-button class="w-75 mb-2" variant="success" @click="downloadAll"
        >Download <i class="far fa-qrcode"></i></b-button
      >
      <b-button class="w-75" variant="secondary" v-b-modal.edit-type-modal
        >Edit</b-button
      >
    </div>

    <b-modal id="edit-type-modal" title="Edit Equipment" no-close-on-backdrop centered hide-footer>
      <form @submit="editType">
        <b-form-group label="Equipment Title :">
          <b-form-input
            v-model="editEquipment.name_type"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Descriptions:">
          <b-form-textarea
            v-model="editEquipment.detail_type"
            rows="5"
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Equipment Category :">
          <b-form-select
            v-model="editEquipment.category"
            :options="category"
          ></b-form-select>
        </b-form-group>
        <div class="row w-75 mx-auto">
          <div class="col-2 px-1">
            <b-button class="w-100 mb-2" variant="secondary" @click="deleteType"
              ><i class="fas fa-trash-alt"></i
            ></b-button>
          </div>
          <div class="col px-1">
            <b-button type="submit" class="w-100 mb-2" variant="success"
              >Update</b-button
            >
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import axios from "@/store/api";
import { saveAs } from "file-saver";
import JSZip from "jszip";
export default {
  components: { navbar },
  data() {
    return {
      equipment: {},
      editEquipment: {},
      device: [],
      item: "",
      items: [],
      category: [
        { value: "Notebook", text: "Notebook" },
        { value: "Notebook Accessories", text: "Notebook Accessories" },
        { value: "Desktop", text: "Desktop" },
        { value: "TV / Monitor", text: "TV / Monitor" },
        { value: "Computer Hardware", text: "Computer Hardware" },
        { value: "SSD / HDD / Storage", text: "SSD / HDD / Storage" },
        { value: "Mouse / Keyboard / Pad", text: "Mouse / Keyboard / Pad" },
        { value: "Network", text: "Network" },
        { value: "Accessories", text: "Accessories" },
        { value: "Other", text: "Other" }
      ]
    };
  },
  methods: {
    downloadItem(name, id, code) {
      axios
        .get(`https://dev.initerapp.com/qrcode.php?id=${id}&name=${code}`, {
          responseType: "blob"
        })
        .then(response => {
          const blob = new Blob([response.data], { type: "application/png" });
          saveAs(blob, name + "_" + code + ".png");
        })
        .catch(console.error);
    },
    async downloadAll() {
      this.$isLoading(true);
      let zip = new JSZip();
      await new Promise((resolve, reject) =>
        this.device.map((value, index) => {
          fetch(
            `https://dev.initerapp.com/qrcode.php?id=${value._id}&name=${value.code_device}`
          )
            .then(res => res.blob())
            .then(blob => {
              const file = new File([blob], "File name", { type: "image/png" });
              zip.file(
                value.name_type + "_" + value.code_device + ".png",
                file
              );
              if (this.device.length === index + 1) {
                console.log(index + " " + this.device.map.length);
                resolve("succes");
              }
            });
          // axios
          //   .get(
          //     `https://dev.initerapp.com/qrcode.php?id=${value._id}&name=${value.code_device}`,
          //     { responseType: "blob" }
          //   )
          //   .then((response) => {
          //     const file = new File([blob], "File name", { type: "image/png" });
          //     const blob = new Blob([response.data], { type: "application/png" });
          //     saveAs(blob, value.name_type + "_" + value.code_device + ".png");
          //   })
          //   .catch(console.error);
        })
      );
      zip.generateAsync({ type: "blob" }).then(content => {
        saveAs(content, `${this.equipment.name_type}_zipfiles.zip`);
        this.$isLoading(false);
      });
    },
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
            this.editEquipment = res.data.type[0];
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
          .post(
            "device",
            {
              name_type: this.equipment.name_type,
              code_device: this.item
            },
            {
              headers: {
                Authorization: "Bearer " + this.$store.getters.info.token
              }
            }
          )
          .then(
            res => {
              this.getEquipment();
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
    delItem(id) {
      axios
        .delete("device/id/" + id, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
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
      if (!url) {
        return "https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg";
      } else {
        return url[0].url;
      }
    },
    editType() {
      axios
        .put(
          "type/id/" + this.$route.params.id,
          {
            detail_type: this.editEquipment.detail_type,
            category: this.editEquipment.category
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
    deleteType() {
      this.$bvModal
        .msgBoxConfirm(`ยืนยันที่จะลบ ${this.equipment.name_type} ใช่ไหม ?`, {
          size: "sm",
          buttonSize: "sm",
          cancelVariant: "secondary",
          okVariant: "success",
          okTitle: "CANCEL",
          cancelTitle: "CONFIRM",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value == false) {
            axios
              .delete("type/id/" + this.$route.params.id, {
                headers: {
                  Authorization: "Bearer " + this.$store.getters.info.token
                }
              })
              .then(
                res => {
                  this.$router.push({ name: "adminmanagement" });
                },
                err => {
                  console.log(err);
                }
              );
          }
        })
        .catch(err => {
          console.log(err);
        });
      console.log("delete");
    }
  },
  computed: {
    statusAvaliable() {
      if (this.equipment.status_type == "active") return "Avaliable";

      return "Not Avaliable";
    }
  },
  mounted() {
    this.getEquipment();
  }
};
</script>

<template>
  <div>
    <navbar />
    <b-container class="w-75 p-0">
      <h5 class="mt-4 font-weight-light">
        <router-link :to="{ name: 'adminmanagement' }"
          ><i class="fal fa-chevron-left mr-3"></i
        ></router-link>
        Add Equipment
      </h5>
      <hr class="mb-4" />

      <b-form>
        <b-form-group label="Equipment Title :">
          <b-form-input v-model="$v.newEquipment.title.$model" :state="$v.newEquipment.title.required" required></b-form-input>
        </b-form-group>
        <b-form-group label="Equipment Description :">
          <b-form-textarea
            v-model="newEquipment.description"
            rows="3"
            :state="$v.newEquipment.description.required"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Equipment Category :">
          <b-form-select
            v-model="newEquipment.category"
            :state="$v.newEquipment.category.required"
            :options="category"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Upload image">
          <div id="file-upload-form" class="uploader">
            <input
              id="file-upload"
              type="file"
              name="fileUpload"
              accept="image/*"
              @change="selectImages"
            />

            <label for="file-upload" id="file-drag">
              <img
                :src="showSelectImage(newEquipment.images[0])"
                class="w-100"
                v-if="newEquipment.images != null"
              />

              <div id="start" v-else>
                <i class="fas fa-image-polaroid"></i>
              </div>
            </label>
          </div>
        </b-form-group>
      </b-form>

      <br />
      <br />
      <br />
    </b-container>

    <div
      class="position-fixed d-flex flex-column justify-content-center align-items-center w-100"
      style="background: #F1F1F1;bottom: 0px;height: 10vh;"
    >
      <b-button class="btn-width-fixed mb-2" variant="success" @click="addEquipment"
        >Save</b-button>
    </div>

    <b-modal id="modal-status" no-close-on-backdrop centered hide-header hide-footer>
      <div class="d-flex flex-column align-items-center my-5">
        <img v-if="status == 'success'" src="../../assets/alert/success.png" class="w-25">
        <img v-else src="../../assets/alert/ban.png" class="w-25">
        <small class="mt-3 mb-4" v-if="status == 'success'">Equipment Added</small>
        <small class="mt-3 mb-4" v-else>Failed</small>
        <b-button class="mt-3 w-25" variant="secondary" @click="closeStatusModal">OK</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import axios from "@/store/api";
import { required } from 'vuelidate/lib/validators'

export default {
  components: { navbar },
  data() {
    return {
      newEquipment: {
        title: "",
        description: "",
        category: "",
        images: null
      },
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
      ],
      status: null
    };
  },
  validations: {
    newEquipment: {
      title: {
        required
      },
      description: {
        required
      },
      category: {
        required
      },
      images: {
        required
      }
    }
  },
  methods: {
    selectImages(event) {
      this.newEquipment.images = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    addEquipment() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        this.$isLoading(true);

        let formData = new FormData();
        formData.append("name_type", this.newEquipment.title);
        formData.append("detail_type", this.newEquipment.description);
        formData.append("category", this.newEquipment.category);
        formData.append("image", this.newEquipment.images[0]);

        axios
          .post("/type", formData, {
            headers: {
              Authorization: "Bearer " + this.$store.getters.info.token
            }
          })
          .then(
            res => {
              this.$isLoading(false);

              // alert("เพิ่มข้อมูลสำเร็จ ระบบจะรีไดเร็คไปหน้ารวม Equipment");
              this.openStatusModal('success')
            },
            err => {
              this.openStatusModal('error')
              console.log(err);
            }
          );
      } else {
        alert("กรอกข้อมูลไม่ครบ")
      }
    },
    openStatusModal(status) {
      this.$bvModal.show('modal-status');
      this.status = status;
    },
    closeStatusModal() {
      this.$bvModal.hide('modal-status')
      this.$router.push({ name: "adminmanagement" });
    }
  }
};
</script>

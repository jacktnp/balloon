<template>
  <div>
    <navbar />
    <b-container class="w-75 p-0">
      <h5 class="mt-4 font-weight-light">Profile</h5>
      <hr class="mb-4" />

      <div class="row" id="headingrow">
        <div class="col-4 col-md-3 p-1">
          <img :src="checkImage(user.img)" class="w-100 rounded-pill" />
        </div>
        <div class="col-8 col-md-9 p-1">
          <p class="mb-0">{{ user.fullname }}</p>
          <small>User ID : {{ user.email }}</small>
          <br />
          <small><b>Contact :</b></small>
          <small>{{ user.contract }}</small>
        </div>
      </div>
    </b-container>

    <div
      class="position-fixed d-flex flex-column justify-content-center align-items-center w-100"
      style="background: #F1F1F1;bottom: 0px;height: 20vh;"
    >
      <b-button class="btn-width-fixed mb-2" variant="secondary" @click="openModal"
        >Edit</b-button
      >
      <b-button class="btn-width-fixed" variant="danger" :to="{ name : 'logout' }"
        >Logout</b-button
      >
    </div>

    <!-- Modal -->
    <b-modal id="modal-user" centered hide-footer title="Profile">
      <b-form-group label="Contact Description">
        <b-form-textarea
          id="textarea-formatter"
          v-model="editContact.description"
        ></b-form-textarea>
      </b-form-group>
      <hr />

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
              :src="showSelectImage(editContact.image[0])"
              class="w-100"
              v-if="editContact.image != null"
            />

            <div id="start" v-else>
              <i class="fas fa-image-polaroid"></i>
            </div>
          </label>
        </div>
      </b-form-group>

      <div class="text-center">
        <b-button class="w-50 mt-2" variant="success" @click="updateUser"
          >Save</b-button
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
      editContact: {
        description: "",
        image: null
      },
      user: {
        fullname: "",
        email: "",
        img: [],
        contract: ""
      }
    };
  },
  methods: {
    selectImages(event) {
      this.editContact.image = event.target.files;
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
    },
    openModal() {
      this.$bvModal.show("modal-user");
    },
    getUser() {
      this.$isLoading(true);

      axios
        .get("user/" + this.$store.getters.info.user._id, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            this.$isLoading(false);

            this.user = res.data.user;
          },
          err => {
            this.$router.push({ name: 'logout'});
            console.log(err);
          }
        );
    },
    updateUser() {
      this.$isLoading(true);

      let formData = new FormData();
      if (this.editContact.description != "") {
        formData.append("contract", this.editContact.description);
      }

      if (this.editContact.image != null) {
        formData.append("image", this.editContact.image[0]);
      }

      axios
        .put("user/" + this.$store.getters.info.user._id, formData, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            this.$isLoading(false);
            location.reload();
          },
          err => {
            console.log(err);
          }
        );
    },
    checkImage(url) {
      if (url.length <= 0) {
        return "../../assets/alert/none_img.png"
      } else {
        return url[0].url;
      }
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

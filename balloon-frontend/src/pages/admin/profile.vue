<template>
  <div>
    <navbar />
    <b-container class="w-75 p-0">
      <h5 class="mt-4 font-weight-light">Profile</h5>
      <hr class="mb-4" />

      <div class="row" id="headingrow">
        <div class="col-4 col-md-2 p-1">
          <img :src="checkImage" class="w-100 rounded-pill" />
        </div>
        <div class="col-8 col-md-10 p-1">
          <p class="mb-0">{{ user.fullname }}</p>
          <small>User ID : {{ user.email }}</small>
          <div class="d-flex flex-row align-items-center">
            <b-form-checkbox
              v-model="checked"
              name="check-button"
              switch
              @change="updateStatus"
            ></b-form-checkbox>

            <span v-if="checked == true" class="text-success">Active</span>
            <span v-else class="text-danger">Inactive</span>
          </div>
          <small><b>Contact :</b></small>
          <br>
          <small>{{ user.contract }}</small>
        </div>
      </div>
    </b-container>

    <div
      class="position-fixed d-flex flex-column justify-content-center align-items-center w-100"
      style="background: #F1F1F1;bottom: 0px;height: 20vh;"
    >
      <b-button class="w-75 mb-2" variant="secondary" @click="editModal"
        >Edit</b-button
      >
      <b-button class="w-75" variant="danger" :to="{ name : 'logout' }"
        >Logout</b-button
      >
    </div>

    <b-modal id="edit-modal" title="Edit Profile" centered hide-footer>
      <form @submit.prevent="updateUser()">

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
                :src="showSelectImage(editContact.images[0])"
                class="w-100"
                v-if="editContact.images != null"
              />

              <div id="start" v-else>
                <i class="fas fa-image-polaroid"></i>
              </div>
            </label>
          </div>
        </b-form-group>

        <div class="text-center">
          <b-button type="submit" class="w-50 mt-2" variant="success"
            >Save</b-button
          >
        </div>
      </form>
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
      checked: true,
      editContact: {
        fullname: "",
        description: "",
        images: null
      },
      user: {}
    };
  },
  methods: {
    selectImages(event) {
      this.editContact.images = event.target.files;
    },
    editModal() {
      this.$bvModal.show("edit-modal");
    },
    showSelectImage(image) {
      // for preview only
      return URL.createObjectURL(image);
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
            if (res.data.user.status == "inactive") {
              this.checked = false;
            }
            this.user = res.data.user;
          },
          err => {
            this.$router.push({ name: 'logout'});
            console.log(err);
          }
        );
    },
    updateStatus() {
      var status = "";

      if (this.checked == false) {
        var status = "inactive";
      } else if (this.checked == true) {
        var status = "active";
      }
      axios
        .put(
          "user/" + this.$store.getters.info.user._id,
          {
            status: status
          },
          {
            headers: {
              Authorization: "Bearer " + this.$store.getters.info.token
            }
          }
        )
        .then(
          res => {
            this.getUser();
          },
          err => {
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

      if (this.editContact.images != null) {
        formData.append("image", this.editContact.images[0]);
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
    }
  },
  computed: {
    checkImage() {
      // console.log(this.user.img.length == 0 || !this.user.img)
      if (!this.user.img || this.user.img.length == 0) {
        return "../../assets/none_img.png";
      } else {
        return this.user.img[0].url;
      }
    }
  },
  mounted() {
    this.getUser();
  }
};
</script>

<style>
.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #28A745 !important;
  background-color: #28A745 !important;
}
</style>

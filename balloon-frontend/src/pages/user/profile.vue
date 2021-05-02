<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h5 class="mt-4 font-weight-light">Profile</h5>
      <hr class="mb-4" />

      <div class="row">
        <div class="col-4 col-md-2">
          <img :src="checkImage(user.img)" class="w-100 rounded" />
        </div>
        <div class="col-8 col-md-10">
          <h6 class="mb-0">{{ user.fullname }}</h6>
          <small>User ID : {{ user.email }}</small>
          <p class="mt-2 mb-1"><b>Contact :</b></p>
          <small>{{ user.contract }}</small>
        </div>
      </div>

      <div class="position-fixed" style="width: 60%; left: 20%; bottom: 2em;">
        <button
          type="button"
          class="btn w-100 btn-secondary"
          @click="openModal"
        >
          Edit
        </button>
      </div>
    </b-container>

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
        <b-form-file @change="selectImages"></b-form-file>
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
  components: { navbar, },
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
    openModal() {
      this.$bvModal.show("modal-user");
    },
    getUser() {
      axios
        .get("user/" + this.$store.getters.info.user._id, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            this.user = res.data.user[0];
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
        return "https://thaigifts.or.th/wp-content/uploads/2017/03/no-image.jpg";
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

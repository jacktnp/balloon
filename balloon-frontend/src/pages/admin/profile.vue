<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h4 class="mt-4 font-weight-light">Profile</h4>
      <hr class="mb-4" />

      <div class="row">
        <div class="col-4 col-md-2 p-1">
          <img :src="checkImage(user.img)" class="w-100" />
        </div>
        <div class="col-8 col-md-10 p-1">
          <h6 class="mb-0">{{ user.fullname }}</h6>
          <small>User ID : {{ user.email }}</small>
          <div class="d-flex flex-row align-items-center">
            <span v-if="checked == true" class="text-success">Active</span>
            <span v-else class="text-danger">Inactive</span>
            
            <b-form-checkbox
              class="ml-3"
              v-model="checked"
              name="check-button"
              switch
            ></b-form-checkbox>
          </div>
          <p class="mt-2 mb-1"><b>Contact :</b></p>
          <small>{{ user.contract }}</small>
        </div>
      </div>
      <!--  -->
      <div class="position-fixed" style="width: 60%; left: 20%; bottom: 2em;">
        <button
          type="button"
          class="btn w-100 btn-secondary"
          @click="editModal"
        >
          Edit
        </button>
      </div>
    </b-container>

    <b-modal id="edit-modal" title="Edit Profile" centered hide-footer>
      <form>
        <b-form-group label="Full name:">
          <b-form-input
            v-model="editContact.fullname"
            placeholder="Enter Fullname"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Contact Description">
          <b-form-textarea
            id="textarea-formatter"
            v-model="editContact.description"
          ></b-form-textarea>
        </b-form-group>

        <hr />
        <b-form-group label="Upload image">
          <b-form-file></b-form-file>
        </b-form-group>

        <div class="text-center">
          <b-button class="w-50 mt-2" variant="success">Save</b-button>
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
    editModal() {
      this.$bvModal.show("edit-modal");
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

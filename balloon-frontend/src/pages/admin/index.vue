<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h4 class="mt-4 font-weight-light">Enter Equipment ID</h4>
      <hr class="mb-4" />

      <div class="row">
        <div class="col-10 col-md-11 p-1">
          <b-form-group>
            <b-form-input
              class="w-100"
              type="text"
              placeholder="ระบุ ทส และกด ENTER หรือแสกน QR Code"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-2 col-md-1 p-1">
          <b-button class="w-100" variant="danger">
            <i class="fas fa-qrcode"></i>
          </b-button>
        </div>
      </div>

      <b-list-group>
        <b-list-group-item
          class="d-flex justify-content-between align-items-center border-0"
        >
          serial number...
          <small>
              <i class="fas fa-trash-alt"></i>
          </small>
        </b-list-group-item>
      </b-list-group>

      <div class="d-flex align-items-end" style="height: 65vh">
        <b-button class="w-100" variant="success" v-b-modal.modal-user
          >Edit</b-button
        >
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
        <b-form-file></b-form-file>
      </b-form-group>

      <div class="text-center">
        <b-button class="w-50 mt-2" variant="success">Save</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import navbar from "@/components/navbar";

export default {
  components: { navbar },
  data() {
    return {
      editContact: {
        description: "",
        image: null
      }
    };
  },
  methods: {
    openModal() {
      this.$bvModal.show("modal-information");
    }
  }
};
</script>

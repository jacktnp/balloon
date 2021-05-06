<template>
  <b-container
    class="d-flex align-items-center justify-content-center"
    style="height: 100vh;"
  >
    <b-form class="w-75" @submit.prevent="authLogin">
      <p class="text-center">
        <img src="../assets/logo2.png" class="w-75 mb-3" />
      </p>

      <b-form-group>
        <b-form-input
          v-model="username"
          placeholder="User name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          v-model="password"
          type="password"
          placeholder="Password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" class="w-100" variant="success">Login</b-button>
    </b-form>

    <!-- ConfirmMsg Equip -->
    <b-modal
      id="modal-status"
      no-close-on-backdrop
      centered
      hide-header
      hide-footer
    >
      <div class="d-flex flex-column align-items-center my-5">
        <img src="../assets/alert/ban.png" class="w-25" />
        <p class="mt-3 mb-4">{{ error }}</p>
        <div class="d-flex justify-content-center w-100">
          <b-button
            class="mt-3 w-25 mr-2"
            variant="secondary"
            @click="closeStatusModal()"
            >OK</b-button
          >
        </div>
      </div>
    </b-modal>
  </b-container>
</template>

<script>
import axios from "@/store/api";

export default {
  data() {
    return {
      username: "sirion",
      password: "password",
      error: ""
    };
  },
  methods: {
    authLogin() {
      this.$isLoading(true);
      if (this.password == "password") {
        axios
          .post("login", {
            email: this.username
            // password: this.password
          })
          .then(
            response => {
              this.$isLoading(false);
              // Store & Redirect
              if(response.data.data.user == null) {
                this.error = 'ยังไม่มียูสเซอร์นี้ในระบบน้าาา :D';
                this.openStatusModal();
              }

              this.$store.commit("setUser", response.data);

              if (response.data.data.user.role == "support") {
                this.$router.push({ name: "adminindex" });
              } else {
                this.$router.push({ name: "userindex" });
              }
            },
            error => {
              this.$isLoading(false);
              this.error = 'ยังไม่มียูสเซอร์นี้ในระบบน้าาา :D';
              this.openStatusModal();
            }
          );
      } else {
        this.$isLoading(false);
        this.error = 'ฮั่นแน่ มาแอบส่องเหรอ อิอิ :)';
        this.openStatusModal();
      }
    },
    checkAuth() {
      if (localStorage.getItem("balloon") != null) {
        if (this.$store.getters.info.user.role == "student") {
          this.$router.push({ name: "userindex" });
        } else if (this.$store.getters.info.user.role == "support") {
          this.$router.push({ name: "adminindex" });
        }
      }
    },
    openStatusModal() {
      this.$bvModal.show("modal-status");
    },
    closeStatusModal() {
        this.$bvModal.hide("modal-status");
    },
  },
  mounted() {
    this.checkAuth();
  }
};
</script>

<style scoped>
input {
  text-align: center;
}

input::placeholder {
  text-align: center;
}
</style>

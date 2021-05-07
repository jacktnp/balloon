<template>
  <b-container
    class="d-flex align-items-center justify-content-center"
    style="height: 100vh;"
  >
    <b-form class="w-75" @submit.prevent="authLoginLDAP">
      <p class="text-center">
        <img src="../assets/logo3.png" class="w-75 mb-3" />
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
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" class="w-100" variant="success">Login</b-button>

      <small class="text-danger"
        >*การเชื่อมต่อส่วนของ LDAP จำเป็นต้องต่อ vpn ผ่าน LAN ภายในคณะ
        หรือใช้ผ่าน Network ภายในคณะเท่านั้น</small
      >
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
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    authLoginLDAP() {
      this.$isLoading(true);

      axios
        .post("login/ladp", {
          email: this.username,
          password: this.password
        })
        .then(
          response => {
            this.$isLoading(false);
            if(response.data.status == 'fail'){
                this.error = "ชื่อผู้ใช้หรือรหัสผ่านผิด ลองใหม่อีกครั้ง";
                this.openStatusModal();
            } else {
                this.$router.push({ name: "auth" });
            }
          },
          error => {
            this.$isLoading(false);
            this.error = "เกิดข้อผิดพลาด ยังไม่ได้ต่อ LDAP";
            this.openStatusModal();
          }
        );
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
    }
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

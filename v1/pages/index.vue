<template>
  <div>
    หน้าแรก
    <!--  -->
    <!--  -->
    <p>Login : {{ loggedIn }}</p>
    <button @click="logout" class="button--grey">Logout</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.$auth.user,
      loggedIn: this.$auth.loggedIn,
      decodedContent: "",
      errorMessage: "",
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
      this.$router.push("/login");
    },

    //
    onDecode(content) {
      this.decodedContent = content;
    },

    onInit(promise) {
      promise
        .then(() => {
          console.log("Successfully initilized! Ready for scanning now!");
        })
        .catch((error) => {
          if (error.name === "NotAllowedError") {
            this.errorMessage = "Hey! I need access to your camera";
          } else if (error.name === "NotFoundError") {
            this.errorMessage = "Do you even have a camera on your device?";
          } else if (error.name === "NotSupportedError") {
            this.errorMessage =
              "Seems like this page is served in non-secure context (HTTPS, localhost or file://)";
          } else if (error.name === "NotReadableError") {
            this.errorMessage =
              "Couldn't access your camera. Is it already in use?";
          } else if (error.name === "OverconstrainedError") {
            this.errorMessage =
              "Constraints don't match any installed camera. Did you asked for the front camera although there is none?";
          } else {
            this.errorMessage = "UNKNOWN ERROR: " + error.message;
          }
        });
    },
  },
};
</script>
<style lang=""></style>

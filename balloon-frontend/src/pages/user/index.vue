<template>
    <div>
        <navbar />
        <b-container class="w-75 p-0">
            <h5 class="mt-4 font-weight-light">My QR Code</h5>
            <hr class="mb-5">

            <div class="text-center">
                <img v-if="borrow_status <= 0" class="w-75" style="border: .5em solid #fff" :src="'https://dev.initerapp.com/qrcode-uid.php?id='+$store.getters.info.user.email">
                <img v-else class="w-75" style="border: .5em solid #fff" src="../../assets/alert/ban.png">
            </div>
            <br>
            <h5 class="mt-3 text-center"><b>User ID :</b> {{ $store.getters.info.user.email }}</h5>
        </b-container>
    </div>
</template>

<script>
import navbar from '@/components/navbar';

import axios from "@/store/api";

export default {
  components: { navbar },
  data() {
    return {
      borrow_status: 0
    };
  },
  methods: {
    getUser() {
      axios
        .get("user/" + this.$store.getters.info.user._id, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            this.borrow_status = res.data.user.have_borrow;
          },
          err => {
            this.$router.push({ name: 'logout'});
            console.log(err);
          }
        );
    },
  },
  mounted() {
    this.getUser();
  }
};
</script>

<template>
  <div>
    <navbar />
    <div class="container">
      <h4 class="my-4 text-left">Profile</h4>
      <div class="row justify-content-left p-10">
        <div class="col-4">
          <img src="../../assets/qrcode-demo.png" class="w-100" />
        </div>
        <div class="col-4">
          <p style="margin-bottom: 0px">Narongded Pinprechachai</p>

          <div class="row">
            <div class="col-5">
              <span class="text-sucess"> Active </span>
            </div>
            <div class="col-5">
              <b-form-checkbox v-model="checked" name="check-button" switch>
              </b-form-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="position-fixed" style="width: 60%; left: 20%; bottom: 0px">
        <button type="button" class="btn w-100 btn-secondary">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar";

export default {
  components: { navbar },
  data() {
    return {
      checked: true,
    };
  },
};
</script>
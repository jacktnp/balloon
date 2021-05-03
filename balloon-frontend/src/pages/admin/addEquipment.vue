<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h5 class="mt-4 font-weight-light">
        <router-link :to="{ name: 'adminmanagement' }"
          ><i class="fal fa-chevron-left mr-3"></i
        ></router-link>
        Add Equipment
      </h5>
      <hr class="mb-4" />

      <b-form>
        <b-form-group label="Equipment Title :">
          <b-form-input v-model="newEquipment.title" required></b-form-input>
        </b-form-group>
        <b-form-group label="Equipment Description :">
          <b-form-textarea
            v-model="newEquipment.description"
            rows="3"
            required
          ></b-form-textarea>
        </b-form-group>
        <b-form-group label="Equipment Category :">
          <b-form-select
            v-model="newEquipment.category"
            :options="category"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group label="Upload image">
          <b-form-file @change="selectImages" required></b-form-file>
        </b-form-group>

        <div class="position-fixed" style="width: 60%; left: 20%; bottom: 2em;">
          <b-button class="w-100" variant="success" @click="addEquipment"
            >SAVE</b-button
          >
        </div>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import axios from "@/store/api";

export default {
  components: { navbar },
  data() {
    return {
      newEquipment: {
        title: "",
        description: "",
        category: "",
        images: null
      },
      category: [
        { value: "Notebook", text: "Notebook" },
        { value: "Notebook Accessories", text: "Notebook Accessories" },
        { value: "Desktop", text: "Desktop" },
        { value: "TV / Monitor", text: "TV / Monitor" },
        { value: "Computer Hardware", text: "Computer Hardware" },
        { value: "SSD / HDD / Storage", text: "SSD / HDD / Storage" },
        { value: "Mouse / Keyboard / Pad", text: "Mouse / Keyboard / Pad" },
        { value: "Network", text: "Network" },
        { value: "Accessories", text: "Accessories" },
        { value: "Other", text: "Other" }
      ]
    };
  },
  methods: {
    selectImages(event) {
      this.newEquipment.images = event.target.files;
    },
    addEquipment() {
      let formData = new FormData();
      formData.append("name_type", this.newEquipment.title);
      formData.append("detail_type", this.newEquipment.description);
      formData.append("category", this.newEquipment.category);
      formData.append("image", this.newEquipment.images[0]);

      axios
        .post("/type", formData, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            alert("เพิ่มข้อมูลสำเร็จ ระบบจะรีไดเร็คไปหน้ารวม Equipment");
            this.$router.push({ name: "adminmanagement" });
          },
          err => {
            console.log(err);
          }
        );
    }
  }
};
</script>

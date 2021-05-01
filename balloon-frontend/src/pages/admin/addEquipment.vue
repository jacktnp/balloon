<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h5 class="mt-4 font-weight-light">Add Equipment</h5>
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
        <b-form-group label="Equipment Description :">
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
        { value: "test", text: "Test1" },
        { value: "test", text: "Test2" },
        { value: "test", text: "Test3" }
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
      // formData.append("category_type", this.newEquipment.category);
      formData.append("image", this.newEquipment.images[0]);

      axios
        .post("/type", formData, {
          headers: {
            Authorization: 'Bearer ' + this.$store.getters.info.token
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

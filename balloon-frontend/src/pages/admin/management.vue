<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h5 class="mt-4 font-weight-light">Management</h5>
      <hr class="mb-4" />

      <div class="row">
        <div
          class="col-6 col-md-3 px-1"
          v-for="(equipment, index) in equipments"
          :key="index"
        >
          <router-link :to="{ name : 'adminadddevice', params: { id: equipment._id }}">
            <div class="card my-3">
                <img :src="checkImage(equipment.img)" height="120px"
                />
            </div>
            <h6 class="text-center">{{ equipment.name_type }}</h6>
          </router-link>
        </div>
      </div>
    </b-container>

    <div class="position-fixed" style="bottom: 2em;right: 2em;">
      <b-button
        class="rounded-circle"
        style="transform: scale(1.25)"
        variant="success"
        :to="{ name: 'adminaddequipment' }"
        ><i class="fas fa-plus"></i
      ></b-button>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import axios from "@/store/api";

export default {
  components: { navbar },
  data() {
    return {
      equipments: []
    };
  },
  methods: {
    getEquipment() {
      axios
        .get("/type", {
          headers: {
            Authorization: "Bearer " + this.$store.getters.info.token
          }
        })
        .then(
          res => {
            this.equipments = res.data.type;
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
    this.getEquipment();
  },
  computed: {}
};
</script>

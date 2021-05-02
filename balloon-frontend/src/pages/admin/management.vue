<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h5 class="mt-4 font-weight-light">Management</h5>
      <hr class="mb-4" />

      <b-form-group
      >
        <b-form-input
          v-model="search"
          placeholder="ค้นหาคำที่ต้องการ..."
        ></b-form-input>
      </b-form-group>

      <div class="row">
        <div
          class="col-6 col-md-4 px-1"
          v-for="(equipment, index) in filteredList"
          :key="index"
        >
          <router-link :to="{ name : 'adminadddevice', params: { id: equipment._id }}">
            <div class="card my-3">
                <img :src="checkImage(equipment.img)" height="150px"
                />
            </div>
            <h6 class="text-center">{{ equipment.name_type }}</h6>
          </router-link>
        </div>
      </div>
      <br><br><br>
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
      equipments: [],
      search: ''
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
  computed: {
    filteredList() {
      return this.equipments.filter(equipment => {
        return equipment.name_type.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  }
};
</script>

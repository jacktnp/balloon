<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h5 class="mt-4 font-weight-light">Browse</h5>
      <hr class="mb-4" />

      <div class="row">
        <div class="col-6 col-md-3 px-1" v-for="(item, index) in equipments" :key="index">
          <div class="card my-3" @click="openModal(index)">
            <img :src="checkImage(item.img)" height="120px"/>
          </div>
          <h6 class="text-center">{{ item.name_type }}</h6>
        </div>
      </div>
    </b-container>

    <!-- Modal -->
    <b-modal id="modal-information" centered hide-footer>
      <div class="d-flex justify-content-center mb-4">
        <img :src="checkImage(equipments[index].img)" class="w-75" />
      </div>
      <h6 class="font-weight-bold">{{ equipments[index].name_type }}</h6>
      <p>
        <b>Description :</b> {{ equipments[index].detail_type }}
      </p>

      <hr />
      <div class="row">
        <div class="col-4"><b>ID</b></div>
        <div class="col-8">{{ equipments[index]._id }}</div>

        <div class="col-4"><b>Status</b></div>
        <div class="col-8">
          <span class="text-success text-capitalize">{{ equipments[index].status_type }}</span>
        </div>

        <div class="col-4"><b>Category</b></div>
        <div class="col-8">xxxx</div>
      </div>
    </b-modal>
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
      index: 0
    };
  },
  methods: {
    openModal(index) {
      this.$bvModal.show("modal-information");
      this.index = index;
    },
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
  }
};
</script>

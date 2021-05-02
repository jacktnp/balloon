<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h5 class="mt-4 font-weight-light">Browse</h5>
      <hr class="mb-4" />

      <b-form-group
      >
        <b-form-input
          v-model="search"
          placeholder="ค้นหาคำที่ต้องการ..."
        ></b-form-input>
      </b-form-group>

      <div class="row">
        <div class="col-6 col-md-4 px-1" v-for="(item, index) in filteredList" :key="index">
          <div class="card my-3" @click="openModal(item._id)">
            <img :src="checkImage(item.img)" height="150px"/>
          </div>
          <h6 class="text-center">{{ item.name_type }}</h6>
        </div>
      </div>
      <br>
      <br>
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
      index: 0,
      search: ''
    };
  },
  methods: {
    openModal(id) {
      this.equipments.map((value, index) => {
        if(id == value._id){
          this.index = index;
        }
      })
      this.$bvModal.show("modal-information");
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

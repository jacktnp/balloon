<template>
  <div>
    <navbar />
    <b-container class="w-75 p-0">
      <div class="row" id="headingrow">
        <div class="col-5">
          <h5 class="mt-4 font-weight-light">Management</h5>
        </div>
        <div class="col-7 d-flex justify-content-end mt-4">
          <input id="search" name="search" type="text" v-model="search"><input id="search_submit" value="Rechercher" type="submit">
        </div>
      </div>

      <hr class="mb-4" />

      <div class="row" id="headingrow">
        <div
          class="col-6 col-md-4 px-1"
          v-for="(equipment, index) in filteredList"
          :key="index"
        >
          <router-link
            :to="{ name: 'adminadddevice', params: { id: equipment._id } }"
          >
            <div class="card my-3">
              <img :src="checkImage(equipment.img)" height="150px" />
            </div>
            <h6 class="text-center">{{ equipment.name_type }}</h6>
          </router-link>
        </div>
      </div>
      <br /><br /><br />
    </b-container>

    <div class="position-fixed" style="bottom: 2em;right: 2em;">
      <b-button
        class="rounded-circle"
        style="transform: scale(1.25)"
        variant="primary"
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
      search: "",
      searchActive: false
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
        return equipment.name_type
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style scoped>
h6 {
  color: rgb(44, 44, 44) !important;
  text-decoration: none !important;
}


input[type="text"] {
  display: inline-block;
  border: none;
  outline: none;
  color: #555;
  padding: 3px;
  padding-right: 60px;
  width: 0px;
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  z-index: 3;
  transition: width .4s cubic-bezier(0.000, 0.795, 0.000, 1.000);
  cursor: pointer;
}

input[type="text"]:focus:hover {
  border-bottom: 1px solid #BBB;
}

input[type="text"]:focus {
  width: 80%;
  z-index: 1;
  border-bottom: 1px solid #BBB;
  cursor: text;
  outline: none;
}
input[type="submit"] {
  height: auto;
  width: 1.25em;
  display: inline-block;
  color:red;
  background: url('../../assets/search-regular.svg') center center no-repeat;
  text-indent: -10000px;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  cursor: pointer;
  opacity: 0.4;
  cursor: pointer;
  transition: opacity .4s ease;
}

input[type="submit"]:hover {
  opacity: 0.8;
}
</style>

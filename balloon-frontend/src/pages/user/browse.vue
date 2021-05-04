<template>
  <div>
    <navbar />
    <b-container class="w-75 p-0">
      <div class="row" id="headingrow">
        <div class="col-5">
          <h5 class="mt-4 font-weight-light">Browse</h5>
        </div>
        <div class="col-7 d-flex justify-content-end mt-4">
          <input id="search" name="search" type="text" v-model="search" /><input
            id="search_submit"
            value="Rechercher"
            type="submit"
          />
        </div>
      </div>
      <hr class="mb-4" />

      <div class="row" id="headingrow">
        <div
          class="col-6 col-md-4 px-1"
          v-for="(item, index) in filteredList"
          :key="index"
        >
          <div class="card my-3" @click="openModal(item._id)">
            <img :src="checkImage(item.img)" height="150px" />
          </div>
          <h6 class="text-center">{{ item.name_type }}</h6>
        </div>
      </div>
      <br />
      <br />
    </b-container>

    <!-- Modal -->
    <b-modal id="modal-information" centered hide-footer>
      <div class="d-flex justify-content-center mb-4">
        <img :src="checkImage(equipments[index].img)" class="w-75" />
      </div>
      <h6 class="font-weight-bold">{{ equipments[index].name_type }}</h6>
      <p><b>Description :</b> {{ equipments[index].detail_type }}</p>

      <hr />
      <div class="row">
        <div class="col-4"><b>ID</b></div>
        <div class="col-8">{{ equipments[index]._id }}</div>

        <div class="col-4"><b>Status</b></div>
        <div class="col-8">
          <span
            class="text-success text-capitalize"
            v-if="equipments[index].have_device > 0"
            >Avaliable</span
          >
          <span class="text-danger text-capitalize" v-else>Unavaliable</span>
        </div>

        <div class="col-4"><b>Category</b></div>
        <div class="col-8">{{ equipments[index].category }}</div>
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
      search: ""
    };
  },
  methods: {
    openModal(id) {
      this.equipments.map((value, index) => {
        if (id == value._id) {
          this.index = index;
        }
      });
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
        return equipment.name_type
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    }
  }
};
</script>

<style>
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
  transition: width 0.4s cubic-bezier(0, 0.795, 0, 1);
  cursor: pointer;
}

input[type="text"]:focus:hover {
  border-bottom: 1px solid #bbb;
}

input[type="text"]:focus {
  width: 80%;
  z-index: 1;
  border-bottom: 1px solid #bbb;
  cursor: text;
  outline: none;
}

input[type="submit"] {
  height: auto;
  width: 1.25em;
  display: inline-block;
  color: red;
  background: url("../../assets/search-regular.svg") center center no-repeat;
  text-indent: -10000px;
  border: none;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  cursor: pointer;
  opacity: 0.4;
  cursor: pointer;
  transition: opacity 0.4s ease;
}
/* body.modal-open #modal-information {
  border-bottom: 0px !important;

} */

/* #modal-information___BV_modal_body_ {
   border-bottom: 0px !important;
} */
input[type="submit"]:hover {
  opacity: 0.8;
}
</style>

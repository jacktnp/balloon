<template>
  <div>
    <navbar />
    <b-container class="w-75">
      <h4 class="mt-4 font-weight-light">Enter Equipment ID</h4>
      <hr class="mb-4" />

      <div class="row">
        <div class="col-10 col-md-11 p-1">
          <b-form-group>
            <b-form-input
              class="w-100"
              type="text"
              placeholder="ระบุ ทส และกด ENTER หรือแสกน QR Code"
              v-model="item"
              v-on:keyup.enter="addItem"
            ></b-form-input>
          </b-form-group>
        </div>
        <div class="col-2 col-md-1 p-1">
          <b-button class="w-100" variant="danger">
            <i class="fas fa-qrcode"></i>
          </b-button>
        </div>
      </div>

      <b-list-group class="mt-2" style="height: 52vh;overflow-y: auto;">
        <b-list-group-item
          class="d-flex justify-content-between align-items-center border-0"
          v-for="(item, index) in items" :key="index"
        >
          {{ item }}
          <small @click.prevent="delItem(index)">
              <i class="fas fa-trash-alt"></i>
          </small>
        </b-list-group-item>
      </b-list-group>

      <div class="position-fixed" style="width: 60%; left: 20%; bottom: 2em;">
        <b-button class="w-100" variant="success">Next</b-button>
      </div>
    </b-container>

  </div>
</template>

<script>
import navbar from "@/components/navbar";

export default {
  components: { navbar },
  data() {
    return {
      item: '',
      items: []
    };
  },
  methods: {
    openModal() {
      this.$bvModal.show("modal-information");
    },
    addItem() {
        if(this.item.length > 0){
            this.items.push(this.item);
            this.item = '';
        }
        else {
            alert("กรุณาระบุข้อมูลให้ครบ")
        }
    },
    delItem(index) {
        this.items.splice(index);
    }
  }
};
</script>

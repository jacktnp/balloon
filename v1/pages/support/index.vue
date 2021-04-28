<template>
  <div class="h-screen" style="background-color: #e8e8e8">
    <div
      class="w-full h-screen"
      :class="{ hidden: confirm }"
      style="position: absolute; background-color: #000000c4; z-index: 9"
    ></div>
    <!-- 1 ------------------------ -->
    <section
      class="md:w-1/5 w-full mx-auto flex flex-col items-center"
      v-if="step == 1"
    >
      <!-- Image -->
      <qrcode-stream @decode="pushEquipIDbyQR"></qrcode-stream>

      <div class="grid grid-cols-6 gap-4 mt-4">
        <div class="col-span-5">
          <input
            class="form-input block w-full rounded-sm"
            placeholder="Enter Equipment ID"
            v-model="equipmentId"
            @keyup.enter="pushEquipIDbyInput"
          />
        </div>
        <div>
          <button
            class="group relative flex justify-center p-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i class="fal fa-qrcode"></i>
          </button>
        </div>
      </div>

      <!-- Loop Equipment -->
      <div class="w-3/4 mt-4 h-72" style="overflow: auto">
        <table class="w-full">
          <tbody>
            <tr
              v-for="(equip, index) in equipments"
              :key="index"
              style="background-color: #dadada"
            >
              <td class="p-2 w-5/6">
                <p><b>ID</b> : {{ equip }}</p>
              </td>
              <td class="p-2 w-1/6 text-center">
                <i class="fas fa-trash-alt" @click="removeEquipment(index)"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <button
        class="group absolute md:w-full w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-6"
        style="bottom: 2em"
        @click="step = 2"
      >
        Next
      </button>
    </section>
    <!-- 2 ------------------------ -->
    <section
      class="md:w-1/5 w-full mx-auto flex flex-col items-center"
      v-else-if="step == 2"
    >
      <!-- Image -->

      <div class="grid grid-cols-6 gap-4 mt-4">
        <div class="col-span-5">
          <input
            class="form-input block w-full rounded-sm"
            placeholder="Enter Borrower ID (Student ID)"
            v-model="borrowObj.studentId"
          />
        </div>
        <div>
          <button
            class="w-group relative flex justify-center p-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i class="fal fa-qrcode"></i>
          </button>
        </div>
      </div>

      <!-- Show Student Name -->

      <button
        class="group relative md:w-full w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-6"
        @click="getEquipmentInfo"
      >
        Next
      </button>
    </section>
    <!-- 3 ------------------------ -->
    <section
      class="md:w-1/5 w-full mx-auto flex flex-col items-center"
      v-else-if="step == 3"
    >
      <!-- Image -->

      <div class="grid grid-cols-6 gap-4 mt-4 md:w-full w-3/4" v-for="(equip, index) in borrowObj.equipments" :key="index">
        <div class="col-span-2">
          <img :src="checkUrl(equip.img)" />
        </div>
        <div class="col-span-4">
          <h1>{{ equip.detail_type }}</h1>
          <small>Equipment ID : {{ equip.code_device }}</small>
        </div>
      </div>

      <div class="w-3/4 h-1 border-b border-gray-50 my-5"></div>

      <div class="w-3/4">
        <h1>Suphakit Nachom</h1>
        <small>Client ID : 61070250</small>
      </div>

      <div class="w-3/4 h-1 border-b border-gray-50 my-5"></div>

      <div class="w-3/4">
        <h1>กำหนดวันคืน</h1>
        <input
          type="date"
          class="form-input block w-full rounded-sm"
          v-model="borrowObj.deadline"
        />
      </div>

      <!-- Show Student Name -->

      <button
        class="group relative md:w-full w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-6"
        @click="createBorrow"
      >
        Confirm
      </button>
    </section>

    <!-- Modal -->
    <div class="flex items-center justify-center">
      <div
        class="absolute align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full md:w-1/4"
        style="z-index: 99"
        :class="{ hidden: confirm }"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div
              class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <i class="fas fa-box-check text-green-600"></i>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                class="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Transaction complete!
              </h3>
              <div class="mt-2">
                <button
                  class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  @click="closeBorrow"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      equipments: ["003", "004"],
      borrowObj: {
        studentId: "",
        deadline: "",
        equipments: {},
      },
      equipmentId: "",
      confirm: true,
    };
  },
  methods: {
    pushEquipIDbyInput() {
      this.equipments.push(this.equipmentId);
    },
    pushEquipIDbyQR(newID) {
      this.equipments.push(newID);
    },
    removeEquipment(index) {
      this.equipments.splice(index, 1);
    },
    async getEquipmentInfo() {
      this.step = 3;
      await this.$axios
        .post(
          "/device/search",
          {
            data: this.equipments,
          },
          { headers: { Authorization: this.$nuxt.$auth.getToken("local") } }
        )
        .then(
          (res) => {
            this.borrowObj.equipments = res.data.device;
            console.log(res.data.device);
          },
          (err) => {
            console.log(err);
          }
        );
    },
    createBorrow() {
      this.confirm = false;
    },
    closeBorrow() {
      this.confirm = false;
      this.$router.push({ path: "/" });
    },
    checkUrl(source) {
      if(source.length == 0) 
        return "https://www.ktnwebdesign.com/wp-content/uploads/2019/10/123456.png";
      
      return source[0].url;
    }
  },
  // mounted() {
  //   console.log(process.env.BASE_URL)
  // }
};
</script>

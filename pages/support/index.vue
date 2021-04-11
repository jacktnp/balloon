<template>
  <div class="h-screen" style="background-color: #e8e8e8">
    <div class="w-full h-screen" :class="{ 'hidden' : confirm }" style="position: absolute;background-color: #000000c4;z-index: 9"></div>
    <navbar />
    <!-- 1 ------------------------ -->
    <section
      class="md:w-1/5 w-full mx-auto flex flex-col items-center"
      v-if="step == 1"
    >
      <!-- Image -->

      <div class="grid grid-cols-6 gap-4 mt-4">
        <div class="col-span-5">
          <input
            class="form-input block w-full rounded-sm"
            placeholder="Enter Equipment ID"
            v-model="equipmentId"
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
      <table class="md:min-w-full w-3/4 mt-5">
        <tbody>
          <tr
            v-for="(equip, index) in equipments"
            :key="index"
            style="background-color: #dadada"
          >
            <td class="p-2 w-5/6">
              <p><b>ID</b> : {{ equip.id }}</p>
            </td>
            <td class="p-2 w-1/6 text-center">
              <i class="fas fa-trash-alt"></i>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        class="group relative md:w-full w-3/4 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 mt-6"
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
            v-model="studentId"
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
        @click="step = 3"
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

      <div class="grid grid-cols-6 gap-4 mt-4 md:w-full w-3/4">
        <div class="col-span-2">
          <img src="https://i.imgur.com/XUoIhfZ.png" alt="" />
        </div>
        <div class="col-span-4">
          <h1>MacBook Pro 13 inch</h1>
          <small>Equipment ID : xxxxxxxxxx</small>
          <small>Count : 1</small>
        </div>
      </div>

      <div class="w-3/4 h-1 border-b border-gray-50 my-5"></div>

      <div class="w-3/4">
        <h1>Suphakit Nachom</h1>
        <small>Borrower ID : 61070250</small>
      </div>

      <div class="w-3/4 h-1 border-b border-gray-50 my-5"></div>

      <div class="w-3/4">
        <h1>กำหนดวันคืน</h1>
        <input
          type="date"
          class="form-input block w-full rounded-sm"
          v-model="deadline"
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
      class="absolute align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full md:w-1/4" style="z-index: 99" :class="{ 'hidden' : confirm }"
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
              <button class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="closeBorrow">
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
import navbar from '@/components/navbar'

export default {
  components: {
    navbar,
  },
  data() {
    return {
      step: 1,
      equipments: [
        { id: '2ทส 7832382932', title: '' },
        { id: '2ทส 3812122932', title: '' },
        { id: '2ทส 2183238322', title: '' },
        { id: '2ทส 3232338293', title: '' },
        { id: '2ทส dwede23223', title: '' },
      ],
      equipmentId: '',
      studentId: '',
      deadline: '',
      confirm: true,
    }
  },
  methods: {
    createBorrow() {
        this.confirm = false;
    },
    closeBorrow() {
        this.confirm = false;
        this.$router.push({ path: '/' })
    }
  },
}
</script>

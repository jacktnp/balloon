<template>
  <div class="h-screen" style="background-color: #e8e8e8">
    <section class="md:w-1/5 w-full mx-auto flex flex-col items-center">
      <h1 class="text-xl font-bold">Profile</h1>
      <br />
      <div class="grid grid-cols-6 gap-4 mt-4 md:w-full w-3/4">
        <div class="col-span-2">
          <img src="https://i.imgur.com/d0UfQZd.jpg" />
        </div>
        <div class="col-span-4">
          <h1>Montree Kingkaew</h1>
          <small>Status </small>

          <div
            class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
          >
            <input
              type="checkbox"
              name="toggle"
              id="toggle"
              v-model="status"
              class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
            />
            <label
              for="toggle"
              class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
          <label for="toggle" class="text-xs text-gray-700">
              <span class="text-green-500" v-if="status == true">Active</span>
              <span class="text-red-500" v-else>InActive</span>
          </label>
          <p class="mt-2">Contact :</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
      return {
          status: false
      }
  }
};
</script>

<style scoped>
.toggle-checkbox:checked {
  right: 0;
  border-color: #68d391;
}
.toggle-checkbox:checked + .toggle-label {
  background-color: #68d391;
}
</style>

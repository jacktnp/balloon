<template>
    <b-container class="d-flex flex-column justify-content-center" style="height: 100vh">
        <!-- <h4 class="text-center">Select your role : {{ $store.getters.info.user.role }}</h4> -->
        <b-button class="w-100 mt-2" variant="primary" :to="{ name: 'adminindex' }">Admin Role</b-button>
        <b-button class="w-100 mt-2" variant="warning" :to="{ name: 'userindex' }">Student Role</b-button>
    </b-container>
</template>

<script>
export default {
    methods: {
        checkAuth() {
            if(localStorage.getItem("balloon") === null){
                this.$router.push({ name: 'auth' });
            } else if(this.$store.getters.info.user.role == 'student') {
                this.$router.push({ name: 'userindex' });
            } else if(this.$store.getters.info.user.role == 'support') {
                this.$router.push({ name: 'adminindex' });
            } else {
                this.$router.push({ name: 'auth' });
            }
        }
    },
    mounted() {
        this.checkAuth();
    }
}
</script>
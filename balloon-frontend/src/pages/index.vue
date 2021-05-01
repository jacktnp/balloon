<template>
    <b-container class="d-flex flex-column justify-content-center" style="height: 100vh">
        <h4 class="text-center">Select your role : {{ $store.getters.info.user.role }}</h4>
        <b-button class="w-100 mt-2" variant="primary" :to="{ name: 'adminindex' }">Admin Role</b-button>
        <b-button class="w-100 mt-2" variant="warning" :to="{ name: 'userindex' }">Student Role</b-button>
    </b-container>
</template>

<script>
export default {
    
}
</script>
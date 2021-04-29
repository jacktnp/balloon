<template>
    <b-container class="d-flex flex-column justify-content-center" style="height: 100vh">
        <h4 class="text-center">Select your role :</h4>
        <b-button class="w-100 mt-2" variant="primary">Admin Role</b-button>
        <b-button class="w-100 mt-2" variant="warning" :to="{ name: 'qr' }">Student Role</b-button>
    </b-container>
</template>

<script>
export default {
    
}
</script>
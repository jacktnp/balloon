<template>
    <div>
        <navbar />
        <b-container class="w-75">
            <h4 class="mt-4 font-weight-light">My QR Code</h4>
            <hr class="mb-4">

            <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=500x5000&data='+$store.getters.info.user.email" class="w-100">
            <br>
            <br>
            <h6 class="text-center">User ID : {{ $store.getters.info.user.email }}</h6>
        </b-container>
    </div>
</template>

<script>
import navbar from '@/components/navbar';

export default {
    components: { navbar }
}
</script>
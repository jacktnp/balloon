<template>
    <div>
        <navbar />
        <b-container class="w-75">
            <h5 class="mt-4 font-weight-light">My QR Code</h5>
            <hr class="mb-5">

            <div class="text-center">
                <img class="w-75" style="border: .5em solid #fff" :src="'https://api.qrserver.com/v1/create-qr-code/?size=500x5000&data='+$store.getters.info.user.email">
            </div>
            <br>
            <h5 class="mt-3 text-center"><b>User ID :</b> {{ $store.getters.info.user.email }}</h5>
        </b-container>
    </div>
</template>

<script>
import navbar from '@/components/navbar';

export default {
    components: { navbar }
}
</script>
<template>
    <div>
        <navbar />
        <b-container class="w-75">
            <h4 class="mt-4 font-weight-light">My QR Code</h4>
            <hr class="mb-4">

            <img src="../../assets/qrcode-demo.png" class="w-100">

            <h6 class="text-center">Borrow ID : 60070031</h6>
        </b-container>
    </div>
</template>

<script>
import navbar from '@/components/navbar';

export default {
    components: { navbar }
}
</script>
<template>
    <div>
        <navbar />
        <b-container class="w-75">
            <h4 class="mt-4 font-weight-light">Supporter Active</h4>
            <hr class="mb-4">

            <div class="row mt-3">
                <div class="col-4 col-md-2">
                    <img src="../../assets/qrcode-demo.png" class="w-100">
                </div>
                <div class="col-8 col-md-10">
                    <h6 class="mt-2 mb-0">Montree Kingkaew</h6>
                    <small class="text-success">Active</small>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-4 col-md-2">
                    <img src="../../assets/qrcode-demo.png" class="w-100">
                </div>
                <div class="col-8 col-md-10">
                    <h6 class="mt-2 mb-0">Thanabordee Khaimarn</h6>
                    <small class="text-danger">Offline</small>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
import navbar from '@/components/navbar';

export default {
    components: { navbar }
}
</script>
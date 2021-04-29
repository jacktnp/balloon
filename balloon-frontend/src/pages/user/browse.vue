<template>
    <div>
        <navbar />
        <b-container class="w-75">
            <h4 class="mt-4 font-weight-light">Browse</h4>
            <hr class="mb-4">

            <div class="row">
                <div class="col-6 col-md-3">
                    <div class="card my-3" @click="openModal()">
                        <img src="../../assets/qrcode-demo.png">
                    </div>
                    <h6 class="text-center">MacBook Pro 13 inch</h6>
                </div>
                
            </div>
        </b-container>

        <!-- Modal -->
        <b-modal id="modal-information" centered hide-footer>
            <div class="d-flex justify-content-center mb-4">
                <img src="../../assets/qrcode-demo.png" class="w-75">
            </div>
            <h6 class="font-weight-bold">MacBook Pro 13 inch</h6>
            <p><b>Description :</b> Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
            
            <hr>
            <div class="row">
                <div class="col-4"><b>ID</b></div>
                <div class="col-8">xxxxxxxx</div>

                <div class="col-4"><b>Status</b></div>
                <div class="col-8">
                    <span class="text-success">Avaliable</span>
                </div>

                <div class="col-4"><b>Category</b></div>
                <div class="col-8">xxxxxxxx</div>
            </div>

        </b-modal>
    </div>
</template>

<script>
import navbar from '@/components/navbar';

export default {
    components: { navbar },
    methods: {
        openModal() {
            this.$bvModal.show('modal-information');
        }
    }
}
</script>
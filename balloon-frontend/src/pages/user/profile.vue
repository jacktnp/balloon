<template>
    <div>
        <navbar />
        <b-container class="w-75">
            <h4 class="mt-4 font-weight-light">Profile</h4>
            <hr class="mb-4">

            <div class="row">
                <div class="col-4 col-md-2">
                    <img src="../../assets/qrcode-demo.png" class="w-100">
                </div>
                <div class="col-8 col-md-10">
                    <h6 class="mb-0">Thanapon Wongprasert</h6>
                    <small>User ID : 60070031</small>
                    <p class="mt-2 mb-1"><b>Contact :</b></p>
                    <small>Lorem ismallsum dolor sit amet consectetur adipisicing elit.</small>
                </div>
            </div>

            <!-- <div class="d-flex align-items-end" style="height: 65vh">
                <b-button class="w-100" variant="secondary" v-b-modal.modal-user>Edit</b-button>
            </div> -->
            <div class="position-absolute" style="bottom: 0;">
                <b-button class="w-100" variant="secondary" v-b-modal.modal-user>Edit</b-button>
            </div>
        </b-container>

        <!-- Modal -->
        <b-modal id="modal-user" centered hide-footer title="Profile">
            <b-form-group
                label="Contact Description"
            >
                <b-form-textarea
                    id="textarea-formatter"
                    v-model="editContact.description"
                ></b-form-textarea>
            </b-form-group>
            <hr>
            <b-form-group
                label="Upload image"
            >
                <b-form-file></b-form-file>
            </b-form-group>
            
            <div class="text-center">
                <b-button class="w-50 mt-2" variant="success">Save</b-button>
            </div>

        </b-modal>
    </div>
</template>

<script>
import navbar from '@/components/navbar';

export default {
    components: { navbar },
    data() {
        return {
            editContact : {
                description: '',
                image: null
            }
        }
    },
    methods: {
        openModal() {
            this.$bvModal.show('modal-information');
        }
    }
}
</script>
<template>
    <div>
        Logout...
    </div>
</template>

<script>
export default {
    mounted() {
        localStorage.removeItem("balloon");
        this.$router.push({ name: "auth" });
        location.reload();
    }
}
</script>

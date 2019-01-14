<template>
    <h1>App works</h1>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {vendorsStore} from "./store/modules/VendorsStore";

    @Component
    export default class Application extends Vue {
        mounted() {
            vendorsStore.getVendors();
        }
    }
</script>
<style scoped>

</style>

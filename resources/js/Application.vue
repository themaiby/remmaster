<template>
    <h1>App works</h1>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {applicationStore} from "./store/modules/ApplicationStore";

    @Component
    export default class Application extends Vue {
        mounted() {
            applicationStore.getMenu();
        }
    }
</script>
<style scoped>

</style>

<template>
  <div class="container-fluid">
    <file-upload></file-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FileUpload from "@/components/FileUpload.vue";

export default defineComponent({
  name: "App",
  components: {
    FileUpload,
  },
});
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

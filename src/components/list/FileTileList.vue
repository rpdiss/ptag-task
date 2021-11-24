<template>
  <div class="row justify-content-md-center mt-sm-5 mt-md-3 mt-lg-1">
    <file-tile
      v-for="storeFile in fileList"
      :key="storeFile.id"
      :storeFile="storeFile"
    ></file-tile>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import store from "@/store";
import FileTile from "@/components/list/FileTile.vue";

export default defineComponent({
  name: "file-tile-list",
  components: {
    FileTile,
  },
  setup: () => {
    const fileList = computed(() => store.getters.fileList);
    return { fileList };
  },
});
</script>

<style scoped></style>

<template>
  <div class="row justify-content-md-center">
    <div class="col-md-auto">
      <label class="btn btn-primary file-upload">
        <input
          class="file-upload__input"
          type="file"
          @change.prevent="onChange($event)"
        />
        Pick file
      </label>
    </div>
  </div>
  <div
    v-if="state.displayFileError"
    class="row justify-content-center mt-sm-5 mt-md-3 mt-lg-1"
  >
    <div class="col-md-auto">
      <div v-if="state.rickRoll" class="alert alert-success" role="alert">
        File transfer done. Path on server: /dev/null
      </div>
      <div v-else class="alert alert-danger" role="alert">
        File you trying upload is invalid.
      </div>
    </div>
  </div>
  <file-tile-list></file-tile-list>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { v4 } from "uuid";
import {
  imageFileInfo,
  isValid,
  readFileInfo,
  textFileInfo,
} from "@/utils/utils";
import FileTileList from "@/components/list/FileTileList.vue";
import store from "@/store";
import { FileTypes, StoreFile } from "@/model/store-file";
import { ImgFile } from "@/model/img-file";
import { TextFile } from "@/model/text-file";

export default defineComponent({
  name: "file-upload",
  components: {
    FileTileList,
  },
  setup: () => {
    const state = reactive({ displayFileError: false, rickRoll: false });

    const updateFileError = (displayFileError: boolean, rickRoll = false) => {
      Object.assign(state, { displayFileError, rickRoll });
    };
    const onChange = async (event: Event): Promise<void> => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        if (file) {
          let tmpFile: StoreFile = {
            id: v4(),
            type: FileTypes.Allowed,
            file,
          };
          const fileInfo = await readFileInfo(file);
          if (fileInfo) {
            if (isValid(fileInfo)) {
              if (fileInfo.ext === "jpg" || fileInfo.ext === "png") {
                const imgFile: ImgFile = await imageFileInfo(
                  file,
                  fileInfo.mime
                );
                tmpFile = { ...tmpFile, ...imgFile };
              }
              await store.dispatch("addFile", tmpFile);
              updateFileError(false);
            } else {
              updateFileError(true, fileInfo.ext === "exe");
            }
          } else {
            const txtFile: TextFile = await textFileInfo(file);
            await store.dispatch("addFile", txtFile);
            updateFileError(false);
          }
        } else {
          updateFileError(true);
        }
      }
    };

    return { state, onChange };
  },
});
</script>
<style lang="scss">
.file-upload {
  &__input {
    display: none;
  }
}
</style>

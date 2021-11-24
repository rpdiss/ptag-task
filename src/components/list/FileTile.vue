<template>
  <div
    :key="storeFile.id"
    v-if="storeFile.type === fileTypes.Text"
    class="
      col-sm-12 col-md-6 col-lg-4
      file-tile file-tile__text-tile
      text-start
    "
  >
    <dvi class="row">
      <div class="col label-col">Characters count:</div>
      <div class="col">{{ storeFile.characters }}</div>
    </dvi>
    <dvi class="row">
      <div class="col label-col">Words count:</div>
      <div class="col">{{ storeFile.words }}</div>
    </dvi>
  </div>
  <div
    :key="storeFile.id"
    v-if="storeFile.type === fileTypes.Img"
    class="
      col-sm-12 col-md-6 col-lg-4
      file-tile file-tile__img-tile
      position-relative
      text-start
    "
  >
    <img class="img" :src="state.imgSrc" alt="" />
    <span class="position-absolute display-info">
      Original width: {{ storeFile.dimensions.width }} <br />Original height:
      {{ storeFile.dimensions.height }}
    </span>
  </div>
  <div
    :key="storeFile.id"
    v-if="storeFile.type === fileTypes.Allowed"
    class="
      col-sm-12 col-md-6 col-lg-4
      file-tile file-tile__allowed-tile
      text-start
    "
  >
    <dvi class="row">
      <div class="col label-col">File name:</div>
      <div class="col">{{ storeFile.file.name }}</div>
    </dvi>
    <dvi class="row">
      <div class="col label-col">File size:</div>
      <div class="col">{{ storeFile.file.size }}</div>
    </dvi>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { FileTypes } from "@/model/store-file";
import { createObjectURL } from "@/utils/utils";

export default defineComponent({
  name: "file-tile",
  props: {
    storeFile: {
      type: Object,
      required: true,
    },
  },
  setup: (props) => {
    const fileTypes = FileTypes;
    const state = reactive({
      imgSrc: "",
    });

    if (props.storeFile.type === fileTypes.Img) {
      createObjectURL(props.storeFile.file, props.storeFile.type).then(
        (imgSrc) => {
          Object.assign(state, { imgSrc });
        }
      );
    }

    return { props, state, fileTypes };
  },
});
</script>
<style lang="scss">
$bg-color: rgba(44, 62, 80, 0.4);
$border--color: $bg-color;
.file-tile {
  border: 1pt solid $border--color;
  background: $bg-color;
  .label-col {
    font-weight: bold;
  }

  &__img-tile {
    .img {
      max-height: 24rem;
      width: auto;
    }
    .display-info {
      font-size: 1.4rem;
      font-weight: bold;
      padding: 0.2rem;
      left: 0.2rem;
      bottom: 0.2rem;
      color: #fff;
      background: $bg-color;
      width: 100%;
      display: inline-block;
    }
  }
}
</style>

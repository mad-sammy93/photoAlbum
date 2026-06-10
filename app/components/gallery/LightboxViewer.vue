<script setup lang="ts">
import VueEasyLightbox from "vue-easy-lightbox";

const props = defineProps<{
  visible: boolean;
  images: string[];
  index: number;
}>();

const emit = defineEmits<{
  close: [];
  updateIndex: [index: number];
}>();

function hide() {
  emit("close");
}

function handleIndexChange(index: number) {
  emit("updateIndex", index);
}
</script>

<template>
  <VueEasyLightbox
    :visible="visible"
    :imgs="images"
    :index="index"
    @hide="hide"
    @on-index-change="handleIndexChange"
  />
</template>

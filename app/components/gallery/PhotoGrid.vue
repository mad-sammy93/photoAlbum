<script setup lang="ts">
defineProps<{
  photos: any[];
}>();

const emit = defineEmits<{
  open: [index: number];
}>();
</script>

<template>
  <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
    <div
      v-for="(photo, index) in photos"
      :key="photo.id"
      class="mb-4 break-inside-avoid"
    >
      <button
        class="group block overflow-hidden rounded-2xl"
        @click="emit('open', index)"
      >
        <NuxtImg
          :src="photo.thumbnail_url"
          loading="lazy"
          class="w-full transition duration-500 group-hover:scale-[1.02]"
        />

        <div
          class="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AlbumWithPhotos } from "~/types/database.types";
defineProps<{
  album: AlbumWithPhotos;
}>();
</script>

<template>
  <NuxtLink
    :to="`/albums/${album.slug}`"
    class="group overflow-hidden rounded-3xl border bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 transition duration-500 hover:border-zinc-700"
  >
    <div class="aspect-[4/5] overflow-hidden">
      <NuxtImg
        v-if="album.coverUrl"
        :src="album.coverUrl"
        :alt="album.title"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div
        v-else
        class="flex h-full w-full items-center justify-center bg-zinc-800 text-zinc-500"
      >
        No Photos Yet
      </div>
    </div>

    <div class="p-6">
      <h2 class="text-2xl font-serif text-zinc-900 dark:text-white">
        {{ album.title }}
      </h2>

      <p
        v-if="album.description"
        class="mt-2 text-sm text-zinc-600 dark:text-zinc-400"
      >
        {{ album.description }}
      </p>

      <p class="mt-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
        {{ album.photoCount }}
        photos
      </p>
    </div>
  </NuxtLink>
</template>

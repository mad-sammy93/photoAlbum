<script setup lang="ts">
defineProps<{
  album: {
    id: string;
    title: string;
    slug: string;
    description?: string;
    photoCount: number;
    coverUrl?: string;
  };
}>();
</script>

<template>
  <NuxtLink
    :to="`/albums/${album.slug}`"
    class="group overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 transition duration-500 hover:border-zinc-700"
  >
    <div class="aspect-[4/5] overflow-hidden">
      <NuxtImg
        v-if="album.coverUrl"
        :src="album.coverUrl"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        v-else
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>

    <div class="p-6">
      <h2 class="text-2xl font-serif text-white">
        {{ album.title }}
      </h2>

      <p v-if="album.description" class="mt-2 text-sm text-zinc-400">
        {{ album.description }}
      </p>

      <p class="mt-4 text-xs uppercase tracking-[0.25em] text-zinc-500">
        {{ album.photoCount }} photos
      </p>
    </div>
  </NuxtLink>
</template>

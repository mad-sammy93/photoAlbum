<script setup lang="ts">
import type { AlbumWithPhotos } from "~/types/database.types";
const albums: any = await useAlbums();
</script>

<template>
  <main
    class="min-h-screen bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-white"
  >
    <!-- <div class="h-40 bg-red-500 dark:bg-blue-500" /> -->
    <ThemeToggle />
    <section class="mx-auto max-w-7xl px-6 py-24 text-center">
      <p
        class="text-sm uppercase tracking-[0.5em] text-zinc-500 dark:text-zinc-500"
      >
        Life Memories
      </p>

      <h1 class="mt-6 text-5xl font-serif md:text-7xl">Sam & Elle</h1>

      <p class="mx-auto mt-8 max-w-2xl text-zinc-600 dark:text-zinc-400">
        A collection of moments, emotions, and celebrations shared with the
        company we share.
      </p>
    </section>

    <section class="mx-auto max-w-7xl px-6 pb-20">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <GalleryAlbumCard
          v-for="album in albums"
          :key="album.id"
          :album="album"
        />
      </div>
    </section>

    <!-- Admin Access -->
    <NuxtLink
      to="/login"
      class="fixed bottom-6 right-0 z-50 translate-x-1/2 rounded-l-full border border-zinc-800 bg-zinc-950/80 p-4 text-zinc-500 dark:text-zinc-500 backdrop-blur transition-all duration-300 hover:translate-x-0 hover:text-amber-500"
    >
      ⚙
    </NuxtLink>
  </main>
</template>

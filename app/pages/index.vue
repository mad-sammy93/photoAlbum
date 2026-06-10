<script setup lang="ts">
const albums = await useAlbums();
</script>

<template>
  <main class="min-h-screen bg-black text-white">
    <section class="mx-auto max-w-7xl px-6 py-24 text-center">
      <p class="text-sm uppercase tracking-[0.5em] text-zinc-500">
        Wedding Memories
      </p>

      <h1 class="mt-6 text-5xl font-serif md:text-7xl">TEST & TEST</h1>

      <p class="mt-8 max-w-2xl mx-auto text-zinc-400">
        A collection of moments, emotions, and celebrations shared with the
        people we love.
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
  </main>
</template>

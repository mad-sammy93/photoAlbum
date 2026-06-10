<script setup>
const open = ref(false);

const links = [
  {
    name: "Overview",
    href: "/admin",
  },
  {
    name: "Albums",
    href: "/admin/albums",
  },
  {
    name: "Photos",
    href: "/admin/photos",
  },
];
</script>

<template>
  <div class="lg:hidden">
    <button
      @click="open = !open"
      class="rounded-xl border border-zinc-700 px-4 py-2"
    >
      Menu
    </button>

    <div
      v-if="open"
      class="absolute left-4 right-4 top-20 rounded-3xl border border-zinc-800 bg-zinc-950 p-5"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.href"
        :to="link.href"
        class="block rounded-xl px-4 py-3 text-zinc-400 hover:bg-zinc-900"
      >
        {{ link.name }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

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
  {
    name: "Settings",
    href: "/admin/settings",
  },
];
</script>

<template>
  <aside
    class="hidden lg:flex w-72 flex-col border-r border-zinc-800 bg-zinc-950 px-6 py-10"
  >
    <div>
      <p class="text-xs uppercase tracking-[0.4em] text-amber-500">
        Wedding CMS
      </p>

      <h1 class="mt-3 text-3xl font-serif">Admin</h1>
    </div>

    <nav class="mt-12 space-y-2">
      <NuxtLink
        v-for="link in links"
        :key="link.href"
        :to="link.href"
        class="flex rounded-2xl px-5 py-4 transition"
        :class="
          route.path === link.href
            ? 'bg-zinc-900 text-white'
            : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
        "
      >
        {{ link.name }}
      </NuxtLink>
    </nav>

    <div class="mt-auto rounded-3xl border border-zinc-800 bg-zinc-900 p-6">
      <p class="text-sm text-zinc-400">Preserve every moment beautifully.</p>
    </div>
  </aside>
</template>

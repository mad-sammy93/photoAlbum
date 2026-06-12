<script setup>
const route = useRoute();

const isOpen = ref(false);

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

watch(
  () => route.path,
  () => {
    isOpen.value = false;
  },
);
</script>

<template>
  <!-- Mobile Menu Button -->
  <button
    class="fixed right-4 top-4 z-50 rounded-xl border border-zinc-800 bg-zinc-950 p-3 text-white lg:hidden"
    @click="isOpen = true"
  >
    ☰
  </button>

  <!-- Mobile Overlay -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      @click="isOpen = false"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    class="fixed inset-y-0 left-0 z-50 flex w-screen md:w-72 flex-col border-r border-zinc-800 bg-zinc-950 px-6 py-10 transition-transform duration-300 lg:static lg:translate-x-0"
    :class="isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'"
  >
    <!-- Close button (mobile only) -->
    <button
      class="absolute right-6 top-4 text-2xl text-zinc-400 lg:hidden"
      @click="isOpen = false"
    >
      ✕
    </button>

    <div>
      <p class="text-xs uppercase tracking-[0.4em] text-amber-500">
        Memories CMS
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

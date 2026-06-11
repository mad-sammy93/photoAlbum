<script setup lang="ts">
const colorMode = useColorMode();

function toggleTheme() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}

watchEffect(() => {
  console.log("colorMode.value", colorMode.value);
  console.log("colorMode.preference", colorMode.preference);
});
</script>

<template>
  <button
    @click="toggleTheme"
    class="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-4 py-3 text-sm backdrop-blur-xl transition hover:scale-105 dark:border-zinc-700 dark:bg-black/50"
  >
    <span>
      {{ colorMode.value === "dark" ? "☀️" : "🌙" }}
    </span>

    <span>
      {{ colorMode.value === "dark" ? "Light" : "Dark" }}
    </span>
  </button>
</template>

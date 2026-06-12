<script setup lang="ts">
const supabase = useSupabaseClient();
const user = useSupabaseUser();

async function logout() {
  await supabase.auth.signOut();

  navigateTo("/login");
}
</script>

<template>
  <header
    class="sticky top-0 z-20 border-b border-zinc-800 bg-black/80 backdrop-blur-xl"
  >
    <div
      class="flex flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between md:px-8 md:py-5"
    >
      <!-- Left section -->
      <div>
        <h1 class="text-lg font-serif sm:text-xl">Memories Dashboard</h1>

        <p class="text-sm text-zinc-500">Manage your memories</p>
      </div>

      <!-- Right section -->
      <div
        class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-6"
      >
        <div class="min-w-0 text-left sm:text-right">
          <p class="truncate font-medium">
            {{ user?.email }}
          </p>

          <p class="text-xs text-zinc-500">Administrator</p>
        </div>

        <button
          @click="logout"
          class="w-full rounded-xl bg-amber-500 px-5 py-2 font-medium text-black transition hover:bg-amber-400 sm:w-auto"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

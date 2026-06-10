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
    class="sticky top-0 z-20 flex items-center justify-between border-b border-zinc-800 bg-black/80 px-8 py-5 backdrop-blur-xl"
  >
    <div>
      <h1 class="text-xl font-serif">Wedding Dashboard</h1>

      <p class="text-sm text-zinc-500">Manage your memories</p>
    </div>

    <div class="flex items-center gap-6">
      <button
        class="rounded-xl border border-zinc-700 px-4 py-2 text-zinc-400 transition hover:bg-zinc-900"
      >
        Notifications
      </button>

      <div class="text-right">
        <p class="font-medium">
          {{ user?.email }}
        </p>

        <p class="text-xs text-zinc-500">Administrator</p>
      </div>

      <button
        @click="logout"
        class="rounded-xl bg-amber-500 px-5 py-2 font-medium text-black transition hover:bg-amber-400"
      >
        Logout
      </button>
    </div>
  </header>
</template>

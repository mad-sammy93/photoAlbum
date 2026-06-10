<script setup lang="ts">
const password = ref("");
const confirmPassword = ref("");

const loading = ref(false);
const message = ref("");

const supabase = useSupabaseClient();

async function updatePassword() {
  if (password.value !== confirmPassword.value) {
    message.value = "Passwords do not match.";

    return;
  }

  loading.value = true;

  const { error } = await supabase.auth.updateUser({
    password: password.value,
  });

  loading.value = false;

  if (error) {
    message.value = error.message;

    return;
  }

  message.value = "Password updated successfully.";

  setTimeout(() => {
    navigateTo("/login");
  }, 2000);
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-black px-6">
    <div
      class="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-950 p-10"
    >
      <h1 class="text-4xl font-serif text-white">Reset Password</h1>

      <div class="mt-10 space-y-5">
        <input
          v-model="password"
          type="password"
          placeholder="New Password"
          class="w-full rounded-2xl border border-zinc-800 bg-black px-5 py-4 text-white"
        />

        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          class="w-full rounded-2xl border border-zinc-800 bg-black px-5 py-4 text-white"
        />

        <button
          :disabled="loading"
          @click="updatePassword"
          class="w-full rounded-2xl bg-amber-500 px-5 py-4 font-medium text-black hover:bg-amber-400 disabled:opacity-50"
        >
          {{ loading ? "Updating..." : "Update Password" }}
        </button>

        <p v-if="message" class="text-zinc-400">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

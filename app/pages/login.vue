<script setup lang="ts">
const email = ref("");
const password = ref("");

const supabase = useSupabaseClient();
const resetMode = ref(false);
const resetEmail = ref("");
const resetMessage = ref("");

async function forgotPassword() {
  resetMessage.value = "";

  const { error } = await supabase.auth.resetPasswordForEmail(
    resetEmail.value,
    {
      redirectTo: `${window.location.origin}/reset-password`,
    },
  );

  if (error) {
    resetMessage.value = error.message;
    return;
  }

  resetMessage.value = "Password reset email sent.";
}

async function login() {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    alert(error.message);
    return;
  }

  navigateTo("/admin");
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-black text-white"
  >
    <div class="w-full max-w-md rounded-3xl bg-zinc-900 p-8">
      <h1 class="mb-8 text-4xl font-serif">Admin Login</h1>

      <div class="space-y-4">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full rounded-xl bg-zinc-800 p-4"
        />

        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="w-full rounded-xl bg-zinc-800 p-4"
        />

        <button
          @click="login"
          class="w-full rounded-xl bg-amber-500 p-4 text-black"
        >
          Login
        </button>
        <button
          @click="resetMode = !resetMode"
          class="mt-4 text-sm text-amber-500 hover:text-amber-400"
        >
          Forgot Password?
        </button>
      </div>
    </div>
    <div v-if="resetMode" class="mt-8 border-t border-zinc-800 pt-8">
      <h2 class="text-xl font-medium">Reset Password</h2>

      <input
        v-model="resetEmail"
        type="email"
        placeholder="Email"
        class="mt-5 w-full rounded-2xl border border-zinc-800 bg-black px-5 py-4 text-white"
      />

      <button
        @click="forgotPassword"
        class="mt-5 w-full rounded-2xl bg-zinc-800 px-5 py-4 text-white hover:bg-zinc-700"
      >
        Send Reset Email
      </button>

      <p v-if="resetMessage" class="mt-4 text-sm text-zinc-400">
        {{ resetMessage }}
      </p>
    </div>
  </div>
</template>

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
  <div class="flex min-h-screen items-center justify-center bg-black px-6">
    <NuxtLink
      to="/"
      class="absolute left-6 top-6 inline-flex items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 px-5 py-3 text-sm text-zinc-300 backdrop-blur transition hover:border-zinc-700 hover:bg-zinc-900 hover:text-white"
    >
      <span>←</span>

      Back to Gallery
    </NuxtLink>
    <div
      class="w-full max-w-md rounded-[32px] border border-zinc-800 bg-zinc-950 p-10 shadow-2xl"
    >
      <Transition
        mode="out-in"
        enter-active-class="transition duration-300"
        leave-active-class="transition duration-200"
      >
        <!-- LOGIN -->
        <div v-if="!resetMode" key="login">
          <div class="mb-10">
            <p class="text-xs uppercase tracking-[0.4em] text-amber-500">
              Memories CMS
            </p>

            <h1 class="mt-4 text-4xl font-serif text-white">Welcome Back</h1>

            <p class="mt-3 text-zinc-400">Sign in to manage your memories.</p>
          </div>

          <div class="space-y-5">
            <input
              v-model="email"
              type="email"
              placeholder="Email Address"
              class="w-full rounded-2xl border border-zinc-800 bg-black px-5 py-4 text-white outline-none transition focus:border-amber-500"
            />

            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="w-full rounded-2xl border border-zinc-800 bg-black px-5 py-4 text-white outline-none transition focus:border-amber-500"
            />

            <button
              @click="login"
              class="w-full rounded-2xl bg-amber-500 px-5 py-4 font-medium text-black transition hover:bg-amber-400"
            >
              Sign In
            </button>

            <button
              @click="resetMode = true"
              class="w-full text-center text-sm text-zinc-400 transition hover:text-amber-500"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <!-- RESET PASSWORD -->
        <div v-else key="reset">
          <div class="mb-10">
            <p class="text-xs uppercase tracking-[0.4em] text-amber-500">
              Password Recovery
            </p>

            <h1 class="mt-4 text-4xl font-serif text-white">Reset Password</h1>

            <p class="mt-3 text-zinc-400">
              Enter your email and we'll send you a reset link.
            </p>
          </div>

          <div class="space-y-5">
            <input
              v-model="resetEmail"
              type="email"
              placeholder="Email Address"
              class="w-full rounded-2xl border border-zinc-800 bg-black px-5 py-4 text-white outline-none transition focus:border-amber-500"
            />

            <button
              @click="forgotPassword"
              class="w-full rounded-2xl bg-amber-500 px-5 py-4 font-medium text-black transition hover:bg-amber-400"
            >
              Send Reset Link
            </button>

            <button
              @click="resetMode = false"
              class="w-full text-center text-sm text-zinc-400 transition hover:text-amber-500"
            >
              ← Back to Login
            </button>

            <div
              v-if="resetMessage"
              class="rounded-2xl border border-zinc-800 bg-black p-4 text-sm text-zinc-400"
            >
              {{ resetMessage }}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

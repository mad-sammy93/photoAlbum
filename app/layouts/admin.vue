<template>
  <div class="flex min-h-screen bg-black text-white">
    <AdminDashboardSidebar />

    <div class="flex flex-1 flex-col">
      <AdminDashboardNavbar />

      <main class="flex-1 p-10">
        <slot />
      </main>
    </div>
  </div>
</template>

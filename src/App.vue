<template>
  <div class="app">
    <nav class="navbar">
      <router-link to="/" exact-active-class="active">今日</router-link>
      <router-link to="/history" active-class="active">历史</router-link>
      <router-link to="/weekly" active-class="active">周总结</router-link>
      <router-link to="/settings" active-class="active">设置</router-link>
    </nav>
    <main class="main-content">
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</main>
  </div>
</template>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #fafafa; }
.app { min-height: 100vh; }
.navbar { display: flex; justify-content: center; gap: 30px; padding: 20px; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.05); position: sticky; top: 0; }
.navbar a { text-decoration: none; color: #666; font-weight: 500; padding: 8px 16px; border-radius: 20px; transition: 0.2s; }
.navbar a:hover { color: #409eff; }
.navbar a.active { background: #409eff; color: white; }
.main-content { padding: 20px; }
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
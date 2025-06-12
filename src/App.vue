<script setup>
import '@/assets/styles/main.css'
import '@/assets/styles/navigation.css'
import '@/assets/styles/icons.css'
</script>

<template>
  <nav class="side-nav">
    <div class="nav-logo">
      <img src="@/assets/logo.svg" alt="Logo">
    </div>
    <ul class="nav-list">
      <li class="nav-item" :class="{ active: $route.path === '/' }">
        <router-link to="/">
          <span class="nav-icon">
            <span class="icon icon-house"></span>
          </span>
          <span class="nav-text">Главная</span>
        </router-link>
      </li>
      
      <li class="nav-item" :class="{ active: $route.path === '/menu' }">
        <router-link to="/menu">
          <span class="nav-icon">
            <span class="icon icon-grid"></span>
          </span>
          <span class="nav-text">Меню</span>
        </router-link>
      </li>
      
      <li class="nav-item" :class="{ active: $route.path === '/cart' }">
        <router-link to="/cart">
          <span class="nav-icon">
            <span class="icon icon-bag"></span>
          </span>
          <span class="nav-text">Корзина</span>
        </router-link>
      </li>
    </ul>
  </nav>

  <main class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

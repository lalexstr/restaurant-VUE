<template>
  <div class="order-success">
    <div class="success-card">
      <div class="success-icon">
        <i class="bi bi-check-circle-fill"></i>
      </div>
      
      <h1>Заказ успешно оформлен!</h1>
      <p class="lead">
        Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время для подтверждения.
      </p>
      
      <div class="actions">
        <router-link to="/" class="btn-home">
          <i class="bi bi-house-door-fill"></i>
          Вернуться на главную
        </router-link>
        <router-link to="/menu" class="btn-menu">
          <i class="bi bi-book-fill"></i>
          Вернуться в меню
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cart = useCartStore()

onMounted(() => {
  if (cart.items.length > 0) {
    cart.clearCart()
  }
})
</script>

<style scoped>
.order-success {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary-color) 100%);
}

.success-card {
  background: var(--white);
  padding: 40px;
  border-radius: 20px;
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.success-icon {
  font-size: 5rem;
  color: var(--primary-color);
  margin-bottom: 20px;
  animation: scale-in 0.5s ease-out;
}

.success-card h1 {
  color: var(--text-dark);
  margin-bottom: 15px;
  font-size: 2rem;
}

.success-card .lead {
  color: #666;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.btn-home,
.btn-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-home {
  background: var(--primary-color);
  color: var(--white);
}

.btn-home:hover {
  background: var(--primary-dark);
}

.btn-menu {
  background: var(--gray-light);
  color: var(--text-dark);
}

.btn-menu:hover {
  background: #e9ecef;
}

@keyframes scale-in {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .actions {
    flex-direction: column;
  }
  
  .success-card {
    padding: 30px 20px;
  }
}
</style> 
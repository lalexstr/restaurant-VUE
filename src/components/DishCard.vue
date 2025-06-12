<template>
  <div class="dish-card">
    <div class="dish-image">
      <img :src="dish.image" :alt="dish.name">
      <div class="dish-badge">{{ dish.category }}</div>
    </div>
    <div class="dish-content">
      <h3 class="dish-title">{{ dish.name }}</h3>
      <p class="dish-description">{{ dish.description }}</p>
      <div class="dish-footer">
        <div class="dish-price">{{ dish.price }} ₽</div>
        <div v-if="cartQuantity > 0" class="quantity-controls">
          <button @click="decreaseQuantity" class="quantity-btn">
            -
          </button>
          <span class="quantity">{{ cartQuantity }}</span>
          <button @click="increaseQuantity" class="quantity-btn">
            +
          </button>
        </div>
        <button 
          v-else
          @click="addToCart"
          class="add-btn"
        >
          <span class="btn-icon">
            +
          </span>
          <span class="btn-text">В корзину</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

const props = defineProps({
  dish: {
    type: Object,
    required: true
  }
})

const cart = useCartStore()
const { items } = storeToRefs(cart)

// Используем computed для отслеживания количества в корзине
const cartQuantity = computed(() => {
  const item = items.value.find(item => item.id === props.dish.id)
  return item ? item.quantity : 0
})

const addToCart = () => {
  cart.addItem(props.dish)
}

const increaseQuantity = () => {
  cart.updateItemQuantity(props.dish.id, cartQuantity.value + 1)
}

const decreaseQuantity = () => {
  if (cartQuantity.value > 0) {
    const newQuantity = cartQuantity.value - 1
    if (newQuantity === 0) {
      cart.removeItem(props.dish.id)
    } else {
      cart.updateItemQuantity(props.dish.id, newQuantity)
    }
  }
}
</script>

<style scoped>
.dish-card {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  overflow: hidden;
}

.dish-image {
  position: relative;
  width: 100%;
  padding-top: 66%;
}

.dish-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dish-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--white);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  color: var(--gray-800);
}

.dish-content {
  padding: 15px;
}

.dish-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--gray-800);
}

.dish-description {
  color: var(--gray-800);
  font-size: 14px;
  margin-bottom: 15px;
}

.dish-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dish-price {
  font-size: 18px;
  font-weight: 600;
  color: var(--gray-800);
}

.add-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: var(--primary-color);
  color: var(--white);
  font-weight: 500;
  cursor: pointer;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--gray-100);
  padding: 4px;
  border-radius: 4px;
}

.quantity-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 4px;
  background: var(--white);
  color: var(--gray-800);
  cursor: pointer;
}

.quantity {
  font-weight: 600;
  color: var(--gray-800);
  min-width: 24px;
  text-align: center;
}

@media (max-width: 768px) {
  .dish-content {
    padding: 10px;
  }

  .dish-title {
    font-size: 16px;
  }

  .dish-price {
    font-size: 16px;
  }

  .add-btn {
    padding: 6px 12px;
  }

  .quantity-btn {
    width: 28px;
    height: 28px;
  }
}
</style> 
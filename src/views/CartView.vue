<template>
  <div class="cart">
    <div class="container">
      <h1 class="cart-title">Корзина</h1>
      
      <div v-if="cart.items.length" class="cart-content">
        <div class="cart-items">
          <div v-for="item in cart.items" :key="item.id" class="cart-item">
            <img :src="item.image" :alt="item.name" class="item-image">
            <div class="item-info">
              <h3 class="item-title">{{ item.name }}</h3>
              <div class="item-price">{{ item.price }} ₽</div>
            </div>
            <div class="item-quantity">
              <button @click="decreaseQuantity(item)" class="quantity-btn">
                -
              </button>
              <span class="quantity">{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)" class="quantity-btn">
                +
              </button>
            </div>
            <div class="item-total">{{ item.price * item.quantity }} ₽</div>
            <button @click="removeItem(item.id)" class="remove-btn">
              ×
            </button>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-row">
            <span>Товары ({{ cart.totalItems }}):</span>
            <span>{{ cart.totalPrice }} ₽</span>
          </div>
          <div class="summary-row">
            <span>Доставка:</span>
            <span>Бесплатно</span>
          </div>
          <div class="summary-total">
            <span>Итого:</span>
            <span>{{ cart.totalPrice }} ₽</span>
          </div>
          <router-link to="/checkout" class="checkout-btn">
            Оформить заказ
          </router-link>
        </div>
      </div>

      <div v-else class="cart-empty">
        <i class="bi bi-bag-x"></i>
        <h2>Корзина пуста</h2>
        <p>Добавьте что-нибудь из меню</p>
        <router-link to="/menu" class="btn-primary">
          Перейти в меню
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { storeToRefs } from 'pinia'

const cart = useCartStore()

const increaseQuantity = (item) => {
  cart.updateItemQuantity(item.id, item.quantity + 1)
}

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cart.updateItemQuantity(item.id, item.quantity - 1)
  } else {
    cart.removeItem(item.id)
  }
}

const removeItem = (itemId) => {
  cart.removeItem(itemId)
}
</script>

<style scoped>
.cart {
  padding: 20px 0;
  min-height: 100vh;
  background: var(--gray-50);
}

.cart-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--gray-800);
}

.cart-content {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 320px;
}

.cart-items {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 15px;
}

.cart-item {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 15px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--gray-200);
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.item-info {
  min-width: 200px;
}

.item-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 5px;
  color: var(--gray-800);
}

.item-price {
  color: var(--gray-800);
  font-weight: 500;
}

.item-quantity {
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

.item-total {
  font-weight: 600;
  color: var(--primary-color);
  min-width: 100px;
  text-align: right;
}

.remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 4px;
  background: var(--gray-100);
  color: var(--gray-800);
  cursor: pointer;
}

.cart-summary {
  background: var(--white);
  border: 1px solid var(--gray-200);
  border-radius: 8px;
  padding: 15px;
  height: fit-content;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: var(--gray-800);
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin: 15px 0;
  padding-top: 10px;
  border-top: 1px solid var(--gray-200);
  font-size: 18px;
  font-weight: 600;
  color: var(--gray-800);
}

.checkout-btn {
  display: block;
  width: 100%;
  padding: 10px;
  background: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
}

.cart-empty {
  text-align: center;
  padding: 40px 0;
}

.cart-empty i {
  font-size: 48px;
  color: var(--gray-200);
  margin-bottom: 10px;
}

.cart-empty h2 {
  font-size: 20px;
  font-weight: 600;
  color: var(--gray-800);
  margin-bottom: 5px;
}

.cart-empty p {
  color: var(--gray-800);
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: auto 1fr auto;
    gap: 10px;
  }

  .item-quantity {
    grid-column: 2;
    justify-self: start;
  }

  .item-total {
    grid-column: 2;
    text-align: left;
  }

  .remove-btn {
    grid-column: 3;
    grid-row: 1 / span 3;
    align-self: center;
  }
}
</style> 
<template>
  <div class="checkout">
    <div class="container">
      <h1 class="checkout-title">Оформление заказа</h1>

      <div class="checkout-content">
        <div class="checkout-form">
          <form @submit.prevent="submitOrder">
            <div class="form-group">
              <label for="name">Имя</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name"
                :class="{ 'error': errors.name }"
                placeholder="Введите ваше имя"
                required
              >
              <span class="error-text" v-if="errors.name">{{ errors.name }}</span>
            </div>

            <div class="form-group">
              <label for="phone">Телефон</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="formData.phone"
                :class="{ 'error': errors.phone }"
                placeholder="+7 (___) ___-__-__"
                @input="formatPhone"
                maxlength="18"
                required
              >
              <span class="error-text" v-if="errors.phone">{{ errors.phone }}</span>
            </div>

            <div class="form-group">
              <label for="address">Адрес доставки</label>
              <textarea 
                id="address" 
                v-model="formData.address"
                :class="{ 'error': errors.address }"
                placeholder="Введите адрес доставки"
                required
              ></textarea>
              <span class="error-text" v-if="errors.address">{{ errors.address }}</span>
            </div>

            <div class="form-group">
              <label for="comment">Комментарий к заказу</label>
              <textarea 
                id="comment" 
                v-model="formData.comment"
                placeholder="Дополнительные пожелания к заказу"
              ></textarea>
            </div>
          </form>
        </div>

        <div class="order-summary">
          <h2>Ваш заказ</h2>
          
          <div class="order-items">
            <div v-for="item in cart.items" :key="item.id" class="order-item">
              <div class="item-info">
                <span class="item-quantity">{{ item.quantity }}×</span>
                <span class="item-name">{{ item.name }}</span>
              </div>
              <span class="item-price">{{ item.price * item.quantity }} ₽</span>
            </div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row">
            <span>Товары ({{ cart.totalItems }}):</span>
            <span>{{ cart.totalPrice }} ₽</span>
          </div>
          
          <div class="summary-row">
            <span>Доставка:</span>
            <span>Бесплатно</span>
          </div>

          <div class="summary-total">
            <span>Итого к оплате:</span>
            <span>{{ cart.totalPrice }} ₽</span>
          </div>

          <button 
            @click="submitOrder" 
            class="submit-btn"
            :disabled="!isFormValid || cart.items.length === 0"
          >
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const cart = useCartStore()

const formData = ref({
  name: '',
  phone: '',
  address: '',
  comment: ''
})

const errors = ref({
  name: '',
  phone: '',
  address: ''
})

const formatPhone = (event) => {
  let value = event.target.value.replace(/\D/g, '') // Оставляем только цифры

  // Если пользователь стирает все цифры, очищаем поле
  if (!value) {
    formData.value.phone = ''
    return
  }

  // Если первая цифра 7 или 8, заменяем на пустоту, так как +7 будет добавлен автоматически
  if (value.startsWith('7') || value.startsWith('8')) {
    value = value.substring(1)
  }

  // Ограничиваем до 10 цифр (без учета кода страны)
  value = value.substring(0, 10)

  // Форматируем номер
  let formattedValue = ''
  if (value.length > 0) {
    formattedValue = '+7 '
    if (value.length > 0) {
      formattedValue += '(' + value.substring(0, 3)
    }
    if (value.length > 3) {
      formattedValue += ') ' + value.substring(3, 6)
    }
    if (value.length > 6) {
      formattedValue += '-' + value.substring(6, 8)
    }
    if (value.length > 8) {
      formattedValue += '-' + value.substring(8, 10)
    }
  }

  formData.value.phone = formattedValue
}

const isFormValid = computed(() => {
  return formData.value.name && 
         formData.value.phone && 
         formData.value.address &&
         !errors.value.name &&
         !errors.value.phone &&
         !errors.value.address
})

const validateForm = () => {
  errors.value = {
    name: '',
    phone: '',
    address: ''
  }

  if (!formData.value.name) {
    errors.value.name = 'Введите ваше имя'
  }

  if (!formData.value.phone) {
    errors.value.phone = 'Введите номер телефона'
  } else if (!/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(formData.value.phone)) {
    errors.value.phone = 'Введите номер полностью'
  }

  if (!formData.value.address) {
    errors.value.address = 'Введите адрес доставки'
  }

  return !errors.value.name && !errors.value.phone && !errors.value.address
}

const submitOrder = () => {
  if (validateForm() && cart.items.length > 0) {
    // Здесь будет отправка заказа на сервер
    cart.clearCart()
    router.push('/order-success')
  }
}
</script>

<style scoped>
.checkout {
  padding: 2rem 0;
  min-height: 100vh;
  background: var(--gray-50);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.checkout-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--gray-800);
}

.checkout-content {
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 400px;
}

.checkout-form {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--gray-800);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-sm);
  background: var(--white);
  color: var(--gray-800);
  font-size: 1rem;
  transition: all 0.2s ease;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-light);
}

.form-group input.error,
.form-group textarea.error {
  border-color: #dc2626;
}

.error-text {
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.order-summary {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  height: fit-content;
}

.order-summary h2 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: var(--gray-800);
}

.order-items {
  margin-bottom: 1.5rem;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.item-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-quantity {
  color: var(--gray-600);
  font-weight: 500;
}

.item-name {
  color: var(--gray-800);
}

.item-price {
  font-weight: 500;
  color: var(--gray-800);
}

.summary-divider {
  height: 1px;
  background: var(--gray-100);
  margin: 1.5rem 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: var(--gray-600);
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin: 1.5rem 0;
  padding-top: 1rem;
  border-top: 2px solid var(--gray-100);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--gray-800);
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: var(--primary-color);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  background: var(--gray-200);
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .checkout-form,
  .order-summary {
    padding: 1.5rem;
  }
}
</style> 
<template>
  <div class="menu">
    <div class="menu-header">
      <h1>Наше меню</h1>
      <p class="lead">Выберите блюда по вашему вкусу</p>
    </div>

    <!-- Фильтры категорий -->
    <div class="categories-wrapper">
      <div class="categories">
        <button
          v-for="category in categories"
          :key="category"
          class="category-btn"
          :class="{ active: selectedCategory === category }"
          @click="selectedCategory = category"
        >
          <i class="bi" :class="getCategoryIcon(category)"></i>
          <span>{{ category }}</span>
        </button>
      </div>
    </div>

    <!-- Сетка блюд -->
    <div class="dishes-grid">
      <div v-for="dish in filteredDishes" :key="dish.id" class="dish-item">
        <DishCard :dish="dish" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DishCard from '../components/DishCard.vue'

// Моковые данные для меню
const dishes = [
  {
    id: 1,
    name: 'Маргарита',
    description: 'Классическая пицца с томатным соусом и моцареллой',
    price: 599,
    category: 'Пицца',
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Пепперони',
    description: 'Пицца с томатным соусом, моцареллой и пепперони',
    price: 699,
    category: 'Пицца',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Тирамису',
    description: 'Классический итальянский десерт',
    price: 399,
    category: 'Десерты',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 4,
    name: 'пепси',
    description: 'Газированный напиток 0.5л',
    price: 129,
    category: 'Напитки',
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=600&q=80'
  }
]

const categories = ['Все', 'Пицца', 'Десерты', 'Напитки']
const selectedCategory = ref('Все')

const filteredDishes = computed(() => {
  if (selectedCategory.value === 'Все') {
    return dishes
  }
  return dishes.filter(dish => dish.category === selectedCategory.value)
})

const getCategoryIcon = (category) => {
  const icons = {
    'Все': 'bi-grid-fill',
    'Пицца': 'bi-circle-fill',
    'Десерты': 'bi-heart-fill',
    'Напитки': 'bi-cup-fill'
  }
  return icons[category]
}
</script>

<style scoped>
.menu {
  padding: 20px;
}

.menu-header {
  text-align: center;
  margin-bottom: 40px;
}

.menu-header h1 {
  color: var(--primary-color);
  margin-bottom: 10px;
}

.categories-wrapper {
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
}

.categories {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: var(--white);
  border-radius: 50px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.category-btn {
  border: none;
  background: none;
  padding: 10px 20px;
  border-radius: 25px;
  color: var(--text-dark);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-btn i {
  font-size: 1.2rem;
}

.category-btn.active {
  background: var(--primary-color);
  color: var(--white);
}

.dishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  padding: 20px 0;
}

.dish-item {
  height: 100%;
}

@media (max-width: 768px) {
  .categories {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .category-btn {
    width: calc(50% - 10px);
  }
}
</style> 
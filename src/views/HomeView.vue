<template>
  <div class="home">
    <section class="hero">
      <div class="hero-content">
        <h1>
          <span class="text-gradient">Green Food</span>
          <br>
          Вкус природы
        </h1>
        <p class="hero-text">
          Откройте для себя мир изысканных блюд, приготовленных 
          из свежих органических продуктов
        </p>
        <div class="hero-actions">
          <router-link to="/menu" class="btn-primary">
            <i class="bi bi-arrow-right"></i>
            <span>Перейти в меню</span>
          </router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <div class="grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="bi bi-clock"></i>
            </div>
            <h3>Быстрая доставка</h3>
            <p>Доставляем ваши любимые блюда за 30 минут</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="bi bi-heart"></i>
            </div>
            <h3>Свежие продукты</h3>
            <p>Используем только органические ингредиенты</p>
          </div>

          <div class="feature-card">
            <div class="feature-icon">
              <i class="bi bi-award"></i>
            </div>
            <h3>Лучшие повара</h3>
            <p>Команда профессиональных шеф-поваров</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
}

.hero {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--white) 100%);
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="2" cy="2" r="2" fill="%2327ae60" fill-opacity="0.1"/></svg>') repeat;
  opacity: 0.5;
}

.hero-content {
  position: relative;
  max-width: 800px;
  text-align: center;
  padding: 0 1rem;
  width: 100%;
}

.hero h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.hero-text {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: var(--gray-800);
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-radius: var(--radius-sm);
  background: var(--primary-color);
  color: var(--white);
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.features {
  padding: 6rem 2rem;
  background: var(--gray-50);
  width: 100%;
}

.grid {
  display: grid;
  gap: 2rem;
  width: 100%;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

.feature-card {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius-md);
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary-light);
  color: var(--primary-color);
  border-radius: 50%;
  font-size: 1.75rem;
}

.feature-card h3 {
  color: var(--gray-800);
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-card p {
  color: var(--gray-600);
  font-size: 0.875rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero {
    padding: 2rem 1rem;
    min-height: calc(100vh - var(--nav-collapsed-width));
  }

  .features {
    padding: 3rem 1rem;
  }

  .feature-card {
    padding: 1.5rem;
  }
}
</style>

<script setup>
</script> 
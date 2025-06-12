import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),

  getters: {
    totalItems: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: (state) => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  actions: {
    addItem(dish) {
      const existingItem = this.items.find(item => item.id === dish.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({
          id: dish.id,
          name: dish.name,
          price: dish.price,
          image: dish.image,
          quantity: 1
        })
      }
      this.saveToLocalStorage()
    },

    updateItemQuantity(dishId, quantity) {
      const item = this.items.find(item => item.id === dishId)
      if (item) {
        if (quantity <= 0) {
          this.removeItem(dishId)
        } else {
          item.quantity = quantity
          this.saveToLocalStorage()
        }
      }
    },

    removeItem(dishId) {
      const index = this.items.findIndex(item => item.id === dishId)
      if (index > -1) {
        this.items.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },

    loadFromLocalStorage() {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        this.items = JSON.parse(savedCart)
      }
    }
  }
}) 
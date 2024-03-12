const fs = require("fs").promises;

class CartManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async createCart(newCart) {
    try {
      const carts = await this.getCartsFromFile();
      newCart.id = this.generateUniqueId();
      carts.push(newCart);
      await this.saveCartsToFile(carts);
      return newCart;
    } catch (error) {
      throw new Error("Error creating cart: " + error.message);
    }
  }

  async getCartById(cartId) {
    try {
      const carts = await this.getCartsFromFile();
      return carts.find((cart) => cart.id === cartId);
    } catch (error) {
      throw new Error("Error getting cart by ID: " + error.message);
    }
  }

  async getCartsFromFile() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveCartsToFile(carts) {
    try {
      await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
    } catch (error) {
      throw new Error("Error saving carts to file: " + error.message);
    }
  }

  generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }
}

module.exports = CartManager;

const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  getProducts() {
    return this.getProductsFromFile();
  }

  getProductById(productId) {
    const products = this.getProductsFromFile();
    return products.find((product) => product.id === productId);
  }

  updateProduct(productId, updatedProduct) {
    const products = this.getProductsFromFile();
    const index = products.findIndex((product) => product.id === productId);
    if (index !== -1) {
      updatedProduct.id = productId;
      products[index] = updatedProduct;
      this.saveProductsToFile(products);
      return true;
    }
    return false;
  }

  deleteProduct(productId) {
    const products = this.getProductsFromFile();
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    this.saveProductsToFile(updatedProducts);
  }

  getProductsFromFile() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  saveProductsToFile(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }
  // ID único
  generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
  }

  async addProduct(newProduct) {
    try {
      const products = await this.getProductsFromFile();
      newProduct.id = this.generateUniqueId();
      products.push(newProduct);
      await this.saveProductsToFile(products);
      return newProduct;
    } catch (error) {
      throw new Error("Error adding product: " + error.message);
    }
  }
}

module.exports = { ProductManager };

const productManager = new ProductManager("products.json");

// Obtener todos los productos
console.log("Todos los productos:", productManager.getProducts());

// Obtener un producto por ID
const productById = productManager.getProductById(2);
console.log("Producto con ID 2:", productById);

// Actualizar un producto
const updatedProduct = {
  id: 2,
  title: "Producto 2 Actualizado",
  description: "Descripción actualizada del Producto 2",
  price: 70,
  thumbnail: "nueva-imagen2.jpg",
  code: "DEF456",
  stock: 20,
};
if (productManager.updateProduct(2, updatedProduct)) {
  console.log("Producto 2 actualizado");
} else {
  console.log("No se encontró ningún producto con ese ID");
}

// Eliminar un producto
productManager.deleteProduct(3);
console.log("Producto 3 eliminado");

/* 
  http://localhost:8080/products
  http://localhost:8080/products?limit=5
  http://localhost:8080/products/2:
  http://localhost:8080/products/34123123
*/

const express = require("express");
const router = express.Router();
const { ProductManager } = require("../ProductManager");

const productManager = new ProductManager("productos.json");

// Obtener todos los productos
router.get("/", (req, res) => {
  const products = productManager.getProducts();
  res.json(products);
});

// Obtener un producto por ID
router.get("/:pid", (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Producto no encontrado" });
  }
});

// Agregar un nuevo producto
router.post("/", (req, res) => {
  try {
    const newProduct = req.body;
    // ID único
    newProduct.id = generateUniqueId();
    productManager.addProduct(newProduct);
    res.status(201).json({ message: "Producto agregado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Actualizar un producto por ID
router.put("/:pid", (req, res) => {
  try {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    if (productManager.updateProduct(productId, updatedProduct)) {
      res.json({ message: "Producto actualizado correctamente" });
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Eliminar un producto por ID
router.delete("/:pid", (req, res) => {
  try {
    const productId = req.params.pid;
    productManager.deleteProduct(productId);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ID único
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = router;

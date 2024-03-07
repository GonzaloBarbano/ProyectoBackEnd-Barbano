const express = require("express");
const fs = require("fs");

const router = express.Router();

// POST
router.post("/", (req, res) => {
  try {
    // Lógica para crear un nuevo carrito
    const newCart = req.body;
    // ID único para el nuevo carrito
    newCart.id = generateUniqueId();
    // Agrega el nuevo carrito
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// GET
router.get("/:cid", (req, res) => {
  try {
    // Lógica para obtener un carrito por su ID
    const cartId = req.params.cid;
    const carts = JSON.parse(fs.readFileSync("carrito.json", "utf8"));
    const cart = carts.find((cart) => cart.id === cartId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: "Carrito no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// POST
router.post("/:cid/product/:pid", (req, res) => {
  try {
    // Lógica para agregar un producto al carrito
    const cartId = req.params.cid;
    const productId = req.params.pid;

    res
      .status(201)
      .json({ message: "Producto agregado al carrito exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// ID único
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

module.exports = router;

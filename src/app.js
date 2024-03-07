const express = require("express");
const productsRouter = require("./routes/productsRouter");
const app = express();
const port = 8080;

// Middleware para parsear el body de las solicitudes como JSON
app.use(express.json());

// Agrega el router de productos a la aplicación
app.use("/api/products", productsRouter);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

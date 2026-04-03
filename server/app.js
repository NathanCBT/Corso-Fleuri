import express from "express";
import cors from "cors";
import { login } from "./controllers/authController.js";
import {
  getAllUsers,
  addUser,
  deleteUser,
} from "./controllers/userController.js";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  addStock,
} from "./controllers/productController.js";
import {
  getAllMenus,
  createMenu,
  deleteMenu,
} from "./controllers/menuController.js";
import {
  createOrder,
  getAllOrders,
} from "./controllers/orderController.js";

const app = express();
app.use(express.json());
app.use(cors());

// Route d'authentification
app.post("/api/login", login);
app.get("/api/users", getAllUsers);
app.post("/api/users", addUser);
app.delete("/api/users/:id", deleteUser);

app.get("/api/products", getAllProducts);
app.post("/api/products", createProduct);
app.put("/api/products/:id", updateProduct);
app.delete("/api/products/:id", deleteProduct);
app.post("/api/products/add-stock", addStock);

app.get("/api/menus", getAllMenus);
app.post("/api/menus", createMenu);
app.delete("/api/menus/:id", deleteMenu);

app.get("/api/orders", getAllOrders);
app.post("/api/orders", createOrder);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`),
);

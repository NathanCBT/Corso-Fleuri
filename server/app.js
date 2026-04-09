import express from "express";
import cors from "cors";
import pool from "./config/db.js";
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

// Migration : s'assurer que IdOrder est AUTO_INCREMENT
try {
  // Vérifier si IdOrder est déjà AUTO_INCREMENT
  const [cols] = await pool.query(
    "SELECT EXTRA FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'order' AND COLUMN_NAME = 'IdOrder'"
  );
  const isAutoInc = cols[0]?.EXTRA?.toLowerCase().includes("auto_increment");
  if (!isAutoInc) {
    // Supprimer les FK pour pouvoir modifier la colonne
    await pool.query("ALTER TABLE ordermenu DROP FOREIGN KEY FK_ordermenu_order").catch(() => {});
    await pool.query("ALTER TABLE orderarticle DROP FOREIGN KEY FK_orderarticle_order").catch(() => {});
    await pool.query("ALTER TABLE `order` MODIFY IdOrder INT NOT NULL AUTO_INCREMENT");
    // Recréer les FK
    await pool.query("ALTER TABLE ordermenu ADD CONSTRAINT FK_ordermenu_order FOREIGN KEY (IdOrder) REFERENCES `order`(IdOrder)").catch(() => {});
    await pool.query("ALTER TABLE orderarticle ADD CONSTRAINT FK_orderarticle_order FOREIGN KEY (IdOrder) REFERENCES `order`(IdOrder)").catch(() => {});
    console.log("[Migration] IdOrder AUTO_INCREMENT appliqué");
  } else {
    console.log("[Migration] IdOrder déjà AUTO_INCREMENT, rien à faire");
  }
} catch (e) {
  console.log("[Migration] Erreur :", e.message);
}

app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`),
);

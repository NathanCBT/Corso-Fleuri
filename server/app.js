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
  toggleProductVisibility,
} from "./controllers/productController.js";
import {
  getAllMenus,
  createMenu,
  deleteMenu,
  updateMenu,
  toggleMenuVisibility,
} from "./controllers/menuController.js";
import { createOrder, getAllOrders } from "./controllers/orderController.js";

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
app.patch("/api/products/:id/toggle-visibility", toggleProductVisibility);

app.get("/api/menus", getAllMenus);
app.post("/api/menus", createMenu);
app.delete("/api/menus/:id", deleteMenu);
app.put("/api/menus/:id", updateMenu);
app.patch("/api/menus/:id/toggle-visibility", toggleMenuVisibility);

app.get("/api/orders", getAllOrders);
app.post("/api/orders", createOrder);

const PORT = 3000;

// Migration : s'assurer que IdOrder est AUTO_INCREMENT
try {
  // Vérifier si IdOrder est déjà AUTO_INCREMENT
  const [cols] = await pool.query(
    "SELECT EXTRA FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'order' AND COLUMN_NAME = 'IdOrder'",
  );
  const isAutoInc = cols[0]?.EXTRA?.toLowerCase().includes("auto_increment");
  if (!isAutoInc) {
    // Supprimer les FK pour pouvoir modifier la colonne
    await pool
      .query("ALTER TABLE ordermenu DROP FOREIGN KEY FK_ordermenu_order")
      .catch(() => {});
    await pool
      .query("ALTER TABLE orderarticle DROP FOREIGN KEY FK_orderarticle_order")
      .catch(() => {});
    await pool.query(
      "ALTER TABLE `order` MODIFY IdOrder INT NOT NULL AUTO_INCREMENT",
    );
    // Recréer les FK
    await pool
      .query(
        "ALTER TABLE ordermenu ADD CONSTRAINT FK_ordermenu_order FOREIGN KEY (IdOrder) REFERENCES `order`(IdOrder)",
      )
      .catch(() => {});
    await pool
      .query(
        "ALTER TABLE orderarticle ADD CONSTRAINT FK_orderarticle_order FOREIGN KEY (IdOrder) REFERENCES `order`(IdOrder)",
      )
      .catch(() => {});
    console.log("[Migration] IdOrder AUTO_INCREMENT appliqué");
  } else {
    console.log("[Migration] IdOrder déjà AUTO_INCREMENT, rien à faire");
  }
} catch (e) {
  console.log("[Migration] Erreur :", e.message);
}

// Migration : ajouter IsVisible à la table article
try {
  const [visCols] = await pool.query(
    "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'article' AND COLUMN_NAME = 'IsVisible'"
  );
  if (visCols.length === 0) {
    await pool.query("ALTER TABLE article ADD COLUMN IsVisible TINYINT(1) NOT NULL DEFAULT 1");
    console.log("[Migration] IsVisible ajouté à article");
  } else {
    console.log("[Migration] IsVisible déjà présent dans article");
  }
} catch (e) {
  console.log("[Migration] Erreur IsVisible :", e.message);
}

// Migration : ajouter IsVisible à la table menu
try {
  const [visMenuCols] = await pool.query(
    "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'menu' AND COLUMN_NAME = 'IsVisible'"
  );
  if (visMenuCols.length === 0) {
    await pool.query("ALTER TABLE menu ADD COLUMN IsVisible TINYINT(1) NOT NULL DEFAULT 1");
    console.log("[Migration] IsVisible ajouté à menu");
  } else {
    console.log("[Migration] IsVisible déjà présent dans menu");
  }
} catch (e) {
  console.log("[Migration] Erreur IsVisible menu :", e.message);
}

app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`),
);

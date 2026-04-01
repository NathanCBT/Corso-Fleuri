import express from "express";
import cors from "cors";
import { login } from "./controllers/authController.js";
import { getAllUsers } from "./controllers/userController.js";
import { addUser } from "./controllers/userController.js";
import { deleteUser } from "./controllers/userController.js";

const app = express();
app.use(express.json());
app.use(cors());

// Route d'authentification
app.post("/api/login", login);
app.get("/api/users", getAllUsers);
app.post("/api/users", addUser);
app.delete("/api/users/:id", deleteUser);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`),
);

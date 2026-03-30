import express from "express";
import cors from "cors";
import { login } from "./controllers/authController.js";

const app = express();
app.use(express.json());
app.use(cors());

// Route d'authentification
app.post("/api/login", login);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Serveur démarré sur http://localhost:${PORT}`),
);

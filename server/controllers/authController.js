import { UserRepository } from "../repositories/UserRepository.js";

const userRepo = new UserRepository();

export const login = async (req, res) => {
  const { password } = req.body;

  try {
    const user = await userRepo.findByPassword(password);

    if (user) {
      res.json({
        success: true,
        role: user.rule === 1 ? "admin" : "cashier",
        username: user.name,
        userId: user.id,
      });
    } else {
      res.status(401).json({ success: false, message: "Code incorrect" });
    }
  } catch (error) {
    console.error("Erreur SQL :", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

import { UserRepository } from "../repositories/UserRepository.js";

const userRepo = new UserRepository();

export const getAllUsers = async (req, res) => {
  try {
    const users = await userRepo.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addUser = async (req, res) => {
  const { name, password, rule } = req.body;
  try {
    await userRepo.create(name, password, rule);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await userRepo.delete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

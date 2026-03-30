import { users } from "../models/User.js";

export const login = (req, res) => {
  const { password } = req.body;

  const user = users.find((u) => u.password === password);

  if (user) {
    res.json({
      success: true,
      role: user.role,
      username: user.name,
    });
  } else {
    res.status(401).json({ success: false, message: "Code incorrect" });
  }
};

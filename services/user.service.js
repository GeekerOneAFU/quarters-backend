import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.utils.js";
import { sendWelcomeEmail } from "../utils/mailer.js";

const UserService = {
  register: async (userData) => {
    const lastUser = await User.findOne().sort({ uniqueId: -1 });
    const uniqueId = lastUser
      ? (parseInt(lastUser.uniqueId) + 1).toString().padStart(8, "0")
      : "00009001";

    const user = new User({ ...userData, uniqueId });
    await user.save();
    const token = generateToken(user);
    sendWelcomeEmail(user.email);
    return { user, token };
  },

  login: async (userData) => {
    const user = await User.findOne({ email: userData.email });
    if (!user || !(await user.comparePassword(userData.password))) {
      throw new Error("Invalid credentials");
    }
    const token = generateToken(user);
    return { user, token };
  },
};

export default UserService;

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  console.log("📝 Registration attempt:", { username, email });

  try {
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      const field = existingUser.email === email ? "Email" : "Username";
      return res.status(400).json({ message: `${field} already exists` });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({ 
      username, 
      email, 
      passwordHash 
    });

    console.log("✅ User registered successfully:", user._id);

    res.status(201).json({ 
      message: "User registered successfully", 
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: error.message || "Registration failed" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log("🔐 Login attempt:", { email });

  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found:", email);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      console.log("❌ Invalid password for:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET not configured!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    console.log("✅ Login successful:", user._id);

    res.json({ 
      token, 
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: error.message || "Login failed" });
  }
};
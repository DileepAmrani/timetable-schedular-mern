import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
};

const register = asyncHandler(async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(400).json({ message: "Please Fill All Fields!" });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            email,
            password: hashedPassword,
        });
        await user.save();
        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return res.status(201).json({
            message: "User registered successfully",
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});

const login = asyncHandler(async(req, res) => {
    try {
        //
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate a JWT
        const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return res.status(200).json({
            message: "User loggin successfully",
            token,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});


export { register, login };
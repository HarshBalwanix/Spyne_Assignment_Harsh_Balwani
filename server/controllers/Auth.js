const bcrypt = require("bcrypt");
const User = require("../models/User");
require("dotenv").config();

// Signup Controller for Registering USers

exports.signup = async (req, res) => {
    try {
        // Destructure fields from the request body
        const {
            email,
            firstName,
            lastName,
            password,
            address
        } = req.body;

        // Check if All Details are there or not
        if (
            !firstName ||
            !lastName ||
            !email ||
            !password
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists. Please sign in to continue.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            address
        });

        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};

// Login controller for authenticating users
exports.login = async (req, res) => {
    try {
        // Get email and password from request body
        const { email, password } = req.body;

        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            });
        }

        // Find user with provided email
        const user = await User.findOne({ email });

        // If user not found with provided email
        if (!user) {
            return res.status(401).json({
                success: false,
                message: `User is not Registered with Us Please SignUp to Continue`,
            });
        }

        // Generate JWT token and Compare Password
        if (await bcrypt.compare(password, user.password)) {
            return res.status(200).json({
                success: true,
                user,
                message: "User Signed in successfully",
            });

        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            });
        }
    } catch (error) {
        console.error(error);
        // Return 500 Internal Server Error status code with error message
        return res.status(500).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
};
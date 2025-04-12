import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

//register
export const registerUser = async (req, res) => {
  const { userName, email, password, fullName, gender, dateOfBirth, phoneNumber } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({ success: false, message: "User Already exists with the same email! Please try again", });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ 
      userName,
      email,
      password: hashPassword,
      fullName: fullName || "",
      gender: gender || "",
      dateOfBirth: dateOfBirth || null,
      phoneNumber: phoneNumber || ""
    });

    await newUser.save();  //save user to database
    res.status(200).json({ success: true, message: "Registration successful", });
  } 
  catch (e) {
    console.log(e);
    res.status(500).json({  success: false, message: "Some error occured", });
  }
};

//login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try 
  {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({ success: false, message: "User doesn't exists! Please register first", });

    const checkPasswordMatch = await bcrypt.compare( password, checkUser.password );
    
    if (!checkPasswordMatch)
      return res.json({ success: false, message: "Incorrect password! Please try again", });

    const token = jwt.sign( { 
      id: checkUser._id,
      role: checkUser.role,
      email: checkUser.email,
      userName: checkUser.userName,
      fullName: checkUser.fullName,
      gender: checkUser.gender,
      dateOfBirth: checkUser.dateOfBirth,
      phoneNumber: checkUser.phoneNumber
    },
    "CLIENT_SECRET_KEY",
    { expiresIn: "60m" }  //trebuie sa modific in mai putin de 10 minut
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({ 
      success: true, 
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
        userName: checkUser.userName,
        fullName: checkUser.fullName,
        gender: checkUser.gender,
        dateOfBirth: checkUser.dateOfBirth,
        phoneNumber: checkUser.phoneNumber
      },
    });
  } 
  catch (e) {
    console.log(e);
    res.status(500).json({ success: false,  message: "Some error occured", });
  }
};

//logout
export const logoutUser = (req, res) => {
  res.clearCookie("token").json({ success: true, message: "Logged out successfully!", });
};

//auth middleware
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ success: false, message: "Unauthorised user!", });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } 
  catch (error) {
    res.status(401).json({ success: false, message: "Unauthorised user!", });
  }
};

//update user
export const updateUser = async (req, res) => {
  const { 
    userId, 
    userName, 
    email, 
    fullName, 
    gender, 
    dateOfBirth, 
    phoneNumber,
    currentPassword, 
    newPassword 
  } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update basic info
    if (userName) user.userName = userName;
    if (email) user.email = email;
    if (fullName) user.fullName = fullName;
    if (gender) user.gender = gender;
    if (dateOfBirth) user.dateOfBirth = dateOfBirth;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    // Update password if provided
    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: "Current password is required to change password" });
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: "Current password is incorrect" });
      }

      // Hash and update new password
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
    }

    await user.save();

    // Generate new token with updated user info
    const token = jwt.sign(
      { 
        id: user._id,
        role: user.role,
        email: user.email,
        userName: user.userName,
        fullName: user.fullName,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "User information updated successfully",
      user: {
        email: user.email,
        role: user.role,
        id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber
      },
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ success: false, message: "An error occurred while updating user information" });
  }
};
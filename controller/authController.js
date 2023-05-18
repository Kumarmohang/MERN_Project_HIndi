import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

////// Register Page //////////

export const regularController = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name || !email || !password || !phone || !address)
      return res.send({
        message: "name | email | password | address | phone is missing",
      });

    // check user
    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(200).send({
        success: false,
        message: "Already user Registered",
      });

    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    return res.status(201).send({
      success: true,
      message: "New user successfully Registered",
      newUser,
    });
  } catch (error) {
    next(error);
    console.log("Error is ", error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

/////////////////// ==================== Login Page = ==========================///////////////////

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(404).send({
        success: false,
        message: "invalid email or password",
      });
    const user = await userModel.findOne({ email });
    console.log("user Details", user);

    if (!user)
      return res.status(404).send({
        success: false,
        message: "user not Registered",
      });
    const match = await comparePassword(password, user.password);
    if (!match)
      return res.status(404).send({
        success: false,
        message: "Invalid password",
      });
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECREATE, {
      expiresIn: "7d",
    });
    return res.status(201).send({
      success: true,
      message: "login Successful",
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).send({
      success: false,
      message: "unable to login to user",
      error,
    });
  }
};

/// test COntroller

export const testController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "its working fine",
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: "its not working",
    });
  }
};

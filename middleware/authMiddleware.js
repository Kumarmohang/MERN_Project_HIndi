import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECREATE
    );
    console.log("decode value", decode);
    req.user = decode;
    next();
  } catch (error) {
    console.log("Error is ", error);
    res.status(500).send({
      succeess: false,
      message: "faied in RequiredSign",
    });
  }
};

// Admin access

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role !== 1)
      return res.status(401).send({
        succeess: false,
        message: "Unauthorized access",
      });
    next();
  } catch (error) {
    console.log("Error", error);
    res.status(500).send({
      succeess: false,
      message: "Admin middleware failed",
    });
  }
};

import jwt from "jsonwebtoken";
import {userModel} from "../models/user.model.js";

const protect = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decoded);
        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Not authorized, user not found" });
        }
        req.user = user.id;
        next();
    } catch (error) {
        console.error("Error in protect middleware:", error);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};

export default protect;
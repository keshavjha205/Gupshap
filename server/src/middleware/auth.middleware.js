import  jwt  from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const verifyjwt = req.cookies.jwt;

        if (!verifyjwt) {
            return res.status(401).json({
                message: "Unauthorized- No Token Provided"
            })
        }

        const decoded = jwt.verify(verifyjwt, process.env.JWT_SECRET_KEY)

        if(!decoded){
            return res.status(401).json({
                message: "Unauthorized- Invalid Token"
            })
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({
                message: "User not found"
            })
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error in protectRoute middleware", error.message);
        return res.status(500).json({
            message: "Internal Server error"
        })
        
    }
}
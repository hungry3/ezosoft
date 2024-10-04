import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken';
import { updateAccessToken } from "../controllers/auth.controller.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
const isAuthenticated = asyncHandler(async (req, res, next) => {
    const accessToken = req.cookies.access_token;

    if (!accessToken) {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);      
        req.user = decoded;
        next(); 
    } catch (error) {
       
        if (error.name === 'TokenExpiredError') {
            try {
                const user = await updateAccessToken(req, res, next);

                if (!user) {
                    return next(new ErrorHandler("Invalid token or unauthorized", 401));
                }
                req.user = user; 

                next(); 
            } catch (err) {
                return next(new ErrorHandler("Invalid token or unauthorized", 401));
            }
        } else {
            return next(new ErrorHandler("Invalid token or unauthorized", 401));
        }
    }
});
const isAdmin = (req, res, next) => {
    // console.log('User Role:', req.user);
    if (req.user?.role === 'admin') {
      return next();
    }
    return res.status(403).json({ success: false, message: 'Access denied' });
  };
  

export { isAuthenticated ,isAdmin};



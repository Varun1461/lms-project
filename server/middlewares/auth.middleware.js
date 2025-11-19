import AppError from "../utils/error.util.js";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";


const isLoggedIn = async (req, res , next) => {
    const { token} = req.cookies;

    if(!token){
        return next(new AppError('Unauthenticated,please login again',404))
    }
    const userDetails = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = userDetails;

    next();
}

const authorizedRoles= (...roles) => async (req, _res, next) => {
    const currentUserRoles = req.user.role;
    if (!roles.includes(currentUserRoles)) {

        return next(
            new AppError('Your dont have permission to access this route')
        )
    }
    next();
}

const authorizedSubscriber = async (req, _res, next) => {
    const subscription = req.user.subscription;
    const currentUserRole = req.user.role;
    const user = await User.findById(req.user.id);
    console.log(user);

    if(currentUserRole !== 'ADMIN' && subscription.status !== 'active') {
        return next (
            new AppError('Please subscribe to access this route!',403)
        )

    }

next();
}

export{
    isLoggedIn,
    authorizedRoles,
    authorizedSubscriber
}
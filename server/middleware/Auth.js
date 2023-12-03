import jwt from 'jsonwebtoken'
import Error from '../utils/Error.js'
import User from '../models/User.js';

export const authenticatedUser = async(req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new Error('Please Login to access the resources', 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id);

    next();
}
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({ path: './/.env' });

export async function authenticate(req, res, next) {
    if (req.headers.cookie) {
        const authToken = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('token='));
        if (authToken) {
            const token = authToken.split('=')[1];

            // Debugging: Check the value of the token

            try {
                const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

                // Debugging: Check the decoded token
                console.log('decodedToken:', decodedToken);

                const currentTime = Math.floor(Date.now() / 1000); 
                if (decodedToken.exp < currentTime) {
                    res.status(401).json({
                        success: false,
                        status: 401,
                        message: 'Token has expired',
                    });
                } else {
                    req.user = decodedToken;
                    next();
                }
            } catch (error) {
                // Debugging: Check the error object
                console.log('error:', error);

                res.status(401).json({
                    success: false,
                    status: 401,
                    message: 'Invalid token',
                });
            }
        } else {
            res.status(401).json({
                success: false,
                status: 401,
                message: 'User is Unauthorized',
            });
        }
    } else {
        res.status(401).json({
            success: false,
            status: 401,
            message: 'User is Unauthorized',
        });
    }
}
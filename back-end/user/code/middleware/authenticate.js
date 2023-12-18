import jwt from 'jsonwebtoken';

export async function authenticate(req, res, next) {
    const authToken = req.headers.authorization;

    if (authToken) {
        try {
            const decodedToken = jwt.verify(authToken, 'wompwomp');
            // Additional checks can be added here if needed
    
            req.user = decodedToken;
            next();
        } catch (error) {
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
}
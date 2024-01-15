import jwt from 'jsonwebtoken';

export async function authenticate(req, res, next) {
    if (req.headers.cookie) {
        const authToken = req.headers.cookie.split('; ').find(cookie => cookie.startsWith('token='));
        if (authToken) {
            const token = authToken.split('=')[1];
            try {
                const decodedToken = jwt.verify(token, 'wompwomp');
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
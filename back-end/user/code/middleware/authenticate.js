function authenticate(req, res, next) {
    const authToken = req.headers.authorization;

    if (authToken && authToken === process.env.AUTH_TOKEN) {
        next();
    } else {
        res.status(401).json({
            success: false,
            status: 401,
            message: 'User is Unauthorized',
        });
    }
}

module.exports = authenticate;
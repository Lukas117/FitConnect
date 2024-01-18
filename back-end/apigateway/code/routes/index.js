import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

const userProxy = createProxyMiddleware({
    target: 'http://users:3010/',
    changeOrigin: true,
    pathRewrite: {
        '^/user': '', 
    },
});

const eventProxy = createProxyMiddleware({
    target: 'http://events:3012/',
    changeOrigin: true,
    pathRewrite: {
        '^/event': '', 
    },
});

const facilityProxy = createProxyMiddleware({
    target: 'http://facilities:3013/',
    changeOrigin: true,
    pathRewrite: {
        '^/facility': '', 
    },
});

const sportProxy = createProxyMiddleware({
    target: 'http://sports:3014/',
    changeOrigin: true,
    pathRewrite: {
        '^/sport': '', 
    },
});
router.use('/user',  cors({origin: process.env.CLIENT_URL, credentials: true}), userProxy);
router.use('/event', cors(), eventProxy);
router.use('/facility', cors(), facilityProxy);
router.use('/sport', cors(), sportProxy);

export default router;
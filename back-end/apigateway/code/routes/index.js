import express from 'express';
import cors from 'cors';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();

// create a proxy for each microservice
const appointmentProxy = createProxyMiddleware({
	target: 'http://localhost:3010',
	changeOrigin: true
});

router.use('/user', cors(), appointmentProxy);

export default router;

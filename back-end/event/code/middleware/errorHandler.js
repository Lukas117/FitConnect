export async function errorHandler(err, req, res, next) {
  console.error('Middleware Error Handling:', err);

  const { statusCode, message } = err;
  const errStatus = statusCode ?? 500;
  const errMsg = message ?? 'Something went wrong';

  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
}
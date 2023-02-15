import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  headers: false,
  skipFailedRequests: false,
  skipSuccessfulRequests: true,
  draft_polli_ratelimit_headers: true,
  statusCode: 429,
  message:
    'Too many accounts created from this IP, please try again after an hour',
  skip(req, res) {
    return false;
  },
  onLimitReached(req, res, options) {},
  keyGenerator(req, res) {
    return req.ip;
  },
});

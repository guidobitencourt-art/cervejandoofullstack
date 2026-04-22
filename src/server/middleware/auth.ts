import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'dev-secret';

export interface AuthRequest extends Request {
  userId?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const parts = authHeader.split(' ');
    if (parts.length !== 2) return res.status(401).json({ error: 'Token error' });

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: 'Token malformatted' });

    const decoded = jwt.verify(token, SECRET) as { userId?: string } | string;
    if (typeof decoded === 'string') return res.status(401).json({ error: 'Token invalid' });

    req.userId = decoded.userId;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid', detail: err instanceof Error ? err.message : String(err) });
  }
}

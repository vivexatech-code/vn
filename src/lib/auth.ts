import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { getDb } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'vn-vidhyapeeth-secret-jwt-key-2026-production';
const COOKIE_NAME = 'vn_admin_token';

export interface AdminPayload {
  id: number;
  username: string;
  email: string;
  role: string;
  fullName: string;
}

export function signToken(payload: AdminPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminPayload;
  } catch {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<AdminPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function authenticateRequest(req: Request): Promise<AdminPayload | null> {
  // Check authorization header first
  const authHeader = req.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (decoded) return decoded;
  }

  // Check cookies
  const cookieHeader = req.headers.get('cookie');
  if (cookieHeader) {
    const match = cookieHeader.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
    if (match && match[1]) {
      const decoded = verifyToken(decodeURIComponent(match[1]));
      if (decoded) return decoded;
    }
  }

  return null;
}

export const verifyAuth = authenticateRequest;

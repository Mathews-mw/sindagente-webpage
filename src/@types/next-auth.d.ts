import NextAuth from 'next-auth'
import { JWT } from "next-auth/jwt"
import { UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string; 
      email: string;
      role: 'ADMIN' | 'MODERADOR';
    }
  }

  interface User {
    id: string;
    name: string; 
    email: string;
    role: 'ADMIN' | 'MODERADOR';
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole,
  }
}
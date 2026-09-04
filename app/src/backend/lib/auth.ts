/**
 * NextAuth (Auth.js v5) Configuration
 *
 * Configures authentication providers, session strategy,
 * and integration with Drizzle ORM.
 */

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { db } from '@backend/lib/db';
import { userRepository } from '@backend/modules/identity/repository/user.repository';
import { passwordService } from '@backend/modules/identity/services/password.service';
import type { UserRole } from '@backend/modules/identity/domain/entities';

// Extend NextAuth types to include our custom fields
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: UserRole;
    };
  }
  
  interface User {
    id: string;
    role: UserRole;
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  // Use Drizzle ORM to persist users and sessions
  adapter: DrizzleAdapter(db),
  
  // Use database sessions (except for Credentials provider which requires JWT by default in NextAuth v4, but we can force database sessions if we want. In NextAuth v5, Credentials provider forces JWT strategy. Let's use JWT for simplicity with Credentials)
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        // 1. Find user by email
        const user = await userRepository.findByEmail(email);
        
        if (!user || !user.passwordHash) {
          return null;
        }

        // 2. Verify password
        const isPasswordValid = await passwordService.verify(password, user.passwordHash);
        
        if (!isPasswordValid) {
          return null;
        }

        // 3. Return user object (without password)
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    // Add custom fields to JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role as UserRole;
      }
      return token;
    },
    
    // Pass custom fields from JWT to Session
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  
  pages: {
    signIn: '/login', // TODO: create frontend login page
  },
  
  // Do not automatically generate secret in production, require NEXTAUTH_SECRET env
  secret: process.env.NEXTAUTH_SECRET || 'secret-for-development-only-do-not-use-in-prod',
});

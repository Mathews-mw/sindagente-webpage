import { env } from '@/env';
import { api } from '@/lib/axios';
import { UserRole } from '@prisma/client';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface ISessionResponse {
	user: {
		id: string;
		name: string;
		email: string;
		role: UserRole;
	};
	token: string;
}

const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials', // nome do provedor que será utilizado
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' },
			},
			async authorize(credentials, req) {
				const { data: sessionResponse, status } = await api.post<ISessionResponse>(
					`${env.APP_URL}/api/session`,
					{
						email: credentials?.email,
						password: credentials?.password,
					}
				);

				if (sessionResponse && status === 200) {
					console.log('sessionResponse: ', sessionResponse.user);
					return sessionResponse.user;
				}

				return null;
			},
		}),
	],
	secret: `${env.NEXTAUTH_SECRET}`,
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, trigger, user, session }) {
			if (trigger === 'signIn') {
				token.role = user.role;
			}
			if (trigger === 'update' && session?.name) {
				token.name = session.name;
			}
			return token;
		},
		async session({ session, token, newSession, user, trigger }) {
			if (trigger === 'update' && newSession?.name) {
				session.user.name = newSession.name;
			}

			if (token.email && token.name && token.sub && token.role) {
				session.user.id = token.sub;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.role = token.role;
			}

			return session;
		},
	},
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };

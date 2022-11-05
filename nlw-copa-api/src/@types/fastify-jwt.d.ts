import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      name: string;
      sub: string;
      iat: number;
      exp: number;
    };
  }
}

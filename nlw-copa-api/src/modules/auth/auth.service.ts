import axios from 'axios';
import fastify, { FastifyRequest } from 'fastify';
import { prisma } from '../../lib/prisma';
import { googleResponse } from './dto/google-response.dto';

export const signIn = async (accessToken: string) => {
  const { data } = await axios.get(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  const userInfo = googleResponse.parse(data);

  let user = await prisma.user.findUnique({
    where: {
      providerId: userInfo.id
    }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: userInfo.name,
        email: userInfo.email,
        providerId: userInfo.id,
        pictureUrl: userInfo.picture
      }
    });
  }

  return user;
};

export const getMe = async (userId: string) => {
  return prisma.user.findUnique({
    where: {
      id: userId
    }
  });
};

import axios from "axios";
import type { User } from "@auth0/auth0-react";

export async function updateUserMetadata(
  user: User,
  metadata: object,
  accessToken: string
) {
  const { sub, app_metadata, user_metadata } = user;

  const updatedMetadata = {
    ...app_metadata,
    ...user_metadata,
    ...metadata,
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  const body = {
    user_metadata: updatedMetadata,
  };

  const uri = `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/users/${sub}`;

  const response = await axios.patch(uri, { headers, body });

  return response.data;
}

export async function createUser(
  userId: string,
  userName: string,
  accessToken: string
) {
  const body = {
    userId: userId,
    userName: userName,
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": `${
      import.meta.env.VITE_SERVER_CROSS_ORIGIN
    }`,
  };

  const uri = `${import.meta.env.VITE_SERVER_URL}/user/create`;

  try {
    await axios.post(uri, body, { headers });
  } catch (error) {
    return false;
  }

  return true;
}

export async function getUserProfile(userId: string, accessToken: string) {
  const body = {
    userId,
  };

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": `${
      import.meta.env.VITE_SERVER_CROSS_ORIGIN
    }`,
  };

  const uri = `${import.meta.env.VITE_SERVER_URL}/user/profile`;

  try {
    const response = await axios.post(uri, body, { headers });
    return response.data;
  } catch (error) {
    return null;
  }
}

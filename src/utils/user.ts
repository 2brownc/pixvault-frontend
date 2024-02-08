import { createUser, getUserProfile } from "../api/user"
import type { User as UserProfile } from "../types"

export async function isRegisteredUser(
  userId: string,
  accessToken: string,
): Promise<boolean> {
  // Check if user profile exists
  const response = await getUserProfile(userId, accessToken)

  if (response === null) {
    return false
  } else {
    return true
  }
}

export async function registerUser(
  userId: string,
  accessToken: string,
): Promise<boolean> {
  // Create new user in database
  const createUserResponse = await createUser(userId, accessToken)

  if (createUserResponse.status === 200) {
    return true
  }

  return false
}

export async function getProfile(
  userId: string,
  accessToken: string,
): Promise<UserProfile | null> {
  // Check if user is already registered
  const registrationStatus = await isRegisteredUser(userId, accessToken)

  if (registrationStatus === true) {
    // Get user profile if registered
    const userProfile: UserProfile = await getUserProfile(userId, accessToken)

    return userProfile
  } else {
    // Register new user if not already registered
    const registationResult = await registerUser(userId, accessToken)

    if (registationResult === true) {
      // Get newly registered user profile
      const userProfile: UserProfile = await getUserProfile(userId, accessToken)

      return userProfile
    }
  }

  return null
}

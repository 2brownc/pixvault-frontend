import { createUser, getUserProfile } from "../api/user"

export async function isRegisteredUser(
	userId: string,
	accessToken: string,
): Promise<boolean> {
	// Check if user profile exists
	const response = await getUserProfile(userId, accessToken)
	if (response === null) {
		return false
	}

	return true
}

export async function registerUser(
	userId: string,
	userName: string,
	accessToken: string,
): Promise<boolean> {
	// Create new user in database
	const result = await createUser(userId, userName, accessToken)

	return result
}

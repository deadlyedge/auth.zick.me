import { initialUser } from '@/lib/localUser'

export const EnsureClerkUser = async () => {
	await initialUser()

	return null
}

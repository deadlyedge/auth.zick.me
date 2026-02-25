import { prisma } from './prisma'
import { currentUser } from '@clerk/nextjs/server'
import { UserRole } from '@/generated/prisma/client'

// export async function getOrCreateLocalUser(userEmail: string) {
// 	const existing = await prisma.user.findUnique({
// 		where: { email: userEmail },
// 	})
// 	if (existing) return existing

// 	const user = await clerkClient.users.getUser(clerkUserId)
// 	const email = user.emailAddresses[0]?.emailAddress ?? ''
// 	const name =
// 		user.firstName || user.lastName
// 			? `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()
// 			: null
// 	const avatarUrl = user.imageUrl ?? null

// 	return prisma.user.create({
// 		data: {
// 			clerkId: user.id,
// 			email,
// 			name,
// 			avatarUrl: avatarUrl ?? undefined,
// 			// 这里可以设置默认 role / metadata
// 			metadata: {},
// 		},
// 	})
// }

export async function initialUser() {
	const clerkUser = await currentUser()
	if (!clerkUser) {
		return null
	}

	const primaryEmail = clerkUser.emailAddresses.find(
		(email) => email.id === clerkUser.primaryEmailAddressId,
	)
	const fallbackEmail = clerkUser.emailAddresses.at(0)
	const resolvedEmail =
		(primaryEmail ?? fallbackEmail)?.emailAddress ??
		`${clerkUser.id}@users.clerk.local`

	const role =
		resolvedEmail === process.env.OWNER_EMAIL
			? UserRole.SITE_OWNER
			: UserRole.USER

	const metadata = {
		roomId: '000-100',
	}

	return prisma.user.upsert({
		where: { email: resolvedEmail },
		update: {
			clerkId: clerkUser.id,
			name: clerkUser.fullName ?? clerkUser.username ?? null,
			email: resolvedEmail,
			avatarUrl: clerkUser.imageUrl,
			role,
			metadata,
		},
		create: {
			clerkId: clerkUser.id,
			name: clerkUser.fullName ?? clerkUser.username ?? null,
			email: resolvedEmail,
			avatarUrl: clerkUser.imageUrl,
			role,
			metadata,
		},
	})
}

// app/info/page.tsx
import { initialUser } from '@/lib/localUser'
import { redirect } from 'next/navigation'

export default async function InfoPage() {
	const localUser = await initialUser()
	if (!localUser) redirect('/')

	return (
		<main className="max-w-xl mx-auto my-10 space-y-4">
			<h1 className="text-2xl font-bold">本地用户信息</h1>
			<div className="border rounded p-4 space-y-2">
				<div>ID: {localUser.id}</div>
				<div>Clerk ID: {localUser.clerkId}</div>
				<div>Email: {localUser.email}</div>
				<div>姓名: {localUser.name ?? '未设置'}</div>
				<div>角色: {localUser.role}</div>
				<div>时区: {localUser.timezone ?? '未设置'}</div>
				<div>Metadata: {JSON.stringify(localUser.metadata)}</div>
				<div>创建时间: {localUser.createdAt.toISOString()}</div>
			</div>
		</main>
	)
}

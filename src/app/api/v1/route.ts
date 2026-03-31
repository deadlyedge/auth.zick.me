import { NextResponse } from 'next/server'
import { initialUser } from '@/lib/localUser'
import { currentUser } from '@clerk/nextjs/server'

// CORS 预检请求处理
export async function OPTIONS() {
	return NextResponse.json(
		{},
		{
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				'Access-Control-Allow-Headers': 'Content-Type, Authorization',
				'Access-Control-Allow-Credentials': 'true',
			},
		},
	)
}

export async function GET() {
	try {
		// 先检查 Clerk 是否已登录（服务器端检查）
		const clerkUser = await currentUser()

		if (!clerkUser) {
			// 未登录，返回特定的错误码，指示前端跳转到登录页
			return NextResponse.json(
				{
					error: 'Unauthorized',
					code: 'REDIRECT_TO_SIGNIN',
					message: '请先登录',
				},
				{
					status: 401,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': 'true',
					},
				},
			)
		}

		// 已登录，同步用户到本地数据库
		const user = await initialUser()

		if (!user) {
			return NextResponse.json(
				{
					error: 'User not found',
					code: 'USER_NOT_FOUND',
				},
				{
					status: 404,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': 'true',
					},
				},
			)
		}

		// 返回用户信息（不包含敏感数据）
		const userData = {
			id: user.id,
			email: user.email,
			name: user.name,
			role: user.role,
			clerkId: user.clerkId,
			createdAt: user.createdAt.toISOString(),
		}

		return NextResponse.json(userData, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': 'true',
			},
		})
	} catch (error) {
		console.error('API Error:', error)
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{
				status: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': 'true',
				},
			},
		)
	}
}
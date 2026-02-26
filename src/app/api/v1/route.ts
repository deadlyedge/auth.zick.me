import { NextResponse } from 'next/server'
import { initialUser } from '@/lib/localUser'

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
		const user = await initialUser()

		if (!user) {
			return NextResponse.json(
				{ error: 'Unauthorized' },
				{
					status: 401,
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
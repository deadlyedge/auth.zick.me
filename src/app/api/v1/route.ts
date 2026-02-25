import { NextResponse } from 'next/server'
import { initialUser } from '@/lib/localUser'

export async function GET() {
	const user = await initialUser()

	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	return NextResponse.json(user)
}
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const HeaderNav = () => {
	const pathname = usePathname()

	return (
		<nav className="fixed w-full top-0 z-40 h-16 bg-white/60 backdrop-blur border-b">
			<div className="mx-auto max-w-7xl px-6 py-3 h-16 flex items-center justify-between">
				<Link
					href="/"
					className={cn(
						'text-lg font-semibold tracking-tight',
						pathname === '/' && 'text-primary',
					)}
				>
					{/* {profile?.website?.split('://')[1]?.replace(/\/$/, '') ?? 'Your Name'} */}
					auth.zick.me
				</Link>

				<nav className="flex items-center font-bold font-sans text-base gap-1">
					detail
				</nav>
			</div>
		</nav>
	)
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { SignedIn, UserButton, SignedOut, SignInButton } from '@clerk/nextjs'
import { BookIcon, HeartIcon } from 'lucide-react'
import { Button } from './ui/button'

export const HeaderNav = () => {
	const pathname = usePathname()

	return (
		<nav className="w-full h-16 bg-white/60 backdrop-blur border-b">
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
					<SignedIn>
						<Button
							variant="link"
							size="sm"
							asChild
							className="text-foreground"
						>
							<Link href="/vocabulary">
								<BookIcon />
								生词本
							</Link>
						</Button>
						<Button
							variant="link"
							size="sm"
							asChild
							className="text-foreground"
						>
							<Link href="/collections">
								<HeartIcon />
								我的收藏
							</Link>
						</Button>
						<UserButton />
					</SignedIn>
					<SignedOut>
						<SignInButton mode="modal">
							<Button variant="link" className="text-foreground">
								登入
							</Button>
						</SignInButton>
					</SignedOut>
				</nav>
			</div>
		</nav>
	)
}

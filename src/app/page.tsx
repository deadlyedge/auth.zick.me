import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Shield, Globe, Key, Users } from 'lucide-react'

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black p-6">
			<main className="w-full max-w-3xl space-y-12">
				{/* 标题区域 */}
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-bold tracking-tight">auth.zick.me</h1>
					<p className="text-lg text-muted-foreground">
						统一身份认证门户
					</p>
					<p className="text-sm text-muted-foreground">
						为 zick.me 域下的所有服务提供身份验证服务
					</p>
				</div>

				<SignedOut>
					<div className="flex justify-center">
						<SignInButton mode="modal">
						<button
							type="button"
							className="px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
						>
							登录
						</button>
						</SignInButton>
					</div>
				</SignedOut>

				<SignedIn>
					<div className="flex justify-center gap-4">
						<Link
							href="/dashboard"
							className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-medium hover:opacity-90 transition-opacity"
						>
							<Users className="w-4 h-4" />
							用户信息
						</Link>
						<Link
							href="/test-auth"
							className="flex items-center gap-2 px-6 py-3 border border-foreground rounded-full font-medium hover:bg-foreground/10 transition-colors"
						>
							<Key className="w-4 h-4" />
							测试认证
						</Link>
					</div>
				</SignedIn>

				{/* 功能特点 */}
				<div className="grid gap-6 md:grid-cols-2">
					<div className="border rounded-lg p-6 space-y-3">
						<Shield className="w-8 h-8" />
						<h2 className="text-lg font-semibold">Clerk 认证</h2>
						<p className="text-sm text-muted-foreground">
							基于 Clerk 的安全身份验证，支持多种登录方式
						</p>
					</div>
					<div className="border rounded-lg p-6 space-y-3">
						<Globe className="w-8 h-8" />
						<h2 className="text-lg font-semibold">统一登录</h2>
						<p className="text-sm text-muted-foreground">
							一次登录，所有 zick.me 服务通用
						</p>
					</div>
					<div className="border rounded-lg p-6 space-y-3">
						<Users className="w-8 h-8" />
						<h2 className="text-lg font-semibold">用户管理</h2>
						<p className="text-sm text-muted-foreground">
							支持 USER、ADMIN、SITE_OWNER 角色权限
						</p>
					</div>
					<div className="border rounded-lg p-6 space-y-3">
						<Key className="w-8 h-8" />
						<h2 className="text-lg font-semibold">API 集成</h2>
						<p className="text-sm text-muted-foreground">
							提供 REST API 供其他服务验证用户身份
						</p>
					</div>
				</div>

				{/* 底部信息 */}
				<div className="text-center text-sm text-muted-foreground">
					<p>Powered by Clerk + Next.js + PostgreSQL</p>
				</div>
			</main>
		</div>
	)
}

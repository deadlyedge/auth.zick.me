'use client'

import { useEffect, useState } from 'react'

interface ApiResponse {
	error?: string
	id?: string
	email?: string
	name?: string
	role?: string
	clerkId?: string
	createdAt?: string
}

export default function TestAuthPage() {
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState<ApiResponse | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isLocalDev, setIsLocalDev] = useState(false)

	// 检测是否在本地开发环境
	useEffect(() => {
		const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
		setIsLocalDev(isLocal)
	}, [])

	// 模拟远程服务调用 auth.zick.me API
	const testRemoteAuth = async () => {
		setLoading(true)
		setError(null)
		setResult(null)

		try {
			// 本地开发环境使用相对路径，生产环境使用绝对路径
			const apiUrl = isLocalDev ? '/api/v1' : 'https://auth.zick.me/api/v1'

			const response = await fetch(apiUrl, {
				credentials: 'include', // 关键：携带认证 Cookie
			})

			const data = await response.json()

			if (response.ok) {
				setResult(data)
			} else {
				setError(data.error || '认证失败')
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : '网络错误')
		} finally {
			setLoading(false)
		}
	}

	// 页面加载时自动测试
	// useEffect(() => {
	// 	testRemoteAuth()
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [isLocalDev])

	// 切换环境测试
	const toggleEnvironment = () => {
		setIsLocalDev(!isLocalDev)
		testRemoteAuth()
	}

	const baseUrl = 'https://auth.zick.me'

	return (
		<main className="max-w-4xl mx-auto my-10 space-y-6 p-6">
			<h1 className="text-3xl font-bold">🔐 远程认证服务测试</h1>
			<p className="text-muted-foreground">
				此页面模拟外部服务调用 auth.zick.me 进行身份验证
			</p>

			{/* 环境切换 */}
			<div className="flex items-center gap-4 p-4 bg-muted rounded-lg">
				<span className="text-sm font-medium">测试环境：</span>
				<button
					type="button"
					onClick={toggleEnvironment}
					className="px-3 py-1 text-sm rounded border hover:bg-background transition-colors"
				>
					{isLocalDev ? '🌐 本地开发 (localhost:3000)' : '🚀 生产环境 (auth.zick.me)'}
				</button>
				<span className="text-xs text-muted-foreground">
					当前 API: {isLocalDev ? '/api/v1' : 'https://auth.zick.me/api/v1'}
				</span>
			</div>

			{/* 测试按钮 */}
			<div className="flex gap-4">
				<button
					type="button"
					onClick={testRemoteAuth}
					disabled={loading}
					className="px-4 py-2 bg-foreground text-background rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
				>
					{loading ? '测试中...' : '重新测试'}
				</button>
			</div>

			{/* CORS 错误提示 */}
			{error && error.includes('CORS') && (
				<div className="border border-yellow-500 bg-yellow-50 dark:bg-yellow-950 rounded-lg p-4">
					<h3 className="font-semibold text-yellow-600">⚠️ CORS 错误</h3>
					<p className="text-sm mt-1">
						跨域请求被阻止。请确保：
					</p>
					<ul className="text-sm mt-2 list-disc list-inside space-y-1">
						<li>使用本地开发环境测试（点击上方 "本地开发" 按钮）</li>
						<li>或者在 auth.zick.me 部署后使用生产环境测试</li>
						<li>如果需要在其他域名调用，需要在 API 路由中配置 CORS</li>
					</ul>
				</div>
			)}

			{/* 错误信息 */}
			{error && !error.includes('CORS') && (
				<div className="border border-red-500 bg-red-50 dark:bg-red-950 rounded-lg p-4">
					<h3 className="font-semibold text-red-600">❌ 错误</h3>
					<p className="text-sm">{error}</p>
				</div>
			)}

			{/* 成功结果 */}
			{result && !error && (
				<div className="border rounded-lg p-4 space-y-4">
					<h2 className="text-xl font-semibold border-b pb-2">
						✅ 认证成功 - 用户信息
					</h2>
					<div className="grid gap-4 md:grid-cols-2">
						<div className="space-y-2 text-sm">
							<div className="flex justify-between">
								<span className="text-muted-foreground">ID:</span>
								<span className="font-mono">{result.id}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">Clerk ID:</span>
								<span className="font-mono">{result.clerkId}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">邮箱:</span>
								<span>{result.email}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">姓名:</span>
								<span>{result.name ?? '未设置'}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">角色:</span>
								<span className="font-semibold">{result.role}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-muted-foreground">创建时间:</span>
								<span className="text-xs">
									{result.createdAt
										? new Date(result.createdAt).toLocaleString('zh-CN')
										: '-'}
								</span>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* API 调用说明 */}
			<div className="border rounded-lg p-4 space-y-4">
				<h2 className="text-xl font-semibold border-b pb-2">
					🌐 远程服务调用方式
				</h2>

				<div className="space-y-2">
					<p className="text-sm font-medium">1. 同源调用（推荐用于 Next.js 服务）：</p>
					<div className="bg-muted p-4 rounded-lg">
						<pre className="text-xs overflow-x-auto">{`// 在同一域名或通过 Next.js 代理调用
const response = await fetch('/api/v1', {
  credentials: 'include'
})
const user = await response.json()`}</pre>
					</div>
				</div>

				<div className="space-y-2">
					<p className="text-sm font-medium">2. 使用服务端 API 代理：</p>
					<div className="bg-muted p-4 rounded-lg">
						<pre className="text-xs overflow-x-auto">{`// 在你的服务中创建 API 代理
// app/api/auth-user/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  // 先确保本地已登录
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 调用远程 auth.zick.me 获取完整用户信息
  const response = await fetch('${baseUrl}/api/v1', {
    credentials: 'include'
  })

  return response
}`}</pre>
					</div>
				</div>

				<div className="space-y-2">
					<p className="text-sm font-medium">3. 跨域调用（需要 CORS 支持）：</p>
					<div className="bg-muted p-4 rounded-lg">
						<pre className="text-xs overflow-x-auto">{`// 跨域调用（需要 auth.zick.me 配置 CORS）
const response = await fetch('https://auth.zick.me/api/v1', {
  method: 'GET',
  credentials: 'include', // 携带认证 cookie
  mode: 'cors',
  headers: {
    'Content-Type': 'application/json',
  }
})
const userData = await response.json()`}</pre>
					</div>
				</div>

				<div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
					<p className="font-medium">💡 建议：</p>
					<ul className="list-disc list-inside mt-1 space-y-1 text-muted-foreground">
						<li>开发时使用本地相对路径 `/api/v1`</li>
						<li>部署到生产环境后，其他服务可通过代理或同域调用</li>
						<li>确保调用时携带 <code>credentials: 'include'</code> 以传递认证 Cookie</li>
					</ul>
				</div>
			</div>
		</main>
	)
}

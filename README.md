# auth.zick.me

统一身份认证门户，为 zick.me 域下的所有服务提供身份验证服务。

## 功能特性

- 🔐 **Clerk 认证** - 基于 Clerk (clerk.zick.me) 的统一登录认证
- 👥 **用户角色管理** - 支持 USER、ADMIN、SITE_OWNER 三种角色
- 🔄 **自动用户同步** - 登录时自动创建/同步用户信息到本地数据库
- 📊 **Prisma + PostgreSQL** - 强大的数据库支持
- 🎨 **现代化 UI** - 基于 Tailwind CSS 和 shadcn/ui

## 技术栈

- **框架**: Next.js 16 (App Router)
- **认证**: Clerk
- **数据库**: PostgreSQL + Prisma ORM
- **UI**: React 19 + Tailwind CSS 4 + shadcn/ui
- **字体**: Noto Sans/Serif (支持中文)
- **代码规范**: Biome

## 项目结构

```
├── prisma/
│   └── schema.prisma       # 数据库模型定义
├── src/
│   ├── app/
│   │   ├── api/v1/         # API 路由
│   │   ├── dashboard/      # 仪表盘页面
│   │   └── layout.tsx      # 根布局
│   ├── components/
│   │   ├── ui/             # shadcn/ui 组件
│   │   ├── ensureClerkUser.tsx  # Clerk 用户初始化
│   │   └── headerNav.tsx   # 导航栏
│   ├── lib/
│   │   ├── localUser.ts    # 用户同步逻辑
│   │   ├── prisma.ts       # Prisma 客户端
│   │   └── utils.ts        # 工具函数
│   └── generated/prisma/   # Prisma 生成的代码
└── public/                 # 静态资源
```

## 快速开始

### 环境要求

- Node.js 18+
- PostgreSQL 数据库
- Clerk 账户

### 配置步骤

1. **克隆项目**

```bash
git clone https://github.com/deadlyedge/auth.zick.me.git
cd auth.zick.me
```

2. **安装依赖**

```bash
bun install
# 或
npm install
```

3. **配置环境变量**

创建 `.env` 文件：

```env
# Clerk 配置
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# 数据库配置
DATABASE_URL="postgresql://user:password@localhost:5432/auth_zick_me"

# 站点所有者邮箱
OWNER_EMAIL=your@email.com
```

4. **初始化数据库**

```bash
bun run db:generate  # 生成 Prisma 客户端
bun run db:migrate   # 执行数据库迁移
```

5. **启动开发服务器**

```bash
bun run dev
```

访问 http://localhost:3000

## 数据库模型

### User

| 字段 | 类型 | 描述 |
|------|------|------|
| id | String | 用户 ID (CUID) |
| email | String | 邮箱 (唯一) |
| clerkId | String | Clerk 用户 ID |
| name | String? | 用户名 |
| avatarUrl | String? | 头像 URL |
| role | UserRole | 角色 (USER/ADMIN/SITE_OWNER) |
| timezone | String? | 时区 |
| metadata | JSON? | 自定义元数据 |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

## 角色说明

- **USER** - 普通用户
- **ADMIN** - 管理员
- **SITE_OWNER** - 站点所有者 (由 OWNER_EMAIL 自动分配)

## 常用命令

```bash
# 开发
bun run dev

# 构建
bun run build

# 代码检查
bun run lint

# 代码格式化
bun run format

# Prisma 操作
bun run db:generate   # 生成客户端
bun run db:migrate    # 迁移数据库
bun run db:push       # 推送 schema 到数据库
bun run db:studio     # 打开 Prisma Studio
```

## 部署

### Vercel 部署

```bash
vercel deploy
```

### Docker 部署

构建 Docker 镜像：

```bash
docker build -t auth.zick.me .
```

## 许可证

MIT
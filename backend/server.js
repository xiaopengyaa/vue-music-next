const express = require('express')
const { createServer: createViteServer } = require('vite')
const registerRouter = require('./router')

async function createServer() {
  const app = express()

  // 以中间件模式创建 vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑
  // 并让上级服务器接管控制
  // 如果你想使用 Vite 自己的 HTML 服务逻辑（将 Vite 作为
  // 一个开发中间件来使用），那么这里请用 'html'
  const vite = await createViteServer({
    server: { middlewareMode: 'html' },
  })

  app.use((req, res, next) => {
    res.setHeader('Set-Cookie', 'SameSite=None; Secure')
    next()
  })

  // 路由注册
  registerRouter(app)

  // 使用 vite 的 Connect 实例作为中间件
  app.use(vite.middlewares)

  const server = app.listen(3000, () => {
    console.log(
      `\nvite app listening at http://localhost:${server.address().port}\n`
    )
  })
}

createServer()

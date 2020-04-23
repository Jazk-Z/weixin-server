const Router = require('koa-router')
const router = new Router({
  prefix: '/git'
})
router.post('/push', (ctx, next) => {
  const gitInfo = ctx.request.body
  console.log(`-------------------------------------------`)
  console.log(gitInfo)
  console.log(`-------------------------------------------`)
  ctx.body = {
    ok: ctx.request.body
  }
})
module.exports = router

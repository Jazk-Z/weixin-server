const Router = require('koa-router')
const router = new Router({
  prefix: '/git',
})
router.post('/push', (ctx, next) => {
  console.log('method Post', JSON.stringify(ctx, null, '\n'))
  console.log(ctx.body)
  ctx.body = {
    ok: true
  }
})
router.get('/push', (ctx, next) => {
  console.log('method GET', JSON.stringify(ctx, null, '\n'))
})
module.exports = router

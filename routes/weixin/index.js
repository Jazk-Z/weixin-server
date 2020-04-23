const Router = require('koa-router')
const router = new Router()
router.post('/push', (ctx, next) => {
  console.log('method Post', JSON.stringify(ctx, null, '\n'))
  ctx.body = 'github push: methods is post'
})
router.get('/push', (ctx, next) => {
  console.log('method GET', JSON.stringify(ctx, null, '\n'))
  ctx.body = 'github push: methods is get'
})
router.all('/', (ctx, next) => {
  console.log(1111111)
  console.log(ctx)
  console.log(ctx.request.body)
  console.log(1111111)
  // ctx.body = ctx.request.body
})
module.exports = router

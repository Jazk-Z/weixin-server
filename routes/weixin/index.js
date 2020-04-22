const Router = require('koa-router')
const router = new Router()
router.post('/push', (ctx, next) => {
  console.log('method Post', JSON.stringify(ctx, null, '\n'))
})
router.get('/push', (ctx, next) => {
  console.log('method GET', JSON.stringify(ctx, null, '\n'))
})
router.use('/', (ctx, next) => {
  console.log(1111111)
  console.log(ctx)
  console.log(1111111)
})
module.exports = router

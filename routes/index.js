const Router = require('koa-router')
const gitHookRoutes = require('./git-hook')
const weixinRoutes = require('./weixin')
const router = new Router()
router.use(gitHookRoutes.routes())
router.use(weixinRoutes.routes())
module.exports = router

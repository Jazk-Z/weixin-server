const Router = require('koa-router')
const router = new Router()
const gitHookRoutes = require('./git-hook')
router.use(gitHookRoutes.routes())
module.exports = router
